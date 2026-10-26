'use client';

import { useEffect } from 'react';

type SplitInstance = { revert: () => void };

export default function ProjectScrollAnimations() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const [{ gsap }, { ScrollTrigger }, { SplitText }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/SplitText'),
        import('lenis'),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      try {
        await document.fonts.ready;
      } catch {
  
      }

      if (cancelled) return;

      const lenis = new Lenis({
        smoothWheel: true,
        duration: 2,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const lenisRaf = (time: number): void => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;

      const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
      const images = Array.from(document.images);
      images.forEach((image) => image.addEventListener('load', refresh));
      window.addEventListener('load', refresh);
      window.addEventListener('resize', refresh);

      const splits: SplitInstance[] = [];

      const ctx = gsap.context(() => {
        /* Background parallax */
        gsap.utils.toArray<HTMLElement>('.project-bg').forEach((bg) => {
          const section = bg.closest<HTMLElement>('section');

          gsap.to(bg, {
            y: '8%',
            ease: 'none',
            scrollTrigger: {
              trigger: section ?? bg,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });

        /* Clip-path media reveals */
        gsap.utils.toArray<HTMLElement>('.project-media-reveal').forEach((media) => {
          const image = media.querySelector<HTMLElement>('img');

          gsap.fromTo(
            media,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0 0 0)',
              duration: 1.35,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: media,
                start: 'top 82%',
                once: true,
              },
            }
          );

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: media,
                  start: 'top 82%',
                  once: true,
                },
              }
            );
          }
        });

        /* Oversized serif headings, revealed word by word */
        gsap.utils.toArray<HTMLElement>('.project-heading').forEach((heading) => {
          const split = new SplitText(heading, {
            type: 'words',
            wordsClass: 'project-word',
          });

          splits.push(split);

          gsap.from(split.words, {
            yPercent: 115,
            opacity: 0,
            duration: 1.15,
            stagger: 0.045,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              once: true,
            },
          });
        });

        /* Body copy */
        gsap.utils.toArray<HTMLElement>('.project-copy').forEach((copy) => {
          const split = new SplitText(copy, { type: 'words' });

          splits.push(split);

          gsap.from(split.words, {
            y: 16,
            opacity: 0,
            duration: 0.75,
            stagger: 0.012,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: copy,
              start: 'top 90%',
              once: true,
            },
          });
        });

        /* Small chrome: meta lines, actions, index rows */
        gsap.utils.toArray<HTMLElement>('.project-fade').forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          });
        });
      });

      refresh();

      cleanup = () => {
        splits.forEach((split) => split.revert());
        ctx.revert();

        images.forEach((image) => image.removeEventListener('load', refresh));
        window.removeEventListener('load', refresh);
        window.removeEventListener('resize', refresh);

        gsap.ticker.remove(lenisRaf);

        try {
          lenis.destroy();
        } catch {
          // Ignore cleanup errors.
        }

        if (window.__lenis === lenis) {
          window.__lenis = null;
        }
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
