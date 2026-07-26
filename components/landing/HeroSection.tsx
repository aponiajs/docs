import Image from 'next/image';

import { artworkSources } from './artworkSources';

export function HeroSection() {
  const artwork = artworkSources.storyStigmaWide;

  return (
    <section id="top" className="mono-hero" aria-labelledby="hero-title">
      <figure className="mono-hero-artwork">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="mono-hero-media"
        />
        <figcaption className="mono-hero-credit">
          <span>{artwork.credit}</span>
          <a
            href={artwork.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {artwork.sourceLabel} <span aria-hidden="true">↗</span>
          </a>
        </figcaption>
      </figure>
      <div className="mono-hero-shade" aria-hidden="true" />
      <div className="mono-hero-copy">
        <h1 id="hero-title">
          <span>Composed,</span>
          <span>Unbound.</span>
        </h1>
        <div className="mono-hero-note">
          <p>
            A modular TypeScript framework built for Bun, Elysia, and
            architecture you can inspect.
          </p>
        </div>
      </div>
    </section>
  );
}
