import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: 'Modern residential towers in Addis Ababa. Explore Yohartt Tower floor by floor.',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#2e3a26',
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* A refresh starts the page from the top instead of the browser
            jumping back to where the visitor had scrolled. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{history.scrollRestoration='manual'}catch(e){}",
          }}
        />
      </head>
      <body className="work_sans_85248dc3-module__gzDsyq__variable editorialold_ad1a3d18-module__UoXJ4a__variable antialiased">
        {children}
      </body>
    </html>
  );
}
