'use client';

import Link from 'next/link';

export interface GooeyNavItem {
  href: string;
  label: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
}

// Static section navigation with pointer-only underline feedback.
export function GooeyNav({ items }: GooeyNavProps) {
  return (
    <div className="mono-gooey-nav">
      <nav aria-label="Landing sections">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
