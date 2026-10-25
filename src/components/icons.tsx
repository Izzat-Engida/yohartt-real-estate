import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const ArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);


export const LongArrow = (p: IconProps) => (
  <svg viewBox="0 0 25 10" aria-hidden="true" {...stroke} {...p}>
    <path d="M0.5 5h24M19.5 0.5 24.5 5l-5 4.5" />
  </svg>
);

export const ArrowDown = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const ArrowUp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const ArrowLeft = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const LogoMark = (p: IconProps) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...p}>
    <path d="M18 14 L32 32 L46 14 M32 32 V52" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="icon-fill" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2z" />
  </svg>
);

const cardIcon = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const BuildingIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...cardIcon}>
    <path d="M8 40V18l16-10 16 10v22" />
    <path d="M8 40h32M18 40V26h12v14" />
    <path d="M14 22h4M30 22h4" />
  </svg>
);

export const ClockIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...cardIcon}>
    <circle cx="24" cy="24" r="16" />
    <path d="M24 14v10l7 5" />
  </svg>
);

export const PinIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...cardIcon}>
    <path d="M24 42s-13-11.5-13-22a13 13 0 0 1 26 0c0 10.5-13 22-13 22z" />
    <circle cx="24" cy="20" r="5" />
  </svg>
);

export const LockIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...cardIcon}>
    <rect x="10" y="20" width="28" height="20" rx="3" />
    <path d="M16 20v-6a8 8 0 0 1 16 0v6" />
    <circle cx="24" cy="30" r="2.5" />
  </svg>
);
