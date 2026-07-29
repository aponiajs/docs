import Link from 'next/link';

const action =
  'inline-flex min-h-12 items-center gap-1.5 border-r border-b border-ink/25 px-[1.15rem] text-ink-faint transition-colors duration-150 hover:bg-sunk hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink active:translate-y-px';

export default function NotFound() {
  return (
    <main className="aponia-404 grid min-h-[100dvh] flex-1 items-center font-face text-ink">
      <div className="mx-auto w-[min(100%-3.5rem,68rem)] py-20 md:py-32">
        <p className="flex items-center gap-2.5 font-mark text-[0.6rem] tracking-[0.12em] tabular-nums text-ink-faint uppercase before:h-px before:w-7 before:flex-none before:bg-ink before:content-['']">
          <b className="font-medium text-ink">Error 404</b> Route not resolved
        </p>

        <h1 className="mt-7 max-w-[14ch] text-[clamp(3rem,8vw,7rem)] leading-[0.86] font-normal tracking-[-0.07em] text-balance md:mt-11">
          Nothing is mounted at this path.
        </h1>

        <p className="mt-6 max-w-[34rem] text-[0.95rem] leading-[1.6] text-ink-faint text-pretty md:mt-9">
          The page was moved, renamed, or never existed. The documentation index
          below lists every route the site currently serves.
        </p>

        <nav
          className="mt-10 flex flex-wrap border-t border-l border-ink/25 font-mark text-[0.72rem] md:mt-14"
          aria-label="Recovery links"
        >
          <Link href="/" className={`${action} text-ink`}>
            Back to home
          </Link>
          <Link href="/docs" className={action}>
            Documentation
          </Link>
          <a
            href="https://github.com/aponiajs/aponiajs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className={action}
          >
            Report a broken link <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </main>
  );
}
