import { siteConfig } from '@/lib/site';

export const revalidate = false;

export function GET() {
  return Response.json({
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.shortDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0908',
    theme_color: '#0a0908',
    lang: siteConfig.language,
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  });
}
