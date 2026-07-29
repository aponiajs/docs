import Link from 'next/link';

import { CreateProjectCommand } from './CreateProjectCommand';

export function LandingStart() {
  return (
    <section
      id="start"
      className="grid justify-items-start gap-5 md:gap-8"
      aria-labelledby="start-title"
    >
      <p className="mono-tag">
        <b>05</b> Start
      </p>
      <h2
        id="start-title"
        className="text-[clamp(2.75rem,8vw,7rem)] leading-[0.88] tracking-[-0.06em]"
      >
        One command.
      </h2>
      <CreateProjectCommand />
      <p className="max-w-[52ch] text-[0.88rem] leading-[1.6] text-ink-faint">
        Module graph, a controller, and a test. Serves on Bun.{' '}
        <Link
          href="/docs"
          className="border-b border-ink-faint text-ink transition-colors duration-150 hover:border-ink"
        >
          Docs
        </Link>{' '}
        for the rest.
      </p>
    </section>
  );
}
