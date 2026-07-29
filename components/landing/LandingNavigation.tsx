'use client';

import Link from 'next/link';
import {
  type KeyboardEvent,
  type SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
import { AponiaLogo } from '@/components/brand/AponiaLogo';
import { SectionNav, type SectionNavItem } from './SectionNav';
import {
  NavigationMegaMenu,
  type MegaMenuColumn,
  type MegaMenuFeature,
  type MegaMenuLink,
} from './NavigationMegaMenu';

const sectionLinks: readonly SectionNavItem[] = [
  { href: '#top', label: 'Overview', index: '01' },
  { href: '#principles', label: 'Position', index: '02' },
  { href: '#numbers', label: 'Record', index: '03' },
  { href: '#index', label: 'Index', index: '04' },
  { href: '#start', label: 'Start', index: '05' },
];

const goalFeature: MegaMenuFeature = {
  href: '/goal',
  eyebrow: 'Engineering goal',
  title: 'Compiling Nest-style authoring down to native Elysia speed',
  description:
    'What the framework layer costs today, the Sucrose context escape that generates the cost, the typed route IR that removes it, and the gates every performance claim has to pass.',
  meta: ['28 July 2026', 'Bun 1.3.14 · Elysia 1.4.29'],
};

const goalColumns: MegaMenuColumn[] = [
  {
    label: 'The argument',
    links: [
      {
        href: '/goal#why',
        label: 'The measured gap',
        description: 'Artifact ratios, service proxy, and the overhead budget',
      },
      {
        href: '/goal#mechanism',
        label: 'How the cost is generated',
        description: 'Context escape, the generic binder, and forced asynchrony',
      },
      {
        href: '/goal#design',
        label: 'Typed route IR',
        description: 'Per-route lowering into semantic islands',
      },
      {
        href: '/goal#ceiling',
        label: 'How far it can go',
        description: 'Scoped hypotheses and falsifiable 90–99.5% gates',
      },
    ],
  },
  {
    label: 'Evidence',
    links: [
      {
        href: '/research.md',
        label: 'Full report',
        description: 'Thirteen architectures, hot-path audit, 40 citations',
        staticFile: true,
      },
      {
        href: '/docs/benchmark',
        label: 'Benchmark suite',
        description: 'How the published measurements are produced',
      },
      {
        href: '/docs/benchmark/interpreting-results',
        label: 'Interpreting results',
        description: 'Scope, warm state, and what a ratio does not prove',
      },
    ],
  },
  {
    label: 'Project',
    links: [
      {
        href: 'https://github.com/aponiajs/aponiajs',
        label: 'Source code',
        description: 'Packages, examples, tests, and implementation',
        external: true,
      },
      {
        href: 'https://github.com/aponiajs/aponiajs/tree/main/examples',
        label: 'Examples',
        description: 'Runnable applications for implemented features',
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
    ],
  },
];

const megaFooterLink: MegaMenuLink = {
  href: '/llms.txt',
  label: 'LLM index',
  description: 'Plain-text documentation routes for AI tools',
  staticFile: true,
};

// The mobile sheet lists destinations rather than the deep section anchors the
// desktop panel can afford to show.
const mobileMenuLinks: MegaMenuLink[] = [
  {
    href: '/goal',
    label: 'The goal',
    description: 'Compiling Nest-style authoring to native Elysia speed',
  },
  ...goalColumns
    .flatMap((column) => column.links)
    .filter((link) => !link.href.startsWith('/goal#')),
  megaFooterLink,
];

export function LandingNavigation() {
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(
    () => () => {
      document.documentElement.classList.remove('mono-menu-lock');
    },
    [],
  );

  useEffect(() => {
    const mobileViewport = window.matchMedia('(max-width: 1079px)');

    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) return;

      mobileMenu.current?.removeAttribute('open');
      document.documentElement.classList.remove('mono-menu-lock');
    }

    mobileViewport.addEventListener('change', handleViewportChange);

    return () => {
      mobileViewport.removeEventListener('change', handleViewportChange);
    };
  }, []);

  function closeMobileMenu() {
    mobileMenu.current?.removeAttribute('open');
    document.documentElement.classList.remove('mono-menu-lock');
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== 'Escape') return;

    closeMobileMenu();
    mobileMenu.current?.querySelector('summary')?.focus();
  }

  function handleMobileMenuToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    document.documentElement.classList.toggle(
      'mono-menu-lock',
      event.currentTarget.open,
    );
  }

  function handleMobileNavigate() {
    closeMobileMenu();
  }

  return (
    <header className="mono-bar">
      <Link href="#top" className="mono-bar-mark" aria-label="AponiaJS home">
        <AponiaLogo />
      </Link>

      <SectionNav items={sectionLinks} />

      <div className="mono-bar-actions">
          <NavigationMegaMenu
            label="Goal"
            feature={goalFeature}
            columns={goalColumns}
            note="Every published number carries its scope: pinned versions, execution state, and the caveats that bound it."
            footerLink={megaFooterLink}
          />
        <Link href="/docs" className="mono-bar-docs">
          Docs <span aria-hidden="true">↗</span>
        </Link>

        <details
          ref={mobileMenu}
          className="mono-sheet-toggle"
          onKeyDown={handleMenuKeyDown}
          onToggle={handleMobileMenuToggle}
        >
          <summary>
            <span className="mono-menu-open">Menu</span>
            <span className="mono-menu-close">Close</span>
          </summary>
          <nav aria-label="Mobile landing page">
            <div className="mono-sheet">
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileNavigate}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            <div className="mono-sheet mono-sheet-secondary">
              <Link href="/docs" onClick={closeMobileMenu}>
                Docs <span aria-hidden="true">↗</span>
              </Link>
              {mobileMenuLinks.map((link) =>
                link.external || link.staticFile ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={
                      link.external ? 'noopener noreferrer' : undefined
                    }
                    onClick={closeMobileMenu}
                  >
                    {link.label}{' '}
                    {link.external ? (
                      <span aria-hidden="true">↗</span>
                    ) : null}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
