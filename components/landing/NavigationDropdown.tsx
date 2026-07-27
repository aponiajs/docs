'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import {
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

export interface NavigationDropdownItem {
  href: string;
  label: string;
  description: string;
  external?: boolean;
}

interface NavigationDropdownProps {
  label: string;
  items: NavigationDropdownItem[];
}

export function NavigationDropdown({
  label,
  items,
}: NavigationDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  function clearCloseTimer() {
    if (closeTimer.current === null) return;

    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function openDropdown() {
    clearCloseTimer();
    setOpen(true);
  }

  function closeDropdown() {
    clearCloseTimer();
    setOpen(false);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      if (dropdown.current?.contains(document.activeElement)) {
        closeTimer.current = null;
        return;
      }

      setOpen(false);
      closeTimer.current = null;
    }, 150);
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!dropdown.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== 'Escape') return;

      closeDropdown();
      trigger.current?.focus();
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimer.current !== null) {
        clearTimeout(closeTimer.current);
      }
    },
    [],
  );

  function handlePointerEnter(event: ReactPointerEvent<HTMLDivElement>) {
    const canHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;

    if (event.pointerType !== 'touch' && canHover) {
      openDropdown();
    }
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    const canHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;

    if (event.pointerType !== 'touch' && canHover) {
      scheduleClose();
    }
  }

  function handleTriggerClick(event: ReactMouseEvent<HTMLButtonElement>) {
    const openedWithKeyboard = event.detail === 0;
    const canHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;

    if (openedWithKeyboard || !canHover) {
      clearCloseTimer();
      setOpen((current) => !current);
      return;
    }

    openDropdown();
  }

  function handleTriggerKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    const focusFirstLink = event.key === 'ArrowDown';
    openDropdown();

    setTimeout(() => {
      const links = panel.current?.querySelectorAll<HTMLAnchorElement>('a');
      const lastLinkIndex = Math.max((links?.length ?? 1) - 1, 0);
      const link = links?.item(focusFirstLink ? 0 : lastLinkIndex);
      link?.focus();
    });
  }

  function closeWhenFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeDropdown();
    }
  }

  return (
    <div
      ref={dropdown}
      className="mono-nav-dropdown"
      data-open={open}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={openDropdown}
      onBlur={closeWhenFocusLeaves}
    >
      <button
        ref={trigger}
        type="button"
        className="mono-nav-dropdown-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{label}</span>
        <ChevronDown size={13} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <div
        id={panelId}
        className="mono-nav-dropdown-panel-shell"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <div ref={panel} className="mono-nav-dropdown-panel">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeDropdown}
                  >
                    <span>{item.label}</span>
                    <small>{item.description}</small>
                  </a>
                ) : (
                  <Link href={item.href} onClick={closeDropdown}>
                    <span>{item.label}</span>
                    <small>{item.description}</small>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
