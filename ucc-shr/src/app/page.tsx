import { PublicLayout } from '@/src/components/templates/public-layout'
import { Button }       from '@/src/components/atoms/button'
import { AlertBox }     from '@/src/components/molecules/alert-box'
import { HomeSwiper }   from '@/src/components/organisms/home-swiper'
import { HomeEventsPreview } from '@/src/components/organisms/home-events-preview'
import { HomeEmergencyCard } from '@/src/components/organisms/home-emergency-card'
import { HomeFaq } from '@/src/components/organisms/home-faq'
import { Flag, SearchCheck } from 'lucide-react'
import Image from 'next/image'
import Link             from 'next/link'

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="-mx-4 -mt-6 bg-navy px-6 py-8 mb-5 rounded-bl-xl rounded-br-xl text-white">
        <div className="mb-4 inline-flex items-center rounded-xl bg-white/10 p-2">
          <Image
            src="/icons/logo.svg"
            alt="CEGRAD logo"
            width={44}
            height={44}
            priority
            className="h-11 w-11"
          />
        </div>

        <p className="text-xs font-semibold tracking-widest opacity-50 uppercase mb-2">
          University of Cape Coast
        </p>
        <h1 className="text-2xl font-bold leading-tight mb-1">CEGRAD</h1>
        <p className="text-sm opacity-60 font-light">
          Centre for Gender Research, Advocacy & Documentation
        </p>
      </div>

      {/* Swipeable message slider */}
      <HomeSwiper />

      {/* Report CTA */}
      <Link href="/report">
        <Button variant="report" size="lg">
          <Flag size={20} /> Report an Incident
        </Button>
      </Link>

      {/* Quick actions */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link href="/track" className="block">
          <Button variant="outline" fullWidth>
            <SearchCheck size={18} /> Track Report
          </Button>
        </Link>
      </div>

      {/* Safety message */}
      <AlertBox
        variant="info"
        title="Your report is confidential"
        noBackground
        noBorder
        className="p-0"
      >
        All submissions are anonymous and seen only by CEGRAD staff.
      </AlertBox>

      <HomeEventsPreview />
      <HomeEmergencyCard />
      <HomeFaq />
    </PublicLayout>
  )
}