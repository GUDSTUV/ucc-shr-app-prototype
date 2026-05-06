'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const SPLASH_MIN_MS = 2200

export function StartupSplash() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const seenKey = 'cegrad-startup-splash-seen'
    const hasSeenSplash = window.sessionStorage.getItem(seenKey) === '1'

    // Show only once per tab session to avoid slowing normal navigation.
    if (hasSeenSplash) {
      setVisible(false)
      return
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(seenKey, '1')
      setVisible(false)
    }, SPLASH_MIN_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-70 flex flex-col items-center justify-center bg-navy text-white">
      <div className="mb-4 rounded-2xl bg-white/10 p-4">
        <Image
          src="/icons/logo.svg"
          alt="CEGRAD UCC"
          width={76}
          height={76}
          priority
        />
      </div>
      <h1 className="text-xl font-bold tracking-wide">CEGRAD UCC</h1>
      <p className="mt-1 text-sm text-white/75">Opening secure reporting app...</p>
    </div>
  )
}
