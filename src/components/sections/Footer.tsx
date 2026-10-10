import Link from 'next/link';
import { projects } from '@/data/projects';
import { navLinks, site } from '@/data/site';
import { ArrowUp } from '../icons';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__tag">
            Raising Addis,
            <br />
            <em>floor by floor.</em>
          </p>
          <nav className="footer__nav" aria-label="Footer">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            {projects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          </nav>
          <a href="#top" className="to-top magnetic" aria-label="Back to top">
            <ArrowUp />
          </a>
        </div>
        <div className="footer__word" aria-hidden="true">
          {site.shortName}
        </div>
        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>
            {site.city}, {site.country}
          </span>
          <span>Renderings are artist impressions</span>
        </div>
      </div>
    </footer>
  );
}
