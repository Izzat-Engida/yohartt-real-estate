'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    __yohartt?: boolean;
  }
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Wordmark + load counter, then lifts away and triggers the hero intro (html.is-loaded). */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.__yohartt = true; // tells the failsafe in <head> that scripts are running
    const root = document.documentElement;
    const el = ref.current;
    const timers: number[] = [];
    let raf = 0;

    document.querySelectorAll<HTMLElement>('[data-hero]').forEach((node, i) => {
      node.style.transitionDelay = `${0.25 + i * 0.09}s`;
    });

    const finish = () => {
      root.classList.add('is-loaded');
      timers.push(window.setTimeout(() => setDone(true), 1400));
    };

    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return () => timers.forEach(clearTimeout);
    }

    const start = performance.now();
    const minDuration = 1050;
    let loaded = document.readyState === 'complete';
    let p = 0;
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', onLoad, { once: true });
    timers.push(window.setTimeout(onLoad, 4000)); // never hold the page hostage

    const tick = (now: number) => {
      const t = clamp((now - start) / minDuration);
      const target = loaded ? t : Math.min(t, 0.86);
      p += (target - p) * 0.12;
      if (countRef.current) countRef.current.textContent = String(Math.round(p * 100));
      el.style.setProperty('--p', p.toFixed(3));
      if (t >= 1 && loaded && p > 0.995) {
        if (countRef.current) countRef.current.textContent = '100';
        el.style.setProperty('--p', '1');
        timers.push(window.setTimeout(finish, 180));
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__word">
          {'Yohartt'.split('').map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
        <div className="preloader__meta">
          <span>Real Estate · Addis Ababa</span>
          <span className="preloader__count" ref={countRef}>
            0
          </span>
        </div>
        <div className="preloader__bar">
          <i />
        </div>
      </div>
    </div>
  );
}
