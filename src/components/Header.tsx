'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

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

const projectSubLinks = [
  { label: 'Yohartt Tower', href: '/projects/yohartt-tower' },
  { label: 'Completed Residence', href: '/projects/completed-residence' },
  { label: 'All Projects →', href: '/projects' },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [projectsHovered, setProjectsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.body.toggleAttribute('data-menu-open', open);
    return () => document.body.removeAttribute('data-menu-open');
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setProjectsHovered(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const handleProjectsEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProjectsHovered(true);
  };

  const handleProjectsLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setProjectsHovered(false);
    }, 180);
  };

  const closeMenu = () => {
    setOpen(false);
    setProjectsHovered(false);
  };

  return (
    <header className={`framer-header${open ? ' is-open' : ''}`}>
      <div className="framer-header__bar">
        <button
          type="button"
          className="framer-header__menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => {
            setOpen((value) => !value);
            if (open) setProjectsHovered(false);
          }}
        >
          <span className="framer-header__hamburger" aria-hidden="true"><i /><i /></span>
          <span className="framer-header__menu-label">Menu</span>
        </button>
        <Link href="/" className="framer-header__logo" aria-label="Home" onClick={closeMenu}>
          <Image
            src="/media/home/yohalogo-nav.png"
            alt="Yoha Logo"
            width={466}
            height={429}
            className="h-full w-auto object-contain"
            priority
          />
        </Link>
      </div>

      <div className="framer-header__panel" aria-hidden={!open}>
        <nav aria-label="Primary navigation">
          {links.map(([label, href]) => {
            if (label === 'Projects') {
              return (
                <div
                  key={label}
                  className={`framer-header__item-with-sub${projectsHovered ? ' is-sub-open' : ''}`}
                  onMouseEnter={handleProjectsEnter}
                  onMouseLeave={handleProjectsLeave}
                >
                  <div className="framer-header__projects-row">
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="framer-header__nav-link"
                    >
                      <span>{label}</span>
                      <span aria-hidden="true">{label}</span>
                    </Link>
                    <button
                      type="button"
                      className="framer-header__sub-toggle"
                      aria-expanded={projectsHovered}
                      aria-label="Toggle projects submenu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectsHovered((prev) => !prev);
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

        
                  <div
                    className={`framer-projects-sub${projectsHovered ? ' is-open' : ''}`}
                    onMouseEnter={handleProjectsEnter}
                    onMouseLeave={handleProjectsLeave}
                    role="menu"
                    aria-label="Projects submenu"
                  >
                    <div className="framer-projects-sub__inner">
                      {projectSubLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className={`framer-sub-link${item.href === '/projects' ? ' framer-sub-link--all' : ''}`}
                          role="menuitem"
                        >
                          <span>{item.label}</span>
                          <span aria-hidden="true">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="framer-header__nav-link"
              >
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
