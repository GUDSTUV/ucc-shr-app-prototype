import { FormLayout } from '@/src/components/templates/form-layout'
import { FormField } from '@/src/components/molecules/form-field'
import { Input } from '@/src/components/atoms/input'
import { Button } from '@/src/components/atoms/button'
import { AlertBox } from '@/src/components/molecules/alert-box'

export default function TrackPage() {
  return (
    <FormLayout title="Track Your Report">
      <AlertBox title="Need your report code" variant="info">
        Enter the tracking code provided after submission to check report progress.
      </AlertBox>

      <form className="space-y-4 rounded-[12px] border border-gray-100 bg-white p-4">
        <FormField label="Tracking Code">
          <Input placeholder="Example: UCC-2026-AB12" />
        </FormField>

        <Button type="submit" fullWidth>
          Track Status
        </Button>
      </form>
    </FormLayout>
  )
}
