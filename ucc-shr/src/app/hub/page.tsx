'use client'

import { useMemo, useState } from 'react'
import { PublicLayout } from '@/src/components/templates/public-layout'
import { HubHeader } from '@/src/components/organisms/hub-header/hub-header'
import { HubFilterChips } from '@/src/components/molecules/hub-filter-chips/hub-filter-chips'
import { HubFeedCard } from '@/src/components/organisms/hub-feed-card/hub-feed-card'

type HubCategory = 'All' | 'Awareness' | 'Workshop' | 'Safety Tips' | 'Events'

interface HubItem {
	id: number
	title: string
	excerpt: string
	category: Exclude<HubCategory, 'All'>
	readTime: string
	dateLabel?: string
	timeLabel?: string
	isRegistration?: boolean
	imageTheme: string
}

const categoryBadgeStyles: Record<Exclude<HubCategory, 'All'>, string> = {
	Awareness: 'bg-navy text-white border border-white/20 backdrop-blur-[1px]',
	Workshop: 'bg-navy/75 text-white border border-white/20 backdrop-blur-[1px]',
	'Safety Tips': 'bg-navy/75 text-white border border-white/20 backdrop-blur-[1px]',
	Events: 'bg-navy/75 text-white border border-white/20 backdrop-blur-[1px]',
}

const categories: HubCategory[] = ['All', 'Awareness', 'Events']

const items: HubItem[] = [
	{
		id: 1,
		title: 'Mental Health in the Workplace: Supporting Your Peers',
		excerpt: 'Learn how to recognize burnout signs and offer meaningful support to colleagues.',
		category: 'Awareness',
		readTime: '5 min read',
		imageTheme: 'from-navy-light via-white to-gray-100',
	},
	{
		id: 2,
		title: 'First Aid Certification: Advanced Response Training',
		excerpt: 'Join our certified trainers for practical emergency response and recovery drills.',
		category: 'Workshop',
		readTime: 'Event',
		dateLabel: 'OCT 24',
		timeLabel: '14:00 - 16:30',
		isRegistration: true,
		imageTheme: 'from-navy via-navy-dark to-gray-900',
	},
	{
		id: 3,
		title: 'Digital Safety: Securing Your Professional Data',
		excerpt: 'Quick steps to keep personal records and project files protected online.',
		category: 'Safety Tips',
		readTime: '3 min read',
		imageTheme: 'from-navy-dark via-navy to-gray-900',
	},
	{
		id: 4,
		title: 'Cyber Awareness Week: Spotting Phishing Attempts',
		excerpt: 'Practical examples to help you identify suspicious links and protect your account access.',
		category: 'Awareness',
		readTime: '4 min read',
		imageTheme: 'from-navy via-navy-dark to-gray-900',
	},
	{
		id: 5,
		title: 'Campus Safety Briefing: Emergency Preparedness Session',
		excerpt: 'Join the in-person briefing for updated response procedures and safety contact lines.',
		category: 'Events',
		readTime: 'Event',
		dateLabel: 'NOV 06',
		timeLabel: '09:30 - 11:00',
		isRegistration: true,
		imageTheme: 'from-navy-dark via-navy to-gray-900',
	},
	{
		id: 6,
		title: 'Digital Wellbeing: Reducing Online Fatigue',
		excerpt: 'Simple routines to improve focus, reduce burnout, and build healthier screen habits.',
		category: 'Awareness',
		readTime: '6 min read',
		imageTheme: 'from-navy-light via-white to-gray-100',
	},
]

export default function HubPage() {
	const [activeCategory, setActiveCategory] = useState<HubCategory>('All')
	const [search, setSearch] = useState('')

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const categoryMatch = activeCategory === 'All' || item.category === activeCategory
			const query = search.trim().toLowerCase()
			const searchMatch =
				query.length === 0 ||
				item.title.toLowerCase().includes(query) ||
				item.excerpt.toLowerCase().includes(query) ||
				item.category.toLowerCase().includes(query)

			return categoryMatch && searchMatch
		})
	}, [activeCategory, search])

	return (
		<PublicLayout>
			<div className="font-sans">
				<HubHeader search={search} onSearchChange={setSearch} />
				<HubFilterChips
					categories={categories}
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
				/>

				<section className="mt-6 space-y-5">
					{filteredItems.map((item) => (
						<HubFeedCard
							key={item.id}
							title={item.title}
							excerpt={item.excerpt}
							category={item.category}
							readTime={item.readTime}
							dateLabel={item.dateLabel}
							timeLabel={item.timeLabel}
							isRegistration={item.isRegistration}
							imageTheme={item.imageTheme}
							categoryBadgeClass={categoryBadgeStyles[item.category]}
						/>
					))}

					{filteredItems.length === 0 ? (
						<div className="rounded-2xl border border-gray-100 bg-white p-5 text-center text-sm text-gray-600">
							No results for this filter yet.
						</div>
					) : null}
				</section>
			</div>
		</PublicLayout>
	)
}
