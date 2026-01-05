import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import '../styles/globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Analytics } from '@vercel/analytics/next';


const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'),
  title: {
    default: 'brinicle - Production-Oriented ANN Vector Engine',
    template: '%s | brinicle',
  },
  description: 'brinicle is a C++ vector index engine (ANN library) optimized for disk-first, low-RAM similarity search. A production-oriented ANN index engine designed for strict resource budgets with disk-first operation and low memory overhead.',
  
  authors: [{name: 'Bicardinal'}],
  creator: 'Bicardinal',
  publisher: 'Bicardinal',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  // },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <html
      lang={'en'}
      suppressHydrationWarning>
      <body
        className={` ${roboto.className} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0QJN2TJNCZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0QJN2TJNCZ');
          `}
        </Script>
      </body>
    </html>
  );
}
