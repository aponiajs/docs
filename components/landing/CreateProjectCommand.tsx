'use client';

import { Check, Clipboard, TriangleAlert } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const command = 'bun create aponia my-api';

export function CreateProjectCommand() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  async function copyCommand() {
    if (resetTimer.current !== null) {
      clearTimeout(resetTimer.current);
    }

    try {
      await navigator.clipboard.writeText(command);
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    resetTimer.current = window.setTimeout(() => {
      setStatus('idle');
      resetTimer.current = null;
    }, 1800);
  }

  const Icon =
    status === 'copied'
      ? Check
      : status === 'error'
        ? TriangleAlert
        : Clipboard;

  return (
    <div className="grid w-[min(100%,32rem)] grid-cols-[auto_minmax(0,1fr)] items-stretch border border-ink font-mark text-[clamp(0.85rem,1vw,1rem)] sm:grid-cols-[auto_minmax(0,1fr)_auto]">
      <span
        aria-hidden="true"
        className="inline-flex items-center border-r border-rule px-3 text-ink-faint sm:px-4"
      >
        $
      </span>
      <code className="inline-flex min-w-0 items-center overflow-x-auto px-3 py-2.5 tracking-[-0.01em] whitespace-nowrap text-ink sm:px-4 sm:py-3.5">
        {command}
      </code>
      <button
        type="button"
        onClick={copyCommand}
        aria-label="Copy project creation command"
        className="col-span-full inline-flex cursor-pointer items-center justify-center gap-2 border-t border-ink bg-ink px-4 py-3 text-[0.66rem] tracking-[0.1em] text-stock uppercase transition-colors duration-150 hover:bg-ink-soft active:translate-y-px sm:col-span-1 sm:justify-start sm:border-t-0 sm:border-l sm:py-0"
      >
        <Icon
          aria-hidden="true"
          strokeWidth={1.8}
          className="size-3.5 shrink-0"
        />
        <span aria-live="polite">
          {status === 'copied'
            ? 'Copied'
            : status === 'error'
              ? 'Copy failed'
              : 'Copy'}
        </span>
      </button>
    </div>
  );
}
