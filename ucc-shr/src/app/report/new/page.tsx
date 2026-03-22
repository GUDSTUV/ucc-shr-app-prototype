import { FormLayout } from '@/src/components/templates/form-layout'
import { ReportForm } from '@/src/components/organisms/report-form'

export default function NewReportPage() {
  return (
    <FormLayout title="Anonymous Report">
      <ReportForm />
    </FormLayout>
  )
}
