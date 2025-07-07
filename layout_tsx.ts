import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'If I Ruled the World pt 2',
  description: 'Share your world-changing ideas and see how they stack up!',
  keywords: 'ideas, world, innovation, creativity, leadership',
  authors: [{ name: 'If I Ruled the World pt 2' }],
  openGraph: {
    title: 'If I Ruled the World pt 2',
    description: 'Share your world-changing ideas and see how they stack up!',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'If I Ruled the World pt 2',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'If I Ruled the World pt 2',
    description: 'Share your world-changing ideas and see how they stack up!',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {children}
        </div>
      </body>
    </html>
  )
}