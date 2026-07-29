import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/site';
import {
  PaperOutline,
  PaperReveal,
  type OutlineEntry,
} from './PaperOutline';

const paper = {
  title: 'Compiling Nest-style authoring down to native Elysia speed',
  deck:
    'AponiaJS keeps modules, controllers, decorators, and dependency injection. Elysia keeps the request engine. This is the goal that composition is being driven toward, stated with its evidence: what the layer costs today, where the cost is generated, how much of it a compiler can remove, and which claims we refuse to make until a controlled benchmark passes.',
  published: '28 July 2026',
  revised: '29 July 2026',
} as const;

export const metadata: Metadata = {
  title: 'Goal: compiling Nest-style authoring to native Elysia speed',
  description:
    'The engineering goal of AponiaJS, stated with evidence: what the framework layer costs on Elysia and Bun today, the mechanism that generates the cost, the typed route IR that removes it, and the ceiling it can reach.',
  alternates: {
    canonical: '/goal',
    types: {
      'text/markdown': [
        {
          url: '/research.md',
          title: 'Full technical report (Markdown)',
        },
      ],
    },
  },
  openGraph: {
    type: 'article',
    url: '/goal',
    title: 'AponiaJS goal: compiling Nest-style authoring to native Elysia speed',
    description:
      'Measured overhead, the Sucrose context-escape mechanism that generates it, a typed route IR with per-route semantic islands, and the falsifiable gates that decide how far the compiler can go.',
    publishedTime: '2026-07-28',
    modifiedTime: '2026-07-29',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: 'AponiaJS engineering goal, stated with evidence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AponiaJS goal: compiling Nest-style authoring to native Elysia speed',
    description:
      'What AponiaJS costs on Bun and Elysia today, why it costs it, and how much a compiler can give back.',
    images: [siteConfig.socialImage],
  },
};

const outline: readonly OutlineEntry[] = [
  { id: 'what', label: 'What we are building' },
  { id: 'why', label: 'Why: the measured gap' },
  { id: 'mechanism', label: 'How the cost is generated' },
  { id: 'design', label: 'How we remove it' },
  { id: 'ceiling', label: 'How far it can go' },
  { id: 'program', label: 'Programme of work' },
  { id: 'limits', label: 'Limits and falsifiers' },
  { id: 'references', label: 'References' },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  '@id': absoluteUrl('/goal#article'),
  headline: paper.title,
  description: metadata.description,
  datePublished: '2026-07-28',
  dateModified: '2026-07-29',
  inLanguage: siteConfig.language,
  url: absoluteUrl('/goal'),
  isAccessibleForFree: true,
  license: 'https://opensource.org/license/mit',
  author: {
    '@type': 'Organization',
    name: 'AponiaJS contributors',
    url: siteConfig.organization,
  },
  publisher: {
    '@id': absoluteUrl('/#organization'),
  },
  about: [
    'Web framework performance',
    'Ahead-of-time compilation',
    'Elysia',
    'Bun',
    'JavaScriptCore',
  ],
  citation: [
    'https://elysiajs.com/internal/jit-compiler',
    'https://docs.webkit.org/Deep%20Dive/JSC/JavaScriptCore.html',
    'https://bun.com/docs/runtime/http/routing',
  ],
};

const workloads = [
  {
    name: 'Ping',
    elysia: '120,108.28',
    aponia: '49,432.10',
    ratio: 41.16,
    proxy: '8.33 / 20.23',
  },
  {
    name: 'Query',
    elysia: '79,669.33',
    aponia: '55,499.38',
    ratio: 69.66,
    proxy: '12.55 / 18.02',
  },
  {
    name: 'Body',
    elysia: '73,032.16',
    aponia: '44,911.91',
    ratio: 61.5,
    proxy: '13.69 / 22.27',
  },
  {
    name: 'Video',
    elysia: '527.47',
    aponia: '499.71',
    ratio: 94.74,
    proxy: '1,895.84 / 2,001.16',
  },
] as const;

const paperBarLink =
  'border-b border-transparent text-ink-faint transition-colors duration-150 hover:border-ink hover:text-ink';

