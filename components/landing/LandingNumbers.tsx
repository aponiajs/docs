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
    <section id="numbers" aria-labelledby="numbers-title">
      <header className="mb-9 grid gap-5 md:mb-14 md:gap-8">
        <p className="mono-tag">
          <b>03</b> Record
        </p>
        <h2
          id="numbers-title"
          className="max-w-[15ch] text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[0.9] tracking-[-0.055em]"
        >
          Every number
          <br />
          carries its scope.
        </h2>
      </header>

      <dl className="grid border-t border-ink md:grid-cols-3">
        {figures.map(({ value, unit, label, note }) => (
          <div
            key={label}
            className="grid content-start gap-3.5 border-b border-rule px-4 py-6 md:border-r md:px-7 md:py-9 md:last:border-r-0 md:first:pl-0"
            data-mono-reveal
          >
            <dt className="flex items-baseline gap-1 text-ink tabular-nums">
              <span className="text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[0.85] font-medium tracking-[-0.06em]">
                {value}
              </span>
              <span className="font-mark text-[0.95rem] text-ink-faint">
                {unit}
              </span>
            </dt>
            <dd className="grid gap-1.5">
              <b className="font-mark text-[0.72rem] font-medium tracking-[0.1em] text-ink uppercase">
                {label}
              </b>
              <span className="max-w-[34ch] text-[0.82rem] leading-[1.55] text-ink-faint">
                {note}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-7 max-w-[62ch] border-l border-ink pl-4 text-[0.85rem] leading-[1.6] text-ink-faint text-pretty md:mt-11">
        Archived runs on pinned versions. Not a capacity claim. Method is in the
        benchmark docs.
      </p>
    </section>
  );
}
