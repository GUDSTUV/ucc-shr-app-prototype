export type ReportPayload = {
  type: string
  location: string
  contact: string
  description: string
  isAnonymous: boolean
  witnesses: string[]
  evidenceFiles: string[]
}

type QueuedReport = {
  id: string
  createdAt: string
  payload: ReportPayload
}

type QueueFlushResult = {
  syncedCount: number
  failedCount: number
  syncedCodes: string[]
}

const STORAGE_KEY = 'cegrad-offline-report-queue-v1'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readQueue(): QueuedReport[] {
  if (!canUseStorage()) {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as QueuedReport[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeQueue(queue: QueuedReport[]) {
  if (!canUseStorage()) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
    window.dispatchEvent(new CustomEvent('report-queue-updated', { detail: { count: queue.length } }))
  } catch {
    // Ignore storage failures (e.g. private browsing restrictions).
  }
}

export function getQueuedReportCount() {
  return readQueue().length
}

export function queueReport(payload: ReportPayload) {
  const queued: QueuedReport = {
    id: `Q-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    payload,
  }

  const queue = readQueue()
  queue.push(queued)
  writeQueue(queue)

  return queued.id
}

export async function flushQueuedReports(): Promise<QueueFlushResult> {
  const queue = readQueue()
  if (queue.length === 0) {
    return {
      syncedCount: 0,
      failedCount: 0,
      syncedCodes: [],
    }
  }

  const nextQueue: QueuedReport[] = []
  const syncedCodes: string[] = []

  for (const item of queue) {
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item.payload),
      })

      if (!response.ok) {
        nextQueue.push(item)
        continue
      }

      const result = await response.json() as {
        ok?: boolean
        code?: string
      }

      if (!result.ok) {
        nextQueue.push(item)
        continue
      }

      if (result.code) {
        syncedCodes.push(result.code)
      }
    } catch {
      nextQueue.push(item)
    }
  }

  writeQueue(nextQueue)

  return {
    syncedCount: queue.length - nextQueue.length,
    failedCount: nextQueue.length,
    syncedCodes,
  }
}
