const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL;

if (!rawSiteUrl) {
  console.error(
    'NEXT_PUBLIC_SITE_URL is required before a direct production deployment.',
  );
  process.exit(1);
}

const siteUrl = new URL(rawSiteUrl);

if (siteUrl.protocol !== 'https:') {
  console.error('The production site URL must use HTTPS.');
  process.exit(1);
}

console.log(`Using canonical site URL: ${siteUrl.toString()}`);
