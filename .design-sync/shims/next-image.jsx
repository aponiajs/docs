// design-sync shim for `next/image`.
//
// Same reason as next-link.jsx: next/image pulls Next's image runtime, which
// reads process.env.__NEXT_IMAGE_OPTS and friends and crashes the bundle.
//
// It also stands in for Next's asset pipeline. Components reference public/
// assets by absolute path; nothing serves that root in a preview or rendered
// design, so esbuild inlines imported canonical assets as data URIs here.
// Keep PUBLIC_ASSETS in step with any public/ asset a synced component renders.
/* oxlint-disable next/no-img-element -- standalone previews cannot use Next.js image optimization */
import { forwardRef } from 'react';
import canonicalMark from '../../public/brand/aponiajs-mark.png';

const PUBLIC_ASSETS = {
  '/brand/aponiajs-mark.png': canonicalMark,
};

const Image = forwardRef(function Image(
  {
    src,
    alt,
    width,
    height,
    style,
    // Next-only props — intentionally not forwarded to the DOM.
    fill,
    priority: _priority,
    quality: _quality,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    loader: _loader,
    unoptimized: _unoptimized,
    sizes: _sizes,
    overrideSrc: _overrideSrc,
    ...rest
  },
  ref,
) {
  const raw = typeof src === 'string' ? src : (src?.src ?? '');
  const resolved = PUBLIC_ASSETS[raw] ?? raw;

  const fillStyle = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }
    : null;

  return (
    <img
      ref={ref}
      src={resolved}
      alt={alt ?? ''}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      style={fillStyle ? { ...fillStyle, ...style } : style}
      {...rest}
    />
  );
});

export default Image;
