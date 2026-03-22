'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Bell, BookMarked, CalendarClock, Search, UserRound } from 'lucide-react'
import { PublicLayout } from '@/src/components/templates/public-layout'
import { Input } from '@/src/components/atoms/input'
import { Button } from '@/src/components/atoms/button'

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
		imageTheme: 'from-[#B9D66E] via-[#9DBE59] to-[#6E8F3B]',
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
		imageTheme: 'from-[#493321] via-[#6E4B2C] to-[#2E2219]',
	},
	{
		id: 3,
		title: 'Digital Safety: Securing Your Professional Data',
		excerpt: 'Quick steps to keep personal records and project files protected online.',
		category: 'Safety Tips',
		readTime: '3 min read',
		imageTheme: 'from-[#0C2A44] via-[#134A66] to-[#081B30]',
	},
	{
		id: 4,
		title: 'Cyber Awareness Week: Spotting Phishing Attempts',
		excerpt: 'Practical examples to help you identify suspicious links and protect your account access.',
		category: 'Awareness',
		readTime: '4 min read',
		imageTheme: 'from-[#2A4365] via-[#3B5E8B] to-[#1D3557]',
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
		imageTheme: 'from-[#1F5E5C] via-[#2E8B87] to-[#134240]',
	},
	{
		id: 6,
		title: 'Digital Wellbeing: Reducing Online Fatigue',
		excerpt: 'Simple routines to improve focus, reduce burnout, and build healthier screen habits.',
		category: 'Awareness',
		readTime: '6 min read',
		imageTheme: 'from-[#6A4C93] via-[#7B5AA6] to-[#51306F]',
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
			<header className="space-y-4">
				<div className="flex items-center justify-between">
					<Link
						href="/user/profile"
						className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-light text-navy"
						aria-label="Open profile"
					>
						<UserRound size={20} />
					</Link>

					<h1 className="text-2xl font-bold text-navy">Posts &amp; Events</h1>

					<button
						type="button"
						className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-light text-navy"
						aria-label="Notifications"
					>
						<Bell size={20} />
					</button>
				</div>

				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy" size={18} />
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search posts or events"
						className="h-12 rounded-xl border-gray-100 bg-white pl-11 text-[15px]"
					/>
				</div>

				<div className="-mx-4 overflow-x-auto px-4">
					<div className="flex min-w-max gap-3 pb-1">
						{categories.map((category) => {
							const active = activeCategory === category
							return (
								<button
									key={category}
									type="button"
									onClick={() => setActiveCategory(category)}
									className={`h-10 rounded-full border px-5 text-sm font-semibold transition ${
										active
											? 'border-navy bg-navy text-white'
											: 'border-gray-100 bg-white text-gray-600 hover:border-navy hover:text-navy'
									}`}
								>
									{category}
								</button>
							)
						})}
					</div>
				</div>
			</header>

			<section className="mt-6 space-y-5">
				{filteredItems.map((item) => (
					<article key={item.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
						<div className={`relative h-52 bg-linear-to-br ${item.imageTheme}`}>
							{item.dateLabel ? (
								<div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-1 text-sm font-bold text-gray-900">
									{item.dateLabel}
								</div>
							) : null}
							<button
								type="button"
								aria-label="Bookmark"
								className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy"
							>
								<BookMarked size={18} />
							</button>
							<div
								className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${categoryBadgeStyles[item.category]}`}
							>
								{item.category.toUpperCase()}
							</div>
						</div>

						<div className="space-y-3 p-4">
							<div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-navy">
								{item.timeLabel ? (
									<span className="inline-flex items-center gap-1 text-gray-600">
										<CalendarClock size={12} />
										{item.timeLabel}
									</span>
								) : null}
							</div>

							<h2 className="text-2xl leading-tight font-semibold text-gray-900 sm:text-[28px]">
								{item.title}
							</h2>
							<p className="text-base text-gray-600">{item.excerpt}</p>

							{item.isRegistration ? (
								<Button variant="report" fullWidth className="h-12 rounded-xl">
									Register Now
								</Button>
							) : (
								<div className="flex items-center justify-between">
									<button type="button" className="text-base font-semibold text-navy hover:text-navy-dark">
										Read More
									</button>
									<span className="text-sm text-gray-600">{item.readTime}</span>
								</div>
							)}
						</div>
					</article>
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
