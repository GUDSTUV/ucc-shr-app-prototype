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
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h1 className="text-2xl font-bold text-navy mb-6">{title}</h1>
        {children}
      </div>
    </div>
  )
}