import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '../styles/globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';


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
      </body>
    </html>
  );
}
