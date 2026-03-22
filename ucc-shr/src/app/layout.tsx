import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import { BottomNav } from '@/src/components/organisms/bottom-nav'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CEGRAD UCC',
  description: 'Campus sexual harassment reporting and support platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} bg-gray-50 text-gray-900`}>
        <main className="min-h-screen pb-20">{children}</main>
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  )
}
