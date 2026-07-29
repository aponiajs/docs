import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AponiaLogo } from '@/components/brand/AponiaLogo';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="aponia-wordmark">
          <AponiaLogo context="docs" />
        </span>
      ),
      url: '/docs',
      transparentMode: 'none',
    },
    links: [
      {
        type: 'main',
        text: 'Home',
        url: '/',
        active: 'none',
      },
      {
        type: 'menu',
        text: 'Goal',
        url: '/goal',
        items: [
          {
            text: 'The goal',
            description:
              'Compiling Nest-style authoring down to native Elysia speed',
            url: '/goal',
            active: 'url',
          },
          {
            text: 'Full report',
            description: 'Complete technical report in Markdown',
            url: '/research.md',
            external: true,
          },
          {
            text: 'Benchmark suite',
            description: 'How the published measurements are produced',
            url: '/docs/benchmark',
            active: 'nested-url',
          },
        ],
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    themeSwitch: {
      enabled: true,
      mode: 'light-dark-system',
    },
  };
}
