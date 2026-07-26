const benchmarkSource =
  'https://raw.githubusercontent.com/aponiajs/aponiajs/benchmark-results/elysia-overhead.svg?v=0.3.17';

const latencyMetrics = [
  {
    label: 'Request p50',
    unit: 'µs',
    elysia: '0.531',
    aponia: '0.721',
    note: '+0.190 µs',
  },
  {
    label: 'Request p95',
    unit: 'µs',
    elysia: '0.827',
    aponia: '1.042',
    note: '+0.215 µs',
  },
  {
    label: 'Request p99',
    unit: 'µs',
    elysia: '2.419',
    aponia: '2.710',
    note: '+0.291 µs',
  },
  {
    label: 'Startup p50',
    unit: 'µs',
    elysia: '2.830',
    aponia: '10.154',
    note: '+7.324 µs',
  },
  {
    label: 'Request CV',
    unit: '%',
    elysia: '0.77',
    aponia: '0.67',
    note: '−0.10 pp',
  },
] as const;

export function BenchmarkSection() {
  return (
    <section
      id="benchmark"
      className="mono-benchmark"
      aria-labelledby="benchmark-title"
    >
      <div className="mono-benchmark-shell">
        <header className="mono-benchmark-heading">
          <p className="mono-benchmark-kicker">
            Elysia overhead / v0.3.17
          </p>
          <h2 id="benchmark-title">
            <span>75%</span>
            <span>throughput retained.</span>
          </h2>
          <p>
            Measured against bare Elysia in CI. The framework keeps three
            quarters of baseline throughput while adding its application
            structure.
          </p>
        </header>

        <div className="mono-benchmark-stage">
          <div
            className="mono-benchmark-chart"
            role="img"
            aria-label="Throughput comparison: Elysia 1,598,654 requests per second; Aponia 1,192,128 requests per second"
          >
            <div className="mono-benchmark-chart-head">
              <h3>Throughput</h3>
              <p>Requests/sec · higher is better</p>
            </div>

            <div className="mono-benchmark-bars">
              <div className="mono-benchmark-bar-row">
                <div className="mono-benchmark-bar-meta">
                  <span>Elysia</span>
                  <strong>1,598,654</strong>
                </div>
                <div className="mono-benchmark-track" aria-hidden="true">
                  <span className="mono-benchmark-fill is-elysia" />
                </div>
              </div>
              <div className="mono-benchmark-bar-row">
                <div className="mono-benchmark-bar-meta">
                  <span>Aponia</span>
                  <strong>1,192,128</strong>
                </div>
                <div className="mono-benchmark-track" aria-hidden="true">
                  <span className="mono-benchmark-fill is-aponia" />
                </div>
              </div>
            </div>
          </div>

          <aside className="mono-benchmark-context" aria-label="Test context">
            <p>Test context</p>
            <dl>
              <div>
                <dt>Runtime</dt>
                <dd>Bun 1.3.14</dd>
              </div>
              <div>
                <dt>Trials</dt>
                <dd>6 / CI</dd>
              </div>
              <div>
                <dt>Measured</dt>
                <dd>5,999,976</dd>
              </div>
              <div>
                <dt>Retained</dt>
                <dd>74.57%</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mono-benchmark-latency">
          <div className="mono-benchmark-table-head" aria-hidden="true">
            <span>Metric · lower is better</span>
            <span>Elysia</span>
            <span>Aponia</span>
            <span>Delta</span>
          </div>
          {latencyMetrics.map(({ label, unit, elysia, aponia, note }) => (
            <article className="mono-benchmark-metric" key={label}>
              <h3>
                {label} <span>{unit}</span>
              </h3>
              <p aria-label={`Elysia ${elysia} ${unit}`}>
                <span>Elysia</span>
                <strong>{elysia}</strong>
              </p>
              <p aria-label={`Aponia ${aponia} ${unit}`}>
                <span>Aponia</span>
                <strong>{aponia}</strong>
              </p>
              <p className="mono-benchmark-delta">{note}</p>
            </article>
          ))}
        </div>

        <footer className="mono-benchmark-source">
          <p>
            Results are environment-specific and should be read as measured
            overhead, not a universal performance guarantee.
          </p>
          <a
            href={benchmarkSource}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source benchmark SVG <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
