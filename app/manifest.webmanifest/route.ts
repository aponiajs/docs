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
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: siteConfig.language,
    icons: [
      {
        src: siteConfig.logo,
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  });
}
