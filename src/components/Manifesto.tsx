'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

export type ManifestoSegment = { text: string; em?: boolean };

/** Large statement whose words light up one by one as it scrolls through the viewport. */
export function Manifesto({ segments }: { segments: ManifestoSegment[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(
    () => segments.flatMap((s) => s.text.split(/\s+/).filter(Boolean).map((word) => ({ word, em: Boolean(s.em) }))),
    [segments],
  );
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.25)));
      setLit(Math.round(p * words.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [words.length]);

  return (
    <p className="manifesto" ref={ref}>
      {words.map(({ word, em }, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className={i < lit ? 'w is-lit' : 'w'}>{em ? <em>{word}</em> : word}</span>
        </Fragment>
      ))}
    </p>
  );
}
