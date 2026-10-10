'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Pins the section and turns vertical scrolling into a horizontal walk through the
 * `.stage` children (wide screens with motion allowed). Elsewhere the stages stack.
 */
export function ProcessScroller({ count, children }: { count: number; children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const currentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const pin = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    const stages = Array.from(track.querySelectorAll<HTMLElement>('.stage'));
    const images = stages.map((s) => s.querySelector<HTMLElement>('img'));
    let distance = 0;
    let lastIdx = -1;
    let raf = 0;

    const layout = () => {
      if (pin.matches) {
        distance = Math.max(0, track.scrollWidth - window.innerWidth);
        section.style.height = `${distance + window.innerHeight}px`;
      } else {
        distance = 0;
        section.style.height = '';
        track.style.transform = '';
        images.forEach((img) => img?.style.removeProperty('--px'));
      }
    };

    const update = () => {
      raf = 0;
      if (!distance) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const r = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      const x = -p * distance;
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;

      // current stage = the last one whose left edge has passed ~60% of the screen width
      let idx = 0;
      stages.forEach((stage, i) => {
        const left = stage.offsetLeft + x;
        if (left < vw * 0.62) idx = i;
        const img = images[i];
        if (img) img.style.setProperty('--px', `${((left + stage.offsetWidth / 2 - vw / 2) * -0.06).toFixed(1)}px`);
      });
      if (idx !== lastIdx && currentRef.current) {
        lastIdx = idx;
        currentRef.current.textContent = String(idx + 1).padStart(2, '0');
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const relayout = () => {
      layout();
      onScroll();
    };

    relayout();
    const ro = new ResizeObserver(relayout);
    ro.observe(track);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', relayout);
    pin.addEventListener('change', relayout);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', relayout);
      pin.removeEventListener('change', relayout);
      section.style.height = '';
      track.style.transform = '';
    };
  }, []);

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process__sticky">
        <div className="process__track" ref={trackRef}>
          {children}
        </div>
        <div className="process__hud" aria-hidden="true">
          <span className="process__counter">
            <b ref={currentRef}>01</b> / {String(count).padStart(2, '0')}
          </span>
          <div className="process__bar">
            <i ref={barRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
