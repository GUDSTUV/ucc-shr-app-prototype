'use client'

import { useEffect } from 'react'
import { flushQueuedReports } from '@/src/lib/offline-report-queue'

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

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration)
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error)
        })
    }

    flushOnReconnect()
    window.addEventListener('online', flushOnReconnect)

    return () => {
      window.removeEventListener('online', flushOnReconnect)
    }
  }, [])

  return null
}
