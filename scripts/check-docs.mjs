import { access, readFile, readdir, stat } from "node:fs/promises";
import {
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from "node:path";

const projectRoot = process.cwd();
const docsRoot = resolve(projectRoot, "content/docs");
const markdownExtensions = new Set([".md", ".mdx"]);
const errors = [];

function displayPath(path) {
  return relative(projectRoot, path).split(sep).join("/");
}

function lineAt(source, index) {
  return source.slice(0, index).split(/\r?\n/u).length;
}

function report(path, message, line) {
  errors.push(
    `${displayPath(path)}${line ? `:${line}` : ""} — ${message}`,
  );
}

function isInside(parent, candidate) {
  const path = relative(parent, candidate);
  return path === "" || (!path.startsWith(`..${sep}`) && path !== ".." && !isAbsolute(path));
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)));
    } else if (
      markdownExtensions.has(extname(entry.name)) ||
      entry.name === "meta.json"
    ) {
      files.push(path);
    }
  }

  return files;
}

function frontmatterField(frontmatter, name) {
  const lines = frontmatter.split(/\r?\n/u);

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(
      new RegExp(`^${name}\\s*:\\s*(.*?)\\s*$`, "u"),
    );

    if (!match) continue;

    const inlineValue = match[1];
    if (!/^[>|][+-]?$/u.test(inlineValue)) {
      return inlineValue
        .replace(/^(['"])([\s\S]*)\1$/u, "$2")
        .trim();
    }

    const block = [];
    for (let lineIndex = index + 1; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex];
      if (line.trim() !== "" && !/^\s/u.test(line)) break;
      block.push(line.trim());
    }
    return block.join(" ").trim();
  }

  return "";
}

function validateFrontmatter(path, source) {
  const normalized = source.replace(/^\uFEFF/u, "");
  const lines = normalized.split(/\r?\n/u);

  if (lines[0]?.trim() !== "---") {
    report(path, "missing frontmatter opening delimiter");
    return;
  }

  const closingIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === "---",
  );

  if (closingIndex === -1) {
    report(path, "missing frontmatter closing delimiter", 1);
    return;
  }

  const frontmatter = lines.slice(1, closingIndex).join("\n");
  for (const field of ["title", "description"]) {
    if (!frontmatterField(frontmatter, field)) {
      report(path, `frontmatter "${field}" must be present and non-empty`, 1);
    }
  }
}

function validateCodeFences(path, source) {
  const lines = source.split(/\r?\n/u);
  let openFence;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!openFence) {
      const match = line.match(/^\s{0,3}(`{3,}|~{3,})/u);
      if (match) {
        openFence = {
          character: match[1][0],
          length: match[1].length,
          line: index + 1,
        };
      }
      continue;
    }

    const closing = line.match(/^\s{0,3}(`{3,}|~{3,})\s*$/u);
    if (
      closing &&
      closing[1][0] === openFence.character &&
      closing[1].length >= openFence.length
    ) {
      openFence = undefined;
    }
  }

  if (openFence) {
    report(path, "unclosed code fence", openFence.line);
  }
}

