'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/src/components/atoms/button'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      setCanInstall(false)
      return
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setCanInstall(true)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setCanInstall(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setCanInstall(false)
  }

  if (!canInstall) return null

  return (
    <div className="space-y-1">
      <Button variant="outline" fullWidth onClick={handleInstall}>
        Install App
      </Button>
      <p className="text-[11px] text-gray-500">Install for faster access and a full-screen experience.</p>
    </div>
  )
}
