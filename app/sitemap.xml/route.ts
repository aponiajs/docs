import { execFileSync } from 'node:child_process';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/site';

export const revalidate = false;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/*
 * The commit date of the page's own source file. A build timestamp would be
 * simpler and would be a lie: every page would claim to have changed on every
 * deploy, which is exactly the signal `lastmod` exists to make trustworthy.
 * Shallow clones and missing history return nothing, and the element is then
 * omitted rather than guessed.
 */
function lastModified(file: string) {
  try {
    const committed = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', file],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();

    return committed || undefined;
  } catch {
    return undefined;
  }
}

/*
 * Priority is relative within one site, so it only has to rank our own pages
 * against each other: landing first, then the documentation root, then the
 * section landing pages that route everything else, then leaf pages.
 */
function priorityFor(url: string) {
  if (url === '/docs') return '0.9';
  return url.split('/').length <= 3 ? '0.8' : '0.6';
}

export function GET() {
  const entries = [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: '1.0',
      lastModified: lastModified('app/(home)/page.tsx'),
    },
    ...source.getPages().map((page) => ({
      url: absoluteUrl(page.url),
      changeFrequency: 'weekly',
      priority: priorityFor(page.url),
      lastModified: lastModified(`content/docs/${page.path}`),
    })),
  ];

  const urls = entries
    .map(
      ({ url, changeFrequency, priority, lastModified: modified }) => `  <url>
    <loc>${escapeXml(url)}</loc>${
      modified ? `\n    <lastmod>${escapeXml(modified)}</lastmod>` : ''
    }
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  );
}