function withoutFencedCode(source) {
  const lines = source.split(/\r?\n/u);
  let openFence;

  return lines
    .map((line) => {
      if (!openFence) {
        const opening = line.match(/^\s{0,3}(`{3,}|~{3,})/u);
        if (opening) {
          openFence = {
            character: opening[1][0],
            length: opening[1].length,
          };
          return "";
        }
        return line;
      }

      const closing = line.match(/^\s{0,3}(`{3,}|~{3,})\s*$/u);
      if (
        closing &&
        closing[1][0] === openFence.character &&
        closing[1].length >= openFence.length
      ) {
        openFence = undefined;
      }
      return "";
    })
    .join("\n");
}

function normalizeLinkTarget(rawTarget) {
  let target = rawTarget.trim();
  if (target.startsWith("<") && target.endsWith(">")) {
    target = target.slice(1, -1);
  }

  try {
    target = decodeURI(target);
  } catch {
    // Keep the original target so the validation output remains actionable.
  }

  return target.split(/[?#]/u, 1)[0].replace(/\/+$/u, "") || "/";
}

function extractLinks(source) {
  const links = [];
  const patterns = [
    /!?\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/gu,
    /\b(?:href|to)\s*=\s*["']([^"']+)["']/gu,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      links.push({ target: match[1], index: match.index ?? 0 });
    }
  }

  return links;
}

function routeFor(path) {
  let route = relative(docsRoot, path).split(sep).join("/");
  route = route.replace(/\.(?:md|mdx)$/u, "");
  route = route.replace(/(?:^|\/)index$/u, "");
  return `/docs${route ? `/${route}` : ""}`;
}

async function validateLinks(path, source, routes) {
  const scanSource = withoutFencedCode(source);

  for (const { target: rawTarget, index } of extractLinks(scanSource)) {
    const line = lineAt(scanSource, index);
    const target = normalizeLinkTarget(rawTarget);

    if (target === "/docs/test" || target.startsWith("/docs/test/")) {
      continue;
    }

    if (target === "/docs" || target.startsWith("/docs/")) {
      if (!routes.has(target)) {
        report(path, `documentation route does not exist: ${rawTarget}`, line);
      }
      continue;
    }

    if (
      !target.startsWith("/") &&
      !/^[a-z][a-z\d+.-]*:/iu.test(target) &&
      markdownExtensions.has(extname(target))
    ) {
      const destination = resolve(dirname(path), target);
      if (!isInside(docsRoot, destination) || !(await exists(destination))) {
        report(path, `relative Markdown link does not exist: ${rawTarget}`, line);
      }
    }
  }
}

function validatePlaceholderRoute(path, source) {
  const match = /\/docs\/test(?=$|[/?#"'()\s<>{}])/mu.exec(source);
  if (match) {
    report(
      path,
      'placeholder route "/docs/test" must be removed',
      lineAt(source, match.index),
    );
  }
}

function validateImports(path, source) {
  const pattern =
    /import\s*\{[^}]*\bAponiaFactory\b[^}]*\}\s*from\s*["']@aponiajs\/core["']/gsu;

  for (const match of source.matchAll(pattern)) {
    report(
      path,
      'AponiaFactory must not be imported from "@aponiajs/core"',
      lineAt(source, match.index),
    );
  }
}

function shellCommands(source) {
  const lines = source.split(/\r?\n/u);
  const commands = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (!/\bbun\s+add\b/u.test(lines[index])) continue;

    const start = index;
    const command = [lines[index]];
    while (/\\\s*$/u.test(lines[index]) && index + 1 < lines.length) {
      index += 1;
      command.push(lines[index]);
    }

    let heading = "";
    for (let headingIndex = start; headingIndex >= 0; headingIndex -= 1) {
      const match = lines[headingIndex].match(/^#{1,6}\s+(.+?)\s*#*\s*$/u);
      if (match) {
        heading = match[1];
        break;
      }
    }

    commands.push({
      value: command.join(" "),
      heading,
      line: start + 1,
    });
  }

  return commands;
}

function validateHttpInstalls(path, source) {
  const hasHttpSignals =
    /\bAponiaFactory\b|@Controller\b|@aponiajs\/platform-|(?:^|\W)Elysia(?:\W|$)|\bHTTP\b|\.listen\s*\(/imu.test(
      source,
    );
  const pageIsExplicitlyNonHttp =
    /^title\s*:\s*.*\b(?:standalone|low[- ]level core)\b/im.test(source) ||
    /^description\s*:\s*.*\bwithout (?:HTTP|Elysia)\b/im.test(source);

  if (!hasHttpSignals || pageIsExplicitlyNonHttp) return;

  for (const command of shellCommands(source)) {
    const isExplicitlyNonHttp =
      /\b(?:standalone|low[- ]level|core(?:\s+(?:runtime|package|api))?)\b/iu.test(
        command.heading,
      );
    const installsRuntimePackage =
      /@aponiajs\/(?:common|core)\b/u.test(command.value) ||
      /(?:^|\s)elysia(?:@|\s|$)/u.test(command.value);
    const installsCliOnly =
      /@aponiajs\/cli\b/u.test(command.value) &&
      !/@aponiajs\/(?:common|core|platform-)\b/u.test(command.value);

    if (
      installsRuntimePackage &&
      !installsCliOnly &&
      !isExplicitlyNonHttp &&
      !/@aponiajs\/platform-[\w-]+\b/u.test(command.value)
    ) {
      report(
        path,
        "HTTP setup install command is missing an @aponiajs/platform-* package",
        command.line,
      );
    }
  }
}

function isMetaDecoration(page) {
  return (
    page === "..." ||
    page === "z...a" ||
    /^---(?:\[[^\]]+\])?.*---$/u.test(page) ||
    /^\(.+\)$/u.test(page) ||
    /^(?:external:)?(?:\[[^\]]+\])?\[[^\]]+\]\([^)]+\)$/u.test(page)
  );
}

