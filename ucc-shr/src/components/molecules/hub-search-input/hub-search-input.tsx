import { Search } from 'lucide-react'
import { Input } from '@/src/components/atoms/input'

interface HubSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function HubSearchInput({ value, onChange }: HubSearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy" size={18} />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts or events"
        className="h-12 rounded-xl border-gray-100 bg-white pl-11 text-sm"
      />
    </div>
  )
}
