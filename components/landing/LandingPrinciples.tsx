const principles = [
  {
    title: 'Familiar',
    body: 'Modules, controllers, decorators, constructor injection. The graph is validated before the socket opens.',
    detail: 'Reflection at startup only.',
  },
  {
    title: 'Native',
    body: 'Routes register on the root instance. Native routes and plugins pass through untouched.',
    detail: 'Client types stay end to end.',
  },
  {
    title: 'Bun-first',
    body: 'bun create, bun test, Bun.serve. No Node shim underneath.',
    detail: 'TypeScript 7, no polyfills.',
  },
] as const;

export function LandingPrinciples() {
  return (
    <section
      id="principles"
      className="mono-principles"
      aria-labelledby="principles-title"
    >
      <header className="mono-head">
        <p className="mono-tag">
          <b>02</b> Position
        </p>
        <h2 id="principles-title">
          Familiar. Native.
          <br />
          Bun-first.
        </h2>
      </header>

      <ol className="mono-rows">
        {principles.map(({ title, body, detail }) => (
          <li key={title} className="mono-row" data-mono-reveal>
            <h3>{title}</h3>
            <p>{body}</p>
            <p className="mono-row-detail">{detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
