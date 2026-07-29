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
    <section id="principles" aria-labelledby="principles-title">
      <header className="mb-9 grid gap-5 md:mb-14 md:gap-8">
        <p className="mono-tag">
          <b>02</b> Position
        </p>
        <h2
          id="principles-title"
          className="max-w-[15ch] text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[0.9] tracking-[-0.055em]"
        >
          Familiar. Native.
          <br />
          Bun-first.
        </h2>
      </header>

      {/* `mono-rows` and `mono-row` carry the CSS counter that numbers rows. */}
      <ol className="mono-rows grid border-t border-ink">
        {principles.map(({ title, body, detail }) => (
          <li
            key={title}
            className="mono-row grid gap-x-6 gap-y-3 border-b border-rule py-6 transition-colors duration-150 hover:bg-sunk md:grid-cols-[3.5rem_minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,0.65fr)] md:items-baseline md:gap-x-12 md:py-10"
            data-mono-reveal
          >
            <h3 className="text-[clamp(2rem,4vw,3.75rem)] leading-[0.88] tracking-[-0.055em]">
              {title}
            </h3>
            <p className="max-w-[42ch] text-[0.92rem] leading-[1.6] text-pretty">
              {body}
            </p>
            <p className="font-mark text-[0.72rem] leading-[1.5] text-ink-faint">
              {detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
