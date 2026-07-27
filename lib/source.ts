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
