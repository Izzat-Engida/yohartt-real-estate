'use client';

import { useEffect, useRef } from 'react';

/** Custom cursor, magnetic buttons (.magnetic) and tilting cards ([data-tilt]) — fine pointers only. */
export function PointerFx() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!fine || reduce || !ring || !dot || !label) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      const target = e.target instanceof Element ? e.target : null;

      const m = target?.closest<HTMLElement>('.magnetic') ?? null;
      if (magnet && magnet !== m) magnet.style.transform = '';
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(mx - (r.left + r.width / 2)) * 0.22}px, ${(my - (r.top + r.height / 2)) * 0.32}px)`;
      }

      const t = target?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (tilt && tilt !== t) {
        tilt.style.setProperty('--rx', '0deg');
        tilt.style.setProperty('--ry', '0deg');
      }
      tilt = t;
      if (t) {
        const r = t.getBoundingClientRect();
        t.style.setProperty('--rx', `${(-((my - r.top) / r.height - 0.5) * 8).toFixed(2)}deg`);
        t.style.setProperty('--ry', `${(((mx - r.left) / r.width - 0.5) * 8).toFixed(2)}deg`);
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      const link = target?.closest('a, button, select, input, textarea, label, polygon');
      ring.classList.toggle('is-label', Boolean(labelled));
      ring.classList.toggle('is-link', !labelled && Boolean(link));
      if (labelled) label.textContent = labelled.dataset.cursor ?? '';
    };

    const hide = () => {
      ring.classList.add('is-hidden');
      dot.classList.add('is-hidden');
    };
    const show = () => {
      ring.classList.remove('is-hidden');
      dot.classList.remove('is-hidden');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    root.addEventListener('pointerleave', hide);
    root.addEventListener('pointerenter', show);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      root.removeEventListener('pointerleave', hide);
      root.removeEventListener('pointerenter', show);
      root.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={ringRef} aria-hidden="true">
        <span className="cursor__label" ref={labelRef} />
      </div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
