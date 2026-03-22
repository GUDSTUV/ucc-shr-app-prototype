import { CalendarDays, MapPin } from 'lucide-react'

export interface EventCardProps {
  title: string
  venue: string
  dateLabel: string
  description?: string
}

export function EventCard({ title, venue, dateLabel, description }: EventCardProps) {
  return (
    <article className="rounded-[12px] border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
      <div className="mt-2 flex items-center gap-2 text-[12px] text-gray-600">
        <CalendarDays size={14} />
        <span>{dateLabel}</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[12px] text-gray-600">
        <MapPin size={14} />
        <span>{venue}</span>
      </div>
      {description ? <p className="mt-2 text-[13px] text-gray-600 line-clamp-3">{description}</p> : null}
    </article>
  )
}
