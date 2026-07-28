'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface GooeyNavItem {
  href: string;
  label: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
}

// Section navigation with a position readout: the section currently in view
// carries the tick, so the nav reports where the page is instead of decorating it.
export function GooeyNav({ items }: GooeyNavProps) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? '');

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted(
            (left, right) => right.intersectionRatio - left.intersectionRatio,
          )[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="mono-gooey-nav">
      <nav aria-label="Landing sections">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.href === activeHref ? 'true' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
