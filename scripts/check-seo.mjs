import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outputDirectory = resolve('out');
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.CF_PAGES_URL ??
  'http://localhost:3000';
const siteUrl = new URL(configuredSiteUrl);
const baseUrl = siteUrl.toString().replace(/\/$/, '');
const socialImageUrl = new URL(
  process.env.NEXT_PUBLIC_OG_IMAGE ?? '/og/docs/image.png',
  `${baseUrl}/`,
).toString();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readOutput(path) {
  const filePath = resolve(outputDirectory, path);
  assert(existsSync(filePath), `Missing SEO output: out/${path}`);
  return readFileSync(filePath, 'utf8');
}

function listOutputFiles(directory = outputDirectory, prefix = '') {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(
        ...listOutputFiles(resolve(directory, entry.name), relativePath),
      );
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

function markdownLinkTargets(source) {
  return [...source.matchAll(/\]\(([^)]+)\)/gu)].map((match) => match[1]);
}

const requiredFiles = [
  'index.html',
  'docs.html',
  'robots.txt',
  'sitemap.xml',
  'manifest.webmanifest',
  'llms.txt',
  'llms-full.txt',
];

for (const file of requiredFiles) {
  assert(
    existsSync(resolve(outputDirectory, file)),
    `Missing SEO output: out/${file}`,
  );
}

for (const page of ['index.html', 'docs.html']) {
  const html = readOutput(page);
  const expectedImageUrl =
    page === 'docs.html'
      ? new URL('/og/docs/image.png', `${baseUrl}/`).toString()
      : socialImageUrl;

  assert(html.includes('rel="canonical"'), `${page} has no canonical URL`);
  assert(html.includes('property="og:title"'), `${page} has no OG title`);
  assert(
    html.includes(`property="og:image" content="${expectedImageUrl}"`),
    `${page} has the wrong OG image URL`,
  );
  assert(
    html.includes('name="twitter:card"'),
    `${page} has no Twitter card`,
  );
  assert(
    html.includes(`name="twitter:image" content="${expectedImageUrl}"`),
    `${page} has the wrong Twitter image URL`,
  );
  assert(
    html.includes('application/ld+json'),
    `${page} has no structured data`,
  );
}

/*
 * Comparison pages are the entry point for anyone searching by the name of the
 * framework they already use, and they only work if the page states its own
 * subject to a crawler: a title, a keyword set, a breadcrumb trail, and FAQ
 * structured data backed by text that is actually rendered.
 */
const comparisonPages = [
  // Only a title that already names the project opts out of the "| AponiaJS"
  // template, so the hub keeps the suffix and the versus pages do not.
  ['docs/compare.html', 'Compare frameworks | AponiaJS'],
  ['docs/compare/nestjs.html', 'AponiaJS vs NestJS'],
  ['docs/compare/adonisjs.html', 'AponiaJS vs AdonisJS'],
  ['docs/compare/elysia.html', 'AponiaJS vs Elysia'],
  ['docs/compare/express.html', 'AponiaJS vs Express'],
  ['docs/compare/fastify.html', 'AponiaJS vs Fastify'],
  ['docs/compare/hono.html', 'AponiaJS vs Hono'],
];

for (const [page, expectedTitle] of comparisonPages) {
  const html = readOutput(page);

  assert(
    html.includes(`<title>${expectedTitle}</title>`),
    `${page} has the wrong title, expected "${expectedTitle}"`,
  );
  assert(
    html.includes('name="keywords" content="'),
    `${page} has no keyword metadata`,
  );
  assert(
    html.includes('"@type":"BreadcrumbList"'),
    `${page} has no breadcrumb structured data`,
  );
  assert(
    html.includes('"@type":"FAQPage"'),
    `${page} has no FAQ structured data`,
  );
  // FAQ structured data is invalid unless the reader sees the same answers.
  assert(
    html.includes('id="faq"'),
    `${page} declares FAQ structured data without rendering the questions`,
  );
}

const docsHome = readOutput('docs.html');
assert(
  docsHome.includes('/docs/compare'),
  'The documentation index does not link to the comparison pages',
);

const robots = readOutput('robots.txt');
assert(
  robots.includes(
    'Content-Signal: search=yes, ai-input=yes, ai-train=yes, use=reference',
  ),
  'robots.txt is missing the Content-Signal policy',
);
assert(robots.includes('User-agent: *'), 'robots.txt has no wildcard group');
assert(robots.includes('Allow: /'), 'robots.txt does not allow the site root');
// Every crawler is allowed everywhere; a Disallow line is a regression.
assert(
  !robots.includes('Disallow:'),
  'robots.txt blocks a crawler, but every route is meant to be open',
);
assert(
  robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`),
  'robots.txt has the wrong sitemap URL',
);

const sitemap = readOutput('sitemap.xml');
for (const path of [
  '/',
  '/docs',
  '/docs/getting-started',
  '/docs/essentials',
  '/docs/api-reference',
  '/docs/compare',
  '/docs/compare/nestjs',
  '/docs/compare/adonisjs',
]) {
  assert(
    sitemap.includes(`<loc>${baseUrl}${path}</loc>`),
    `sitemap.xml is missing ${path}`,
  );
}
// A `lastmod` on every URL means the git history was unreadable and the dates
// were invented; none at all means the same thing in the other direction.
assert(sitemap.includes('<lastmod>'), 'sitemap.xml has no lastmod dates');

const llms = readOutput('llms.txt');
assert(llms.startsWith('# AponiaJS'), 'llms.txt has the wrong heading');
assert(
  llms.includes(`${baseUrl}/llms-full.txt`),
  'llms.txt is missing the absolute full-context URL',
);
assert(!llms.includes('](/'), 'llms.txt contains relative Markdown links');

if (siteUrl.hostname === 'localhost') {
  console.warn(
    'SEO check used localhost. Set NEXT_PUBLIC_SITE_URL for production builds.',
  );
} else {
  // Documentation prose legitimately shows localhost in commands and request
  // examples, so inspect metadata and generated discovery links rather than
  // every byte of the rendered page and full-context document.
  const htmlPages = listOutputFiles().filter((file) => file.endsWith('.html'));
  const metadataOutputs = [
    ...['robots.txt', 'sitemap.xml', 'manifest.webmanifest'].map(readOutput),
    ...htmlPages.map((page) => {
      const html = readOutput(page);
      const head = /<head[^>]*>([\s\S]*?)<\/head>/u.exec(html)?.[1] ?? '';
      const structuredData = [
        ...html.matchAll(
          /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu,
        ),
      ].map((match) => match[1]);

      return [head, ...structuredData].join('\n');
    }),
    ...markdownLinkTargets(llms),
    ...markdownLinkTargets(readOutput('llms-full.txt')),
  ];
  assert(
    metadataOutputs.every((content) => !content.includes('localhost:3000')),
    'Production discovery metadata contains localhost URLs',
  );
}

console.log(`SEO and AI discovery output is valid for ${baseUrl}`);
