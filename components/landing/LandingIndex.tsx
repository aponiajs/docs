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
    href: '/goal',
    label: 'The goal',
    meta: 'Paper',
    description: 'What the layer costs, and what compiles away.',
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

export function LandingIndex() {
  return (
    <section id="index" className="mono-index" aria-labelledby="index-title">
      <header className="mono-head">
        <p className="mono-tag">
          <b>04</b> Index
        </p>
        <h2 id="index-title">Where to go next.</h2>
      </header>

      <ul className="mono-entries">
        {entries.map((entry) => (
          <li key={entry.href} data-mono-reveal>
            {'external' in entry && entry.external ? (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.label} (opens in a new tab)`}
              >
                <EntryBody {...entry} />
              </a>
            ) : (
              <Link href={entry.href}>
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
      <span className="mono-entry-meta">{meta}</span>
      <span className="mono-entry-label">{label}</span>
      <span className="mono-entry-description">{description}</span>
      <span className="mono-entry-arrow" aria-hidden="true">
        →
      </span>
    </>
  );
}
