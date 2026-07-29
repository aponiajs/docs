import Link from 'next/link';

import { AponiaLogo } from '@/components/brand/AponiaLogo';

const footerLink =
  'text-ink-faint transition-colors duration-150 hover:text-ink active:translate-y-px';

export function LandingFooter() {
  return (
    <footer className="grid gap-5 bg-stock px-[var(--gutter)] py-10 md:gap-8 md:py-16">
      <Link
        href="#top"
        className="group inline-flex items-center gap-2 justify-self-start text-[clamp(1.4rem,2.8vw,2.2rem)] font-medium tracking-[-0.045em] text-ink"
      >
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-editorial group-hover:-translate-y-1"
        >
          ↑
        </span>{' '}
        Back to top
      </Link>

      <nav
        className="flex flex-wrap gap-x-6 gap-y-1.5 border-t border-rule pt-4 font-mark text-[0.68rem] tracking-[0.1em] uppercase"
        aria-label="Footer"
      >
        <Link href="/docs" className={footerLink}>
          Docs
        </Link>
        <Link href="/goal" className={footerLink}>
          Goal
        </Link>
        <a href="https://github.com/aponiajs/aponiajs" className={footerLink}>
          Source
        </a>
        <a
          href="https://github.com/aponiajs/aponiajs/issues"
          className={footerLink}
        >
          Issues
        </a>
        <a href="https://opensource.org/license/mit" className={footerLink}>
          MIT licence
        </a>
      </nav>

      <p className="max-w-[58ch] text-[0.78rem] leading-[1.55] text-ink-faint">
        Alpha. Interfaces change between releases. Figures are archived runs,
        not guarantees.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5 font-mark text-[0.68rem] tracking-[0.08em] text-ink-faint uppercase">
        <AponiaLogo />
        <p>© 2026 AponiaJS contributors · MIT licence</p>
      </div>
    </footer>
  );
}
