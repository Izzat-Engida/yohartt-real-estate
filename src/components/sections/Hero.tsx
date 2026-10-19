import Image from 'next/image';
import { photos } from '@/data/projects';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__visual">
        <Image
          src={photos.towerRender.src}
          alt={photos.towerRender.alt}
          sizes="100vw"
          placeholder="blur"
          preload
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__wordmark" aria-hidden="true">
          Yohartt
        </div>
      </div>
    </section>
  );
}

