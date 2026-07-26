import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpenText } from 'lucide-react';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="aponia-nav-mark grid size-7 place-items-center text-xs font-extrabold">
            A
          </span>
          {appName}
        </span>
      ),
      transparentMode: 'top',
    },
    links: [
      {
        type: 'main',
        text: 'Documentation',
        url: '/docs',
        icon: <BookOpenText />,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
