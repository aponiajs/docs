import {
  Box,
  Braces,
  Cpu,
  Route,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

const disciplines = [
  {
    icon: Cpu,
    title: 'Runtime discipline',
    description:
      'Use Bun and Elysia directly without placing a compatibility layer in the execution path.',
  },
  {
    icon: Box,
    title: 'Module boundaries',
    description:
      'Keep controllers and providers grouped around clear application responsibilities.',
  },
  {
    icon: Braces,
    title: 'Type integrity',
    description:
      'Carry types through injection tokens, metadata, routes, and responses.',
  },
  {
    icon: Route,
    title: 'Deterministic graph',
    description:
      'Detect missing providers, invalid visibility, and dependency cycles before boot.',
  },
  {
    icon: Terminal,
    title: 'Focused tooling',
    description:
      'Generate applications, modules, controllers, and services with Bun-native commands.',
  },
  {
    icon: ShieldCheck,
    title: 'Production direction',
    description:
      'Cover security, observability, testing, and release quality through explicit extension points.',
  },
];

export function FeaturesSection() {
  const groups = [disciplines.slice(0, 3), disciplines.slice(3)];

  return (
    <section className="discipline-section">
      <div className="section-shell discipline-shell">
        <div className="section-intro discipline-intro">
          <h2>One system, clearly composed.</h2>
          <p>
            Every layer exists to keep the application understandable from the
            first provider to the final response.
          </p>
        </div>

        <div className="discipline-columns">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="discipline-column">
              {group.map(({ icon: Icon, title, description }) => (
                <article key={title} className="discipline-item">
                  <div className="discipline-icon">
                    <Icon aria-hidden="true" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
