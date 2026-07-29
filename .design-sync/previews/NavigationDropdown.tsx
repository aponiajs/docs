import { NavigationDropdown } from 'docs';
import Link from 'next/link';

// Resource links as the landing page itself uses them
// (components/landing/LandingNavigation.tsx `resourceLinks`).
const resourceLinks = [
  {
    href: 'https://github.com/aponiajs/aponiajs',
    label: 'Source code',
    description: 'Packages, examples, tests, and implementation',
    external: true,
  },
  {
    href: 'https://github.com/aponiajs/aponiajs/tree/main/examples',
    label: 'Examples',
    description: 'Runnable applications for implemented framework features',
    external: true,
  },
  {
    href: 'https://github.com/aponiajs/aponiajs/blob/main/ROADMAP.md',
    label: 'Roadmap',
    description: 'Current milestones, evidence, and planned capabilities',
    external: true,
  },
  {
    href: 'https://github.com/aponiajs/aponiajs/issues',
    label: 'Issue tracker',
    description: 'Bugs, feature requests, and active work',
    external: true,
  },
  {
    href: '/llms.txt',
    label: 'LLM index',
    description: 'Plain-text documentation routes for AI tools',
    staticFile: true,
  },
];

// The trigger uses `font: inherit`, so it needs a styled ancestor. The real
// navigation bar supplies that via .mono-nav-actions — but that class is
// display:none under `@media (max-width: 980px)`, which blanks the card at
// narrow preview widths. These are the same declarations, via DS tokens.
const navActions: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
  fontFamily: 'var(--mono-code)',
  fontSize: '0.75rem',
  fontWeight: 600,
};

// The panel opens from internal state (click / ArrowDown), not a prop,
// so only the closed trigger renders statically.
export function Closed() {
  return (
    <div className="mono-root" style={{ padding: '2rem', minHeight: '7rem' }}>
      <div style={navActions}>
        <NavigationDropdown label="Resources" items={resourceLinks} />
      </div>
    </div>
  );
}

export function AlongsideDocsAction() {
  return (
    <div className="mono-root" style={{ padding: '2rem', minHeight: '7rem' }}>
      <div style={navActions}>
        <NavigationDropdown label="Resources" items={resourceLinks} />
        <Link className="mono-nav-docs" href="/docs">
          Documentation
        </Link>
      </div>
    </div>
  );
}
