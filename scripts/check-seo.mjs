import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outputDirectory = resolve('out');
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.CF_PAGES_URL ??
  'http://localhost:3000';
const siteUrl = new URL(configuredSiteUrl);
const baseUrl = siteUrl.toString().replace(/\/$/, '');
const socialImageUrl = new URL(
  process.env.NEXT_PUBLIC_OG_IMAGE ?? '/og/docs/image.png',
  `${baseUrl}/`,
).toString();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readOutput(path) {
  const filePath = resolve(outputDirectory, path);
  assert(existsSync(filePath), `Missing SEO output: out/${path}`);
  return readFileSync(filePath, 'utf8');
}

function listOutputFiles(directory = outputDirectory, prefix = '') {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(
        ...listOutputFiles(resolve(directory, entry.name), relativePath),
      );
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

function markdownLinkTargets(source) {
  return [...source.matchAll(/\]\(([^)]+)\)/gu)].map((match) => match[1]);
}

const requiredFiles = [
  'index.html',
  'docs.html',
  'robots.txt',
  'sitemap.xml',
  'manifest.webmanifest',
  'llms.txt',
  'llms-full.txt',
];

for (const file of requiredFiles) {
  assert(
    existsSync(resolve(outputDirectory, file)),
    `Missing SEO output: out/${file}`,
  );
}

for (const page of ['index.html', 'docs.html']) {
  const html = readOutput(page);
  const expectedImageUrl =
    page === 'index.html'
      ? socialImageUrl
      : new URL('/og/docs/image.png', `${baseUrl}/`).toString();

  assert(html.includes('rel="canonical"'), `${page} has no canonical URL`);
  assert(html.includes('property="og:title"'), `${page} has no OG title`);
  assert(
    html.includes(`property="og:image" content="${expectedImageUrl}"`),
    `${page} has the wrong OG image URL`,
  );
  assert(
    html.includes('name="twitter:card"'),
    `${page} has no Twitter card`,
  );
  assert(
    html.includes(`name="twitter:image" content="${expectedImageUrl}"`),
    `${page} has the wrong Twitter image URL`,
  );
  assert(
    html.includes('application/ld+json'),
    `${page} has no structured data`,
  );
}

const robots = readOutput('robots.txt');
assert(
  robots.includes(
    'Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference',
  ),
  'robots.txt is missing the Content-Signal policy',
);
for (const agent of [
  'OAI-SearchBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'GPTBot',
  'ClaudeBot',
]) {
  assert(robots.includes(`User-agent: ${agent}`), `Missing ${agent} rule`);
}
assert(
  robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`),
  'robots.txt has the wrong sitemap URL',
);

const sitemap = readOutput('sitemap.xml');
for (const path of [
  '/',
  '/docs',
  '/docs/getting-started',
  '/docs/concepts',
  '/docs/api-reference',
]) {
  assert(
    sitemap.includes(`<loc>${baseUrl}${path}</loc>`),
    `sitemap.xml is missing ${path}`,
  );
}

const llms = readOutput('llms.txt');
assert(llms.startsWith('# AponiaJS'), 'llms.txt has the wrong heading');
assert(
  llms.includes(`${baseUrl}/llms-full.txt`),
  'llms.txt is missing the absolute full-context URL',
);
assert(!llms.includes('](/'), 'llms.txt contains relative Markdown links');

if (siteUrl.hostname === 'localhost') {
  console.warn(
    'SEO check used localhost. Set NEXT_PUBLIC_SITE_URL for production builds.',
  );
} else {
  // Documentation prose legitimately shows localhost in commands and request
  // examples, so inspect metadata and generated discovery links rather than
  // every byte of the rendered page and full-context document.
  const htmlPages = listOutputFiles().filter((file) => file.endsWith('.html'));
  const metadataOutputs = [
    ...['robots.txt', 'sitemap.xml', 'manifest.webmanifest'].map(readOutput),
    ...htmlPages.map((page) => {
      const html = readOutput(page);
      const head = /<head[^>]*>([\s\S]*?)<\/head>/u.exec(html)?.[1] ?? '';
      const structuredData = [
        ...html.matchAll(
          /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu,
        ),
      ].map((match) => match[1]);

      return [head, ...structuredData].join('\n');
    }),
    ...markdownLinkTargets(llms),
    ...markdownLinkTargets(readOutput('llms-full.txt')),
  ];
  assert(
    metadataOutputs.every((content) => !content.includes('localhost:3000')),
    'Production discovery metadata contains localhost URLs',
  );
}

console.log(`SEO and AI discovery output is valid for ${baseUrl}`);
