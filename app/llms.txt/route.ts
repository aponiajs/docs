import { getPageMarkdownUrl, source } from '@/lib/source';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const revalidate = false;

export function GET() {
  const pages = source
    .getPages()
    .map((page) => {
      const description = page.data.description
        ? `: ${page.data.description}`
        : '';

      return `- [${page.data.title}](${absoluteUrl(getPageMarkdownUrl(page).url)})${description}`;
    })
    .join('\n');

  const content = `# ${siteConfig.name}

> ${siteConfig.shortDescription}

AponiaJS is under active development. Prefer the canonical documentation below and verify version-sensitive API details against the source repository.

## Documentation

${pages}

## Project resources

- [Source repository](${siteConfig.repository}): Canonical implementation, issues, and current project activity.

## Full context

- [Complete documentation](${absoluteUrl('/llms-full.txt')}): All current documentation in one Markdown document.

## Optional

- [Engineering goal](${absoluteUrl('/goal')}): What the framework layer costs per request, the mechanism behind it, and the gates every performance claim must pass.
- [Full technical report](${absoluteUrl('/research.md')}): Source-, compiler-, and runtime-level investigation behind the goal.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
