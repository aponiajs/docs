import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { absoluteUrl } from './site';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImageUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: '/' + [page.locale, ...docsImageRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: '/' + [page.locale, ...docsContentRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

function dedent(value: string) {
  const lines = value.split('\n');
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => /^ */u.exec(line)?.[0].length ?? 0);
  const shortest = indents.length > 0 ? Math.min(...indents) : 0;

  return shortest > 0
    ? lines.map((line) => line.slice(shortest)).join('\n')
    : value;
}

/*
 * The comparison components hold their data in props rather than in prose, so
 * the plain-Markdown export has to rebuild it. A page whose entire comparison
 * table vanished from `content.md` would be worse than useless to the AI tools
 * the Markdown route exists for.
 */
const quotedValue = String.raw`'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"`;

function stringField(source: string, name: string) {
  const match = new RegExp(`\\b${name}\\s*:\\s*(?:${quotedValue})`, 'u').exec(
    source,
  );

  return match?.[1] ?? match?.[2];
}

function compareMatrixToMarkdown(props: string) {
  const rowsAt = props.indexOf('rows=');
  const head = rowsAt === -1 ? props : props.slice(0, rowsAt);
  const columnA = /\ba\s*=\s*"([^"]*)"/u.exec(head)?.[1] ?? 'AponiaJS';
  const columnB = /\bb\s*=\s*"([^"]*)"/u.exec(head)?.[1] ?? 'Alternative';

  const cell = (side: string) => {
    const text = stringField(side, 'text') ?? '';
    const status = stringField(side, 'status');

    return status && status !== 'info' ? `${text} (${status})` : text;
  };

  const rows = [
    ...props.matchAll(
      new RegExp(
        `\\{\\s*feature:\\s*(?:${quotedValue})\\s*,\\s*a:\\s*\\{([^}]*)\\}\\s*,\\s*b:\\s*\\{([^}]*)\\}`,
        'gu',
      ),
    ),
  ].map(([, single, double, sideA, sideB]) => {
    const feature = single ?? double ?? '';

    return `| ${feature} | ${cell(sideA)} | ${cell(sideB)} |`;
  });

  if (rows.length === 0) return '';

  return [
    `| Capability | ${columnA} | ${columnB} |`,
    '| --- | --- | --- |',
    ...rows,
  ].join('\n');
}

function frameworkListToMarkdown(props: string) {
  return [...props.matchAll(/\{\s*name:[^}]*\}/gu)]
    .map(([entry]) => {
      const name = stringField(entry, 'name') ?? '';
      const href = stringField(entry, 'href');
      const runtime = stringField(entry, 'runtime');
      const bestFor = stringField(entry, 'bestFor') ?? '';
      const status = /\bstable\s*:\s*true\b/u.test(entry) ? 'Stable' : 'Alpha';
      const label = href ? `[${name}](${absoluteUrl(href)})` : `**${name}**`;

      return `- ${label} (${status}, ${runtime ?? 'unspecified runtime'}): ${bestFor}`;
    })
    .join('\n');
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');
  const cleaned = processed
    .replace(
      /<Callout(?:\s+title="([^"]+)")?[^>]*>/g,
      (_match, title: string | undefined) =>
        title ? `**${title}**\n\n` : '',
    )
    .replace(/<\/Callout>/g, '')
    .replace(/<\/?Cards>/g, '')
    /*
     * Side-by-side comparisons have no layout in plain Markdown, so each side
     * becomes a labelled paragraph followed by its sample. The whole block is
     * consumed at once rather than tag by tag because the nested content is
     * indented, and a fence indented four spaces stops being a fence.
     */
    .replace(/<CodeCompare>([\s\S]*?)<\/CodeCompare>/g, (_match, inner: string) =>
      [
        ...inner.matchAll(
          /<CodeCompareSide\s+([\s\S]*?)>([\s\S]*?)<\/CodeCompareSide>/g,
        ),
      ]
        .map(([, props, body]) => {
          const label = props.match(/label="([^"]+)"/)?.[1] ?? 'Example';
          const note = props.match(/note="([^"]+)"/)?.[1];

          return `**${label}**${note ? ` — ${note}` : ''}\n\n${dedent(body).trim()}`;
        })
        .join('\n\n'),
    )
    .replace(/<CompareMatrix\s+([\s\S]*?)\/>/g, (_match, props: string) =>
      compareMatrixToMarkdown(props),
    )
    .replace(/<FrameworkList\s+([\s\S]*?)\/>/g, (_match, props: string) =>
      frameworkListToMarkdown(props),
    )
    /*
     * Each choice card keeps its heading, and its bullet list is dedented for
     * the same reason the code samples are.
     */
    .replace(/<ChoiceCards>([\s\S]*?)<\/ChoiceCards>/g, (_match, inner: string) =>
      [...inner.matchAll(/<Choice\s+([\s\S]*?)>([\s\S]*?)<\/Choice>/g)]
        .map(([, props, body]) => {
          const title = props.match(/title="([^"]+)"/)?.[1] ?? 'Choose';

          return `**${title}**\n\n${dedent(body).trim()}`;
        })
        .join('\n\n'),
    )
    .replace(/<Verdict>([\s\S]*?)<\/Verdict>/g, (_match, inner: string) =>
      `**Short answer** — ${dedent(inner).trim()}`,
    )
    .replace(/<Card\s+([\s\S]*?)\/>/g, (_match, props: string) => {
      const title = props.match(/title="([^"]+)"/)?.[1] ?? 'Related page';
      const description = props.match(/description="([^"]+)"/)?.[1];
      const href = props.match(/href="([^"]+)"/)?.[1];
      const label = href
        ? `[${title}](${absoluteUrl(href)})`
        : `**${title}**`;

      return `- ${label}${description ? `: ${description}` : ''}`;
    })
    .trim();
  const description = page.data.description
    ? `> ${page.data.description}\n\n`
    : '';
  const markdownUrl = getPageMarkdownUrl(page).url;

  return `# ${page.data.title}

${description}- Canonical: ${absoluteUrl(page.url)}
- Markdown: ${absoluteUrl(markdownUrl)}

${cleaned}`;
}
