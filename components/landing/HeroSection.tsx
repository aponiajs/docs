'use client';

import { useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import { AponiaFlowEffect } from './AponiaFlowEffect';

export function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end start'],
  });
  const first = useTransform(scrollYProgress, [0, 0.62], [0.04, 1]);
  const second = useTransform(scrollYProgress, [0, 0.66], [0.02, 1]);
  const third = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const fourth = useTransform(scrollYProgress, [0.04, 0.74], [0, 1]);
  const fifth = useTransform(scrollYProgress, [0.08, 0.78], [0, 1]);
  const targetOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.72],
    [0.28, 1],
  );

  return (
    <section
      ref={section}
      id="top"
      className="mono-hero mono-flow-hero"
      aria-labelledby="hero-title"
    >
      <div className="mono-hero-sticky">
        <figure className="mono-hero-artwork">
          <AponiaFlowEffect
            pathLengths={[first, second, third, fourth, fifth]}
            targetOpacity={targetOpacity}
          />
        </figure>
        <div className="mono-hero-shade" aria-hidden="true" />
        <div className="mono-hero-copy">
          <h1 id="hero-title">
            <span>AponiaJS</span>
            <span>for Bun.</span>
          </h1>
          <div className="mono-hero-note">
            <p>
              Modular TypeScript for Bun, with singleton dependency injection
              and direct access to native Elysia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
