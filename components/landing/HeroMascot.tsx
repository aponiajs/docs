'use client';

import Image from 'next/image';
import { useRef } from 'react';

const sourceUrl =
  'https://zh.moegirl.org.cn/%E9%98%BF%E6%B3%A2%E5%B0%BC%E4%BA%9A';

export function HeroMascot() {
  const stageRef = useRef<HTMLElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (
      event.pointerType === 'touch' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stage.style.setProperty('--mascot-x', `${x * 12}px`);
    stage.style.setProperty('--mascot-y', `${y * 10}px`);
    stage.style.setProperty('--light-x', `${(x + 0.5) * 100}%`);
    stage.style.setProperty('--light-y', `${(y + 0.5) * 100}%`);
  }

  function resetPointer() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--mascot-x', '0px');
    stage.style.setProperty('--mascot-y', '0px');
    stage.style.setProperty('--light-x', '50%');
    stage.style.setProperty('--light-y', '35%');
  }

  return (
    <figure className="mascot-figure">
      <article
        ref={stageRef}
        className="mascot-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="mascot-signal" aria-hidden="true" />
        <div className="mascot-image-wrap">
          <Image
            src="/images/aponia-reference.webp"
            alt="Aponia from Honkai Impact 3rd standing beneath soft light"
            fill
            priority
            sizes="(max-width: 1023px) 92vw, 44vw"
            className="mascot-image"
          />
        </div>
        <span className="mascot-index" aria-hidden="true">
          AP
        </span>
      </article>
      <figcaption className="mascot-credit">
        Aponia character artwork © HoYoverse.{' '}
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          Source
        </a>
      </figcaption>
    </figure>
  );
}
