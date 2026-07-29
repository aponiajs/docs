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
    <div className="project-command">
      <span aria-hidden="true" className="project-prompt">
        $
      </span>
      <code>{command}</code>
      <button
        type="button"
        onClick={copyCommand}
        aria-label="Copy project creation command"
      >
        <Icon aria-hidden="true" strokeWidth={1.8} />
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
