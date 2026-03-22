import UserDashbard from '@/src/app/user/userDashboard/userDashbard'

type DashboardPageProps = {
  searchParams?: Promise<{
    name?: string
    email?: string
  }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = (await searchParams) ?? {}

  return (
    <UserDashbard
      name={params.name ? decodeURIComponent(params.name) : undefined}
      email={params.email ? decodeURIComponent(params.email) : undefined}
    />
  )
}
