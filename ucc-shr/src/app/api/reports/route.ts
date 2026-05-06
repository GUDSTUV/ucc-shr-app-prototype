import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { prisma } from '@/src/lib/prisma'

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

    const code = buildReportCode()
    const contact = body.contact?.trim() ?? ''
    const witnesses = Array.isArray(body.witnesses) ? body.witnesses : []

    await prisma.report.create({
      data: {
        code,
        type,
        description,
        location: body.location?.trim() || null,
        isAnonymous: body.isAnonymous ?? true,
        files: Array.isArray(body.evidenceFiles) ? body.evidenceFiles : [],
        notes: contact || witnesses.length > 0
          ? JSON.stringify({ contact, witnesses })
          : null,
      },
    })

    return NextResponse.json({ ok: true, code })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to submit report right now. Please try again.' },
      { status: 500 }
    )
  }
}
