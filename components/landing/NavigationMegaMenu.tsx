'use client';

import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import {
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

export interface MegaMenuLink {
  href: string;
  label: string;
  description: string;
  external?: boolean;
  staticFile?: boolean;
}

export interface MegaMenuColumn {
  label: string;
  links: MegaMenuLink[];
}

export interface MegaMenuFeature {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  staticFile?: boolean;
}

interface NavigationMegaMenuProps {
  label: string;
  feature: MegaMenuFeature;
  columns: MegaMenuColumn[];
  note: string;
  footerLink: MegaMenuLink;
}

/**
 * Horizontal mega menu: the panel spans the navigation shell rather than the
 * trigger, so the featured entry and every grouped link stay on one row. Hover
 * opens it on fine pointers only; click and the keyboard drive it everywhere.
 */
export function NavigationMegaMenu({
  label,
  feature,
  columns,
  note,
  footerLink,
}: NavigationMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>(0);
  const panelId = useId();

  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current !== 0) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = 0;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearHoverTimer();
    setOpen(false);
  }, [clearHoverTimer]);

  useEffect(() => clearHoverTimer, [clearHoverTimer]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== 'Escape') return;

      setOpen(false);
      trigger.current?.focus();
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function usesHoverPointer() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  function handlePointerEnter() {
    if (!usesHoverPointer()) return;

    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => setOpen(true), 90);
  }

  function handlePointerLeave() {
    if (!usesHoverPointer()) return;

    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => setOpen(false), 180);
  }

  function handleTriggerClick() {
    clearHoverTimer();
    setOpen((current) => !current);
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    const focusFirstLink = event.key === 'ArrowDown';
    setOpen(true);

    setTimeout(() => {
      const links = panel.current?.querySelectorAll<HTMLAnchorElement>('a');
      const lastLinkIndex = Math.max((links?.length ?? 1) - 1, 0);
      links?.item(focusFirstLink ? 0 : lastLinkIndex)?.focus();
    });
  }

  function closeWhenFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeMenu();
    }
  }

  function handlePanelKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return;
    }

    const links = [...(panel.current?.querySelectorAll('a') ?? [])];
    if (links.length === 0) return;

    event.preventDefault();
    const currentIndex = links.findIndex(
      (link) => link === document.activeElement,
    );
    let nextIndex = currentIndex;

    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = links.length - 1;
    if (event.key === 'ArrowDown') {
      nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % links.length;
    }
    if (event.key === 'ArrowUp') {
      nextIndex =
        currentIndex < 0
          ? links.length - 1
          : (currentIndex - 1 + links.length) % links.length;
    }

    links[nextIndex]?.focus();
  }

  return (
    <div
      ref={root}
      className="mono-mega"
      data-open={open}
      onBlur={closeWhenFocusLeaves}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        ref={trigger}
        type="button"
        className="mono-mega-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{label}</span>
        <ChevronDown size={13} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <div
        id={panelId}
        className="mono-mega-shell"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          ref={panel}
          className="mono-mega-panel"
          onKeyDown={handlePanelKeyDown}
        >
          <div className="mono-mega-grid">
            <MegaFeature feature={feature} onNavigate={closeMenu} />

            {columns.map((column) => (
              <section key={column.label} className="mono-mega-column">
                <h3>{column.label}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <MegaLink link={link} onNavigate={closeMenu} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mono-mega-footer">
            <p>{note}</p>
            <MegaLink link={footerLink} onNavigate={closeMenu} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaFeature({
  feature,
  onNavigate,
}: {
  feature: MegaMenuFeature;
  onNavigate: () => void;
}) {
  return (
    <Link href={feature.href} className="mono-mega-feature" onClick={onNavigate}>
      <span className="mono-mega-feature-eyebrow">{feature.eyebrow}</span>
      <strong>{feature.title}</strong>
      <small>{feature.description}</small>
      <span className="mono-mega-feature-meta">
        {feature.meta.map((entry) => (
          <span key={entry}>{entry}</span>
        ))}
      </span>
      <span className="mono-mega-feature-cta">
        Read the paper
        <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </Link>
  );
}

function MegaLink({
  link,
  onNavigate,
  compact = false,
}: {
  link: MegaMenuLink;
  onNavigate: () => void;
  compact?: boolean;
}) {
  const className = compact ? 'mono-mega-link mono-mega-link-compact' : 'mono-mega-link';
  const icon = link.external ? (
    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
  ) : (
    <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
  );

  const body = (
    <>
      <span className="mono-mega-link-copy">
        <strong>{link.label}</strong>
        {compact ? null : <small>{link.description}</small>}
      </span>
      {icon}
    </>
  );

  if (link.external || link.staticFile) {
    return (
      <a
        href={link.href}
        className={className}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        aria-label={
          link.external ? `${link.label} (opens in a new tab)` : undefined
        }
        onClick={onNavigate}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {body}
    </Link>
  );
}
