import Link from 'next/link';

import { CreateProjectCommand } from './CreateProjectCommand';

export function LandingStart() {
  return (
    <section id="start" className="mono-start" aria-labelledby="start-title">
      <p className="mono-tag">
        <b>05</b> Start
      </p>
      <h2 id="start-title">
        One command.
      </h2>
      <CreateProjectCommand />
      <p className="mono-start-note">
        Module graph, a controller, and a test. Serves on Bun.{' '}
        <Link href="/docs">Docs</Link> for the rest.
      </p>
    </section>
  );
}
