const plate = [
  ['Release', '0.6.0-alpha.17'],
  ['Runtime', 'Bun'],
  ['Licence', 'MIT'],
] as const;

export function LandingHero() {
  return (
    <section id="top" className="mono-hero" aria-labelledby="hero-title">
      <p className="mono-tag">
        <b>01</b> Framework
      </p>

      <h1 id="hero-title" className="mono-hero-title">
        <span>Modular</span>
        <span>TypeScript</span>
        <span>for Bun.</span>
      </h1>

      <div className="mono-hero-foot">
        <p className="mono-hero-deck">
          Decorated controllers, one server instance. Providers resolve at
          startup, not per request.
        </p>

        <dl className="mono-plate">
          {plate.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
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
