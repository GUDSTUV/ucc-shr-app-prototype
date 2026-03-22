import { PhoneCall, ArrowRight } from 'lucide-react'

export function HomeEmergencyCard() {
  return (
    <section className="mt-5">
      <div className="rounded-2xl bg-navy p-3 text-white shadow-lg shadow-navy/20">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/12">
            <PhoneCall size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold">Need urgent help now?</p>
            <p className="text-xs text-white/70">UCC Emergency: 0332 132 000</p>
          </div>

          <a
            href="tel:+233332132000"
            className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-navy transition-all hover:scale-[1.02]"
            aria-label="Call UCC Emergency"
          >
            Call
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
