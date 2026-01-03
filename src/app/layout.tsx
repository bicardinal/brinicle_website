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
  title: {
    default: 'Bicardenal - The Vector Database for Production Scale',
    template: '%s | Bicardenal',
  },
  description: 'Build knowledgeable AI applications with Bicardenal. Fast, scalable vector database designed for production. Power semantic search, RAG, recommendations, and AI agents.',
  
  authors: [{name: 'Bicardenal'}],
  creator: 'Bicardenal',
  publisher: 'Bicardenal',

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
