'use client';

import { Children, cloneElement, isValidElement, useRef, type MutableRefObject, type ReactElement, type ReactNode } from 'react';
import { usePinnedSequence, useRevealText } from '@/lib/scroll/hooks';

export function ProcessScroller({
  count,
  labels,
  children,
}: {
  count: number;
  labels: string[];
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { sectionRef, progress, activeIndex, scrollTo } = usePinnedSequence<HTMLElement>(count, trackRef);
  const revealRef = useRevealText<HTMLDivElement>();

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process__sticky">
        <div className="process__track" ref={(node) => {
          trackRef.current = node;
          (revealRef as MutableRefObject<HTMLDivElement | null>).current = node;
        }}>
          {Children.map(children, (child, index) => {
            if (!isValidElement(child)) return child;
            const element = child as ReactElement<{ className?: string }>;
            return cloneElement(element, {
              className: `${element.props.className ?? ''} ${index === activeIndex ? 'is-active' : ''}`,
            });
          })}
        </div>
        <div className="process__hud">
          <div className="process__progress">
            <span className="process__bar"><i style={{ transform: `scaleX(${progress})` }} /></span>
            <span className="process__counter">{String(activeIndex + 1).padStart(2, '0')}</span>
          </div>
          <div className="process__titles" aria-label="Process stages">
            {labels.map((label, index) => (
              <button
                type="button"
                key={label}
                className={index === activeIndex ? 'process__title is-active' : 'process__title'}
                aria-current={index === activeIndex ? 'step' : undefined}
                aria-label={`Go to stage ${index + 1}: ${label}`}
                onClick={() => scrollTo(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    scrollTo(Math.min(count - 1, index + 1));
                  }
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    scrollTo(Math.max(0, index - 1));
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

