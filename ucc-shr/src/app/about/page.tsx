import { PublicLayout } from '@/src/components/templates/public-layout'

const coreValues = [
  'Create a gender equal and inclusive learning and work environment.',
  'Deliver professional services that are responsive to the needs of all genders in the university community and beyond.',
  'Ensure equal opportunities for all constituents in the university.',
  'Ensure a sexual and gender-based violence free university.',
  'Institutional integrity.',
]

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="-mx-4 -mt-6 rounded-bl-xl rounded-br-xl bg-navy px-6 py-8 text-white">
        <p className="text-xs font-semibold tracking-widest opacity-60 uppercase">About CEGRAD</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">Mission, Vision & Core Values</h1>
        <p className="mt-2 max-w-2xl text-sm opacity-80">
          Centre for Gender Research, Advocacy & Documentation (CEGRAD), University of Cape Coast.
        </p>
      </section>

      <section className="mt-5 space-y-4">
        <article className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-navy">Mission</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            To engage in theory and practice to position the University of Cape Coast as a leader in gender
            equality and women&apos;s rights within the academy and beyond.
          </p>
        </article>

        <article className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-navy">Vision</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Create a safe, creative and inclusive space where gender and women&apos;s rights are fully protected.
          </p>
        </article>

        <article className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-navy">Core Values</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
            {coreValues.map((value) => (
              <li key={value} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </PublicLayout>
  )
}
