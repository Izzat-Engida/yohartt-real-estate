import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer/Footer';
import { PointerFx } from '@/components/PointerFx';
import { EnquiryProvider } from '@/components/EnquiryContext';
import ProjectScrollAnimations from '@/components/ProjectScrollAnimations';
import { FloorExplorer } from '@/components/FloorExplorer';
import { Lightbox } from '@/components/Lightbox';
import { LightboxLink } from '@/components/LightboxLink';
import { TowerFacts } from '@/components/sections/Tower/Tower';
import { ArrowLeft, LongArrow } from '@/components/icons';
import { getProject, projects } from '@/data/projects';

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
      images: [
        {
          url: project.cover.src.src,
          width: project.cover.src.width,
          height: project.cover.src.height,
          alt: project.cover.alt,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextIndex = (projectIndex + 1) % projects.length;
  const nextProject = projects.length > 1 ? projects[nextIndex] : null;
  const live = project.status !== 'Completed';
  const [firstWord, ...restWords] = project.name.split(' ');
  const rest = restWords.join(' ');
  const heroPhoto = project.gallery[1] || project.gallery[0];
  const galleryPhotos = project.gallery.slice(1);

  const [nextFirstWord, ...nextRestWords] = nextProject?.name.split(' ') ?? [''];
  const nextRest = nextRestWords.join(' ');

  return (
    <EnquiryProvider initialInterest={project.enquiryInterest}>
      <Header />
      <PointerFx />
      <ProjectScrollAnimations />
      <main className="min-h-screen bg-pine-green text-cream selection:bg-accent selection:text-pine-green overflow-x-clip">
        {/* 01 — Project hero */}
        <section
          id="top"
          className="project-stage project-stage--hero"
          aria-labelledby="project-title"
        >
          <div className="project-stage__backdrop">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="100vw"
              className="project-bg"
            />
            <div className="project-stage__veil" />
          </div>

          <div className="wrapper project-stage__inner">
            <div className="project-topline project-fade">
              <Link href="/projects" className="project-back">
                <ArrowLeft />
                All projects
              </Link>
              <span className="project-topline__label">Project detail / {project.location}</span>
            </div>

            <div className="project-stage__grid">
              <div className="project-stage__copy">
                <div className="project-meta project-fade">
                  <span
                    className={`project-meta__dot${
                      live ? '' : ' project-meta__dot--done'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{project.status}</span>
                  <span>{project.type}</span>
                  <span>{project.location}</span>
                </div>

                <h1
                  id="project-title"
                  className="hero project-stage__title project-heading"
                >
                  {firstWord}
                  {rest && (
                    <>
                      {' '}
                      <em>{rest}</em>
                    </>
                  )}
                </h1>

                <p className="project-stage__tagline project-copy">{project.tagline}</p>
                <p className="project-stage__summary project-copy">{project.summary}</p>

                <div className="project-actions project-fade">
                  <a href="#contact" className="project-cta">
                    Enquire about {project.name}
                    <LongArrow />
                  </a>
                  {project.floorExplorer && (
                    <a href="#tower" className="project-text-link">
                      Floor explorer
                    </a>
                  )}
                </div>
              </div>

              <figure className="project-stage__media project-media project-media-reveal">
                <LightboxLink photo={heroPhoto} className="project-media__frame">
                  <Image
                    src={heroPhoto.src}
                    alt={heroPhoto.alt}
                    fill
                    sizes="(max-width: 1120px) 80vw, 28vw"
                  />
                </LightboxLink>
                <figcaption>{heroPhoto.caption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 02 — At a glance */}
        <section
          className="project-chapter project-chapter--light"
          aria-labelledby="glance-title"
        >
          <div className="wrapper">
            <div className="project-chapter__head">
              <div>
                <p className="project-eyebrow">
                  <span>(02)</span>
                  At a glance
                </p>
                <h2 id="glance-title" className="heading-1 project-chapter__title project-heading">
                  Key <em>facts</em>
                </h2>
              </div>
              <p className="project-chapter__lead">
                A closer look at the specifications and the details that define {project.name}.
              </p>
            </div>

            <div className="project-chapter__grid">
              <div className="project-specs project-fade">
                <p className="project-chapter__label">Specifications</p>
                <dl>
                  {project.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="project-highlights project-fade">
                <p className="project-chapter__label">Highlights</p>
                <ol>
                  {project.highlights.map((highlight, index) => (
                    <li key={highlight}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{highlight}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Gallery */}
        {galleryPhotos.length > 0 && (
          <section className="project-gallery" id="gallery" aria-labelledby="gallery-title">
            <div className="wrapper">
              <div className="project-gallery__head">
                <div>
                  <p className="project-eyebrow">
                    <span>(03)</span>
                    Visual record
                  </p>
                  <h2 id="gallery-title" className="hero project-gallery__title project-heading">
                    Gallery <em>&amp; impressions</em>
                  </h2>
                </div>
                <p className="project-gallery__lead">
                  Architectural photographs and renderings. Select any frame to view it in full.
                </p>
              </div>

              <div className="project-mosaic">
                {galleryPhotos.slice(0, 3).map((photo, index) => (
                  <figure
                    key={photo.src.src}
                    className="project-mosaic__item project-media-reveal"
                  >
                    <LightboxLink photo={photo} className="project-mosaic__link">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 600px) 100vw, 55vw"
                      />
                    </LightboxLink>
                    <figcaption>
                      <span>
                        {String(index + 1).padStart(2, '0')} / {photo.caption}
                      </span>
                      <span>{project.name}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 04 — Floor explorer */}
        {project.floorExplorer && (
          <section
            className="tower-explorer project-tower"
            id="tower"
            aria-labelledby="tower-title"
          >
            <header className="tower-explorer__intro">
              <div className="tower-explorer__heading">
                <p className="tower-explorer__eyebrow">(04) Floor by floor</p>
                <h2 id="tower-title" className="tower-explorer__title">
                  Choose your
                  <br />
                  <em>level.</em>
                </h2>
              </div>
              <div className="tower-explorer__copy">
                <p className="tower-explorer__lead">
                  A home in the sky, shaped around light, air, and the city beyond.
                </p>
                <p className="tower-explorer__desc">
                  Select any floor of the building to explore its layout and character, then send us
                  an enquiry for the level you like.
                </p>
              </div>
            </header>

            <div className="tower-explorer__right">
              <FloorExplorer interest={project.enquiryInterest}>
                <TowerFacts />
              </FloorExplorer>
            </div>
          </section>
        )}

        {/* Next project */}
        {nextProject && (
          <section className="project-next" aria-labelledby="next-project-title">
            <div className="project-next__backdrop">
              <Image
                src={nextProject.cover.src}
                alt={nextProject.cover.alt}
                fill
                sizes="100vw"
                className="project-bg"
              />
              <div className="project-next__veil" />
            </div>

            <div className="wrapper project-next__inner">
              <div className="project-next__top project-fade">
                <p className="project-eyebrow">Next in the portfolio</p>
                <span className="project-topline__label">
                  {String(nextIndex + 1).padStart(2, '0')} / {nextProject.location}
                </span>
              </div>

              <div className="project-next__body">
                <h2
                  id="next-project-title"
                  className="hero project-next__title project-heading"
                >
                  {nextFirstWord}
                  {nextRest && (
                    <>
                      {' '}
                      <em>{nextRest}</em>
                    </>
                  )}
                </h2>

                <div className="project-next__aside">
                  <p className="project-copy">{nextProject.tagline}</p>
                  <Link href={`/projects/${nextProject.slug}`} className="project-cta">
                    View project
                    <LongArrow />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <Lightbox />
        <Footer />
      </main>
    </EnquiryProvider>
  );
}
