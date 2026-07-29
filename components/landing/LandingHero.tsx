const plate = [
  ['Release', '0.6.0-alpha.17'],
  ['Runtime', 'Bun'],
  ['Licence', 'MIT'],
] as const;

export function LandingHero() {
  return (
    <section
      id="top"
      className="relative grid min-h-[calc(100dvh-var(--bar))] content-between gap-10 md:gap-14 lg:gap-18"
      aria-labelledby="hero-title"
    >
      <p className="mono-tag">
        <b>01</b> Framework
      </p>

      <h1
        id="hero-title"
        className="grid text-[clamp(3.4rem,14vw,12rem)] leading-[0.82] tracking-[-0.06em]"
      >
        <span>Modular</span>
        <span>TypeScript</span>
        {/* The last line hangs right so the block is never a flush rectangle. */}
        <span className="justify-self-end text-ink-faint">for Bun.</span>
      </h1>

      <div className="grid gap-7 border-t border-ink pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-11 md:pt-8">
        <p className="max-w-[46ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.55] text-pretty">
          Decorated controllers, one server instance. Providers resolve at
          startup, not per request.
        </p>

        <dl className="grid grid-cols-2 border-t border-l border-rule font-mark tabular-nums md:grid-cols-[repeat(3,minmax(6.5rem,auto))]">
          {plate.map(([label, value]) => (
            <div
              key={label}
              className="border-r border-b border-rule px-3.5 py-2.5"
            >
              <dt className="text-[0.58rem] tracking-[0.16em] text-ink-faint uppercase">
                {label}
              </dt>
              <dd className="mt-1.5 text-[0.78rem] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mono-cue" aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}
