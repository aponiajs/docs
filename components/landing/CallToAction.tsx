import Link from 'next/link';
import Image from 'next/image';

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
                <b>05</b> Namesake
              </p>
              <h2 id="namesake-title">
                <span>Build</span>
                <span>with</span>
                <span>intention.</span>
              </h2>
              <p>
                Start with the core concepts, then compose the application
                around boundaries you can explain.
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
            with, endorsed by, or sponsored by HoYoverse.
          </p>
        </figure>
      </section>

      <footer className="mono-footer">
        <div className="mono-footer-lead">
          <p>Keep the architecture visible.</p>
          <Link href="/docs">
            Read docs <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="mono-footer-meta">
          <p>AponiaJS. Released under the MIT License.</p>
          <div>
            <a
              href="https://github.com/aponiajs/aponiajs"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <p>Aponia character artwork © HoYoverse.</p>
        </div>
      </footer>
    </>
  );
}
