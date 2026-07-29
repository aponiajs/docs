import { AponiaLogo } from 'docs';

// Every .mono-* rule in the shipped stylesheet is descendant-scoped under
// .mono-root — that wrapper is where the tokens, background, and fonts live.
// Without it the component renders in browser defaults.
//
// Only the default `site` context is previewed. `context="docs"` adds a
// .aponia-brand-context tag whose styling lives in the docs shell
// (app/global.css, under `.aponia-docs`), which this design system does not
// ship — so that variant would render as unstyled text here and misrepresent
// how it looks in the docs app.
export function SiteHeader() {
  return (
    <div className="mono-root" style={{ padding: '2.5rem 2rem' }}>
      <span className="mono-nav-logo">
        <AponiaLogo />
      </span>
    </div>
  );
}
