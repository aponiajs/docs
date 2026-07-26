# docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Install dependencies and run the development server:

```bash
bun install
bun run dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs

## Branch and delivery workflow

- `main` contains production-ready documentation and creates the standalone
  delivery artifact.
- `develop` is the integration branch for approved feature and content work.
- Create `feature/*` and `fix/*` branches from `develop`, then open a pull
  request back into `develop`.
- Promote a tested release from `develop` to `main` with a pull request.

GitHub Actions runs lint, type checking, and the production build on both
branches. Every push to `main` also creates a standalone Next.js artifact that
can run on a Node-compatible host with `node server.js`.
