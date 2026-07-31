import { absoluteUrl } from '@/lib/site';

export const revalidate = false;

/*
 * Every crawler is welcome on every route, search and AI alike. There is no
 * per-agent block list, so a bot that did not exist when this file was written
 * is allowed by the wildcard group without an edit, and the Content-Signal
 * policy grants it the same rights it grants a browser.
 */
const contentSignal =
  'Content-Signal: search=yes, ai-input=yes, ai-train=yes, use=reference';

export function GET() {
  const body = [
    'User-agent: *',
    contentSignal,
    'Allow: /',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
