// Used by: all /admin/* pages
import { AdminSidebar } from '@/src/components/organisms/admin-sidebar'

interface AdminLayoutProps {
  title:    string
  children: React.ReactNode
}

export function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-[100dvh]">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="flex min-h-[100dvh] flex-col p-6">
          <h1 className="mb-6 text-2xl font-bold text-navy">{title}</h1>
          <div className="flex-1">{children}</div>
          <footer className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-500">
            <p>UCC CEGRAD Admin Dashboard</p>
            <p className="mt-1">Confidential case data. Access for authorized staff only.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}