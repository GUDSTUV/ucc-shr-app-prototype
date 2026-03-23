import Link from 'next/link'
import { AdminLayout } from '@/src/components/templates/admin-layout'
import { Badge } from '@/src/components/atoms/badge'
import { Button } from '@/src/components/atoms/button'

const articles = [
  {
    title: 'Understanding Consent on Campus',
    status: { label: 'Published', variant: 'success' as const },
    updatedAt: 'Updated Mar 20, 2026',
  },
  {
    title: 'How to Report Sexual Harassment Safely',
    status: { label: 'Draft', variant: 'gray' as const },
    updatedAt: 'Updated Mar 18, 2026',
  },
  {
    title: 'Bystander Intervention: Practical Steps',
    status: { label: 'Reviewing', variant: 'warning' as const },
    updatedAt: 'Updated Mar 16, 2026',
  },
]

export default function AdminArticlesPage() {
  return (
    <AdminLayout title="Articles">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">Manage awareness and policy-related publications.</p>
        <Link href="/admin/articles/new">
          <Button size="sm">Create Article</Button>
        </Link>
      </div>

      <section className="space-y-3">
        {articles.map((article) => (
          <article key={article.title} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">{article.title}</h2>
                <p className="mt-1 text-xs text-gray-500">{article.updatedAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={article.status.variant}>{article.status.label}</Badge>
                <button type="button" className="text-sm font-semibold text-navy hover:text-navy-dark">
                  Edit
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AdminLayout>
  )
}
