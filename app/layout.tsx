import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Playfair_Display } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-lora',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Phố Xô Viết – Hành trình sinh tồn',
  description:
    'Game nhập vai Visual Novel kết hợp mini-game sinh tồn: ôn tập kiến thức lịch sử về sự thành lập Liên Xô (1922) và Hiến pháp 1924.',
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

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1c1510',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${lora.variable} ${playfair.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
