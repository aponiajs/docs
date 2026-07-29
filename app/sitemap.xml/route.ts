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

export function GET() {
  const entries = [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: '1.0',
    },
    {
      url: absoluteUrl('/goal'),
      changeFrequency: 'monthly',
      priority: '0.8',
    },
    ...source.getPages().map((page) => ({
      url: absoluteUrl(page.url),
      changeFrequency: 'weekly',
      priority: page.url === '/docs' ? '0.9' : '0.7',
    })),
  ];

  const urls = entries
    .map(
      ({ url, changeFrequency, priority }) => `  <url>
    <loc>${escapeXml(url)}</loc>
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
