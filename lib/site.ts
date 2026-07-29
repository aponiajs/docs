const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL;

const siteUrl = new URL(configuredSiteUrl ?? 'http://localhost:3000');
const socialImage = process.env.NEXT_PUBLIC_OG_IMAGE ?? '/og-image.png';

export const siteConfig = {
  name: 'AponiaJS',
  title: 'AponiaJS | TypeScript Framework for Bun and Elysia',
  description:
    'Bun-first TypeScript framework powered by Elysia, with modules, dependency injection, validation, native plugin composition, Eden Treaty types, and CLI schematics.',
  shortDescription:
    'Bun-first TypeScript framework for modular Elysia applications with dependency injection, validation, native plugins, Eden Treaty types, and CLI schematics.',
  url: siteUrl.toString().replace(/\/$/, ''),
  socialImage,
  language: 'en',
  locale: 'en_US',
  repository: 'https://github.com/aponiajs/aponiajs',
  organization: 'https://github.com/aponiajs',
  keywords: [
    'AponiaJS',
    'Bun TypeScript framework',
    'Elysia framework',
    'Elysia dependency injection',
    'TypeScript decorators',
    'modular application framework',
    'Standard Schema validation',
    'request parameter decorators',
    'Elysia plugin composition',
    'Eden Treaty types',
    'Elysia route precompilation',
    'Bun CLI',
    'TypeScript schematics',
    'Nest-inspired TypeScript framework',
  ],
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export const hasConfiguredSiteUrl = configuredSiteUrl !== undefined;
