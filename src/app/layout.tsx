import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ApolloWrapper } from '@/lib/apollo-provider';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | StreamMate AI',
    default: 'StreamMate AI - Your AI-Powered Streaming Companion',
  },
  description: 'Discover your next favorite movie or TV show with AI-powered recommendations tailored just for you.',
  keywords: [
    'streaming',
    'AI',
    'recommendations', 
    'movies',
    'TV shows',
    'Netflix',
    'entertainment'
  ],
  authors: [{ name: 'StreamMate AI Team' }],
  creator: 'StreamMate AI',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://streammate.ai',
    siteName: 'StreamMate AI',
    title: 'StreamMate AI - Your AI-Powered Streaming Companion',
    description: 'Discover your next favorite movie or TV show with AI-powered recommendations tailored just for you.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StreamMate AI',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'StreamMate AI - Your AI-Powered Streaming Companion',
    description: 'Discover your next favorite movie or TV show with AI-powered recommendations tailored just for you.',
    images: ['/images/twitter-image.png'],
  },
  
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
  
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ApolloWrapper>
          <Providers>
            {children}
          </Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}