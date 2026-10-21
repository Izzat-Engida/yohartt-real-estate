'use client';

import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parallaxDuration, revealDuration, revealStagger, scrollEase } from './constants';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let registered = false;
export const registerScrollTrigger = () => {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
};

export function useRevealText<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (reducedMotion() || !ref.current) return;
    registerScrollTrigger();
    const elements = Array.from(ref.current.querySelectorAll<HTMLElement>('[data-reveal-text]'));
    if (!elements.length) return;

    const context = gsap.context(() => {
      elements.forEach((element) => {
        gsap.fromTo(element, { y: 28, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: revealDuration,
          ease: scrollEase,
          stagger: revealStagger,
          scrollTrigger: { trigger: element, start: 'top 82%', once: true },
        });
      });
    }, ref);

    return () => context.revert();
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement>(amount = 6) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (reducedMotion() || !ref.current) return;
    registerScrollTrigger();
    const context = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        duration: parallaxDuration,
      });
    }, ref);

    return () => context.revert();
  }, [amount]);

  return ref;
}

export function usePinnedSequence<T extends HTMLElement>(count: number, trackRef?: RefObject<HTMLElement | null>) {
  const sectionRef = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef?.current;
    const desktopMotion = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches;
    if (!section || !track || !desktopMotion) return;
    registerScrollTrigger();

    const updateTrack = (progress: number) => {
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    };

    const context = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(1, count * window.innerHeight)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(count - 1, Math.floor(self.progress * count));
          updateTrack(self.progress);
          setProgress(self.progress);
          setDirection(self.direction >= 0 ? 1 : -1);
          setActiveIndex((current) => (current === next ? current : next));
        },
      });
    }, section);

    ScrollTrigger.refresh();
    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
      context.revert();
    };
  }, [count, trackRef]);

  const scrollTo = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger || reducedMotion()) return;
    const target = trigger.start + Math.min(count - 1, Math.max(0, index)) * window.innerHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return { sectionRef, progress, activeIndex, direction, scrollTo };
}

