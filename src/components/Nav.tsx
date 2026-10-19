'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks, site } from '@/data/site';
import { LogoMark } from './icons';

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const openRef = useRef(false);

  // glass background once scrolled; hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 30);
      if (!openRef.current) {
        if (y > lastY + 6 && y > 500) setHidden(true);
        else if (y < lastY - 6) setHidden(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // mobile menu side effects
  useEffect(() => {
    openRef.current = open;
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // highlight the section in view (home page only)
  useEffect(() => {
    if (pathname !== '/') return;
    const sections = navLinks
      .map((l) => document.getElementById(l.href.split('#')[1]))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  const activeId = pathname === '/' ? active : '';
  const classes = ['nav', scrolled && 'is-scrolled', hidden && !open && 'is-hidden'].filter(Boolean).join(' ');

  return (
    <>
      <header className={classes}>
        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <b>Menu</b>
        </button>
        <Link href="/#top" className="nav__logo" aria-label={`${site.name} — home`}>
          <LogoMark />
          <span>{site.shortName}</span>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={activeId === l.href.split('#')[1] ? 'is-active' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="nav__cta magnetic">
          Enquire <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <div className="mobile-menu" id="mobile-menu" aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <small>{String(i + 1).padStart(2, '0')}</small>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mobile-menu__foot">
          {site.city}, {site.country}
        </p>
      </div>
    </>
  );
}
