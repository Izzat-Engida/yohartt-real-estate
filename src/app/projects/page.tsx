import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer/Footer';
import { PointerFx } from '@/components/PointerFx';
import { ArrowLeft, ArrowRight } from '@/components/icons';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: `Projects · ${site.name}`,
  description: `Explore our residential developments and completed projects across Addis Ababa.`,
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <PointerFx />
      <main className="min-h-screen bg-[#2e3a26] text-cream">
        {/* Hero */}
        <section className="relative px-6 pt-36 pb-16 md:px-12 lg:px-20 lg:pt-44">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="back-link mb-8 inline-flex items-center gap-2 text-sm text-[#d1d5db] transition-colors hover:text-[#e5c378]"
            >
              <ArrowLeft />
              Back to Home
            </Link>
            <p className="kicker text-sm uppercase tracking-widest text-[#e5c378]">
              Portfolio &amp; Developments
            </p>
            <h1 className="mt-4 font-serif text-5xl font-light uppercase tracking-tight md:text-7xl lg:text-8xl">
              Our <em>Projects</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#d1d5db] md:text-xl">
              From our flagship 14-level residential tower to completed gated residences, explore our developments built with structural precision and timeless design across Addis Ababa.
            </p>
          </div>
        </section>

        {/* Dynamic Projects Grid */}
        <section className="px-6 pb-28 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#e5c378]/50 hover:bg-white/10"
              >
                {/* Media */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#e5c378] backdrop-blur-md">
                      {project.status}
                    </span>
                    <span className="rounded-full bg-black/40 px-3 py-1 text-xs tracking-wider uppercase text-white/80 backdrop-blur-md">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-white/50">
                      {project.location}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl font-normal md:text-4xl">
                      {project.name}
                    </h2>
                    <p className="mt-3 text-base text-white/80">
                      {project.tagline}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-white/60">
                      {project.summary}
                    </p>

                    {/* Specs preview */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.specs.slice(0, 3).map((spec) => (
                        <span
                          key={spec.label}
                          className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70"
                        >
                          <strong className="font-semibold text-white/90">{spec.label}:</strong> {spec.value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#e5c378] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      View Project Details
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
