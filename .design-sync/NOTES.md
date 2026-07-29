# design-sync notes — aponiajs/docs

## What this repo is

Not a component library. It's the Next.js + fumadocs documentation site, `private: true`,
no `dist/`, no exports. The sync deliberately covers **4 reusable components** plus the
landing visual language; the other nine `components/landing/*` files are zero-prop
page singletons with AponiaJS copy baked in and are excluded via `componentSrcMap: null`.
`components/mdx.tsx` exports camelCase and never matches discovery; `JsonLd` is excluded.

## Build setup (the non-obvious parts)

- **Self-install symlink is required**: `ln -sfn "$PWD" node_modules/docs`. The converter
  resolves `PKG_DIR` as `node_modules/<pkg>`, which npm won't create for the repo itself.
  Gitignored, so **recreate it on every fresh clone** before building.
- **Do NOT pass `--entry`.** In package shape `--entry` is fed straight to the adapter,
  so `--entry ./package.json` bundles package.json as the entry (919 KB of nothing, and
  `window.AponiaJS` ends up holding the parsed manifest). The symlink is the fix; leave
  `--entry` off and let it synthesize from `srcDir`.
- Build runs in synth-entry mode (`[NO_DIST]`). That is expected here and is why
  `dtsPropsFor` exists in the config — see below.
- esbuild's postinstall is blocked by this machine's npm script policy. After
  `npm i` in `.ds-sync/`, run `npm approve-scripts esbuild && npm rebuild esbuild`
  or every build fails on a missing binary.
- Playwright: chromium build **1234** is cached, which pins **playwright 1.62.0**.
  Installing any other version fails with `Executable doesn't exist`.

## Fixes that must not be reverted

- **`.d.ts` props are hand-written** (`cfg.dtsPropsFor`). Synth-entry mode parses zero
  `.d.ts` files, so auto-extraction emits `[key: string]: unknown` for every component —
  useless to the design agent, which codes against `<Name>Props`. The four bodies in the
  config are transcribed from the real source interfaces. **If a component's props change
  in source, update `dtsPropsFor` by hand — nothing will catch the drift.**
- **`next/link` + `next/image` are shimmed** (`.design-sync/shims/`, wired through
  `tsconfig.sync.json` `paths`). The real modules pull Next's client runtime, which reads
  ~15 `process.env.__NEXT_*` values that don't exist outside a Next build; the bundle threw
  `ReferenceError: process is not defined` at load, so nothing reached `window.AponiaJS`
  and all four components failed `[BUNDLE_EXPORT]`.
  `next-image.jsx` also carries a `PUBLIC_ASSETS` map that imports
  `/brand/aponiajs-mark.png`; esbuild inlines the canonical PNG as a data URI because
  absolute public/ paths resolve to nothing in a preview or rendered design.
  **Add an entry there for any new public/ asset a synced component renders.**
- **`tokens/reset.css` substitutes for Tailwind preflight.** `landing.css` is authored
  against preflight, which the app loads via `global.css`'s `@import 'tailwindcss'` — that
  import only resolves inside Next's PostCSS and cannot ship. Without the reset every
  anchor renders with a UA underline the real site doesn't have. It is imported before
  `_ds_bundle.css` so real component rules still win.
- **`tokensGlob` needs `tokensPkg`.** `copyTokens()` returns immediately when `tokensPkg`
  is unset, so the reset was silently dropped until `tokensPkg: "docs"` was added.
  The glob resolves inside `node_modules/docs` — i.e. through the symlink.
- **`cssEntry` must stay `app/(home)/landing.css`.** `app/global.css` cannot be used: it
  opens with `@import 'tailwindcss'` plus two fumadocs presets that only resolve in Next.

## Preview gotchas

- **Do not wrap previews in `.mono-nav-actions`.** landing.css:1801 sets it to
  `display: none` under `@media (max-width: 980px)`, and the `cardMode: column` capture
  viewport is narrower than that — NavigationDropdown captured as pure black. The preview
  now inlines the same flex/font declarations using `var(--mono-code)`.
- `GooeyNav` and `NavigationDropdown` are `cardMode: column` (`[GRID_OVERFLOW]`, and the
  dropdown's second cell was cropping in the grid view).
- `NavigationDropdown`'s **open panel cannot render statically** — `open` is internal
  state driven by click/ArrowDown, with no prop to force it. Only the closed
  trigger is previewed.
- `AponiaLogo context="docs"` is **deliberately not previewed**. It emits
  `.aponia-brand-context`, which has zero occurrences in the shipped CSS — it's styled
  only by `.aponia-docs` in `app/global.css`. A card for it would show unstyled text and
  teach the design agent that unstyled is correct.

## Known render warns

None outstanding. `[GRID_OVERFLOW]` on GooeyNav was resolved by the `cardMode` override;
if it reappears on another component, apply the override the warn names rather than
reworking the preview.

## Findings for the docs repo (not sync problems)

- `public/brand/aponiajs-mark.png` is copied byte-for-byte from the organization profile
  asset at `aponiajs/.github/profile/assets/aponiajs-mark.png`.
- `components/landing/AponiaFlowEffect.tsx:22` hardcodes five hexes (`#b8c58a`, `#8d9b57`,
  `#5e6743`, …) that exist nowhere else in the token layer.
- The `.aponia-brand-context` gap above is a real inconsistency: the landing stylesheet
  styles `.aponia-brand` and `.aponia-brand-mark` but not the context tag the same
  component emits.

## Re-sync risks

- **`dtsPropsFor` silently rots.** It is a hand-maintained copy of four source
  interfaces with no link back to them. Diff the config bodies against
  `components/**/[A-Z]*.tsx` on every re-sync.
- **The shims track Next's API surface.** They drop a fixed list of Next-only props.
  A Next major upgrade can add props that then leak to the DOM as React warnings, or
  change `next/image`'s contract. Re-read them after any `next` version bump.
- **`PUBLIC_ASSETS` is an explicit map of repo assets.** If the canonical logo path
  changes, update both `AponiaLogo` and `next-image.jsx`; esbuild handles the data URI.
- **`reset.css` is an approximation of Tailwind preflight**, not a copy. If landing.css
  starts relying on more preflight behaviour, previews drift from the real site before
  anything fails.
- **Only 4 of ~13 components are synced.** If AponiaJS ever ships a real UI package,
  re-scope rather than extending this config — the current setup exists to work around
  a docs app not being a library.
- The whole build depends on the `node_modules/docs` symlink, which no lockfile records.
