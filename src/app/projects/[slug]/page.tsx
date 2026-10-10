import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EnquiryProvider } from '@/components/EnquiryContext';
import { FloorExplorer } from '@/components/FloorExplorer';
import { ArrowLeft, ArrowRight } from '@/components/icons';
import { LightboxLink } from '@/components/LightboxLink';
import { ContactSection } from '@/components/sections/Contact';
import { TowerFacts } from '@/components/sections/HomeSections';
import { getProject, projects } from '@/data/projects';
import { delay } from '@/lib/style';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.tagline} ${project.summary}`,
    openGraph: {
      title: `${project.name} · Yohartt Real Estate`,
      description: project.tagline,
      images: [{ url: project.cover.src.src, width: project.cover.src.width, height: project.cover.src.height, alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug);
  const live = project.status !== 'Completed';
  const [firstWord, ...rest] = project.name.split(' ');

  return (
    <EnquiryProvider initialInterest={project.enquiryInterest}>
      <section className="project-hero" id="top">
        <div className="hero__glow" aria-hidden="true" />
        <div className="container project-hero__grid">
          <div className="project-hero__copy">
            <Link href="/" className="back-link" data-hero="">
              <ArrowLeft />
              All of Yohartt
            </Link>
            <p className="pill pill--static" data-hero="">
              <span className={live ? 'pill__dot' : 'pill__dot pill__dot--done'} />
              {project.status} · {project.type}
            </p>
            <h1 className="display display--xl project-hero__title" data-hero="">
              {firstWord} {rest.length > 0 && <em>{rest.join(' ')}</em>}
            </h1>
            <p className="project-hero__tagline" data-hero="">
              {project.tagline}
            </p>
            <p className="project-hero__summary" data-hero="">
              {project.summary}
            </p>
            <div className="hero__actions" data-hero="">
              <a href="#contact" className="btn btn--accent magnetic">
                Enquire about {project.name}
                <ArrowRight />
              </a>
            </div>
          </div>

          <LightboxLink photo={project.cover} className="project-hero__cover">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              sizes="(max-width: 899px) 92vw, 520px"
              placeholder="blur"
              preload
              data-parallax="-0.05"
            />
          </LightboxLink>
        </div>
      </section>

      <section className="project-details">
        <div className="container project-details__grid">
          <div>
            <p className="eyebrow" data-reveal="">
              <span>(01)</span> At a glance
            </p>
            <dl className="spec-list" data-reveal="">
              {project.specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow" data-reveal="">
              <span>(02)</span> Highlights
            </p>
            <ul className="highlights">
              {project.highlights.map((h, i) => (
                <li key={h} data-reveal="" style={delay(i * 0.06)}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {project.floorExplorer && (
        <section className="tower" id="tower">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal="">
                <span>(03)</span> Floor by floor
              </p>
              <h2 className="display" data-reveal="">
                Choose your <em>level.</em>
              </h2>
              <p className="section-head__lead" data-reveal="">
                Hover over the building — or tap a floor — then send us an enquiry for the level you like.
              </p>
            </header>
            <FloorExplorer interest={project.enquiryInterest}>
              <TowerFacts />
            </FloorExplorer>
          </div>
        </section>
      )}

      {project.gallery.length > 1 && (
        <section className="project-gallery">
          <div className="container gallery-grid">
            {project.gallery.map((photo) => (
              <LightboxLink key={photo.src.src} photo={photo} className="gallery-grid__item" reveal="clip">
                <Image src={photo.src} alt={photo.alt} sizes="(max-width: 899px) 92vw, 640px" placeholder="blur" />
              </LightboxLink>
            ))}
          </div>
        </section>
      )}

      <ContactSection label={project.floorExplorer ? '(04)' : '(03)'} />

      {others.length > 0 && (
        <section className="more-projects">
          <div className="container">
            <p className="eyebrow" data-reveal="">
              More from Yohartt
            </p>
            <div className="more-projects__grid">
              {others.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card" data-reveal="" data-cursor="Open">
                  <div className="project-card__media">
                    <Image src={p.cover.src} alt={p.cover.alt} sizes="(max-width: 899px) 92vw, 420px" placeholder="blur" />
                  </div>
                  <div className="project-card__body">
                    <span className="project-card__status">{p.status}</span>
                    <h3>{p.name}</h3>
                    <p>{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </EnquiryProvider>
  );
}
