import { CreateProjectCommand } from 'docs';

// .project-command is scoped as `.mono-root .project-command` — the wrapper is
// required. On the landing page it sits in a 12-column grid at `grid-column: 9 / -1`;
// standalone it stretches, so the max-width here stands in for that column.
export function Default() {
  return (
    <div className="mono-root" style={{ padding: '2.5rem 2rem' }}>
      <div style={{ maxWidth: '26rem' }}>
        <CreateProjectCommand />
      </div>
    </div>
  );
}
