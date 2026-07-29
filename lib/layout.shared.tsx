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
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    themeSwitch: {
      enabled: true,
      mode: 'light-dark-system',
    },
  };
}
