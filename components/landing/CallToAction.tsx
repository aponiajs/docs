import Image from 'next/image';
import Link from 'next/link';

import { artworkSources } from './artworkSources';

export function CallToAction() {
  const artwork = artworkSources.becauseOfAponiaFanArt;

  return (
    <>
      <section
        id="namesake"
        className="mono-namesake"
        aria-labelledby="namesake-title"
      >
        <figure className="mono-namesake-media">
          <div className="mono-namesake-frame mono-tick-frame">
            <Image
              src={artwork.src}
              alt={artwork.alt}
              fill
              loading="lazy"
              quality={95}
              sizes="(max-width: 767px) calc(100vw - 2rem), 96vw"
              className="mono-namesake-image"
            />
            <div className="mono-namesake-shade" aria-hidden="true" />
            <div className="mono-namesake-copy">
              <p className="mono-index-rail">
                <b>Namesake</b>
              </p>
              <h2 id="namesake-title">
                <span>Named</span>
                <span>after</span>
                <span>Aponia.</span>
              </h2>
              <p>
                Inspired by Aponia from Honkai Impact 3rd. Artwork and rights
                holders are credited below.
              </p>
            </div>
          </div>
          <figcaption className="mono-namesake-credit">
            <span>{artwork.credit}</span>
            <a
              href={artwork.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {artwork.sourceLabel} <span aria-hidden="true">↗</span>
            </a>
          </figcaption>
          <p className="mono-namesake-disclaimer" role="note">
            AponiaJS is an independent open-source project and is not affiliated
            with, endorsed by, or sponsored by HoYoverse or ElysiaJS.
          </p>
        </figure>
      </section>

      <footer className="mono-footer">
        <div className="mono-footer-meta">
          <p>
            Experimental alpha software. The framework source is released under
            the MIT License; dependencies and third-party artwork keep their own
            terms.
          </p>
          <div>
            <Link href="/docs">Documentation</Link>
            <a
              href="https://github.com/aponiajs/aponiajs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
            <a
              href="https://github.com/aponiajs/aponiajs/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
          </div>
          <p>Aponia character artwork © HoYoverse.</p>
        </div>
      </footer>
    </>
  );
}
