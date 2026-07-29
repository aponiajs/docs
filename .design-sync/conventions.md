# Building with AponiaJS

A dark, square-cornered technical-instrument system: one lime accent on near-black,
Geist Editorial for text and Geist Editorial Mono for every label, `border-radius: 0`
everywhere, and fast linear transitions (`120ms`) rather than easing flourishes.

## Wrap everything in `.mono-root` — nothing is styled without it

Every rule in this system is descendant-scoped under `.mono-root`, and that element
is where the design tokens are declared. A component rendered outside it gets no
background, no accent, and browser-default fonts.

```jsx
<div className="mono-root">
  <span className="mono-nav-logo"><AponiaLogo /></span>
</div>
```

This is the single most common way to render an unstyled page with this system.
Put `.mono-root` at the top of the tree and leave it there.

## Style with tokens and the system's own classes — do not invent class names

There is no utility-class layer here (no `bg-*`, no `p-4`). Layout glue is written
as plain CSS using the tokens below, and structural classes are reused by name.

**Tokens** — all 13 declared on `.mono-root`:

| Token | Role |
|---|---|
| `--mono-bg` | page background, `#0b0c0a` |
| `--mono-surface` / `--mono-surface-raised` | panel fills |
| `--mono-paper` | primary text, `#e9eadf` |
| `--mono-muted` | secondary text, `#9a9c90` |
| `--mono-accent` | the single accent, `#d7ff43` — reserve it for measured values, active state, and one primary action per view |
| `--mono-line` / `--mono-line-strong` | hairline rules; this system separates with 1px rules, not shadows |
| `--mono-display` / `--mono-code` | the two font stacks |
| `--mono-fast` (`120ms linear`) / `--mono-ease` | transitions |
| `--mono-tick` | corner registration-mark size |

**Reusable structural classes**, all present in the shipped CSS:

- `mono-index-rail` — accent-dashed uppercase mono eyebrow above a section
- `mono-tick-frame` — four corner registration marks on framed media
- `mono-paper-abstract` — accent-bordered lead paragraph
- `mono-paper-list` — term/definition rows with hairline separators
- `mono-manifesto-item` — numbered ledger row (`counter-increment`)
- `mono-benchmark-track` — gridded measurement bar
- `mono-work-shell` / `mono-footer-meta` — page gutter and footer meta grid
- `mono-nav-shell` / `mono-nav-logo` / `mono-nav-docs` — nav bar, wordmark slot, primary action
- `mono-skip` / `mono-visually-hidden` — skip link and screen-reader-only text

Labels, metadata, and figures use `--mono-code` with uppercase and `letter-spacing:
0.1em–0.12em`; numbers that share a column get `font-variant-numeric: tabular-nums`.

## Read the real files before styling

`styles.css` and its imports (`tokens/reset.css`, `fonts/fonts.css`, `_ds_bundle.css`)
are the complete truth — `_ds_bundle.css` is the full landing stylesheet, so any class
above can be read there in context. Per-component API is in each `<Name>.d.ts`, usage
in each `<Name>.prompt.md`.

## Two things this system does not ship

- **`AponiaLogo context="docs"`** emits `.aponia-brand-context`, which is styled by the
  docs shell (`.aponia-docs`), not by this stylesheet. Use the default `site` context.
- **`NavigationDropdown`'s open panel** is internal state (click / ArrowDown),
  not a prop — it cannot be forced open from the outside.

## A representative composition

```jsx
<div className="mono-root" style={{ padding: '2.5rem 2rem' }}>
  <p className="mono-index-rail"><b>01</b> Getting started</p>
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem',
                fontFamily: 'var(--mono-code)', fontSize: '0.75rem', fontWeight: 600 }}>
    <NavigationDropdown label="Resources" items={resourceLinks} />
    <a className="mono-nav-docs" href="/docs">Documentation</a>
  </div>
  <div style={{ maxWidth: '26rem', marginTop: '2rem' }}>
    <CreateProjectCommand />
  </div>
</div>
```
