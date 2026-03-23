import Link from 'next/link'

const previewEvents = [
  {
    title: 'Consent & Respect Campus Forum',
    dateLabel: '28 Mar 2026, 10:00 AM',
    venue: 'Senate Chamber, UCC',
  },
  {
    title: 'Bystander Intervention Skills Workshop',
    dateLabel: '04 Apr 2026, 2:00 PM',
    venue: 'Sports Complex, UCC',
  },
]

function getDateBadge(dateLabel: string) {
  const [day = '--', month = '---'] = dateLabel.split(' ')
  return {
    day,
    month: month.toUpperCase(),
  }
}

export function HomeEventsPreview() {
  return (
    <section className="mt-6 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-navy">Upcoming Events</h2>
        <Link href="/events" className="text-xs font-semibold text-gray-500 hover:text-navy">
          See all
        </Link>
      </div>

      <div className="space-y-2.5">
        {previewEvents.map((event) => {
          const badge = getDateBadge(event.dateLabel)

          return (
          <article key={event.title} className="rounded-2xl border border-gray-200 bg-gray-100 px-3 py-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-gray-200 text-navy">
                <span className="text-[15px] font-bold leading-none">{badge.day}</span>
                <span className="mt-0.5 text-[9px] font-semibold leading-none">{badge.month}</span>
              </div>

              <div className="min-w-0">
                <h3 className="line-clamp-2 text-[15px] font-bold leading-tight text-navy">{event.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{event.venue}</p>
              </div>
            </div>
          </article>
          )
        })}
      </div>
    </section>
  )
}
