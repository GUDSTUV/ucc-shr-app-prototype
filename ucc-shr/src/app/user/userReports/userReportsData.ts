export type ReportStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'INVESTIGATION' | 'RESOLVED'

export type ReportTimelineItem = {
	title: string
	note: string
	time: string
	done: boolean
}

export type UserReport = {
	id: string
	title: string
	status: ReportStatus
	submittedAt: string
	zone: string
	summary: string
	timeline: ReportTimelineItem[]
}

export const reportStatusStyles: Record<
	ReportStatus,
	{
		label: string
		chip: string
	}
> = {
	SUBMITTED: {
		label: 'Submitted',
		chip: 'bg-navy-light text-navy border border-navy/20',
	},
	UNDER_REVIEW: {
		label: 'Under review',
		chip: 'bg-red-light text-red-dark border border-red/30',
	},
	INVESTIGATION: {
		label: 'Investigation',
		chip: 'bg-amber-50 text-amber-700 border border-amber-200',
	},
	RESOLVED: {
		label: 'Resolved',
		chip: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
	},
}

export const userReportsMock: UserReport[] = [
	{
		id: 'UCC-8291',
		title: 'Connectivity failure at North sector',
		status: 'INVESTIGATION',
		submittedAt: '2026-03-20T09:12:00Z',
		zone: 'Zone B',
		summary: 'Intermittent service disruption reported around North sector towers.',
		timeline: [
			{
				title: 'Report submitted',
				note: 'Case registered and assigned to Zone B technician.',
				time: 'Mar 20, 09:12 AM',
				done: true,
			},
			{
				title: 'Under review',
				note: 'Initial diagnostics confirmed signal drop in North sector.',
				time: 'Mar 20, 11:45 AM',
				done: true,
			},
			{
				title: 'Investigation',
				note: 'Technician dispatched to relay station RS-42. ETA 2 hours.',
				time: 'Mar 20, 01:30 PM',
				done: true,
			},
			{
				title: 'Resolution',
				note: 'Final verification and ticket closure pending.',
				time: 'Pending',
				done: false,
			},
		],
	},
	{
		id: 'UCC-8501',
		title: 'Security access delay at gate 3',
		status: 'UNDER_REVIEW',
		submittedAt: '2026-03-18T10:15:00Z',
		zone: 'Zone A',
		summary: 'Manual verification queue is causing prolonged entry wait times.',
		timeline: [
			{
				title: 'Report submitted',
				note: 'Ticket logged and routed to security operations.',
				time: 'Mar 18, 10:15 AM',
				done: true,
			},
			{
				title: 'Under review',
				note: 'Supervisor requested access-log verification from control room.',
				time: 'Mar 18, 11:05 AM',
				done: true,
			},
			{
				title: 'Investigation',
				note: 'Waiting for CCTV and access panel diagnostics.',
				time: 'Queued',
				done: false,
			},
			{
				title: 'Resolution',
				note: 'Pending investigation results.',
				time: 'Pending',
				done: false,
			},
		],
	},
	{
		id: 'UCC-7942',
		title: 'Hardware upgrade request for lab printers',
		status: 'RESOLVED',
		submittedAt: '2026-03-11T08:20:00Z',
		zone: 'Zone C',
		summary: 'Legacy printers replaced and network profiles updated successfully.',
		timeline: [
			{
				title: 'Report submitted',
				note: 'Case logged by support desk.',
				time: 'Mar 11, 08:20 AM',
				done: true,
			},
			{
				title: 'Under review',
				note: 'Hardware request approved by procurement.',
				time: 'Mar 11, 10:00 AM',
				done: true,
			},
			{
				title: 'Investigation',
				note: 'Asset team verified compatibility and installation plan.',
				time: 'Mar 12, 09:15 AM',
				done: true,
			},
			{
				title: 'Resolution',
				note: 'Devices installed and user sign-off completed.',
				time: 'Mar 13, 03:40 PM',
				done: true,
			},
		],
	},
	{
		id: 'UCC-8411',
		title: 'Billing discrepancy on support package',
		status: 'SUBMITTED',
		submittedAt: '2026-03-08T16:20:00Z',
		zone: 'Zone D',
		summary: 'Reported mismatch between billed support tier and subscribed plan.',
		timeline: [
			{
				title: 'Report submitted',
				note: 'Case generated and awaiting assignment.',
				time: 'Mar 08, 04:20 PM',
				done: true,
			},
			{
				title: 'Under review',
				note: 'Pending triage from billing desk.',
				time: 'Pending',
				done: false,
			},
			{
				title: 'Investigation',
				note: 'Pending triage completion.',
				time: 'Pending',
				done: false,
			},
			{
				title: 'Resolution',
				note: 'Pending investigation outcome.',
				time: 'Pending',
				done: false,
			},
		],
	},
]
