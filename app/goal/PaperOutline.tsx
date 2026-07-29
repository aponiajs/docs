'use client';

import { useEffect, useState } from 'react';

export type OutlineEntry = {
  id: string;
  label: string;
};

/**
 * Reading aids for the paper surface: a hairline progress rule and an index
 * that follows the section currently under the reader's viewport. Both degrade
 * to plain anchors when JavaScript never runs.
 */
export function PaperOutline({ entries }: { entries: readonly OutlineEntry[] }) {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? '');

  useEffect(() => {
    const sections = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
          return;
        }

        // Nothing intersects the band while scrolling through a long section,
        // so fall back to the last heading that has passed the band.
        const passed = sections.filter(
          (section) => section.getBoundingClientRect().top < 120,
        );
        const last = passed.at(-1);

        if (last) {
          setActiveId(last.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [entries]);

  useEffect(() => {
    const rule = document.getElementById('paper-progress');

    if (!rule) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      rule.style.setProperty(
        '--paper-progress',
        String(Math.min(Math.max(ratio, 0), 1)),
      );
    };

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <nav className="paper-aside" aria-label="Paper index">
      <p className="paper-toc-title">Index</p>
      <ol className="paper-toc-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              data-active={entry.id === activeId ? 'true' : 'false'}
            >
              <span>{entry.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Staggers `[data-reveal]` elements in as they enter the viewport, so the page
 * does not mount everything at once. Elements stay revealed once seen; the
 * reduced-motion path is handled in CSS rather than here.
 */
export function PaperReveal() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-reveal]')];

    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (records) => {
        let index = 0;

        for (const record of records) {
          if (!record.isIntersecting) continue;

          const element = record.target as HTMLElement;
          element.style.setProperty('--reveal-index', String(index % 4));
          element.dataset.reveal = 'in';
          observer.unobserve(element);
          index += 1;
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
