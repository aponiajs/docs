import { GooeyNav } from 'docs';

// Section links as the landing page itself uses them
// (components/landing/LandingNavigation.tsx `sectionLinks`).
const sectionLinks = [
  { href: '#top', label: 'Overview' },
  { href: '#work', label: 'Architecture' },
  { href: '#manifesto', label: 'Experience' },
  { href: '#benchmark', label: 'Benchmark' },
  { href: '#namesake', label: 'Namesake' },
];

export function LandingSections() {
  return (
    <div className="mono-root" style={{ padding: '2rem' }}>
      <GooeyNav items={sectionLinks} />
    </div>
  );
}

export function Compact() {
  return (
    <div className="mono-root" style={{ padding: '2rem' }}>
      <GooeyNav
        items={[
          { href: '/docs', label: 'Docs' },
          { href: '/docs/api', label: 'API' },
          { href: '/blog', label: 'Blog' },
        ]}
      />
    </div>
  );
}
