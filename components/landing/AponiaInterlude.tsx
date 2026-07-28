import Image from 'next/image';

import { artworkSources } from './artworkSources';

export function AponiaInterlude() {
  const artwork = artworkSources.birthdayArtwork;

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
        <figcaption className="mono-principle-credit">
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
      <div className="mono-principle-shade" aria-hidden="true" />
      <div className="mono-principle-copy">
        <p className="mono-index-rail">
          <b>Runtime strategy</b>
        </p>
        <h2 id="principle-title">
          <span>Boundaries</span>
          <span>over</span>
          <span>boilerplate.</span>
        </h2>
        <p>
          Validate module boundaries before Elysia starts.
        </p>
      </div>
    </section>
  );
}
