'use client';

import {
  motion,
  type MotionValue,
  useReducedMotion,
} from 'motion/react';

interface AponiaFlowEffectProps {
  pathLengths: readonly MotionValue<number>[];
  targetOpacity: MotionValue<number>;
}

const flowPaths = [
  'M -80 170 C 210 170 300 330 575 370 C 780 400 940 370 1090 470 C 1190 535 1260 650 1480 690',
  'M -80 260 C 210 260 320 365 590 395 C 790 418 945 398 1090 480 C 1195 540 1280 650 1480 700',
  'M -80 350 C 225 350 340 400 605 420 C 800 435 955 425 1090 490 C 1200 545 1295 650 1480 710',
  'M -80 440 C 225 440 350 435 615 445 C 805 452 965 450 1090 500 C 1205 550 1310 650 1480 720',
  'M -80 530 C 230 530 355 470 625 470 C 815 470 970 475 1090 510 C 1210 555 1325 650 1480 730',
] as const;

const flowColors = [
  '#e9eadf',
  '#b8c58a',
  '#d7ff43',
  '#8d9b57',
  '#5e6743',
] as const;

export function AponiaFlowEffect({
  pathLengths,
  targetOpacity,
}: AponiaFlowEffectProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mono-flow-effect">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="A decorated root module, imported modules, controllers, providers, and native plugins enter the AponiaFactory bootstrap process"
      >
        <defs>
          <filter id="mono-flow-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="mono-flow-ghosts" aria-hidden="true">
          {flowPaths.map((path, index) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke={flowColors[index]}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g filter="url(#mono-flow-glow)">
          {flowPaths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke={flowColors[index]}
              strokeLinecap="round"
              strokeWidth={index === 2 ? 5 : 3}
              vectorEffect="non-scaling-stroke"
              style={{
                pathLength: reducedMotion ? 1 : pathLengths[index],
              }}
            />
          ))}
        </g>
      </svg>

      <div className="mono-flow-source-labels" aria-hidden="true">
        <span>Root module</span>
        <span>Module imports</span>
        <span>Controllers</span>
        <span>Providers</span>
        <span>Native plugins</span>
      </div>

      <motion.div
        className="mono-flow-target"
        style={{ opacity: reducedMotion ? 1 : targetOpacity }}
      >
        <span>Bootstrap orchestrator</span>
        <strong>AponiaFactory.create()</strong>
      </motion.div>
    </div>
  );
}
