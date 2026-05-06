'use client'

import { useEffect } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) return

    const handleBeforeInstallPrompt = async (event: Event) => {
      event.preventDefault()
      const promptEvent = event as BeforeInstallPromptEvent

      // Show native install popup automatically
      await promptEvent.prompt()
      await promptEvent.userChoice
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  // No UI - browser shows native popup automatically
  return null
}
