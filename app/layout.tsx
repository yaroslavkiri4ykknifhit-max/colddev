import type { Metadata } from 'next'
import { Inter, Source_Code_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'NWO',
  description: 'NWO.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${sourceCodePro.variable} bg-[#212121]`}>
      <body className="antialiased">{children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

