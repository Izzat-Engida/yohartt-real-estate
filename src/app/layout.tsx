import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Manrope } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { Lightbox } from '@/components/Lightbox';
import { MotionEffects } from '@/components/MotionEffects';
import { Nav } from '@/components/Nav';
import { PointerFx } from '@/components/PointerFx';
import { Preloader } from '@/components/Preloader';
import { Footer } from '@/components/sections/Footer';
import { site } from '@/data/site';
import './globals.css';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: 'Modern residential towers in Addis Ababa. Explore Yohartt Tower floor by floor.',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0a0f0d',
};

// Runs before paint: enables the JS-only animation states, with a failsafe that
// reveals everything if the app never hydrates.
const bootScript = `
document.documentElement.classList.add('js');
setTimeout(function () {
  if (!window.__yohartt) document.documentElement.classList.add('is-loaded', 'no-anim');
}, 4000);
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="boot" strategy="beforeInteractive">
          {bootScript}
        </Script>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Preloader />
        <PointerFx />
        <MotionEffects />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Lightbox />
      </body>
    </html>
  );
}
