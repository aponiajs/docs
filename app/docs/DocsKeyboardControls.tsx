'use client';

import { useSidebar } from 'fumadocs-ui/layouts/docs/slots/sidebar';
import { useEffect } from 'react';

export function DocsKeyboardControls() {
  const { mode, open, setOpen } = useSidebar();

  useEffect(() => {
    if (mode !== 'drawer' || !open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) return;

      const trigger = document.querySelector<HTMLButtonElement>(
        'button[aria-controls="nd-sidebar-mobile"][aria-expanded="true"]',
      );

      event.preventDefault();
      setOpen(false);
      requestAnimationFrame(() => trigger?.focus());
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, open, setOpen]);

  return null;
}
