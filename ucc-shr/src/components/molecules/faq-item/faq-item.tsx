import { ChevronDown } from 'lucide-react'

interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm open:border-navy/20">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-gray-900">
        <span>{question}</span>
        <ChevronDown size={16} className="text-gray-500 transition-transform group-open:rotate-180" />
      </summary>
      <p className="pt-2 text-sm leading-relaxed text-gray-600">{answer}</p>
    </details>
  )
}
