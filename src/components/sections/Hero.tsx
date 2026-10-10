import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/data/projects';
import { site } from '@/data/site';
import { ArrowDown, ArrowRight } from '../icons';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid-lines" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__copy">
          <Link href="/projects/yohartt-tower" className="pill" data-hero="">
            <span className="pill__dot" />
            Yohartt Tower — now accepting enquiries
          </Link>

          <h1 className="hero__title">
            <span className="line">
              <span data-hero="">Raising</span>
            </span>
            <span className="line">
              <span data-hero="">Addis,</span>
            </span>
            <span className="line">
              <span data-hero="">
                floor by <em>floor.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lead" data-hero="">
            {site.name} develops modern residential towers in Addis Ababa — engineered with care, built in the open,
            and delivered as promised.
          </p>

          <div className="hero__actions" data-hero="">
            <a href="#tower" className="btn btn--accent magnetic">
              Explore the tower
              <ArrowRight />
            </a>
            <a href="#process" className="btn btn--ghost magnetic">
              Watch us build
            </a>
          </div>

          <dl className="hero__meta" data-hero="">
            <div>
              <dt>G+14</dt>
              <dd>Flagship tower</dd>
            </div>
            <div>
              <dt>On site</dt>
              <dd>Building now</dd>
            </div>
            <div>
              <dt>{site.city}</dt>
              <dd>{site.country}</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <figure className="hero__arch">
            <div className="media">
              <Image
                src={photos.towerRender.src}
                alt={photos.towerRender.alt}
                sizes="(max-width: 899px) 80vw, 460px"
                placeholder="blur"
                preload
                data-parallax="-0.06"
              />
            </div>
            <figcaption className="glass-card">
              <span className="glass-card__label">Featured</span>
              <strong>Yohartt Tower</strong>
              <span>G+14 residences · {site.city}</span>
            </figcaption>
          </figure>

          <figure className="hero__inset">
            <Image src={photos.pour.src} alt={photos.pour.alt} sizes="240px" placeholder="blur" />
            <figcaption>
              <span className="live-dot" />
              On site now
            </figcaption>
          </figure>

          <a href="#about" className="badge-rotate" aria-label="Scroll to explore">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="circlePath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#circlePath" textLength="286" lengthAdjust="spacing">
                  Scroll to explore · Yohartt ·{' '}
                </textPath>
              </text>
            </svg>
            <span className="badge-rotate__arrow">
              <ArrowDown />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
