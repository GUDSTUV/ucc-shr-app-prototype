'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Flag } from 'lucide-react'
import { Button } from '@/src/components/atoms/button'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

declare global {
  interface Window {
    __cegradInstallPrompt?: BeforeInstallPromptEvent | null
  }
}

const PROMPT_COOLDOWN_MS = 10 * 60 * 1000
const LAST_PROMPT_KEY = 'cegrad-install-prompt-last'

export function ReportInstallCta() {
  const router = useRouter()

  const handleClick = useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true

    const lastPromptAt = Number(window.localStorage.getItem(LAST_PROMPT_KEY) || 0)
    const withinCooldown = Number.isFinite(lastPromptAt)
      ? Date.now() - lastPromptAt < PROMPT_COOLDOWN_MS
      : false

    const promptEvent = window.__cegradInstallPrompt

    if (promptEvent && !isStandalone && !withinCooldown) {
      try {
        window.localStorage.setItem(LAST_PROMPT_KEY, String(Date.now()))
        promptEvent.prompt()
      } catch {
        // Ignore prompt errors and continue navigation
      }

      promptEvent.userChoice
        .then(({ outcome }) => {
          if (outcome === 'accepted') {
            window.localStorage.removeItem(LAST_PROMPT_KEY)
          }
        })
        .catch(() => {})
        .finally(() => {
          window.__cegradInstallPrompt = null
        })
    }

    router.push('/report')
  }, [router])

  return (
    <Button variant="report" size="lg" onClick={handleClick}>
      <Flag size={20} /> Report an Incident
    </Button>
  )
}
