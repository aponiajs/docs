import Link from 'next/link';

export interface SectionNavItem {
  href: string;
  label: string;
  index: string;
}

/**
 * Section register in the bar: numbered stops rather than a pill nav, so the
 * navigation reads like the index of the page it sits above.
 */
export function SectionNav({ items }: { items: readonly SectionNavItem[] }) {
  return (
    <nav
      className="hidden min-w-0 lg:block"
      aria-label="Page sections"
    >
      <ol className="flex h-full">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex h-full items-center gap-1.5 border-r border-rule px-4 tracking-[0.1em] text-ink-faint uppercase transition-colors duration-150 hover:bg-ink hover:text-stock"
            >
              <span
                aria-hidden="true"
                className="tabular-nums text-ink-faint transition-colors duration-150 group-hover:text-stock"
              >
                {item.index}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
