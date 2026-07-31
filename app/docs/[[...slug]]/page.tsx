import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/site';

/*
 * A crawler infers hierarchy from the URL alone unless it is stated. Each
 * ancestor segment is resolved back to its own index page so the trail carries
 * the section's real title rather than a de-slugged guess, and only falls back
 * to the segment when a folder has no index page.
 */
function breadcrumbItems(slugs: readonly string[]) {
  const trail = [
    { name: 'Documentation', url: absoluteUrl('/docs') },
    ...slugs.map((segment, index) => {
      const ancestor = source.getPage(slugs.slice(0, index + 1));

      return {
        name: ancestor?.data.title ?? segment.replace(/-/g, ' '),
        url: absoluteUrl(`/docs/${slugs.slice(0, index + 1).join('/')}`),
      };
    }),
  ];

  return trail.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const imageUrl = getPageImageUrl(page).url;
  const faq = page.data.faq;
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(page.url)}#breadcrumb`,
    itemListElement: breadcrumbItems(page.slugs),
  };
  const faqJsonLd = faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${absoluteUrl(page.url)}#faq`,
        inLanguage: siteConfig.language,
        mainEntity: faq.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: entry.answer,
          },
        })),
      }
    : undefined;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.data.title,
    description: page.data.description,
    url: absoluteUrl(page.url),
    mainEntityOfPage: absoluteUrl(page.url),
    inLanguage: siteConfig.language,
    isPartOf: {
      '@id': absoluteUrl('/#website'),
    },
    author: {
      '@id': absoluteUrl('/#organization'),
    },
    publisher: {
      '@id': absoluteUrl('/#organization'),
    },
    image: absoluteUrl(imageUrl),
    isAccessibleForFree: true,
    breadcrumb: {
      '@id': `${absoluteUrl(page.url)}#breadcrumb`,
    },
    ...(page.data.keywords?.length
      ? { keywords: page.data.keywords.join(', ') }
      : {}),
    about: {
      '@id': absoluteUrl('/#software'),
    },
  };

  return (
    <DocsPage
      toc={
        faq?.length
          ? [
              ...page.data.toc,
              { title: 'Frequently asked questions', url: '#faq', depth: 2 },
            ]
          : page.data.toc
      }
      full={page.data.full}
      className="aponia-docs-page"
    >
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <DocsTitle className="aponia-docs-title">{page.data.title}</DocsTitle>
      <DocsDescription className="aponia-docs-description">
        {page.data.description}
      </DocsDescription>
      <div className="aponia-docs-actions">
        <MarkdownCopyButton
          markdownUrl={markdownUrl}
          className="aponia-docs-action"
        />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
          className="aponia-docs-action"
        />
      </div>
      <DocsBody className="aponia-docs-body">
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
        {faq?.length ? (
          /*
           * Rendered, not just serialised. FAQ structured data is only valid
           * when it summarises content the reader can see, so the frontmatter
           * is the single source for both the markup and the JSON-LD above.
           */
          <section aria-labelledby="faq">
            <h2 id="faq">Frequently asked questions</h2>
            <dl className="grid gap-6">
              {faq.map((entry) => (
                <div key={entry.question} className="grid gap-2">
                  <dt className="font-semibold text-fd-foreground">
                    {entry.question}
                  </dt>
                  <dd className="m-0 text-fd-muted-foreground">
                    {entry.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  /*
   * The root template appends "| AponiaJS". A title that already names the
   * project — "AponiaJS vs NestJS" — would repeat it, and a repeated brand
   * costs characters in a result that is already truncated, so those opt out
   * of the template instead.
   */
  const title = page.data.title.includes(siteConfig.name)
    ? { absolute: page.data.title }
    : page.data.title;

  return {
    title,
    description: page.data.description,
    /*
     * Only page-specific terms. Omitting the field inherits the sitewide list
     * from the root layout, which is the right answer for a page that has
     * nothing of its own to add — repeating one list across sixty pages says
     * nothing about any of them.
     */
    ...(page.data.keywords?.length ? { keywords: [...page.data.keywords] } : {}),
    alternates: {
      canonical: page.url,
      types: {
        'text/markdown': [
          {
            url: getPageMarkdownUrl(page).url,
            title: `${page.data.title} (Markdown)`,
          },
        ],
      },
    },
    openGraph: {
      type: 'article',
      url: page.url,
      siteName: siteConfig.name,
      title: page.data.title,
      description: page.data.description,
      images: [
        {
          url: getPageImageUrl(page).url,
          width: 1200,
          height: 630,
          alt: `${page.data.title} — AponiaJS documentation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [getPageImageUrl(page).url],
    },
  };
}
