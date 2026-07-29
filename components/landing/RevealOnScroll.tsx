'use client';

import { useEffect } from 'react';

/**
 * Staggers `[data-mono-reveal]` elements in as they cross the viewport so the
 * page does not mount every row at once. Elements stay revealed once seen, and
 * the reduced-motion and no-JavaScript paths are handled in CSS.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-mono-reveal]')];

    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (records) => {
        let position = 0;

        for (const record of records) {
          if (!record.isIntersecting) continue;

          const element = record.target as HTMLElement;
          element.style.setProperty('--reveal-index', String(position % 5));
          element.dataset.monoReveal = 'in';
          observer.unobserve(element);
          position += 1;
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
