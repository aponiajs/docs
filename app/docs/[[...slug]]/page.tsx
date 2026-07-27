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

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const imageUrl = getPageImageUrl(page).url;
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
  };

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      className="aponia-docs-page"
    >
      <JsonLd data={articleJsonLd} />
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

  return {
    title: page.data.title,
    description: page.data.description,
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
