'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const links = [
  ['Home', '/'],
  ['Projects', '/projects'],
  ['The Tower', '/#tower'],
  ['Residences', '/#Residences'],
  ['Business', '/#BusinessSpaces'],
  ['Retail Spaces', '/#BusinessSpaces'],
  ['Location', '/#Location'],
  ['Amenities', '/#Amenities'],
  ['Contact', '/#contact'],
  ['About Yohartt', '/#about'],
] as const;

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
        <Link href="/" className="framer-header__logo" aria-label="Home">
          <Image
            src="/media/home/yohalogo.png"
            alt="Yoha Logo"
            width={160}
            height={160}
            className="h-full w-auto object-contain"
            priority
          />
        </Link>
      </div>

      <div className="framer-header__panel" aria-hidden={!open}>
        <nav aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}><span>{label}</span><span aria-hidden="true">{label}</span></Link>)}
        </nav>
      </div>
    </header>
  );
}
