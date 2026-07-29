import { ArchitecturePaper } from './ArchitecturePaper';

export function TrustStrip() {
  return (
    <section id="work" className="mono-work" aria-labelledby="work-title">
      <div className="mono-work-shell">
        <div className="mono-work-heading">
          <p className="mono-index-rail">
            <b>Architecture</b>
          </p>
          <h2 id="work-title">Compile. Initialize. Register.</h2>
          <p>
            AponiaFactory builds a validated module graph, initializes singleton
            providers, mounts native plugins, and registers routes on one Elysia
            instance.
          </p>
        </div>
        <ArchitecturePaper />
      </div>
    </section>
  );
}