async function metaTargetExists(metaPath, page) {
  let target = page;
  if (target.startsWith("!")) target = target.slice(1);

  if (target.startsWith("...")) {
    target = target.slice(3);
  }

  if (!target) return true;

  const basePath = resolve(dirname(metaPath), target);
  if (!isInside(docsRoot, basePath)) return false;

  const candidates = markdownExtensions.has(extname(basePath))
    ? [basePath]
    : [
        basePath,
        `${basePath}.mdx`,
        `${basePath}.md`,
        join(basePath, "index.mdx"),
        join(basePath, "index.md"),
      ];

  for (const candidate of candidates) {
    if (!(await exists(candidate))) continue;
    const candidateStat = await stat(candidate);
    if (candidateStat.isFile() || candidateStat.isDirectory()) return true;
  }

  return false;
}

async function validateMeta(path) {
  let meta;

  try {
    meta = JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    report(path, `invalid JSON: ${error.message}`);
    return;
  }

  if (meta === null || Array.isArray(meta) || typeof meta !== "object") {
    report(path, "navigation metadata must be a JSON object");
    return;
  }

  if (!Object.hasOwn(meta, "pages")) return;
  if (!Array.isArray(meta.pages)) {
    report(path, '"pages" must be an array');
    return;
  }

  for (const [index, page] of meta.pages.entries()) {
    if (typeof page !== "string") {
      report(path, `"pages[${index}]" must be a string`);
      continue;
    }

    if (isMetaDecoration(page)) continue;
    if (!(await metaTargetExists(path, page))) {
      report(path, `"pages[${index}]" refers to a missing page or folder: ${page}`);
    }
  }
}

async function main() {
  if (!(await exists(docsRoot))) {
    console.error(`Documentation directory not found: ${displayPath(docsRoot)}`);
    process.exitCode = 1;
    return;
  }

  const files = await collectFiles(docsRoot);
  const markdownFiles = files.filter((path) =>
    markdownExtensions.has(extname(path)),
  );
  const metaFiles = files.filter((path) => path.endsWith(`${sep}meta.json`));
  const routes = new Map();

  for (const path of markdownFiles) {
    const route = routeFor(path);
    if (routes.has(route)) {
      report(
        path,
        `duplicate documentation route "${route}" (also ${displayPath(routes.get(route))})`,
      );
    } else {
      routes.set(route, path);
    }
  }

  await Promise.all(
    markdownFiles.map(async (path) => {
      const source = await readFile(path, "utf8");
      validateFrontmatter(path, source);
      validateCodeFences(path, source);
      validatePlaceholderRoute(path, source);
      validateImports(path, source);
      validateHttpInstalls(path, source);
      await validateLinks(path, source, routes);
    }),
  );
  await Promise.all(metaFiles.map(validateMeta));

  errors.sort();

  if (errors.length > 0) {
    console.error(`Documentation integrity check failed (${errors.length}):\n`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Documentation integrity check passed (${markdownFiles.length} pages, ${metaFiles.length} navigation files).`,
  );
}

await main();
