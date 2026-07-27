import { getLLMText, source } from '@/lib/source';
import { siteConfig } from '@/lib/site';

export const revalidate = false;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  const introduction = `# ${siteConfig.name} — Complete documentation

> ${siteConfig.shortDescription}

AponiaJS is under active development. The canonical source repository is ${siteConfig.repository}.
`;

  return new Response(`${introduction}\n${scanned.join('\n\n---\n\n')}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
