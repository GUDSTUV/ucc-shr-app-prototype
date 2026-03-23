import { BookMarked, CalendarClock } from 'lucide-react'
import { Button } from '@/src/components/atoms/button'

interface HubFeedCardProps {
  title: string
  excerpt: string
  category: string
  readTime: string
  imageTheme: string
  categoryBadgeClass: string
  dateLabel?: string
  timeLabel?: string
  isRegistration?: boolean
}

export function HubFeedCard({
  title,
  excerpt,
  category,
  readTime,
  imageTheme,
  categoryBadgeClass,
  dateLabel,
  timeLabel,
  isRegistration,
}: HubFeedCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className={`relative h-52 bg-linear-to-br ${imageTheme}`}>
        {dateLabel ? (
          <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-1 text-sm font-bold text-gray-900">
            {dateLabel}
          </div>
        ) : null}

        <button
          type="button"
          aria-label="Bookmark"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy"
        >
          <BookMarked size={18} />
        </button>

        <div className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${categoryBadgeClass}`}>
          {category.toUpperCase()}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-navy">
          {timeLabel ? (
            <span className="inline-flex items-center gap-1 text-gray-600">
              <CalendarClock size={12} />
              {timeLabel}
            </span>
          ) : null}
        </div>

        <h2 className="text-xl leading-tight font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">{excerpt}</p>

        {isRegistration ? (
          <Button variant="report" fullWidth className="h-12 rounded-xl">
            Register Now
          </Button>
        ) : (
          <div className="flex items-center justify-between">
            <button type="button" className="text-sm font-semibold text-navy hover:text-navy-dark">
              Read More
            </button>
            <span className="text-sm text-gray-600">{readTime}</span>
          </div>
        )}
      </div>
    </article>
  )
}
