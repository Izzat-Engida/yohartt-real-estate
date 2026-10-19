'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerScrollTrigger } from '@/lib/scroll/hooks';

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    registerScrollTrigger();

    const lenis = new Lenis({ autoRaf: false });
    const onLenisScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis.raf(time * 1000);
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());

    lenis.on('scroll', onLenisScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const images = Array.from(document.images);
    images.forEach((image) => image.addEventListener('load', refresh));
    window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    const fontReady = document.fonts?.ready.then(refresh);

    refresh();

    return () => {
      lenis.off('scroll', onLenisScroll);
      gsap.ticker.remove(onTick);
      images.forEach((image) => image.removeEventListener('load', refresh));
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', refresh);
      fontReady?.catch(() => undefined);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return null;
}

