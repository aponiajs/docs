import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

/*
 * Two optional fields on top of the fumadocs page schema, both consumed only by
 * the metadata layer:
 *
 * `keywords` carries the query vocabulary a page answers for but does not
 * repeat in its prose, and lands in the page `<meta name="keywords">`.
 *
 * `faq` is promoted to FAQPage structured data. Entries have to be answered on
 * the page itself, because the format is a summary of visible content, not a
 * place to put claims the reader never sees.
 */
const docsSchema = pageSchema.extend({
  keywords: z.array(z.string()).optional(),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .optional(),
});

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: docsSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
