import { ArchitecturePaper } from './ArchitecturePaper';

export function TrustStrip() {
  return (
    <section id="work" className="mono-work" aria-labelledby="work-title">
      <div className="mono-work-shell">
        <div className="mono-work-heading">
          <p className="mono-index-rail">
            <b>Architecture</b>
          </p>
          <h2 id="work-title">Compile. Initialize. Mount.</h2>
          <p>
            AponiaFactory builds a validated module graph, initializes singleton
            providers, and mounts plugins on one native Elysia instance.
          </p>
        </div>
        <ArchitecturePaper />
      </div>
    </section>
  );
}
