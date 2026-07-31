import type { ReactNode } from 'react';

/*
 * The comparison pages are the only surface on the site that carries hue. The
 * rest of the documentation is deliberately monochrome, and a table of twelve
 * prose rows is exactly where that stops working: "implemented" and "not
 * implemented" read identically in grey, so the reader has to parse every cell.
 * Colour here is a legend, not decoration — one meaning per hue, always paired
 * with a word and a shape so it survives greyscale and colour blindness.
 *
 * Tailwind's palette is used directly with `dark:` pairs rather than new
 * theme tokens: these values must not leak into the global surface.
 */

type Status = 'yes' | 'no' | 'partial' | 'info';

/*
 * Hue lives in the six-pixel dot, not in the sentence. Colouring the text too
 * meant three saturated colours competing at body size in every row, which is
 * tiring to read and adds nothing the dot has not already said. Rows for things
 * that do not exist also recede into the muted grey rather than shouting in
 * red — an absent feature should not be the loudest thing on the page.
 */
const statusStyles: Record<Status, { dot: string; text: string }> = {
  yes: {
    dot: 'bg-emerald-600/80 dark:bg-emerald-400/80',
    text: 'text-fd-foreground',
  },
  no: {
    dot: 'bg-rose-400/70 dark:bg-rose-400/60',
    text: 'text-fd-muted-foreground',
  },
  partial: {
    dot: 'bg-amber-500/75 dark:bg-amber-400/70',
    text: 'text-fd-foreground',
  },
  info: {
    dot: 'bg-fd-muted-foreground/50',
    text: 'text-fd-muted-foreground',
  },
};

const statusLabel: Record<Status, string> = {
  yes: 'Yes',
  no: 'No',
  partial: 'Partial',
  info: 'Note',
};

// Both the header and every row use this template so the columns line up
// without the rows having to be table cells.
const columns =
  'md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1.15fr)] md:items-baseline md:gap-x-6';

const columnLabel =
  'font-mono text-[0.68rem] font-medium tracking-[0.08em] text-fd-muted-foreground uppercase';

export type CompareCell = {
  status?: Status;
  text: string;
};

export type CompareRow = {
  feature: string;
  a: CompareCell;
  b: CompareCell;
};

function Cell({ cell, label }: { cell: CompareCell; label: string }) {
  const status = cell.status ?? 'info';
  const style = statusStyles[status];

  return (
    <div className="mt-2 min-w-0 md:mt-0">
      <span className={`${columnLabel} mb-1 block md:hidden`}>{label}</span>
      <p className="m-0 flex gap-2 text-[0.9rem] leading-relaxed">
        <span
          aria-hidden="true"
          className={`mt-[0.5em] size-1.5 shrink-0 rounded-full ${style.dot}`}
        />
        <span className={style.text}>
          {status === 'info' ? null : (
            <span className="sr-only">{statusLabel[status]}. </span>
          )}
          {cell.text}
        </span>
      </p>
    </div>
  );
}

export function CompareMatrix({
  a,
  b,
  rows,
}: {
  a: string;
  b: string;
  rows: CompareRow[];
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-fd-border">
      <div
        className={`${columns} hidden border-b border-fd-border bg-fd-muted px-4 py-3`}
      >
        <span className={columnLabel}>Capability</span>
        <span className={columnLabel}>{a}</span>
        <span className={columnLabel}>{b}</span>
      </div>
      <div className="divide-y divide-fd-border">
        {rows.map((row) => (
          <div
            key={row.feature}
            className={`${columns} px-4 py-3.5 transition-colors hover:bg-fd-muted/50`}
          >
            <p className="m-0 text-[0.9rem] font-medium text-fd-foreground">
              {row.feature}
            </p>
            <Cell cell={row.a} label={a} />
            <Cell cell={row.b} label={b} />
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * The "choose X when" lists are the actual recommendation, and a reader
 * scanning for it should not have to find two identical bullet lists and work
 * out which is which. Two cards, two headers, one accent each.
 */
export function ChoiceCards({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid items-start gap-4 md:grid-cols-2">{children}</div>
  );
}

const choiceTones = {
  other: {
    frame: 'border-fd-border bg-fd-muted/40',
    header: 'text-fd-foreground',
    rule: 'bg-fd-muted-foreground/50',
  },
  aponia: {
    frame:
      'border-emerald-600/25 bg-emerald-600/[0.045] dark:border-emerald-400/20 dark:bg-emerald-400/[0.05]',
    header: 'text-fd-foreground',
    rule: 'bg-emerald-600/70 dark:bg-emerald-400/70',
  },
} as const;

export function Choice({
  title,
  tone = 'other',
  children,
}: {
  title: string;
  tone?: keyof typeof choiceTones;
  children: ReactNode;
}) {
  const style = choiceTones[tone];

  return (
    <section className={`rounded-lg border p-5 ${style.frame}`}>
      <h3
        className={`m-0 flex items-center gap-2.5 text-[0.95rem] font-semibold ${style.header}`}
      >
        <span aria-hidden="true" className={`h-4 w-0.5 ${style.rule}`} />
        {title}
      </h3>
      <div className="mt-3 text-[0.9rem] leading-relaxed [&_li]:my-1 [&_ul]:my-0 [&_ul]:pl-4">
        {children}
      </div>
    </section>
  );
}

/*
 * The hub's overview. A five-column table of seven frameworks is unreadable on
 * a phone and barely better on a laptop, so each framework becomes one linked
 * row that answers the only question the hub is asked: which of these is for
 * me, and where do I read more.
 */
export function FrameworkList({
  items,
}: {
  items: {
    name: string;
    href?: string;
    stable?: boolean;
    runtime: string;
    bestFor: string;
  }[];
}) {
  return (
    <ul className="my-6 grid list-none gap-0 divide-y divide-fd-border overflow-hidden rounded-lg border border-fd-border pl-0">
      {items.map((item) => {
        const heading = (
          <span className="text-[0.95rem] font-semibold text-fd-foreground">
            {item.name}
          </span>
        );

        return (
          <li key={item.name} className="m-0 p-0">
            <div className="grid gap-1.5 px-4 py-3.5 transition-colors hover:bg-fd-muted/60 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:items-baseline sm:gap-x-6">
              <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-semibold text-fd-foreground decoration-fd-muted-foreground underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </a>
                ) : (
                  heading
                )}
                {/* Stable is the expectation, so only the exception is
                    marked. A badge on every row is noise. */}
                <span
                  className={`font-mono text-[0.6rem] tracking-[0.08em] uppercase ${
                    item.stable
                      ? 'text-fd-muted-foreground'
                      : 'text-amber-700 dark:text-amber-400/90'
                  }`}
                >
                  {item.stable ? 'Stable' : 'Alpha'}
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.08em] text-fd-muted-foreground uppercase">
                  {item.runtime}
                </span>
              </span>
              <span className="text-[0.88rem] leading-relaxed text-fd-muted-foreground">
                {item.bestFor}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/*
 * A one-sentence answer above the detail. Most readers of a "X vs Y" page want
 * the recommendation, not the matrix, and burying it under twelve rows serves
 * nobody.
 */
export function Verdict({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 rounded-r-lg border-l-2 border-fd-muted-foreground/40 bg-fd-muted/50 px-5 py-4">
      <p className={`${columnLabel} m-0 mb-1.5`}>Short answer</p>
      <div className="text-[0.95rem] leading-relaxed text-fd-foreground [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
