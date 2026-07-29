// design-sync shim for `next/link`.
//
// The real next/link drags in Next's client router (add-base-path, resolve-href,
// use-intersection, …), which reads ~15 `process.env.__NEXT_*` values that don't
// exist outside a Next build. Bundling it crashes the IIFE before it can assign
// window.AponiaJS, so every component fails [BUNDLE_EXPORT].
//
// A design agent building UI wants an anchor, not a router. This renders one and
// drops the Next-only props so React doesn't warn about unknown DOM attributes.
import { forwardRef } from 'react';

const Link = forwardRef(function Link(
  {
    href,
    children,
    // Next-only props — intentionally not forwarded to the DOM.
    replace: _replace,
    scroll: _scroll,
    shallow: _shallow,
    passHref: _passHref,
    prefetch: _prefetch,
    locale: _locale,
    legacyBehavior: _legacyBehavior,
    onNavigate: _onNavigate,
    ...rest
  },
  ref,
) {
  const to =
    typeof href === 'string'
      ? href
      : `${href?.pathname ?? ''}${href?.hash ?? ''}` || '#';

  return (
    <a ref={ref} href={to} {...rest}>
      {children}
    </a>
  );
});

export default Link;
