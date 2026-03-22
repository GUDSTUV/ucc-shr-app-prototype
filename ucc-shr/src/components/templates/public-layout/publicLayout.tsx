// Used by: Home, Hub, Events, Help pages
interface PublicLayoutProps { children: React.ReactNode }

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  )
}