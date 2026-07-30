# AponiaJS documentation site

Source for the AponiaJS website: the landing page and the documentation set. Built with Next.js and fumadocs, rendered as a
static export, deployed to Cloudflare Pages.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, `output: 'export'` |
| Content | fumadocs-mdx, MDX under `content/docs` |
| Styling | Tailwind CSS v4 with tokens declared in `@theme` |
| Runtime | Bun |
| Hosting | Cloudflare Pages via wrangler |

## Getting started

```bash
bun install
bun run dev
```

The site runs at `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL` before a
production build so canonical URLs, the sitemap, and the LLM discovery files
resolve against the real origin.

```bash
NEXT_PUBLIC_SITE_URL=https://aponiajs.dev bun run build
bun run start
```

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Development server |
| `bun run build` | Static export into `out/` |
| `bun run start` | Serve the export through wrangler |
| `bun run lint` | oxlint |
| `bun run types:check` | fumadocs codegen, route typegen, `tsc --noEmit` |
| `bun run docs:check` | Documentation integrity: pages, navigation, links |
| `bun run seo:check` | Canonical URLs, OG and Twitter tags, robots, sitemap, llms files |
| `bun run deploy` | Build, verify SEO output, publish to Cloudflare Pages |

Run `lint`, `types:check`, `docs:check`, and `seo:check` before opening a pull
request. `seo:check` reads the built `out/` directory, so build first.

## Routes

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `app/(home)` | Landing page, five numbered sections |
| `/docs/*` | `content/docs` | Documentation, generated from MDX |
| `/research.md` | `public` | Technical report on framework overhead, served as a static asset |
| `/llms.txt`, `/llms-full.txt` | `app/llms*` | Plain-text discovery for AI tools |

## Design system

One monochrome system across every surface: white stock, black ink, greys for
recession, no hue. Hierarchy comes from size, weight, hairline rules, and
inverted blocks rather than colour.

Tokens live in `@theme` in `app/global.css` and are consumed as Tailwind
utilities: `bg-stock`, `text-ink`, `text-ink-faint`, `border-rule`,
`font-mark`, `ease-editorial`. The documentation additionally reads
`--color-fd-*` variables, which fumadocs requires.

Route stylesheets hold only what utilities cannot express: CSS counters for the
numbering, generated content on rails and cues, keyframes, `:has()` selectors,
and the open-state choreography of the mega menu and the mobile sheet.

## Repository layout

```
app/            routes, layouts, metadata, route handlers
components/     landing sections, navigation, shared brand mark
content/docs/   documentation MDX and navigation manifests
lib/            site config, source adapter, shared helpers
public/         fonts, brand mark, headers, the full report
scripts/        documentation and SEO verification
```

## Contributing

Documentation and site changes follow [CONTRIBUTING.md](./CONTRIBUTING.md).

## Legal independence

**AponiaJS is an independent open-source project. It is not affiliated with,
endorsed by, or sponsored by HoYoverse or ElysiaJS.**

HoYoverse, Honkai Impact 3rd, Aponia, Elysia, ElysiaJS, and all associated
names, characters, trademarks, and logos remain the property of their
respective rights holders. References, compatibility, or package dependencies
do not imply an official relationship, partnership, sponsorship, or
endorsement.
