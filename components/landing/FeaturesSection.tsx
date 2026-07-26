import { CreateProjectCommand } from './CreateProjectCommand';

const disciplines = [
  {
    title: 'Compose',
    description:
      'Group controllers and providers around responsibilities that remain clear as the application grows.',
  },
  {
    title: 'Validate',
    description:
      'Resolve visibility, missing providers, and dependency cycles before the application starts.',
  },
  {
    title: 'Run',
    description:
      'Keep Bun and Elysia in the execution path while TypeScript carries contracts from route to response.',
  },
];

const foundation = [
  { label: 'Runtime', value: 'Bun' },
  { label: 'Language', value: 'TypeScript' },
  { label: 'HTTP layer', value: 'Elysia' },
];

export function FeaturesSection() {
  return (
    <section
      id="manifesto"
      className="mono-manifesto"
      aria-labelledby="manifesto-title"
    >
      <div className="mono-manifesto-shell">
        <div className="mono-manifesto-intro">
          <h2 id="manifesto-title">
            We compose, validate, and run.
          </h2>
          <p>
            AponiaJS gives Bun applications a modular structure without hiding
            the runtime that makes them fast.
          </p>
          <CreateProjectCommand />
        </div>

        <dl className="mono-manifesto-meta">
          {foundation.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mono-manifesto-list">
          {disciplines.map(({ title, description }) => (
            <article key={title} className="mono-manifesto-item">
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
