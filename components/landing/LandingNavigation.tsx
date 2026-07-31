'use client';

import Link from 'next/link';
import {
  type KeyboardEvent,
  type SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
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

const projectFeature: MegaMenuFeature = {
  href: '/docs/getting-started',
  eyebrow: 'Documentation',
  title: 'Modules, controllers, decorators, dependency injection on Bun',
  description: 'Install, scaffold, serve. Implemented features only.',
  meta: ['Bun 1.3.14', 'aponiajs 0.6.0-alpha.18'],
};

const projectColumns: MegaMenuColumn[] = [
  {
    label: 'Docs',
    links: [
      {
        href: '/docs/essentials',
        label: 'Concepts',
        description: 'Modules, providers, lifecycle, validation',
      },
      {
        href: '/docs/api-reference',
        label: 'API reference',
        description: 'Application, decorators, CLI',
      },
      {
        href: '/docs/compare',
        label: 'Compare',
        description: 'NestJS, AdonisJS, Elysia, Express, Fastify, Hono',
      },
      {
        href: '/docs/benchmark',
        label: 'Benchmark',
        description: 'Harness, pinned versions, scope',
      },
    ],
  },
  {
    label: 'Project',
    links: [
      {
        href: 'https://github.com/aponiajs/aponiajs',
        label: 'Source',
        description: 'Packages, examples, tests',
        external: true,
      },
      {
        href: 'https://github.com/aponiajs/aponiajs/blob/main/ROADMAP.md',
        label: 'Roadmap',
        description: 'Milestones and planned work',
        external: true,
      },
      {
        href: 'https://github.com/aponiajs/aponiajs/issues',
        label: 'Issues',
        description: 'Bugs and active work',
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
  ...projectColumns.flatMap((column) => column.links),
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
    const mobileViewport = window.matchMedia('(max-width: 1023px)');

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
      <SectionNav items={sectionLinks} />

      {/* Static positioning: the mega panel anchors to the bar, not to this. */}
      <div className="static flex items-stretch justify-self-end">
        <NavigationMegaMenu
          label="Project"
          feature={projectFeature}
          columns={projectColumns}
          note="Every published number carries its scope."
          footerLink={megaFooterLink}
        />

        <Link
          href="/docs"
          className="hidden items-center gap-1.5 border-l border-rule bg-ink pr-[var(--gutter)] pl-[1.15rem] tracking-[0.1em] text-stock uppercase transition-colors duration-150 hover:bg-ink-soft active:translate-y-px lg:inline-flex"
        >
          Docs <span aria-hidden="true">↗</span>
        </Link>

        <details
          ref={mobileMenu}
          className="mono-sheet-toggle lg:hidden"
          onKeyDown={handleMenuKeyDown}
          onToggle={handleMobileMenuToggle}
        >
          <summary className="inline-flex h-[var(--bar)] cursor-pointer list-none items-center border-l border-rule pr-[var(--gutter)] pl-4 text-[0.7rem] tracking-[0.1em] text-ink uppercase">
            <span className="mono-menu-open">Menu</span>
            <span className="mono-menu-close">Close</span>
          </summary>
          <nav
            className="fixed inset-x-0 top-[var(--bar)] bottom-0 overflow-y-auto overscroll-contain bg-stock px-[var(--gutter)] pb-12"
            aria-label="Mobile landing page"
          >
            <div className="grid">
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileNavigate}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-4 text-[1.45rem] font-medium tracking-[-0.04em] text-ink active:translate-y-px"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="font-mark text-[0.7rem] text-rule">
                    {link.index}
                  </span>
                </Link>
              ))}
            </div>
            <div className="grid">
              <Link
                href="/docs"
                onClick={closeMobileMenu}
                className="border-b border-rule py-3.5 font-mark text-[0.78rem] tracking-[0.06em] text-ink uppercase active:translate-y-px"
              >
                Docs <span aria-hidden="true">↗</span>
              </Link>
              {mobileMenuLinks.map((link) =>
                link.external || link.staticFile ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={closeMobileMenu}
                    className="border-b border-rule py-3.5 font-mark text-[0.78rem] tracking-[0.06em] text-ink-faint uppercase active:translate-y-px"
                  >
                    {link.label}{' '}
                    {link.external ? <span aria-hidden="true">↗</span> : null}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="border-b border-rule py-3.5 font-mark text-[0.78rem] tracking-[0.06em] text-ink-faint uppercase active:translate-y-px"
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
