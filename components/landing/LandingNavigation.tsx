'use client';

import Link from 'next/link';
import { type KeyboardEvent, type SyntheticEvent, useRef } from 'react';
import { GooeyNav } from './GooeyNav';

const sectionLinks = [
  { href: '#top', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#benchmark', label: 'Benchmark' },
  { href: '#namesake', label: 'Namesake' },
];

export function LandingNavigation() {
  const mobileMenu = useRef<HTMLDetailsElement>(null);

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
    <header className="mono-nav">
      <div className="mono-nav-shell">
        <Link
          href="#top"
          className="mono-nav-logo"
          aria-label="AponiaJS home"
        >
          aponiajs
        </Link>

        <div className="mono-nav-primary">
          <GooeyNav items={sectionLinks} />
        </div>

        <div className="mono-nav-actions">
          <a
            href="https://github.com/aponiajs/aponiajs"
            target="_blank"
            rel="noopener noreferrer"
            className="mono-nav-github"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/docs" className="mono-nav-docs">
            Docs <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <details
          ref={mobileMenu}
          className="mono-nav-mobile"
          onKeyDown={handleMenuKeyDown}
          onToggle={handleMobileMenuToggle}
        >
          <summary>
            <span className="mono-menu-open">Menu</span>
            <span className="mono-menu-close">Close</span>
          </summary>
          <nav aria-label="Mobile landing page">
            <div className="mono-mobile-links">
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
            <div className="mono-mobile-actions">
              <Link href="/docs" onClick={closeMobileMenu}>
                Docs <span aria-hidden="true">↗</span>
              </Link>
              <a
                href="https://github.com/aponiajs/aponiajs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
