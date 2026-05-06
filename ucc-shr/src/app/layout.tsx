import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { BottomNav } from '@/src/components/organisms/bottom-nav'
import { PWARegister } from '@/src/app/pwa-register'

export const metadata: Metadata = {
  title: 'CEGRAD UCC',
  description: 'Campus sexual harassment reporting and support platform',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CEGRAD UCC',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#001F3F',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <main className="min-h-screen pb-20">{children}</main>
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
        <PWARegister />
      </body>
    </html>
  )
}
