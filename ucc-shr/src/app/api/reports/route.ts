import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

type ReportBody = {
  type?: string
  location?: string
  contact?: string
  description?: string
  isAnonymous?: boolean
  witnesses?: string[]
  evidenceFiles?: string[]
}

function buildReportCode() {
  return `RPT-${nanoid(4).toUpperCase()}-${nanoid(4).toUpperCase()}`
}

/**
 * Report submission endpoint (Prototype).
 * 
 * For prototype phase, this endpoint:
 * - Validates the report payload
 * - Returns a tracking code
 * - Does NOT persist to database (will be added later)
 * 
 * In production, integrate with Prisma to save reports to PostgreSQL.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json() as ReportBody

    const type = body.type?.trim() ?? ''
    const description = body.description?.trim() ?? ''

    if (!type || !description) {
      return NextResponse.json(
        { ok: false, error: 'Type and description are required.' },
        { status: 400 }
      )
    }

    // Generate a unique tracking code for the report
    const code = buildReportCode()

    // TODO: In production, persist to database using Prisma
    // await prisma.report.create({ ... })

    // For now, just return success with tracking code
    // Offline-queued reports will receive this code when synced
    return NextResponse.json({ ok: true, code })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to submit report right now. Please try again.' },
      { status: 500 }
    )
  }
}

