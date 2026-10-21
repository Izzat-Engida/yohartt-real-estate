'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  ['Home', '/'],
  ['3D Experience', '/#tower'],
  ['Residences', '/#Residences'],
  ['Business', '/#BusinessSpaces'],
  ['Retail Spaces', '/#BusinessSpaces'],
  ['Location', '/#Location'],
  ['Amenities', '/#Amenities'],
  ['Contact', '/#contact'],
  ['About the investor', '/#about'],
] as const;

function BrandMark() {
  return (
    <svg viewBox="0 0 35 35" aria-hidden="true" fill="none">
      <path d="M0 6.73v5.51a4.81 4.81 0 0 0 4.81 4.81h4.4a8.84 8.84 0 0 1 8.31-5.25h1.74a4.81 4.81 0 0 0 4.75-4.06A8.52 8.52 0 0 1 17.08 0h-2.1v2.96a8.83 8.83 0 0 1-5.84 7.68 4.8 4.8 0 0 0 3.14 1.16H13a8.8 8.8 0 0 0-3.45 3.97A8.82 8.82 0 0 1 3.1 7.42 8.8 8.8 0 0 1 0 6.73Z" fill="currentColor" />
      <path d="M10.61 0H7.46v6.52a3.65 3.65 0 0 0 3.14-3.56V0ZM3.09 0H1.46C.66 0 0 .65 0 1.46v.06a4.82 4.82 0 0 0 3.09 1.51V0ZM21.46 0a3.65 3.65 0 0 0 2.62 3.3V0h-2.62ZM28.46 0v6.03a5.1 5.1 0 0 0 2.63-4.29V0h-2.63Z" fill="currentColor" />
      <path d="M35 4.61a8.86 8.86 0 0 1-7.4 6.22 8.82 8.82 0 0 1-8.35 5.35h-1.74a4.81 4.81 0 0 0-4.81 4.81V35h9.62V20.99a4.8 4.8 0 0 0-1.95-3.86 8.8 8.8 0 0 0 2.17-.55 8.85 8.85 0 0 0 2.15-1.34 8.83 8.83 0 0 1 2.01 5.31h3.53a4.8 4.8 0 0 0 4.78-4.22V4.61ZM35 23.59a8.8 8.8 0 0 1-4.78 1.34h-3.52V35h6.84c.8 0 1.46-.65 1.46-1.46V23.59ZM8.33 35V21.43H4.82A8.8 8.8 0 0 1 0 20.06v13.48C0 34.35.65 35 1.45 35h6.88Z" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.toggleAttribute('data-menu-open', open);
    return () => document.body.removeAttribute('data-menu-open');
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <header className={`framer-header${open ? ' is-open' : ''}`}>
      <div className="framer-header__bar">
        <button type="button" className="framer-header__menu" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span className="framer-header__hamburger" aria-hidden="true"><i /><i /></span>
          <span className="framer-header__menu-label">Menu</span>
        </button>
        <Link href="/" className="framer-header__logo" aria-label="Home"><BrandMark /></Link>
      </div>

      <div className="framer-header__panel" aria-hidden={!open}>
        <nav aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}><span>{label}</span><span aria-hidden="true">{label}</span></Link>)}
        </nav>
      </div>
    </header>
  );
}
