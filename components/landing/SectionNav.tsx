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
    <nav className="mono-register" aria-label="Page sections">
      <ol>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <span aria-hidden="true">{item.index}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
