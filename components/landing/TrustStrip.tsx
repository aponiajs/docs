import Image from 'next/image';

import { artworkSources } from './artworkSources';

export function TrustStrip() {
  const featureArtwork = artworkSources.characterIntroduction;
  const structureArtwork = artworkSources.storyStigmaPortrait;

  return (
    <section id="work" className="mono-work" aria-labelledby="work-title">
      <div className="mono-work-shell">
        <div className="mono-work-heading">
          <h2 id="work-title">Designed as a system, not a black box.</h2>
          <p>
            Every boundary stays visible, from the first module to the running
            application.
          </p>
        </div>
        <div className="mono-work-spread">
          <article className="mono-work-feature">
            <div className="mono-work-media mono-work-media-feature">
              <Image
                src={featureArtwork.src}
                alt={featureArtwork.alt}
                fill
                loading="eager"
                quality={95}
                sizes="(max-width: 767px) 100vw, 68vw"
                className="mono-work-image"
              />
            </div>
            <div className="mono-work-caption">
              <h3>A framework with a point of view</h3>
              <p>
                Bun native and TypeScript first, without hiding the runtime.
              </p>
              <p className="mono-work-credit">
                <span>{featureArtwork.credit}</span>
                <a
                  href={featureArtwork.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {featureArtwork.sourceLabel}{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
          </article>
          <article className="mono-work-structure">
            <div className="mono-work-media mono-work-media-structure">
              <Image
                src={structureArtwork.src}
                alt={structureArtwork.alt}
                fill
                loading="eager"
                quality={95}
                sizes="(max-width: 767px) 100vw, 32vw"
                className="mono-work-image"
              />
            </div>
            <div className="mono-work-caption">
              <h3>Architecture you can inspect</h3>
              <p>
                Modules, providers, and routes remain explicit as the system
                grows.
              </p>
              <p className="mono-work-credit">
                <span>{structureArtwork.credit}</span>
                <a
                  href={structureArtwork.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {structureArtwork.sourceLabel}{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
