'use client'

import { useEffect } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // If already installed, do nothing
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) return

    let deferredPrompt: BeforeInstallPromptEvent | null = null
    let prompted = false
    const MIN_PROMPT_DELAY_MS = 15000
    const AUTO_PROMPT_DELAY_MS = 30000
    const startedAt = Date.now()

    const onBeforeInstall = (event: Event) => {
      try {
        event.preventDefault()
      } catch {}
      deferredPrompt = event as BeforeInstallPromptEvent
      // don't prompt immediately; wait for user interaction below
      console.debug('[PWA] beforeinstallprompt captured')
    }

    const tryPrompt = async () => {
      if (!deferredPrompt || prompted) return
      prompted = true
      try {
        await deferredPrompt.prompt()
        const choice = await deferredPrompt.userChoice
        console.debug('[PWA] userChoice', choice?.outcome)
      } catch (err) {
        console.warn('[PWA] prompt failed', err)
      } finally {
        deferredPrompt = null
      }
    }

    const onUserInteract = () => {
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_PROMPT_DELAY_MS) {
        return
      }
      tryPrompt()
      removeListeners()
    }

    const onInstalled = () => {
      console.debug('[PWA] appinstalled')
      removeListeners()
    }

    const removeListeners = () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('pointerdown', onUserInteract)
      window.removeEventListener('touchend', onUserInteract)
      window.removeEventListener('appinstalled', onInstalled)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('pointerdown', onUserInteract, { once: true })
    window.addEventListener('touchend', onUserInteract, { once: true })
    window.addEventListener('appinstalled', onInstalled)

    // fallback: try after short delay if user didn't interact
    const t = setTimeout(() => {
      tryPrompt()
    }, AUTO_PROMPT_DELAY_MS)

    return () => {
      clearTimeout(t)
      removeListeners()
    }
  }, [])

  // No UI - rely on native browser prompt
  return null
}
