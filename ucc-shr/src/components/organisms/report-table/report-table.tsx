import { StatusBadge, type ReportStatus } from '@/src/components/molecules/status-badge'

export interface ReportRow {
  id: string
  code: string
  type: string
  date: string
  status: ReportStatus
}

export interface ReportTableProps {
  rows: ReportRow[]
}

export function ReportTable({ rows }: ReportTableProps) {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-gray-100 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Code</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-gray-100">
              <td className="px-4 py-3 font-medium">{row.code}</td>
              <td className="px-4 py-3">{row.type}</td>
              <td className="px-4 py-3">{row.date}</td>
              <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
