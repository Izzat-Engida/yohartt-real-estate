'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Close } from './icons';

type Item = { src: string; width: number; height: number; alt: string; caption: string };

/** Collects every <a data-lightbox> on the page (see <LightboxLink>) and opens them full-screen. */
export function Lightbox() {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(-1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const open = index >= 0;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[data-lightbox]') : null;
      if (!link) return;
      e.preventDefault();
      const seen = new Map<string, Item>();
      document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]').forEach((a) => {
        const src = a.getAttribute('href') ?? '';
        if (!src || seen.has(src)) return;
        seen.set(src, {
          src,
          width: Number(a.dataset.width) || 1600,
          height: Number(a.dataset.height) || 1200,
          alt: a.querySelector('img')?.alt ?? '',
          caption: a.dataset.caption ?? '',
        });
      });
      const list = Array.from(seen.values());
      lastFocus.current = link;
      setItems(list);
      setIndex(Math.max(0, list.findIndex((it) => it.src === link.getAttribute('href'))));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('lb-open', open);
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(-1);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % items.length);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      root.classList.remove('lb-open');
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [open, items.length]);

  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length);
  const item = open ? items[index] : null;

  return (
    <div
      className={open ? 'lightbox is-open' : 'lightbox'}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      aria-hidden={!open}
      inert={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIndex(-1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button type="button" className="lightbox__close" aria-label="Close" ref={closeRef} onClick={() => setIndex(-1)}>
        <Close />
      </button>
      <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label="Previous image" onClick={() => go(-1)}>
        <ChevronLeft />
      </button>
      <figure className="lightbox__figure">
        {item && (
          <Image key={item.src} src={item.src} width={item.width} height={item.height} alt={item.alt} sizes="92vw" />
        )}
        <figcaption>{item?.caption}</figcaption>
      </figure>
      <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Next image" onClick={() => go(1)}>
        <ChevronRight />
      </button>
    </div>
  );
}