export default function GoalPage() {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <a href="#paper-body" className="paper-skip">
        Skip to the paper
      </a>
      <div className="paper-root">
        {/* Without JavaScript nothing observes the reveal state, so unhide. */}
        <noscript>
          <style>{
            '[data-reveal]{opacity:1 !important;transform:none !important}.paper-bar-fill{transform:scaleX(1) !important}'
          }</style>
        </noscript>

        <div className="paper-grain" aria-hidden="true" />
        <div id="paper-progress" className="paper-progress" aria-hidden="true" />
        <PaperReveal />

        <header className="sticky top-0 z-40 grid grid-cols-[auto_1fr] items-center gap-4 border-b border-ink bg-stock/90 px-[var(--paper-gutter)] py-2.5 font-mark text-[0.7rem] tracking-[0.08em] uppercase backdrop-blur-md">
          <Link
            href="/"
            className="inline-flex items-baseline gap-2 border-b border-transparent font-semibold text-ink"
          >
            AponiaJS <span className="text-ink-faint">Goal</span>
          </Link>
          <nav
            className="flex items-center justify-self-end gap-3 md:gap-6"
            aria-label="Paper links"
          >
            <Link href="/docs" className={paperBarLink}>
              Docs
            </Link>
            {/* The report is a static Markdown asset, not a route. */}
            {/* oxlint-disable-next-line next/no-html-link-for-pages */}
            <a href="/research.md" className={paperBarLink}>
              Report
            </a>
            <a href={siteConfig.repository} className={paperBarLink}>
              Source
            </a>
          </nav>
        </header>

        <div className="grid gap-8 px-[var(--paper-gutter)] pt-12 pb-8 md:grid-cols-[minmax(0,1fr)_17rem] md:items-end md:gap-14 md:pt-26 md:pb-12">
          <div>
            <p className="paper-eyebrow">
              Engineering goal, stated with evidence
            </p>
            <h1 className="paper-title">
              Compiling Nest-style authoring down to <em>native Elysia speed</em>
            </h1>
            <p className="paper-deck">{paper.deck}</p>
          </div>

          <aside className="grid gap-4 border-t border-ink pt-5 font-face text-[0.84rem] text-ink-soft [&_b]:mb-0.5 [&_b]:block [&_b]:font-mark [&_b]:text-[0.66rem] [&_b]:font-medium [&_b]:tracking-[0.16em] [&_b]:text-ink-faint [&_b]:uppercase [&_p]:m-0">
            <p>
              <b>Authors</b>
              AponiaJS contributors
            </p>
            <p>
              <b>Published</b>
              {paper.published}, revised {paper.revised}
            </p>
            <p>
              <b>Status</b>
              Open investigation, claims unsettled
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['aponiajs 0.6.0-alpha.14', 'elysia 1.4.29', 'bun 1.3.14'].map(
                (pin) => (
                  <span
                    key={pin}
                    className="border border-rule-soft px-2 py-1 font-mark text-[0.68rem] text-ink-soft"
                  >
                    {pin}
                  </span>
                ),
              )}
            </div>
          </aside>
        </div>

        <div className="paper-layout">
          <main id="paper-body" className="paper-column">
              <section
                className="paper-abstract"
                aria-labelledby="abstract-title"
                data-reveal
              >
                <h2 id="abstract-title">The goal, in one paragraph</h2>
                <p>
                  AponiaJS is an authoring and application compiler layered above
                  Elysia. The goal is to keep every Nest-style ergonomic and give
                  back the throughput they currently cost, and the question that
                  decides whether it is reachable is narrow and falsifiable: how
                  much does the layer cost today, which mechanism produces the
                  cost, and what is the highest ratio against hand-written Elysia
                  that an architecture-compatible compiler can defensibly reach.
                </p>
                <p>
                  <span className="paper-tag" data-kind="measured">
                    Measured
                  </span>
                  In the supplied four-workload artifact, AponiaJS reaches 41.16%
                  of Elysia-AOT throughput on Ping, 69.66% on Query, 61.50% on
                  Body, and 94.74% on Video. The artifact carries no hardware,
                  concurrency, latency, allocation, or variance metadata, so those
                  four numbers bound what may be claimed and nothing else.
                </p>
                <p>
                  <span className="paper-tag" data-kind="derived">
                    Derived
                  </span>
                  The dominant fast-route loss is not dependency injection and not
                  routing. It is one line in the decorated-controller adapter that
                  passes the whole request context into a helper, which trips
                  Elysia Sucrose conservative context-escape rule and makes the
                  framework generate query, header, cookie, response-state, and
                  asynchronous code that a direct route omits.
                </p>
                <p>
                  <span className="paper-tag" data-kind="hypothesis">
                    Hypothesis
                  </span>
                  Route-specific generated adapters should make 90–95% realistic on
                  a warmed synchronous route; a build-time descriptor plus public
                  Elysia composition makes 95–98.5% plausible; consistent 99% on a
                  trivial route requires near code-shape identity and remains
                  unproven. Static and native islands can be operationally
                  identical.
                </p>
              </section>

              <section id="what" className="paper-section">
                <h2>What we are building</h2>

                <p className="paper-lede">
                  AponiaJS gives Bun applications the authoring model that made
                  NestJS legible at scale: modules with explicit boundaries,
                  controllers with decorated routes, constructor dependency
                  injection, lifecycle phases, and validation attached to the route
                  rather than scattered inside handlers. It does not give them a
                  second HTTP framework. Elysia stays the request engine, Bun stays
                  the server, and JavaScriptCore stays the only thing in the stack
                  that emits machine code.
                </p>

                <p>
                  That division is the entire thesis. Every framework that has tried
                  to own both ergonomics and the request path ends up reimplementing
                  parsing, validation, hook ordering, cookie policy, response
                  mapping, and error shapes, then maintaining that copy against a
                  moving runtime. The alternative is to treat Aponia as a compiler
                  whose output is ordinary Elysia: the ergonomics live at authoring
                  time, and the artifact that reaches production is the code an
                  expert would have written by hand.
                </p>

                <div className="paper-figure" data-reveal>
                  <div className="paper-flow">
                    <div className="paper-flow-node">
                      <b>Aponia — authoring and compiler layer</b>
                      <span>
                        Decorators, module graph, dependency injection metadata,
                        typed route IR
                      </span>
                    </div>
                    <p className="paper-flow-arrow">emits registrations</p>
                    <div className="paper-flow-node">
                      <b>Elysia — framework compiler</b>
                      <span>
                        Sucrose inference, schemas, lifecycle ordering, generated
                        JavaScript per route
                      </span>
                    </div>
                    <p className="paper-flow-arrow">installs handlers</p>
                    <div className="paper-flow-node">
                      <b>Bun — HTTP runtime</b>
                      <span>
                        Bun.serve, native route table, request objects, static and
                        file fast paths
                      </span>
                    </div>
                    <p className="paper-flow-arrow">executes javascript</p>
                    <div className="paper-flow-node" data-owner="jsc">
                      <b>JavaScriptCore — the only true JIT</b>
                      <span>
                        Bytecode, LLInt, Baseline JIT, DFG, FTL, inline caches,
                        deoptimization
                      </span>
                    </div>
                  </div>
                  <p className="paper-caption">
                    <b>Figure 1.</b> Responsibility boundary. Elysia
                    &ldquo;JIT compiler&rdquo; is runtime JavaScript generation:
                    it stringifies handlers, runs Sucrose, concatenates source, and
                    calls <code className="paper-term">Function(...)</code>. Only
                    JavaScriptCore converts that JavaScript into machine code.
                  </p>
                </div>

                <p>
                  Naming this boundary precisely matters, because most published
                  claims about &ldquo;JIT frameworks&rdquo; conflate the two stages.
                  A route can be fully composed by Elysia and still be cold in JSC.
                  A dynamic-mode route generates less framework source and is still
                  JIT-compiled by the engine. Any performance statement that does
                  not say which stage it measured is unfalsifiable, and we treat it
                  as such.
                </p>
              </section>

              <section id="why" className="paper-section">
                <h2>Why: the measured gap</h2>

                <p>
                  The investigation started from a benchmark artifact containing one
                  table and four workloads. It is retained as evidence, and its
                  limits are retained with it: no route source, no harness commit,
                  no CPU model, no concurrency, no warm-up policy, no percentiles,
                  no allocation counters, no repetitions, no variance.
                </p>

                <div className="paper-figure" data-reveal>
                  <dl className="paper-bars">
                    {workloads.map((workload) => (
                      <div key={workload.name} className="paper-bar-row">
                        <dt>{workload.name}</dt>
                        <dd className="paper-bar-track">
                          <span
                            className="paper-bar-fill"
                            style={
                              {
                                '--value': `${workload.ratio}%`,
                              } as CSSProperties
                            }
                          />
                          <span className="paper-bar-target" />
                        </dd>
                        <dd className="paper-bar-value">
                          {workload.ratio.toFixed(2)}%
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="paper-caption">
                    <b>Figure 2.</b> AponiaJS throughput as a fraction of
                    Elysia-AOT throughput in the supplied artifact. The vertical
                    rule marks the 95% engineering target, which is a goal, not a
                    result.
                  </p>
                </div>

                <div className="paper-figure" data-reveal data-bleed="true">
                  <div className="paper-scroll">
                    <table className="paper-table">
                      <caption className="sr-only">
                        Artifact throughput per workload
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Workload</th>
                          <th scope="col" data-num>
                            Elysia AOT (req/s)
                          </th>
                          <th scope="col" data-num>
                            AponiaJS (req/s)
                          </th>
                          <th scope="col" data-num>
                            Ratio
                          </th>
                          <th scope="col" data-num>
                            Service proxy (µs)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {workloads.map((workload) => (
                          <tr key={workload.name}>
                            <th scope="row">{workload.name}</th>
                            <td data-num>{workload.elysia}</td>
                            <td data-num>{workload.aponia}</td>
                            <td data-num>{workload.ratio.toFixed(2)}%</td>
                            <td data-num>{workload.proxy}</td>
                          </tr>
                        ))}
                        <tr data-highlight="true">
                          <th scope="row">Geometric mean</th>
                          <td data-num>—</td>
                          <td data-num>—</td>
                          <td data-num>63.93%</td>
                          <td data-num>—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="paper-caption">
                    <b>Table 1.</b>{' '}
                    <span className="paper-tag" data-kind="measured">
                      Measured
                    </span>
                    Artifact values and arithmetic derived from them. The service
                    proxy is 10⁶/R for Elysia and Aponia respectively; it is a
                    reciprocal-throughput proxy under one saturated completion
                    stream, not a p50 or p99 latency.
                  </p>
                </div>

                <p>
                  Two readings of this table are wrong and both are common. The
                  first is that Aponia is roughly &ldquo;half the speed of
                  Elysia&rdquo;: the artifact raw average of 55.00% mixes workloads
                  whose absolute throughputs differ by two orders of magnitude. The
                  second is that the 94.74% Video result proves the layer is nearly
                  free. It proves the opposite of interest: when transfer work
                  dominates service time, a fixed per-request overhead is amortised
                  and disappears from the ratio without disappearing from the CPU.
                </p>

                <p>
                  The same amortisation explains why a fixed overhead budget is the
                  only honest way to talk about targets. For a route whose native
                  service time is <em>T</em>, holding ratio <em>p</em> permits an
                  overhead of exactly <em>T</em>(1/<em>p</em> − 1).
                </p>

                <div className="paper-figure" data-reveal data-bleed="true">
                  <div className="paper-scroll">
                    <table className="paper-table">
                      <thead>
                        <tr>
                          <th scope="col">Native service time</th>
                          <th scope="col" data-num>
                            90%
                          </th>
                          <th scope="col" data-num>
                            95%
                          </th>
                          <th scope="col" data-num>
                            99%
                          </th>
                          <th scope="col" data-num>
                            99.5%
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">0.5 µs</th>
                          <td data-num>55.6 ns</td>
                          <td data-num>26.3 ns</td>
                          <td data-num>5.1 ns</td>
                          <td data-num>2.5 ns</td>
                        </tr>
                        <tr>
                          <th scope="row">2 µs</th>
                          <td data-num>222 ns</td>
                          <td data-num>105 ns</td>
                          <td data-num>20.2 ns</td>
                          <td data-num>10.1 ns</td>
                        </tr>
                        <tr>
                          <th scope="row">10 µs</th>
                          <td data-num>1.11 µs</td>
                          <td data-num>526 ns</td>
                          <td data-num>101 ns</td>
                          <td data-num>50.3 ns</td>
                        </tr>
                        <tr>
                          <th scope="row">100 µs</th>
                          <td data-num>11.1 µs</td>
                          <td data-num>5.26 µs</td>
                          <td data-num>1.01 µs</td>
                          <td data-num>503 ns</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="paper-caption">
                    <b>Table 2.</b>{' '}
                    <span className="paper-tag" data-kind="derived">
                      Modeled
                    </span>
                    Maximum admissible per-request overhead. On a 0.5 µs route, a
                    99% target leaves about 5 ns: one allocation, one missed inline
                    cache, or one extra branch exhausts it. On a 100 µs route the
                    same target leaves a microsecond, which is why database-bound
                    endpoints flatter every framework.
                  </p>
                </div>
              </section>

              <section id="mechanism" className="paper-section">
                <h2>How the cost is generated</h2>

                <p>
                  Aponia does not add a router. For eligible AOT routes the request
                  still enters through Bun native route table and Elysia composed
                  handler. The divergence begins one step later, inside the adapter
                  that connects a composed Elysia route to a decorated controller
                  method.
                </p>

                <pre className="paper-code">
                  <code>
                    <span className="paper-code-label">
                      Current decorated-controller adapter
                    </span>
                    {`(context) =>
  handler.call(instance, ...`}
                    <b>bindParameters(parameters, context)</b>
                    {`)`}
                  </code>
                </pre>

                <p>
                  Two costs live in that line, and only one of them is the obvious
                  one.
                </p>

                <h3>The visible cost: generic argument binding</h3>

                <p>
                  With no parameter decorators the binder allocates a one-element
                  array. With decorators it maps over descriptor metadata, spreads
                  into <code className="paper-term">Math.max</code>, allocates with{' '}
                  <code className="paper-term">Array.from</code>, loops, switches on
                  the parameter kind, reads properties, spreads the result, and
                  invokes through <code className="paper-term">.call</code> — on
                  every request, for work that is fully known at startup. Sparse
                  parameter indexes make the array as long as the largest index.
                </p>

                <h3>The decisive cost: context escape</h3>

                <p>
                  <span className="paper-tag" data-kind="source">
                    Source
                  </span>
                  Elysia infers which context facilities a route needs by reading
                  handler source text. Sucrose has one conservative rule: if the
                  main context is passed to another function, every capability is
                  assumed live. The adapter above passes the whole context into a
                  helper, so the rule fires on every decorated route.
                </p>

                <pre className="paper-code">
                  <code>
                    <span className="paper-code-label">
                      Sucrose consequence for every decorated route
                    </span>
                    <i>{`// the wrapper matches the escape pattern\n`}</i>
                    {`bindParameters(parameters, context)

`}
                    <i>{`// therefore every capability is inferred live\n`}</i>
                    <b>{`query = headers = body = cookie = set =
server = url = route = path = true`}</b>
                  </code>
                </pre>

                <p>
                  <span className="paper-tag" data-kind="derived">
                    Derived
                  </span>
                  Elysia then generates the code those capabilities require: header
                  conversion, query object creation and parsing, response-state
                  mapping, URL and route setup, and{' '}
                  <code className="paper-term">await parseCookie(...)</code> when
                  cookies are live. That last one is the expensive detail. It can
                  turn a synchronous controller route into an asynchronous composed
                  route, which changes control flow, continuation behaviour,
                  context shape, allocation count, and generated code size — not
                  merely instruction count.
                </p>

                <div className="paper-callout" data-reveal>
                  <p>
                    The framework is not slow because it does more work. It is slow
                    because it tells the engine underneath it that it might.
                  </p>
                  <p>
                    JavaScriptCore cannot rescue this. It may inline a stable
                    controller call and may scalar-replace some arrays, but it
                    cannot delete a cookie parse, a header copy, or a query parse
                    whose generated JavaScript is observable. The only reliable fix
                    is to stop Elysia from generating them.
                  </p>
                </div>

                <div className="paper-figure" data-reveal data-bleed="true">
                  <div className="paper-scroll">
                    <table className="paper-table">
                      <thead>
                        <tr>
                          <th scope="col">Cost</th>
                          <th scope="col">Does native Elysia pay it?</th>
                          <th scope="col">Can JSC remove it?</th>
                          <th scope="col">Removal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Generic wrapper and .call</th>
                          <td>No</td>
                          <td>Possibly, if monomorphic</td>
                          <td>Emit instance.method(...) directly</td>
                        </tr>
                        <tr>
                          <th scope="row">Binder arrays, loop, spread</th>
                          <td>No</td>
                          <td>Fragile; dynamic arity blocks it</td>
                          <td>Fixed-arity generated adapter</td>
                        </tr>
                        <tr data-highlight="true">
                          <th scope="row">Whole-context escape</th>
                          <td>Only if the handler truly escapes context</td>
                          <td>No — the emitted work is observable</td>
                          <td>Exact handler source or capability contract</td>
                        </tr>
                        <tr>
                          <th scope="row">Cookie parse and forced async</th>
                          <td>Only when cookies are used</td>
                          <td>No</td>
                          <td>Effect analysis; never infer cookie</td>
                        </tr>
                        <tr>
                          <th scope="row">Singleton container lookup</th>
                          <td colSpan={3}>
                            Not paid today. Providers are resolved at bootstrap and
                            captured by the route closure; DI is a startup cost, not
                            a per-request one.
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Child Elysia per controller</th>
                          <td>No</td>
                          <td>Not applicable</td>
                          <td>Register routes directly on the root instance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="paper-caption">
                    <b>Table 3.</b> Condensed hot-path inventory. The full audit
                    enumerates twenty-three entries with their allocation and
                    inference effects.
                  </p>
                </div>
              </section>

              <section id="design" className="paper-section">
                <h2>How we remove it</h2>

                <p>
                  The corrective architecture is not a faster runtime. It is a
                  typed route intermediate representation, produced once, lowered
                  per route to whichever backend can preserve that route semantics
                  most cheaply.
                </p>

                <p>The IR records, for every route:</p>

                <ul className="paper-list">
                  <li>method, path, and stable route identity;</li>
                  <li>
                    controller and provider slots with constructor or factory
                    dependencies;
                  </li>
                  <li>ordered parameter extraction expressions;</li>
                  <li>
                    exact context capabilities and whether the context escapes;
                  </li>
                  <li>schema, validator, and serializer references;</li>
                  <li>
                    ordered middleware, guard, pipe, interceptor, filter, and Elysia
                    hook phases;
                  </li>
                  <li>
                    synchronous versus asynchronous effect summary, plus static,
                    stream, file, error, and mutation effects;
                  </li>
                  <li>source-map origins and a semantic hash.</li>
                </ul>

                <div className="paper-figure" data-reveal>
                  <div className="paper-flow">
                    <div className="paper-flow-node">
                      <b>Controllers, providers, routes, lifecycle metadata</b>
                      <span>Authoring surface stays unchanged</span>
                    </div>
                    <p className="paper-flow-arrow">analysis</p>
                    <div className="paper-flow-node" data-owner="jsc">
                      <b>Typed route IR</b>
                      <span>Capability and effect analysis, semantic hashing</span>
                    </div>
                    <p className="paper-flow-arrow">per-route lowering</p>
                    <div className="paper-branches">
                      <div className="paper-flow-node">
                        <b>Static response</b>
                        <span>
                          Proved constant routes installed as a value on the Elysia
                          and Bun native path
                        </span>
                      </div>
                      <div className="paper-flow-node">
                        <b>Direct Elysia registration</b>
                        <span>
                          The default: exact fixed-arity adapter, public composition
                          API
                        </span>
                      </div>
                      <div className="paper-flow-node">
                        <b>Native plugin passthrough</b>
                        <span>Existing Elysia plugins registered unchanged</span>
                      </div>
                      <div className="paper-flow-node">
                        <b>Compatibility island</b>
                        <span>
                          Unproven or deliberately dynamic routes keep full-context
                          semantics
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="paper-caption">
                    <b>Figure 3.</b> Per-route semantic-island lowering. Dynamic
                    capability is preserved locally instead of taxing every route
                    that is statically provable.
                  </p>
                </div>

                <p>
                  The output of the default path is deliberately unremarkable. It is
                  the code a careful Elysia author writes, with the module graph
                  resolved into slots and the controller call made transparent to
                  Sucrose:
                </p>

                <pre className="paper-code">
                  <code>
                    <span className="paper-code-label">
                      Representative generated output
                    </span>
                    <i>{`// build-generated singleton initialisation\n`}</i>
                    {`const slots = new Array(3)
slots[0] = new Config()
slots[1] = new UserRepository(slots[0])
slots[2] = new UserController(slots[1])
const userController = slots[2]

`}
                    <i>{`// route-specific, fixed arity, visible to Sucrose\n`}</i>
                    <b>{`const getUser = (c) =>
  userController.findOne(c.params.id, c.query.expand)`}</b>
                    {`

`}
                    <i>{`// public registration keeps validators, hooks, plugins\n`}</i>
                    {`app.get('/users/:id', getUser, {
  params: UserIdParams,
  query: UserQuery
})`}
                  </code>
                </pre>

                <p>
                  Three properties of this output are the point of the whole design.
                  No metadata is read at request time. The adapter names exactly the
                  context fields it uses, so Sucrose infers exactly those. And final
                  composition is still Elysia work, which means schemas, cookie
                  policy, hook ordering, error types, response mapping, WebSockets,
                  and Bun static routes remain the framework responsibility rather
                  than a copy we would have to maintain.
                </p>

                <h3>Why not simply copy the Elysia composer</h3>

                <p>
                  <span className="paper-tag" data-kind="rejected">
                    Rejected
                  </span>
                  Reproducing Sucrose and the composer inside Aponia, or reaching
                  into private Elysia compilation hooks, buys speed that is
                  indistinguishable from the speed obtained by emitting better
                  input, and pays for it with version fragility, duplicated
                  validation semantics, and a debugging surface nobody outside the
                  project can reason about. We keep it as an experiment, never as
                  the default. A standalone{' '}
                  <code className="paper-term">Bun.serve({'{'}routes{'}'})</code>{' '}
                  backend is rejected for the same reason, except for routes proved
                  strictly static.
                </p>

                <h3>What the compiler cannot promise</h3>

                <p>
                  Whole-context injection cannot be soundly optimised. A method may
                  read a computed property, enumerate the context, forward it, or
                  index it dynamically. The answer is a contract rather than a
                  guess: an explicit capability declaration whose undeclared
                  accesses are rejected statically and warned about at development
                  time, with a full-context escape hatch that honestly reports its
                  cost. Request-scoped injection is the other irreducible case — a
                  distinct observable instance per request can be made cheap, never
                  free.
                </p>
              </section>

              <section id="ceiling" className="paper-section">
                <h2>How far it can go</h2>

                <p>
                  Every number in this section is a hypothesis with an explicit
                  scope: Bun 1.3.14, Elysia 1.4.29 with{' '}
                  <code className="paper-term">precompile: true</code>, one warmed
                  worker, logging and tracing disabled, byte-identical status, body,
                  and headers, and a synchronous dynamic function route. They are
                  targets to be falsified, not results.
                </p>

                <div className="paper-figure" data-reveal data-bleed="true">
                  <div className="paper-scroll">
                    <table className="paper-table">
                      <thead>
                        <tr>
                          <th scope="col">Architecture</th>
                          <th scope="col" data-num>
                            Sync path route
                          </th>
                          <th scope="col" data-num>
                            Validated JSON body
                          </th>
                          <th scope="col">Basis</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Current generic adapter</th>
                          <td data-num>41.16%</td>
                          <td data-num>61.50%</td>
                          <td>Artifact only; scope unknown</td>
                        </tr>
                        <tr>
                          <th scope="row">Runtime route-specific adapters</th>
                          <td data-num>90–97%</td>
                          <td data-num>95–99%</td>
                          <td>Removes false context and the binder</td>
                        </tr>
                        <tr data-highlight="true">
                          <th scope="row">Build IR + public Elysia composition</th>
                          <td data-num>95–98.5%</td>
                          <td data-num>97–99.5%</td>
                          <td>Also removes reflection and registration work</td>
                        </tr>
                        <tr>
                          <th scope="row">Near-zero-runtime emitted source</th>
                          <td data-num>98–100%</td>
                          <td data-num>98.5–100%</td>
                          <td>Requires demonstrated code-shape equivalence</td>
                        </tr>
                        <tr>
                          <th scope="row">Static-response island</th>
                          <td data-num>100%</td>
                          <td data-num>n/a</td>
                          <td>Same value on the same Elysia and Bun path</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="paper-caption">
                    <b>Table 4.</b>{' '}
                    <span className="paper-tag" data-kind="hypothesis">
                      Hypothesis
                    </span>
                    Scoped warmed-throughput ratios against hand-written Elysia.
                    None of these cells has been measured under the controlled
                    protocol.
                  </p>
                </div>

                <p>
                  A percentage only becomes a claim when it survives a gate. Each
                  gate applies per route class, never in aggregate, and passes only
                  when the lower bound of a 95% confidence interval clears the
                  threshold.
                </p>

                <div className="paper-figure" data-reveal>
                  <dl className="paper-ladder">
                    <div className="paper-rung">
                      <dt>90%</dt>
                      <dd>
                        <b>Sync ping, path and query, validated JSON body</b>
                        p99 no worse than 1.15×, no accidental asynchrony, fewer
                        than 128 extra allocated bytes per request.
                      </dd>
                    </div>
                    <div className="paper-rung">
                      <dt>95%</dt>
                      <dd>
                        <b>Same classes, tighter tails</b>
                        p99 no worse than 1.10×, zero Aponia argument allocations,
                        no falsely inferred context facilities.
                      </dd>
                    </div>
                    <div className="paper-rung">
                      <dt>98%</dt>
                      <dd>
                        <b>All core synchronous classes</b>
                        p99 no worse than 1.05×, startup and resident memory within
                        10% at 1,000 routes, no unexplained code-shape difference.
                      </dd>
                    </div>
                    <div className="paper-rung">
                      <dt>99%</dt>
                      <dd>
                        <b>Per claimed route class only</b>
                        p99 no worse than 1.03×, no statistically detectable
                        allocation increase, identical static and native routing
                        class.
                      </dd>
                    </div>
                    <div className="paper-rung">
                      <dt>99.5%</dt>
                      <dd>
                        <b>Reserved for code-shape-equivalent islands</b>
                        Never a blanket framework claim, and never published without
                        the raw samples.
                      </dd>
                    </div>
                  </dl>
                  <p className="paper-caption">
                    <b>Figure 4.</b> Falsifiable gates. Until a class passes, the
                    only publishable number for that class is the measured artifact
                    ratio with its caveats attached.
                  </p>
                </div>

                <p>
                  The benchmark protocol that feeds these gates is specified in the
                  full report: pinned binaries and commits, isolated cores, a
                  separate load generator, concurrency 1, 16, and 128 plus a
                  saturation sweep, at least ten independent process starts per
                  cell, randomised order, cold versus first-hit versus warmed phases
                  reported separately, allocation and GC counters, and generated
                  source dumps. Lazy and precompiled modes are never mixed into one
                  statistic, and no run is ever selected for being the best.
                </p>

                <p>
                  There is also a ceiling that no compiler crosses. Routes dominated
                  by validation, serialisation, files, streaming, databases, or
                  network I/O will report ratios near 100% by amortisation alone.
                  That is a property of the workload, not evidence that framework
                  overhead is negligible, and presenting it as the latter is the
                  specific dishonesty this paper exists to avoid.
                </p>
              </section>

              <section id="program" className="paper-section">
                <h2>Programme of work</h2>

                <p>
                  Ordering follows evidence, not ambition. Nothing about build-time
                  compilation is worth starting until the generated code for a
                  trivial route is provably free of the false parser, cookie, and
                  asynchronous work identified above.
                </p>

                <div className="paper-figure" data-reveal data-bleed="true">
                  <div className="paper-phases">
                    <div className="paper-phase">
                      <p className="paper-phase-head">
                        <b>P0</b>
                        <span>Make the measurement and the mechanism honest</span>
                      </p>
                      <p>
                        Publish the harness, pin commits, enforce byte-equality,
                        separate cold, first-hit, and warmed phases. Add Sucrose
                        regression fixtures that inspect generated source. Replace
                        the binder with fixed-arity generated adapters. Make
                        undecorated methods receive zero arguments.
                      </p>
                      <p>
                        Acceptance: a ping fixture whose generated code contains no
                        query, header, cookie, body, or await, and a controlled sync
                        route that passes the 90% gate.
                      </p>
                    </div>
                    <div className="paper-phase">
                      <p className="paper-phase-head">
                        <b>P1</b>
                        <span>Structure: direct registration and the IR</span>
                      </p>
                      <p>
                        Remove the per-controller child Elysia instance and register
                        on the root. Define the versioned route IR consumed by both
                        the runtime and build compilers. Lower guards, pipes,
                        interceptors, and filters into fused chains with a cold
                        error path. Add an explicit static-response descriptor.
                      </p>
                      <p>
                        Acceptance: deterministic IR snapshots, golden lifecycle
                        ordering tests, no Promise path in a synchronous fixture.
                      </p>
                    </div>
                    <div className="paper-phase">
                      <p className="paper-phase-head">
                        <b>P2</b>
                        <span>Build-time compilation</span>
                      </p>
                      <p>
                        A TypeScript and Bun plugin that validates the graph, emits
                        provider factories and direct Elysia registrations, and
                        keeps reflection out of compiled islands. Capability
                        contracts for context injection, plus an upstream proposal
                        for a trusted inference API. Compiled request scope with
                        measured allocation.
                      </p>
                      <p>
                        Acceptance: a production example that runs with no
                        reflection, working source maps and HMR, and controlled core
                        routes at the 95% gate.
                      </p>
                    </div>
                    <div className="paper-phase">
                      <p className="paper-phase-head">
                        <b>P3</b>
                        <span>Islands, scale, and experiments</span>
                      </p>
                      <p>
                        Per-route backend selection with diagnostics that explain
                        each choice. Route clustering and optional profile-guided
                        ordering for ten-thousand-route applications. Controller
                        elimination remains experimental and provable-subset only.
                      </p>
                      <p>
                        Acceptance: mixed applications preserve every semantic,
                        static islands match the native route table, and large-app
                        startup improves without regressing hot routes.
                      </p>
                    </div>
                  </div>
                  <p className="paper-caption">
                    <b>Table 5.</b> Each deliverable carries a falsifiable
                    acceptance test. A deliverable that cannot be falsified is not
                    scheduled.
                  </p>
                </div>
              </section>

              <section id="limits" className="paper-section">
                <h2>Limits and falsifiers</h2>

                <p>
                  The central thesis of this paper is falsifiable, and here is what
                  would falsify it.
                </p>

                <ul className="paper-list paper-list-numbered">
                  <li>
                    If route-specific generation removes the cookie parse and the
                    binder arrays and the controlled sync route still fails the 90%
                    gate, the diagnosis is wrong and profiling must find another
                    bottleneck.
                  </li>
                  <li>
                    If build-time emission does not improve startup and resident
                    memory over runtime descriptors, reflection and graph work are
                    not the dominant cold cost and the compiler scope should shrink.
                  </li>
                  <li>
                    The artifact itself may compare different semantics or a
                    client-side bottleneck. Every causal statement here remains a
                    source-derived hypothesis until ablation.
                  </li>
                </ul>

                <p>Known limits of the approach, stated up front:</p>

                <ul className="paper-list">
                  <li>
                    Sucrose reads function text, so minification and transpilation
                    can change inference. Generated-code tests must run on the final
                    bundled output.
                  </li>
                  <li>
                    JSC tier thresholds and inlining vary by Bun and WebKit
                    revision. Results must be repeated per supported Bun minor with
                    the binary commit recorded.
                  </li>
                  <li>
                    Static analysis becomes unsound around dynamic imports,
                    decorators with side effects, prototype mutation, computed keys,
                    and package boundaries. Unsupported cases need explicit
                    fallbacks, never silent optimisation.
                  </li>
                  <li>
                    Generated code grows bundles and JIT code size; clustering and
                    dead-code elimination are mandatory at ten thousand routes.
                  </li>
                  <li>
                    Source generation makes the compiler responsible for escaping
                    every identifier and key it emits.
                  </li>
                </ul>

                <div className="paper-callout" data-reveal>
                  <p>
                    The highest defensible public claim today is the measured
                    artifact ratio with its caveats. 95% is an engineering target.
                    98% is a plausible compiler goal. 99% is route-specific and
                    unproven, and we will not print it on a landing page before it
                    passes its gate.
                  </p>
                </div>
              </section>

              <section id="references" className="paper-section">
                <h2>References</h2>

                <p>
                  This page is a summary. The complete report — full pipeline
                  reconstruction across thirteen architectures, the twenty-three
                  entry hot-path inventory, the weighted decision matrix, the
                  quantitative model, the scaling analysis, the reproducible
                  benchmark specification, and forty numbered citations with tag,
                  file, and line ranges — is published alongside it.
                </p>

                <ul className="paper-refs">
                  <li>
                    {/* oxlint-disable-next-line next/no-html-link-for-pages */}
                    <a href="/research.md">
                      <b>
                        AponiaJS versus native Elysia on Bun: exhaustive source-,
                        compiler-, runtime-, and benchmark-level investigation
                      </b>
                    </a>
                    . Full technical report, 28 July 2026.
                  </li>
                  <li>
                    <a href="https://github.com/aponiajs/aponiajs/blob/v0.6.0-alpha.14/packages/platform-elysia/src/decorated-module.ts">
                      <b>AponiaJS</b>, tag v0.6.0-alpha.14
                    </a>
                    , decorated-module.ts lines 162–221: the controller wrapper and
                    parameter binder analysed in section 3.
                  </li>
                  <li>
                    <a href="https://github.com/elysiajs/elysia/blob/1.4.29/src/sucrose.ts#L516-L719">
                      <b>Elysia</b>, tag 1.4.29
                    </a>
                    , sucrose.ts lines 516–719: the context-escape rule, inference
                    cache, and merge behaviour.
                  </li>
                  <li>
                    <a href="https://github.com/elysiajs/elysia/blob/1.4.29/src/compose.ts">
                      <b>Elysia</b>, tag 1.4.29
                    </a>
                    , compose.ts: Sucrose-driven parsing, cookie and query emission,
                    lifecycle composition, generated function construction.
                  </li>
                  <li>
                    <a href="https://elysiajs.com/internal/jit-compiler">
                      <b>Elysia documentation</b>, JIT compiler internal
                    </a>
                    : runtime JavaScript generation, first-request compilation, and
                    precompilation.
                  </li>
                  <li>
                    <a href="https://docs.webkit.org/Deep%20Dive/JSC/JavaScriptCore.html">
                      <b>WebKit</b>, JavaScriptCore
                    </a>
                    : parser, LLInt, Baseline JIT, DFG, FTL, profiling, on-stack
                    replacement.
                  </li>
                  <li>
                    <a href="https://bun.com/docs/runtime/http/routing">
                      <b>Bun documentation</b>, HTTP routing
                    </a>
                    : route precedence, zero-allocation static responses, file and
                    streaming paths.
                  </li>
                  <li>
                    <a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/aot/request-delegate-generator/rdg">
                      <b>Microsoft</b>, ASP.NET Core request delegate generator
                    </a>
                    : the closest server-side analogy to generated route adapters.
                  </li>
                </ul>
              </section>
          </main>

          <PaperOutline entries={outline} />
        </div>

        <footer className="border-t border-ink px-[var(--paper-gutter)] py-10 md:py-16">
          <div className="grid gap-6 font-face text-[0.8rem] text-ink-faint md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 border-b border-transparent text-[clamp(1.4rem,3vw,2.1rem)] font-semibold tracking-[-0.035em] text-ink"
              >
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-editorial group-hover:-translate-x-1.5"
                >
                  ←
                </span>{' '}
                Back to AponiaJS
              </Link>
              <p className="mt-3 max-w-[46ch]">
                Technical report · {paper.published}, revised {paper.revised} ·
                Numbers hold only within the scope printed beside them.
              </p>
            </div>
            <nav
              className="flex flex-wrap gap-x-5 gap-y-1.5 font-mark text-[0.72rem] tracking-[0.04em] uppercase [&_a]:border-b [&_a]:border-transparent [&_a]:text-ink-faint hover:[&_a]:border-ink hover:[&_a]:text-ink"
              aria-label="Paper footer"
            >
              <Link href="/docs">Docs</Link>
              {/* oxlint-disable-next-line next/no-html-link-for-pages */}
              <a href="/research.md">Full report</a>
              <a href={siteConfig.repository}>Source</a>
              <a href="https://opensource.org/license/mit">MIT licence</a>
              <a href="#paper-body">Back to top</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
