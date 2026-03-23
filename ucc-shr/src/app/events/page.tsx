import { PublicLayout } from '@/src/components/templates/public-layout'
import { EventCard } from '@/src/components/organisms/event-card'

const events = [
	{
		title: 'Consent & Respect Dialogue Circle',
		dateLabel: '26 Mar 2026, 3:00 PM',
		venue: 'CEGRAD Resource Room',
		description:
			'Interactive session on consent, boundaries, and bystander responsibility for students and staff.',
	},
	{
		title: 'Understanding Sexual Harassment Policy at UCC',
		dateLabel: '02 Apr 2026, 10:00 AM',
		venue: 'Science Auditorium',
		description:
			'Learn reporting pathways, confidentiality, investigation stages, and available survivor support.',
	},
	{
		title: 'Bystander Intervention Skills Workshop',
		dateLabel: '09 Apr 2026, 1:30 PM',
		venue: 'Main Library Conference Hall',
		description:
			'Practical scenarios and response techniques to safely intervene when harassment happens on campus.',
	},
	{
		title: 'Trauma-Informed Support for Peer Leaders',
		dateLabel: '16 Apr 2026, 9:00 AM',
		venue: 'Valco Hall Seminar Room',
		description:
			'Training for SRC reps, hall executives, and peer mentors on survivor-centered response and referrals.',
	},
]

export default function EventsPage() {
	return (
		<PublicLayout>
			<section className="space-y-3">
				<h1 className="text-xl font-semibold text-navy">Awareness & Prevention Events</h1>
				<p className="text-sm text-gray-600">
					Campus events focused on sexual harassment prevention, consent education, and survivor support.
				</p>
			</section>

			<section className="mt-5 space-y-3">
				{events.map((event) => (
					<EventCard
						key={event.title}
						title={event.title}
						dateLabel={event.dateLabel}
						venue={event.venue}
						description={event.description}
					/>
				))}
			</section>
		</PublicLayout>
	)
}
