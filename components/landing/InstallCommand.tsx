'use client';

import { Check, Clipboard, TriangleAlert } from 'lucide-react';
import { useState } from 'react';

const command = 'bun add @aponiajs/core @aponiajs/common';

export function InstallCommand() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 1800);
    } catch {
      setStatus('error');
    }
  }

  const Icon =
    status === 'copied'
      ? Check
      : status === 'error'
        ? TriangleAlert
        : Clipboard;

  return (
    <div className="install-command">
      <span aria-hidden="true" className="install-prompt">
        $
      </span>
      <code>{command}</code>
      <button type="button" onClick={copyCommand} aria-label="Copy install command">
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
