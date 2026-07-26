import Image from 'next/image';

const sourceUrl =
  'https://www.hoyolab.com/article/4612171';

export function HeroMascot() {
  return (
    <figure className="mascot-figure">
      <article className="mascot-stage">
        <div className="aponia-ray" aria-hidden="true" />
        <div className="aponia-wing aponia-wing-left" aria-hidden="true" />
        <div className="aponia-wing aponia-wing-right" aria-hidden="true" />
        <div className="mascot-image-wrap">
          <Image
            src="/images/aponia-reference.webp"
            alt="Aponia from Honkai Impact 3rd standing beneath soft light"
            fill
            priority
            sizes="(max-width: 1023px) 92vw, 44vw"
            className="mascot-image"
          />
        </div>
        <div className="aponia-portrait-vignette" aria-hidden="true" />
      </article>
      <figcaption className="mascot-credit">
        Aponia character artwork © HoYoverse.{' '}
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          Official reference
        </a>
      </figcaption>
    </figure>
  );
}
