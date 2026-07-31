import type { ReactNode } from 'react';

/*
 * Two code samples of the same feature, one per framework, aligned so the
 * reader compares them instead of scrolling between them. Below `lg` the
 * columns stack, because side-by-side code on a phone is unreadable in either
 * arrangement and stacking at least keeps the labels attached.
 */
export function CodeCompare({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid items-start gap-4 lg:grid-cols-2">{children}</div>
  );
}

export function CodeCompareSide({
  label,
  note,
  variant = 'before',
  children,
}: {
  label: string;
  note?: string;
  variant?: 'before' | 'after';
  children: ReactNode;
}) {
  const isAfter = variant === 'after';

  return (
    <div className="grid min-w-0 grid-rows-[auto_auto_1fr] gap-2">
      {/* Same green as "implemented" in the comparison matrix: on these pages
          it always means "this is the AponiaJS side". */}
      <p
        className="m-0 flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-fd-muted-foreground uppercase"
      >
        <span
          aria-hidden="true"
          className={`inline-block size-1.5 rounded-full ${
            isAfter
              ? 'bg-emerald-600/80 dark:bg-emerald-400/80'
              : 'bg-fd-muted-foreground/50'
          }`}
        />
        {label}
      </p>
      {note ? (
        <p className="m-0 text-sm text-fd-muted-foreground">{note}</p>
      ) : (
        <span />
      )}
      <div className="min-w-0 [&>figure]:my-0 [&>pre]:my-0">{children}</div>
    </div>
  );
}
