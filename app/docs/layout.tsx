import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsKeyboardControls } from './DocsKeyboardControls';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      containerProps={{ className: 'aponia-docs' }}
      {...baseOptions()}
    >
      <DocsKeyboardControls />
      {children}
    </DocsLayout>
  );
}
