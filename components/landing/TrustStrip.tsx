import { Braces, Gauge, Workflow } from 'lucide-react';
import { InstallCommand } from './InstallCommand';

const foundations = [
  {
    icon: Gauge,
    title: 'Bun native',
    detail: 'Fast startup and modern runtime APIs',
  },
  {
    icon: Workflow,
    title: 'Elysia powered',
    detail: 'Typed HTTP from route to response',
  },
  {
    icon: Braces,
    title: 'TypeScript first',
    detail: 'Contracts that stay visible',
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Framework foundations" className="foundation-strip">
      <div className="foundation-shell">
        <InstallCommand />
        <div className="foundation-items">
        {foundations.map(({ icon: Icon, title, detail }) => (
          <div
            key={title}
            className="foundation-item"
          >
            <Icon aria-hidden="true" strokeWidth={1.7} />
            <div>
              <p>{title}</p>
              <span>{detail}</span>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
