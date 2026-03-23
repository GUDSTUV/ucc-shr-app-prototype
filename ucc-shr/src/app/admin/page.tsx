import { AdminLayout } from '@/src/components/templates/admin-layout'
import { Badge } from '@/src/components/atoms/badge'
import { Button } from '@/src/components/atoms/button'
import { Input } from '@/src/components/atoms/input'
import { Select } from '@/src/components/atoms/select'
import {
  Bell,
  CheckCircle2,
  Clock3,
  ClipboardList,
  FileWarning,
  Filter,
  Plus,
  Search,
  UserRound,
} from 'lucide-react'

const statCards = [
  {
    label: 'Total Reports',
    value: '1,284',
    trend: '+12.4%',
    trendVariant: 'success' as const,
    icon: <ClipboardList size={18} />,
    iconClass: 'bg-navy-light text-navy',
  },
  {
    label: 'Active Cases',
    value: '156',
    trend: '42 pending',
    trendVariant: 'warning' as const,
    icon: <FileWarning size={18} />,
    iconClass: 'bg-red-light text-red',
  },
  {
    label: 'Resolved Cases',
    value: '1,024',
    trend: '88% rate',
    trendVariant: 'success' as const,
    icon: <CheckCircle2 size={18} />,
    iconClass: 'bg-[#E8F5EE] text-[#1A6B50]',
  },
  {
    label: 'Avg. Response Time',
    value: '18.4 hrs',
    trend: '-2h from avg',
    trendVariant: 'red' as const,
    icon: <Clock3 size={18} />,
    iconClass: 'bg-navy-light text-navy',
  },
]

const trendBars = [44, 61, 82, 53, 91, 72]

const categoryData = [
  { label: 'Verbal Harassment', percent: 42 },
  { label: 'Cyber Stalking', percent: 28 },
  { label: 'Physical Misconduct', percent: 18 },
  { label: 'Other Types', percent: 12 },
]

const recentReports = [
  {
    id: '#SH-2024-891',
    submittedAt: 'Oct 24, 2023 • 09:45 AM',
    statusLabel: 'In Progress',
    statusVariant: 'warning' as const,
    category: 'Cyber Harassment',
    investigator: 'James Denton',
    investigatorAssigned: true,
  },
  {
    id: '#SH-2024-889',
    submittedAt: 'Oct 23, 2023 • 02:30 PM',
    statusLabel: 'Urgent',
    statusVariant: 'red' as const,
    category: 'Physical Misconduct',
    investigator: 'Unassigned',
    investigatorAssigned: false,
  },
  {
    id: '#SH-2024-885',
    submittedAt: 'Oct 22, 2023 • 11:12 AM',
    statusLabel: 'Reviewing',
    statusVariant: 'navy' as const,
    category: 'Verbal Harassment',
    investigator: 'Sarah Coleman',
    investigatorAssigned: true,
  },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Reporting Dashboard">
      <section className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[460px]">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search cases, IDs, or investigator"
              className="h-11 border-gray-200 bg-white pl-9 text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-gray-200 bg-white text-navy hover:bg-navy-light"
            >
              <Bell size={18} />
            </button>

            <Button size="sm" className="h-11 rounded-[10px] px-4">
              <Plus size={16} /> New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article key={card.label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.iconClass}`}>
                  {card.icon}
                </span>
                <Badge variant={card.trendVariant}>{card.trend}</Badge>
              </div>

              <p className="text-sm text-gray-600">{card.label}</p>
              <p className="mt-1 text-[30px] font-semibold leading-none text-gray-900">{card.value}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Monthly Reporting Trends</h2>
              <Badge variant="gray">Last 6 Months</Badge>
            </div>

            <div className="flex h-[230px] items-end gap-3 rounded-xl bg-gray-50 p-4">
              {trendBars.map((barHeight, index) => (
                <div key={`${barHeight}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-xl ${index === trendBars.length - 1 ? 'bg-navy' : 'bg-navy/25'}`}
                    style={{ height: `${barHeight}%` }}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold tracking-wide text-gray-400">
                    {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'][index]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Category Distribution</h2>
              <button type="button" className="text-sm font-semibold text-navy hover:text-navy-dark">
                View Details
              </button>
            </div>

            <div className="space-y-4">
              {categoryData.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-navy" style={{ width: `${item.percent}%` }} aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Incident Reports</h2>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                <Filter size={14} /> Filters
              </button>

              <Select className="h-10 min-w-[130px] rounded-full border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-gray-700">
                <option>Status: All</option>
                <option>In Progress</option>
                <option>Reviewing</option>
                <option>Urgent</option>
              </Select>

              <Select className="h-10 min-w-[130px] rounded-full border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-gray-700">
                <option>Category: All</option>
                <option>Verbal Harassment</option>
                <option>Cyber Harassment</option>
                <option>Physical Misconduct</option>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[780px] w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[11px] uppercase tracking-[0.12em] text-gray-400">
                  <th className="px-4 py-3 font-semibold">Report ID</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Investigator</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-t border-gray-100 align-top text-sm text-gray-700">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">{report.id}</p>
                      <p className="text-xs text-gray-500">{report.submittedAt}</p>
                    </td>

                    <td className="px-4 py-4">
                      <Badge variant={report.statusVariant}>{report.statusLabel}</Badge>
                    </td>

                    <td className="px-4 py-4 text-gray-800">{report.category}</td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {report.investigatorAssigned ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy-light text-navy">
                            <UserRound size={14} />
                          </span>
                        ) : null}
                        <span className={report.investigatorAssigned ? 'text-gray-800' : 'italic text-gray-400'}>
                          {report.investigator}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-3 text-xs font-semibold">
                        <button type="button" className="text-navy hover:text-navy-dark">
                          Assign Investigator
                        </button>
                        <button type="button" className="text-gray-700 hover:text-navy">
                          Update Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </AdminLayout>
  )
}
