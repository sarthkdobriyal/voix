import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://getvoix.com'),
  title: {
    default: 'Voix — Learn French Through Speaking',
    template: '%s | Voix',
  },
  description:
    'AI-powered French learning platform focused on speaking practice. Prepare for TCF Canada, DELF, and DALF exams with grammar exercises, conversation practice, and mock tests.',
  keywords: [
    'learn French',
    'TCF Canada preparation',
    'DELF preparation',
    'DALF preparation',
    'French speaking practice',
    'French grammar exercises',
    'French exam prep',
  ],
  authors: [{ name: 'Voix' }],
  creator: 'Voix',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getvoix.com',
    siteName: 'Voix',
    title: 'Voix — Learn French Through Speaking',
    description:
      'AI-powered French speaking practice. Prepare for TCF Canada, DELF, and DALF exams.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Voix — French Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voix — Learn French Through Speaking',
    description:
      'AI-powered French speaking practice for TCF, DELF, and DALF exams.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
