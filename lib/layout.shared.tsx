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
        text: 'Project',
        url: '/docs',
        items: [
          {
            text: 'Getting started',
            description: 'Install, scaffold, and serve a first application',
            url: '/docs/getting-started',
            active: 'nested-url',
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
