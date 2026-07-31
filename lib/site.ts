const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL;

const siteUrl = new URL(configuredSiteUrl ?? 'http://localhost:3000');
const socialImage =
  process.env.NEXT_PUBLIC_OG_IMAGE ?? '/og/docs/image.png';

export const siteConfig = {
  name: 'AponiaJS',
  title: 'AponiaJS | Modular TypeScript framework for Bun',
  description:
    'Modular TypeScript framework for Bun. Modules, controllers, decorators, and constructor injection, with providers resolved at startup and routes registered on a single server instance.',
  shortDescription:
    'Modular TypeScript framework for Bun: modules, controllers, decorators, dependency injection, schema validation, and CLI schematics.',
  url: siteUrl.toString().replace(/\/$/, ''),
  socialImage,
  logo: '/brand/aponiajs-mark.png',
  language: 'en',
  locale: 'en_US',
  repository: 'https://github.com/aponiajs/aponiajs',
  organization: 'https://github.com/aponiajs',
  alternateNames: ['Aponia', 'Aponia.js', 'aponiajs'],
  /*
   * Two vocabularies. The first is what the framework is, the second is what
   * people type when they do not know it exists yet — almost always the name
   * of the framework they already use. Every comparison term here is backed by
   * a real page under /docs/compare; a keyword with nothing behind it is spam.
   */
  keywords: [
    'AponiaJS',
    'Bun framework',
    'Bun TypeScript framework',
    'TypeScript backend framework',
    'TypeScript decorators',
    'dependency injection TypeScript',
    'modular application framework',
    'Standard Schema validation',
    'request parameter decorators',
    'end-to-end typed API client',
    'Bun.serve routing',
    'Bun CLI schematics',
    'Nest-inspired TypeScript framework',
    'singleton provider container',
    'Elysia framework',
    'RFC 9457 Problem Details',
    'WebSocket gateway TypeScript',
    'NestJS alternative',
    'NestJS alternative for Bun',
    'AdonisJS alternative',
    'Express alternative TypeScript',
    'Fastify alternative',
    'Hono alternative',
    'Elysia dependency injection',
  ],
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export const hasConfiguredSiteUrl = configuredSiteUrl !== undefined;
