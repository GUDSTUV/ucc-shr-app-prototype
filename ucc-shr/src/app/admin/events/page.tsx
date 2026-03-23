import { AdminLayout } from '@/src/components/templates/admin-layout'
import { Badge } from '@/src/components/atoms/badge'
import { Button } from '@/src/components/atoms/button'

const events = [
  {
    title: 'Consent & Respect Dialogue Circle',
    dateLabel: '26 Mar 2026, 3:00 PM',
    venue: 'CEGRAD Resource Room',
    state: { label: 'Open', variant: 'success' as const },
  },
  {
    title: 'Understanding Sexual Harassment Policy at UCC',
    dateLabel: '02 Apr 2026, 10:00 AM',
    venue: 'Science Auditorium',
    state: { label: 'Scheduled', variant: 'navy' as const },
  },
  {
    title: 'Bystander Intervention Skills Workshop',
    dateLabel: '09 Apr 2026, 1:30 PM',
    venue: 'Main Library Conference Hall',
    state: { label: 'Draft', variant: 'gray' as const },
  },
]

export default function AdminEventsPage() {
  return (
    <AdminLayout title="Events">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">Coordinate prevention workshops and awareness campaigns.</p>
        <Button size="sm">Create Event</Button>
      </div>

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {events.map((event) => (
          <article key={event.title} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">{event.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{event.dateLabel}</p>
                <p className="text-xs text-gray-500">{event.venue}</p>
              </div>
              <Badge variant={event.state.variant}>{event.state.label}</Badge>
            </div>
            <div className="mt-4 flex gap-3 text-sm font-semibold">
              <button type="button" className="text-navy hover:text-navy-dark">
                Edit
              </button>
              <button type="button" className="text-navy hover:text-navy-dark">
                Publish
              </button>
            </div>
          </article>
        ))}
      </section>
    </AdminLayout>
  )
}
