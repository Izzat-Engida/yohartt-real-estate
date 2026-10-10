import Image from 'next/image';
import Link from 'next/link';
import { photos, type Photo } from '@/data/projects';
import { delay } from '@/lib/style';
import { FloorExplorer } from '../FloorExplorer';
import { BuildingIcon, ClockIcon, LockIcon, PinIcon, ArrowDown, ArrowRight } from '../icons';
import { LightboxLink } from '../LightboxLink';
import { Manifesto } from '../Manifesto';
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

const PRINCIPLES = [
  { title: 'Engineered', text: 'Reinforced-concrete structures, built strictly to the engineered drawings — floor after floor.' },
  { title: 'Transparent', text: 'Progress you can see. We document every stage, from slab reinforcement to the finished facade.' },
  { title: 'Delivered', text: 'Finished, gated and ready to live in. Our track record is standing buildings, not just renderings.' },
];

export function About() {
  return (
    <section className="about section--light" id="about">
      <div className="container">
        <p className="eyebrow" data-reveal="">
          <span>(01)</span> About Yohartt
        </p>
        <Manifesto
          segments={[
            {
              text: 'We believe a home should be built as carefully as it is sold. From the first tied rebar to the final key handover, we stay on site — so the building you move into is the building we',
            },
            { text: 'promised.', em: true },
          ]}
        />
        <div className="principles">
          {PRINCIPLES.map((p, i) => (
            <article className="principle" data-reveal="" style={delay(i * 0.1)} key={p.title}>
              <span className="principle__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
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

const STAGES: { photo: Photo; title: string; text: string; wide?: boolean }[] = [
  {
    photo: photos.structure,
    title: 'The structure rises',
    text: 'Columns and slabs go up floor by floor, wrapped in scaffolding and safety netting from day one.',
  },
  {
    photo: photos.rebar,
    title: 'Every slab, engineered',
    text: 'Reinforcement is laid and tied to the structural drawings, with conduits and services set in place before any concrete arrives.',
    wide: true,
  },
  {
    photo: photos.pour,
    title: 'Poured with precision',
    text: 'Ready-mix concrete is pumped, spread and vibrated across the slab by a dedicated crew for a solid, monolithic floor.',
    wide: true,
  },
];

export function ProcessSection() {
  return (
    <ProcessScroller count={STAGES.length + 1}>
      <div className="process__intro">
        <p className="eyebrow">
          <span>(03)</span> Built in the open
        </p>
        <h2 className="display">
          From rebar
          <br />
          to <em>rooftop.</em>
        </h2>
        <p>Every Yohartt building moves through the same disciplined sequence. Keep scrolling to walk the site with us.</p>
        <span className="process__hint" aria-hidden="true">
          Scroll
          <ArrowRight />
        </span>
      </div>

      {STAGES.map((stage, i) => (
        <article className={stage.wide ? 'stage stage--wide' : 'stage'} key={stage.title}>
          <LightboxLink photo={stage.photo} className="stage__media">
            <Image
              src={stage.photo.src}
              alt={stage.photo.alt}
              sizes={stage.wide ? '(max-width: 899px) 92vw, 840px' : '(max-width: 899px) 92vw, 480px'}
              placeholder="blur"
            />
          </LightboxLink>
          <div className="stage__body">
            <span className="stage__num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </div>
        </article>
      ))}

      <article className="stage stage--final">
        <a className="stage__final" href="#delivered">
          <span className="stage__num">{String(STAGES.length + 1).padStart(2, '0')}</span>
          <h3>Finished &amp; handed over</h3>
          <p>Clean facades, generous glazing and a secure gated entry — homes ready for families to move in.</p>
          <span className="stage__final-link">
            See a delivered building
            <ArrowDown />
          </span>
        </a>
      </article>
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
