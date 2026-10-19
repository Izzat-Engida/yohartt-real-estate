'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { photos, type Photo } from '@/data/projects';
import { delay } from '@/lib/style';
import { usePinnedSequence, useRevealText } from '@/lib/scroll/hooks';
import { FloorExplorer } from '../FloorExplorer';
import { BuildingIcon, ClockIcon, LockIcon, PinIcon, ArrowRight } from '../icons';
import { LightboxLink } from '../LightboxLink';
import { ProcessScroller } from '../ProcessScroller';

/* ---------- Marquee ---------- */

const MARQUEE: { text: string; em?: boolean }[] = [
  { text: 'Residential towers' },
  { text: 'Addis Ababa' },
  { text: 'Engineered to last', em: true },
  { text: 'Built in the open' },
  { text: 'Delivered as promised', em: true },
];

export function Marquee() {
  // the list is rendered twice so the CSS loop is seamless
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span key={i} className="marquee__item">
            <span>{item.em ? <em>{item.text}</em> : item.text}</span>
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- About ---------- */

export function About() {
  const slides = [
    {
      eyebrow: 'About Yohartt',
      title: 'We believe a home should be built as carefully as it is sold.',
      text: 'From the first tied rebar to the final key handover, we stay on site — so the building you move into is the building we promised.',
      large: photos.towerRender,
      small: photos.structure,
      className: 'about-slide--statement',
    },
    {
      eyebrow: 'About Yohartt',
      title: 'Engineered',
      text: 'Reinforced-concrete structures, built strictly to the engineered drawings — floor after floor.',
      large: photos.rebar,
      small: photos.towerRender,
      className: 'about-slide--engineered',
    },
    {
      eyebrow: 'About Yohartt',
      title: 'Transparent',
      text: 'Progress you can see. We document every stage, from slab reinforcement to the finished facade.',
      large: photos.structure,
      small: photos.pour,
      className: 'about-slide--transparent',
    },
    {
      eyebrow: 'About Yohartt',
      title: 'Delivered',
      text: 'Finished, gated and ready to live in. Our track record is standing buildings, not just renderings.',
      large: photos.completed,
      small: photos.towerRender,
      className: 'about-slide--delivered',
    },
  ];
  const { sectionRef, progress, activeIndex: active, direction } = usePinnedSequence<HTMLElement>(slides.length);
  const revealRef = useRevealText<HTMLDivElement>();
  const sequenceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sequence = sequenceRef.current;
    if (!sequence || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const currentSlide = sequence.querySelector<HTMLElement>(`.about-slide:nth-child(${active + 1})`);
    if (!currentSlide) return;

    const textParts = Array.from(currentSlide.querySelectorAll<HTMLElement>(
      '.about-slide__eyebrow, h2, .about-slide__description, .about-slide__cta',
    ));
    const visual = currentSlide.querySelector<HTMLElement>('.about-slide__visual');
    const largeCard = currentSlide.querySelector<HTMLElement>('.about-slide__image--large');
    const smallCard = currentSlide.querySelector<HTMLElement>('.about-slide__image--small');
    const incomingX = direction === 1 ? 90 : -90;

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    gsap.killTweensOf([...textParts, visual, largeCard, smallCard].filter(Boolean));

    gsap.set(textParts, { autoAlpha: 0, y: 42 });
    if (visual) gsap.set(visual, { autoAlpha: 0, x: incomingX, scale: 1.06 });
    if (largeCard) gsap.set(largeCard, { x: direction === 1 ? 26 : -26, y: direction === 1 ? 12 : -12, rotate: direction === 1 ? 2 : -2, scale: 1.04 });
    if (smallCard) gsap.set(smallCard, { x: direction === 1 ? 44 : -44, y: direction === 1 ? -18 : 18, rotate: direction === 1 ? 5 : -5, scale: 0.88 });

    timeline
      .to(visual, { autoAlpha: 1, x: 0, scale: 1, duration: 1.25 }, 0)
      .to(largeCard, { x: 0, y: 0, rotate: 0, scale: 1, duration: 1.1 }, 0.08)
      .to(smallCard, { x: 0, y: 0, rotate: 0, scale: 1, duration: 1.2 }, 0.16)
      .to(textParts, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.11 }, 0.16);

    return () => {
      timeline.kill();
    };
  }, [active, direction]);

  return (
    <section className="about about-sequence" id="about" ref={sectionRef}>
      <div className="about-pin">
        <div className={`about-slides ${direction === 1 ? 'about-slides--forward' : 'about-slides--backward'}`} aria-live="polite" ref={(node) => { sequenceRef.current = node; revealRef.current = node; }}>
          {slides.map((slide, index) => (
            <article className={`about-slide ${slide.className} ${index === active ? 'is-active' : ''} ${index === active ? (direction === 1 ? 'is-forward' : 'is-backward') : ''}`} key={slide.title}>
              <div className="about-slide__text">
                <p className="about-slide__eyebrow">{slide.eyebrow}</p>
                <h2>{slide.title}</h2>
                <p className="about-slide__description">{slide.text}</p>
                <Link href="/projects/yohartt-tower" className="about-slide__cta">
                  View the project page
                  <ArrowRight />
                </Link>
              </div>
              <div className="about-slide__visual" aria-hidden="true">
                <div className="about-slide__image about-slide__image--large">
                  <Image src={slide.large.src} alt="" fill sizes="(max-width: 899px) 90vw, 52vw" placeholder="blur" />
                </div>
                <div className="about-slide__image about-slide__image--small">
                  <Image src={slide.small.src} alt="" fill sizes="(max-width: 899px) 42vw, 22vw" placeholder="blur" />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="about-progress" aria-label={`About slide ${String(active + 1).padStart(2, '0')} of 04`}>
          <span className="about-progress__track"><i style={{ transform: `scaleX(${progress})` }} /></span>
          <span>{String(active + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tower explorer ---------- */

export function TowerFacts() {
  return (
    <dl className="facts" data-reveal="">
      <div>
        <dt>
          <span data-count="14">14</span>
        </dt>
        <dd>Levels of homes</dd>
      </div>
      <div>
        <dt>G</dt>
        <dd>Covered parking &amp; arrival</dd>
      </div>
      <div>
        <dt>Glass</dt>
        <dd>Full-width glazing on every level</dd>
      </div>
      <div>
        <dt>AA</dt>
        <dd>Addis Ababa, Ethiopia</dd>
      </div>
    </dl>
  );
}

export function TowerSection() {
  return (
    <section className="tower" id="tower">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal="">
            <span>(02)</span> Featured development
          </p>
          <h2 className="display" data-reveal="">
            Yohartt <em>Tower</em>
          </h2>
          <p className="section-head__lead" data-reveal="">
            A G+14 residential tower with full-width glazing and a private balcony on every level. Hover over the
            building — or tap a floor — to explore it level by level.
          </p>
          <Link href="/projects/yohartt-tower" className="link-arrow" data-reveal="">
            View the project page
            <ArrowRight />
          </Link>
        </header>
        <FloorExplorer>
          <TowerFacts />
        </FloorExplorer>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

const STAGES: { photo: Photo; title: string; text: string }[] = [
  {
    photo: photos.structure,
    title: 'The structure rises',
    text: 'Columns and slabs go up floor by floor, wrapped in scaffolding and safety netting from day one.',
  },
  {
    photo: photos.rebar,
    title: 'Every slab, engineered',
    text: 'Reinforcement is laid and tied to the structural drawings, with conduits and services set in place before any concrete arrives.',
  },
  {
    photo: photos.pour,
    title: 'Poured with precision',
    text: 'Ready-mix concrete is pumped, spread and vibrated across the slab by a dedicated crew for a solid, monolithic floor.',
  },
  {
    photo: photos.completed,
    title: 'Finished & handed over',
    text: 'Clean facades, generous glazing and a secure gated entry — homes ready for families to move in.',
  },
];

export function ProcessSection() {
  return (
    <ProcessScroller count={STAGES.length} labels={STAGES.map((stage) => stage.title)}>
      {STAGES.map((stage, i) => (
        <article className="stage" key={stage.title}>
          <div className="stage__background" aria-hidden="true">
            <Image src={stage.photo.src} alt="" fill sizes="100vw" placeholder="blur" />
          </div>
          <div className="stage__shade" aria-hidden="true" />
          <div className="stage__content">
            <p className="stage__eyebrow">Process</p>
            <div className="stage__body">
              <span className="stage__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </div>
          </div>
          <LightboxLink photo={stage.photo} className="stage__media">
            <Image
              src={stage.photo.src}
              alt={stage.photo.alt}
              sizes="(max-width: 899px) 0px, 300px"
              placeholder="blur"
            />
          </LightboxLink>
        </article>
      ))}
    </ProcessScroller>
  );
}

/* ---------- Delivered ---------- */

export function DeliveredSection() {
  return (
    <section className="delivered" id="delivered">
      <div className="container delivered__grid">
        <LightboxLink photo={photos.completed} className="delivered__media" reveal="clip">
          <Image
            src={photos.completed.src}
            alt={photos.completed.alt}
            sizes="(max-width: 899px) 92vw, 560px"
            placeholder="blur"
            data-parallax="0.08"
          />
          <span className="delivered__stamp">Completed</span>
        </LightboxLink>

        <div className="delivered__copy">
          <p className="eyebrow" data-reveal="">
            <span>(04)</span> Delivered
          </p>
          <h2 className="display" data-reveal="">
            Not a rendering.
            <br />
            <em>A finished building.</em>
          </h2>
          <p className="delivered__lead" data-reveal="">
            Textured render and stone-look cladding, generous black-framed windows, private balconies and a secure
            gated entrance — completed and ready for residents.
          </p>
          <dl className="spec-list" data-reveal="">
            {[
              ['Status', 'Completed'],
              ['Type', 'Residential apartments'],
              ['Facade', 'Render & stone-look cladding'],
              ['Access', 'Gated, covered entry'],
              ['Location', 'Addis Ababa'],
            ].map(([dt, dd]) => (
              <div key={dt}>
                <dt>{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
          <Link href="/projects/completed-residence" className="link-arrow" data-reveal="">
            View the project
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Yohartt ---------- */

const COMMITMENTS = [
  { icon: <BuildingIcon />, title: 'Engineered structure', text: 'Reinforced-concrete frames designed by licensed engineers and built to the drawings.' },
  { icon: <ClockIcon />, title: 'Built in the open', text: 'Regular site updates so buyers can follow progress from foundation to finish.' },
  { icon: <PinIcon />, title: 'Prime Addis locations', text: 'Well-connected neighbourhoods with open city and mountain views.' },
  { icon: <LockIcon />, title: 'Delivered as promised', text: 'Clear timelines, transparent contracts and keys handed over on schedule.' },
];

export function WhySection() {
  return (
    <section className="why section--light" id="why">
      <div className="container">
        <header className="section-head section-head--row">
          <div>
            <p className="eyebrow" data-reveal="">
              <span>(05)</span> The Yohartt standard
            </p>
            <h2 className="display" data-reveal="">
              Why buyers
              <br />
              choose <em>Yohartt.</em>
            </h2>
          </div>
          <p className="section-head__lead" data-reveal="">
            Buying off-plan is about trust. Here is what we commit to on every project.
          </p>
        </header>
        <div className="cards">
          {COMMITMENTS.map((c, i) => (
            <article className="card" data-reveal="" data-tilt="" style={delay(i * 0.08)} key={c.title}>
              <div className="card__icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
