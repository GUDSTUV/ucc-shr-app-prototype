import Link from 'next/link'
import { AdminLayout } from '@/src/components/templates/admin-layout'
import { Badge } from '@/src/components/atoms/badge'
import { Button } from '@/src/components/atoms/button'

const reports = [
  {
    id: '#SH-2024-912',
    submittedAt: 'Mar 19, 2026 • 11:40 AM',
    status: { label: 'Reviewing', variant: 'warning' as const },
    category: 'Verbal Harassment',
    assignee: 'Sarah Coleman',
  },
  {
    id: '#SH-2024-909',
    submittedAt: 'Mar 18, 2026 • 03:10 PM',
    status: { label: 'Received', variant: 'navy' as const },
    category: 'Cyber Harassment',
    assignee: 'Unassigned',
  },
  {
    id: '#SH-2024-904',
    submittedAt: 'Mar 17, 2026 • 08:25 AM',
    status: { label: 'Resolved', variant: 'success' as const },
    category: 'Stalking',
    assignee: 'James Denton',
  },
]

export default function AdminReportsPage() {
  return (
    <AdminLayout title="Case Management">
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">Monitor and update all incident reports.</p>
          <Link href="/admin">
            <Button size="sm">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[11px] uppercase tracking-[0.12em] text-gray-400">
                <th className="px-4 py-3 font-semibold">Report ID</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Assigned To</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t border-gray-100 text-sm text-gray-700">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900">{report.id}</p>
                    <p className="text-xs text-gray-500">{report.submittedAt}</p>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={report.status.variant}>{report.status.label}</Badge>
                  </td>
                  <td className="px-4 py-4 text-gray-800">{report.category}</td>
                  <td className="px-4 py-4 text-gray-800">{report.assignee}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-3 text-xs font-semibold">
                      <button type="button" className="text-navy hover:text-navy-dark">
                        View
                      </button>
                      <button type="button" className="text-navy hover:text-navy-dark">
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  )
}
