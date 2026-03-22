'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
	ArrowLeft,
	CalendarDays,
	CheckCircle2,
	ChevronRight,
	FileText,
	MessageSquare,
	Search,
} from 'lucide-react'
import { reportStatusStyles, type UserReport, userReportsMock } from './userReportsData'

type ReportTab = 'ACTIVE' | 'RESOLVED'

const tabs: Array<{ key: ReportTab; label: string }> = [
	{ key: 'ACTIVE', label: 'Active' },
	{ key: 'RESOLVED', label: 'Resolved' },
]

function formatSubmittedDate(value: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(value))
}

function getCardIcon(status: UserReport['status']) {
	if (status === 'UNDER_REVIEW') return <MessageSquare size={19} />
	if (status === 'INVESTIGATION') return <Search size={19} />
	if (status === 'RESOLVED') return <CheckCircle2 size={19} />
	return <FileText size={19} />
}

function reportActionLabel(status: UserReport['status']) {
	return status === 'RESOLVED' ? 'Archive Report' : 'View Details'
}

function ReportsCard({ report }: { report: UserReport }) {
	const statusMeta = reportStatusStyles[report.status]

	return (
		<article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_4px_16px_rgba(26,39,84,0.06)]">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p
						className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusMeta.chip}`}
					>
						{statusMeta.label}
					</p>
					<h3 className="mt-3 text-xl text-gray-900 sm:text-2xl">Incident #{report.id.replace('UCC-', '')}</h3>
					<p className="mt-1 text-sm text-gray-600">{report.title}</p>
				</div>
				<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-light text-navy">
					{getCardIcon(report.status)}
				</div>
			</div>

			<div className="mt-3 flex items-center gap-2 text-sm text-gray-500 sm:text-base">
				<CalendarDays size={14} />
				<span>Date: {formatSubmittedDate(report.submittedAt)}</span>
			</div>

			<Link
				href={`/track?code=${encodeURIComponent(report.id)}`}
				className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-base font-semibold transition sm:text-lg ${
					report.status === 'SUBMITTED' ? 'bg-navy text-white hover:bg-navy-dark' : 'bg-navy-light text-navy hover:bg-[#dfe6fa]'
				}`}
			>
				{reportActionLabel(report.status)}
				<ChevronRight size={16} />
			</Link>
		</article>
	)
}

export default function UserReports() {
	const [selectedTab, setSelectedTab] = useState<ReportTab>('ACTIVE')

	const sortedReports = useMemo(
		() => [...userReportsMock].sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)),
		[]
	)

	const filteredReports = useMemo(() => {
		return selectedTab === 'ACTIVE'
			? sortedReports.filter((report) => report.status !== 'RESOLVED')
			: sortedReports.filter((report) => report.status === 'RESOLVED')
	}, [selectedTab, sortedReports])

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
						<h1 className="text-lg font-bold text-navy sm:text-xl">Report Status</h1>
						<p className="text-xs text-gray-500">Track all submitted incidents</p>
					</div>
					<span className="inline-flex w-10" aria-hidden="true" />
				</div>

				<nav className="mt-4 flex items-center gap-8 border-b border-gray-100 pb-1" aria-label="Report tabs">
					{tabs.map((tab) => {
						const active = selectedTab === tab.key
						return (
							<button
								key={tab.key}
								type="button"
								onClick={() => setSelectedTab(tab.key)}
								className={`min-h-10 border-b-2 px-0 text-sm font-semibold transition sm:text-base ${
									active ? 'border-navy text-navy' : 'border-transparent text-gray-500 hover:text-navy'
								}`}
							>
								{tab.label}
							</button>
						)
					})}
				</nav>
			</header>

			<main className="space-y-5 px-4 pt-5">
				<section>
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Recent Submissions</h2>
						<span className="text-sm font-semibold text-gray-500 sm:text-base">{filteredReports.length} Total</span>
					</div>

					{filteredReports.length === 0 ? (
						<div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
							<Search size={18} className="mx-auto text-gray-400" />
							<p className="mt-2 text-sm text-gray-600">No reports in this section yet.</p>
						</div>
					) : (
						<div className="space-y-4">
							{filteredReports.map((report) => (
								<ReportsCard key={report.id} report={report} />
							))}
						</div>
					)}
				</section>
			</main>
		</div>
	)
}
