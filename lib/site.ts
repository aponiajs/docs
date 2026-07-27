const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL;

const siteUrl = new URL(configuredSiteUrl ?? 'http://localhost:3000');
const socialImage = process.env.NEXT_PUBLIC_OG_IMAGE ?? '/og-image.png';

export const siteConfig = {
  name: 'AponiaJS',
  title: 'AponiaJS — Modular TypeScript Framework for Bun',
  description:
    'Build structured, type-safe Bun applications with Nest-inspired modules, controllers, providers, dependency injection, and Elysia.',
  shortDescription:
    'A Bun-first, Nest-inspired TypeScript application framework powered by Elysia.',
  url: siteUrl.toString().replace(/\/$/, ''),
  socialImage,
  language: 'en',
  locale: 'en_US',
  repository: 'https://github.com/aponiajs/aponiajs',
  organization: 'https://github.com/aponiajs',
  keywords: [
    'AponiaJS',
    'Bun framework',
    'TypeScript framework',
    'Elysia framework',
    'dependency injection',
    'modular architecture',
    'backend framework',
    'NestJS alternative',
    'Bun server',
  ],
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export const hasConfiguredSiteUrl = configuredSiteUrl !== undefined;
