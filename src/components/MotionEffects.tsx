'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Page-wide scroll effects driven by data attributes, so sections can stay server components:
 *  - [data-reveal]      fades/clips in when scrolled into view
 *  - [data-count="14"]  counts up from 0
 *  - [data-parallax=".1"] drifts vertically (sets --py)
 *  - top scroll-progress bar
 * Re-scans the DOM on every route change.
 */
export function MotionEffects() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rafs = new Set<number>();

    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    reveals.forEach((el) => revealIO.observe(el));

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (reduce) {
        el.textContent = String(target);
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const t = clamp((now - start) / 1800);
        el.textContent = String(Math.round(easeOutExpo(t) * target));
        if (t < 1) rafs.add(requestAnimationFrame(step));
      };
      el.textContent = '0';
      rafs.add(requestAnimationFrame(step));
    };
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countUp(entry.target as HTMLElement);
          countIO.unobserve(entry.target);
        });
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => countIO.observe(el));

    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let ticking = 0;
    const update = () => {
      ticking = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      progressRef.current?.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0');
      if (reduce) return;
      parallax.forEach((img) => {
        const box = img.parentElement?.closest<HTMLElement>('figure, a, div') ?? img.parentElement;
        if (!box) return;
        const r = box.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const offset = r.top + r.height / 2 - vh / 2;
        img.style.setProperty('--py', `${(offset * Number(img.dataset.parallax)).toFixed(1)}px`);
      });
    };
    const onScroll = () => {
      if (!ticking) ticking = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      revealIO.disconnect();
      countIO.disconnect();
      rafs.forEach(cancelAnimationFrame);
      cancelAnimationFrame(ticking);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}
