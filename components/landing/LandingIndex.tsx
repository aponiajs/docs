import Link from 'next/link';

const entries = [
  {
    href: '/docs/getting-started',
    label: 'Getting started',
    meta: 'Docs',
    description: 'Install, scaffold, serve.',
  },
  {
    href: '/docs/concepts',
    label: 'Concepts',
    meta: 'Docs',
    description: 'Modules, providers, lifecycle, validation.',
  },
  {
    href: '/docs/benchmark/interpreting-results',
    label: 'Interpreting results',
    meta: 'Docs',
    description: 'Scope, warm state, what a ratio does not prove.',
  },
  {
    href: '/docs/benchmark',
    label: 'Benchmark suite',
    meta: 'Docs',
    description: 'Harness, pinned versions, phases.',
  },
  {
    href: 'https://github.com/aponiajs/aponiajs',
    label: 'Source',
    meta: 'GitHub',
    description: 'Packages, examples, tests.',
    external: true,
  },
] as const;

const entryLink =
  'group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1.5 px-2 py-4 transition-[background-color,padding] duration-150 hover:bg-sunk hover:pl-5 sm:grid-cols-[6rem_minmax(0,1fr)_auto] md:py-6';

export function LandingIndex() {
  return (
    <section id="index" aria-labelledby="index-title">
      <header className="mb-9 grid gap-5 md:mb-14 md:gap-8">
        <p className="mono-tag">
          <b>04</b> Index
        </p>
        <h2
          id="index-title"
          className="max-w-[15ch] text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[0.9] tracking-[-0.055em]"
        >
          Where to go next.
        </h2>
      </header>

      {/* `mono-entries` carries the CSS counter printed before each label. */}
      <ul className="mono-entries grid border-t border-ink">
        {entries.map((entry) => (
          <li key={entry.href} className="border-b border-rule" data-mono-reveal>
            {'external' in entry && entry.external ? (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.label} (opens in a new tab)`}
                className={entryLink}
              >
                <EntryBody {...entry} />
              </a>
            ) : (
              <Link href={entry.href} className={entryLink}>
                <EntryBody {...entry} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function EntryBody({
  label,
  meta,
  description,
}: {
  label: string;
  meta: string;
  description: string;
}) {
  return (
    <>
      <span className="mono-entry-meta col-span-full font-mark text-[0.62rem] tracking-[0.14em] text-ink-faint uppercase sm:col-auto">
        {meta}
      </span>
      <span className="text-[clamp(1.3rem,2.4vw,2rem)] font-medium tracking-[-0.04em] text-ink">
        {label}
      </span>
      <span className="col-span-full max-w-[52ch] text-[0.84rem] leading-[1.5] text-ink-faint sm:col-start-2 sm:col-end-3">
        {description}
      </span>
      <span
        className="col-start-3 row-start-1 hidden font-mark text-rule transition duration-150 group-hover:translate-x-1 group-hover:text-ink sm:block"
        aria-hidden="true"
      >
        →
      </span>
    </>
  );
}
