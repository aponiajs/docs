const figures = [
  {
    value: '74.57',
    unit: '%',
    label: 'Throughput retained',
    note: 'Archived v0.3.17 run on Bun 1.3.14.',
  },
  {
    value: '0.190',
    unit: 'µs',
    label: 'Added p50',
    note: '0.531 µs baseline, 0.721 µs here.',
  },
  {
    value: '0',
    unit: '',
    label: 'Lookups per request',
    note: 'Singletons captured by the route closure.',
  },
] as const;

export function LandingNumbers() {
  return (
    <section
      id="numbers"
      className="mono-numbers"
      aria-labelledby="numbers-title"
    >
      <header className="mono-head">
        <p className="mono-tag">
          <b>03</b> Record
        </p>
        <h2 id="numbers-title">
          Every number
          <br />
          carries its scope.
        </h2>
      </header>

      <dl className="mono-figures">
        {figures.map(({ value, unit, label, note }) => (
          <div key={label} className="mono-figure" data-mono-reveal>
            <dt>
              <span className="mono-figure-value">{value}</span>
              <span className="mono-figure-unit">{unit}</span>
            </dt>
            <dd>
              <b>{label}</b>
              <span>{note}</span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mono-note">
        Archived runs on pinned versions. Not a capacity claim. Method is in
        the goal paper.
      </p>
    </section>
  );
}
