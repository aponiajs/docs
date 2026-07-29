const capabilities = [
  [
    'Modules',
    'Decorated and dynamic modules own their providers and declare what they export.',
  ],
  [
    'Injection',
    'Singleton providers through provideClass, provideValue, provideFactory, and provideAlias.',
  ],
  [
    'Controllers',
    'Decorated classes with request parameter decorators, compiled into Elysia plugins.',
  ],
  [
    'Validation',
    'Standard Schema or platform-native validators; an invalid request answers 422 before the handler runs.',
  ],
  [
    'Composition',
    'Elysia plugin modules resolve through injection and mount with the native .use().',
  ],
  [
    'Tooling',
    'A Bun-native CLI that scaffolds projects and generates modules, controllers, providers, and resources.',
  ],
] as const;

const limits = [
  'ProviderScope contains one member: singleton. Request and transient scopes do not exist.',
  'Provider factories are synchronous. Async providers and lifecycle hooks are not implemented.',
  'The alpha packages publish to the npm alpha channel and the API can change before 1.0.',
] as const;

const references = [
  {
    label: 'NestJS — application structure the authoring model follows',
    href: 'https://docs.nestjs.com',
  },
  {
    label: 'Elysia — the Bun HTTP layer that executes every request',
    href: 'https://elysiajs.com',
  },
  {
    label: 'Bun — runtime, package manager, and test runner',
    href: 'https://bun.sh',
  },
  {
    label: 'Standard Schema — the validation contract route decorators accept',
    href: 'https://standardschema.dev',
  },
] as const;

export function ArchitecturePaper() {
  return (
    <article className="mono-paper">
      <aside className="mono-paper-meta" aria-label="Document metadata">
        <dl>
          <div>
            <dt>Version</dt>
            <dd>0.6.0-alpha.17</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>Bun</dd>
          </div>
          <div>
            <dt>HTTP</dt>
            <dd>Elysia</dd>
          </div>
          <div>
            <dt>Language</dt>
            <dd>TypeScript</dd>
          </div>
          <div>
            <dt>Source license</dt>
            <dd>MIT</dd>
          </div>
          <div>
            <dt>Channel</dt>
            <dd>npm alpha</dd>
          </div>
        </dl>
      </aside>

      <div className="mono-paper-body">
        <p className="mono-paper-abstract">
          AponiaJS asks a narrow question: can the application structure
          developers know from NestJS survive on Bun without adding a second
          HTTP layer underneath it? Modules, decorators, and constructor
          injection stay. Request execution stays on native Elysia.
        </p>

        <section>
          <h3>
            <span aria-hidden="true">01</span> Inspiration
          </h3>
          <p>
            NestJS supplies the authoring model: modules that own their
            providers, decorated controllers, constructor injection, and a CLI
            that generates them. Elysia supplies the execution model, a
            Bun-native HTTP layer that stays deliberately unopinionated about
            how a large application is organised. AponiaJS takes both and
            refuses to put an adapter between them.
          </p>
        </section>

        <section>
          <h3>
            <span aria-hidden="true">02</span> Bootstrap
          </h3>
          <p>
            <code>AponiaFactory.create()</code> compiles decorated and dynamic
            modules into immutable definitions, then validates module identity,
            imports, exports, and provider dependencies. It creates the
            singleton container and one Elysia application, initializes
            providers and imported plugins in dependency order, instantiates
            controllers, and registers the plugins they generate. Structural
            mistakes fail at startup rather than on the first request that
            touches them.
          </p>
        </section>

        <section>
          <h3>
            <span aria-hidden="true">03</span> What the framework provides
          </h3>
          <dl className="mono-paper-list">
            {capabilities.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h3>
            <span aria-hidden="true">04</span> Stated limits
          </h3>
          <ul className="mono-paper-limits">
            {limits.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>
            <span aria-hidden="true">05</span> References
          </h3>
          <ol className="mono-paper-references">
            {references.map(({ label, href }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
