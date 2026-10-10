import type { CSSProperties } from 'react';

/** Inline style for a reveal delay, e.g. <div style={delay(0.1)} data-reveal>. */
export const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;
