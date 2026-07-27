import Image from 'next/image';

import { artworkSources } from './artworkSources';

export function AponiaInterlude() {
  const artwork = artworkSources.mascotPortrait;

  return (
    <section
      className="mono-principle"
      aria-labelledby="principle-title"
    >
      <figure className="mono-principle-media">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          loading="lazy"
          quality={95}
          sizes="100vw"
          className="mono-principle-image"
        />
      </figure>
      <div className="mono-principle-shade" aria-hidden="true" />
      <div className="mono-principle-copy">
        <h2 id="principle-title">
          <span>Boundaries</span>
          <span>over</span>
          <span>boilerplate.</span>
        </h2>
        <p>
          Keep modules explicit, validate dependencies before startup, and
          leave Bun and Elysia in plain sight.
        </p>
      </div>
    </section>
  );
}
