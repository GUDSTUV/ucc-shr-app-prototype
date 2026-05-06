import { FormLayout } from '@/src/components/templates/form-layout'
import { ReportForm } from '@/src/components/organisms/report-form'
import { AlertBox } from '@/src/components/molecules/alert-box'

type NewReportPageProps = {
  searchParams?: Promise<{
    name?: string
    email?: string
  }>
}

export default async function NewReportPage({ searchParams }: NewReportPageProps) {
  const params = (await searchParams) ?? {}
  const hasAccount = Boolean(params.name && params.email)

  return (
    <FormLayout title={hasAccount ? 'New Report' : 'Guest Report'}>
      {!hasAccount && (
        <AlertBox variant="info" title="You are reporting as a guest">
          Your report will stay anonymous and tracked only by your report code. Use the Track page anytime to check status. No account is needed.
        </AlertBox>
      )}
      <ReportForm canToggleAnonymous={hasAccount} />
    </FormLayout>
  )
}
