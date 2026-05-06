'use client'

import { useEffect } from 'react'
import { flushQueuedReports } from '@/src/lib/offline-report-queue'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

declare global {
  interface Window {
    __cegradSwRegistered?: boolean
    __cegradInstallPrompt?: BeforeInstallPromptEvent | null
  }
}

export function PWARegister() {
  useEffect(() => {
    const flushOnReconnect = async () => {
      const result = await flushQueuedReports()
      if (result.syncedCount > 0) {
        window.dispatchEvent(
          new CustomEvent('report-sync-complete', {
            detail: {
              syncedCount: result.syncedCount,
              syncedCodes: result.syncedCodes,
            },
          })
        )
      }
    }

    const shouldRegisterSw = process.env.NODE_ENV === 'production'

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      window.__cegradInstallPrompt = event as BeforeInstallPromptEvent
    }

    const onInstalled = () => {
      window.__cegradInstallPrompt = null
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)

    if (shouldRegisterSw && typeof window !== 'undefined' && 'serviceWorker' in navigator && !window.__cegradSwRegistered) {
      window.__cegradSwRegistered = true
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration)
        })
        .catch(error => {
          window.__cegradSwRegistered = false
          console.log('Service Worker registration failed:', error)
        })
    }

    flushOnReconnect()
    window.addEventListener('online', flushOnReconnect)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('online', flushOnReconnect)
    }
  }, [])

  return null
}
