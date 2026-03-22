import Link from 'next/link'
import { ArrowLeft, Bell, BellRing, CheckCircle2, Clock3 } from 'lucide-react'

const notifications = [
  {
    id: 1,
    title: 'Report UCC-8291 updated',
    message: 'Status changed to Investigation by admin.',
    time: '10 min ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Report UCC-8501 reviewed',
    message: 'Admin added feedback to your report.',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Report UCC-7942 resolved',
    message: 'This report has been marked as resolved.',
    time: 'Yesterday',
    unread: false,
  },
]

export default function UserNotificationsPage() {
  const unreadCount = notifications.filter((item) => item.unread).length

  return (
    <div className="mx-auto min-h-screen max-w-md bg-gray-50 pb-8 font-sans text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 px-4 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <Link
            href="/user/userDashboard"
            aria-label="Go back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-navy sm:text-xl">Notifications</h1>
            <p className="text-xs text-gray-500">Stay updated on your reports</p>
          </div>
          <span className="inline-flex w-10" aria-hidden="true" />
        </div>
      </header>

      <main className="space-y-4 px-4 pt-5">
        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-navy">
              <BellRing size={18} />
              <p className="text-sm font-semibold">Unread Alerts</p>
            </div>
            <span className="rounded-full bg-navy-light px-3 py-1 text-xs font-semibold text-navy">
              {unreadCount}
            </span>
          </div>
        </section>

        <section className="space-y-3">
          {notifications.map((item) => (
            <article
              key={item.id}
              className={`rounded-2xl border bg-white p-4 shadow-sm ${
                item.unread ? 'border-navy/20' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-light text-navy">
                  {item.unread ? <Bell size={16} /> : <CheckCircle2 size={16} />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    {item.unread ? <span className="h-2.5 w-2.5 rounded-full bg-red" /> : null}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.message}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <Clock3 size={13} />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
