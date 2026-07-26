import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="aponia-wordmark">
          <span>{appName}</span>
          <span className="aponia-wordmark-section">Docs</span>
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
      enabled: false,
    },
  };
}
