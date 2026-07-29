import { CreateProjectCommand } from './CreateProjectCommand';

const experiencePillars = [
  {
    title: 'Familiar',
    description:
      'Move from NestJS with familiar modules, controllers, decorators, constructor injection, and CLI conventions.',
  },
  {
    title: 'Native',
    description:
      'Decorated routes register directly on Elysia, while statically declared native routes retain Eden types.',
  },
  {
    title: 'Bun-first',
    description:
      'Generate, install, test, and run TypeScript projects with Bun-native commands from the first file.',
  },
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
          <p className="mono-index-rail">
            <b>Developer experience</b>
          </p>
          <h2 id="manifesto-title">
            Familiar. Native. Bun-first.
          </h2>
          <p>
            Keep the application structure you know from NestJS while targeting
            Bun and Elysia with an explicit, lightweight runtime model.
          </p>
          <CreateProjectCommand />
        </div>

        <div className="mono-manifesto-list">
          {experiencePillars.map(({ title, description }) => (
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
