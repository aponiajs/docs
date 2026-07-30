'use client';

import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import {
  type CSSProperties,
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
        className="hidden h-full cursor-pointer items-center gap-1.5 border-l border-rule px-4 tracking-[0.1em] text-ink-faint uppercase transition-colors duration-150 hover:bg-ink hover:text-stock aria-expanded:bg-ink aria-expanded:text-stock lg:inline-flex [&[aria-expanded=true]_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-300 active:translate-y-px"
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
          className="mono-mega-panel border-b border-ink bg-stock"
          onKeyDown={handlePanelKeyDown}
        >
          {/* One feature track plus one track per column, so the panel holds a
              single row whatever it is given. */}
          <div
            className="grid grid-cols-[minmax(0,1.2fr)_repeat(var(--mega-columns),minmax(0,1fr))]"
            style={{ '--mega-columns': columns.length } as CSSProperties}
          >
            <MegaFeature feature={feature} onNavigate={closeMenu} />

            {columns.map((column) => (
              <section
                key={column.label}
                className="min-w-0 border-l border-rule px-[1.15rem] pt-5 pb-6"
              >
                <h3 className="mb-3 pl-2 font-mark text-[0.62rem] font-medium tracking-[0.16em] text-ink-faint uppercase">
                  {column.label}
                </h3>
                <ul className="grid">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <MegaLink link={link} onNavigate={closeMenu} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-sunk px-[1.35rem] py-2.5">
            <p className="max-w-[64ch] font-mark text-[0.68rem] leading-[1.45] text-ink-faint">
              {note}
            </p>
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
    <Link
      href={feature.href}
      className="group grid content-start gap-2 bg-sunk px-[1.35rem] pt-5 pb-6 text-ink transition-colors duration-150 hover:bg-ink hover:text-stock active:translate-y-px"
      onClick={onNavigate}
    >
      <span className="mono-mega-eyebrow inline-flex items-center gap-2 font-mark text-[0.6rem] tracking-[0.18em] uppercase">
        {feature.eyebrow}
      </span>
      <strong className="text-[0.98rem] leading-[1.2] font-semibold tracking-[-0.025em]">
        {feature.title}
      </strong>
      <small className="text-[0.74rem] leading-[1.5] opacity-70">
        {feature.description}
      </small>
      <span className="flex flex-wrap gap-1.5">
        {feature.meta.map((entry) => (
          <span
            key={entry}
            className="border border-current px-1.5 py-0.5 font-mark text-[0.6rem] opacity-70"
          >
            {entry}
          </span>
        ))}
      </span>
      <span className="mt-0.5 inline-flex items-center gap-1.5 font-mark text-[0.66rem] font-semibold tracking-[0.06em] uppercase">
        Open the docs
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-1"
        />
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
  const base =
    'group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-ink transition-colors duration-150 hover:bg-ink hover:text-stock focus-visible:bg-ink focus-visible:text-stock active:translate-y-px';
  const className = compact
    ? `${base} px-1.5 py-1 font-mark`
    : `${base} px-2 py-2`;
  const iconClass =
    'text-rule transition duration-150 group-hover:translate-x-0.5 group-hover:text-stock';
  const icon = link.external ? (
    <ArrowUpRight
      size={14}
      strokeWidth={1.5}
      aria-hidden="true"
      className={iconClass}
    />
  ) : (
    <ArrowRight
      size={14}
      strokeWidth={1.5}
      aria-hidden="true"
      className={iconClass}
    />
  );

  const body = (
    <>
      <span className="grid min-w-0 gap-0.5">
        <strong
          className={
            compact
              ? 'text-[0.68rem] font-semibold tracking-[0.08em] uppercase'
              : 'text-[0.8rem] leading-[1.25] font-semibold'
          }
        >
          {link.label}
        </strong>
        {compact ? null : (
          <small className="text-[0.7rem] leading-[1.4] text-ink-faint group-hover:text-stock">
            {link.description}
          </small>
        )}
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
