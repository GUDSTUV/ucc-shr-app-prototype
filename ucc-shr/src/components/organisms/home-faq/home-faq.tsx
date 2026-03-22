import { FaqItem } from '@/src/components/molecules/faq-item'

const faqs = [
  {
    question: 'Will my name be shown?',
    answer:
      'No. If you submit anonymously, identifying details are hidden from regular case review and only authorized CEGRAD staff can access protected information when required for safety.',
  },
  {
    question: 'Can I edit my report?',
    answer:
      'Yes. You can add updates or corrections using your report tracking code from the Track page.',
  },
  {
    question: 'What happens after submission?',
    answer:
      'Your report is logged securely, reviewed by the support team, and assigned for action. You can monitor progress with your tracking code.',
  },
  {
    question: 'Will my report stay confidential?',
    answer:
      'Reports are treated as confidential records and only shared on a need-to-handle basis according to CEGRAD policy.',
  },
  {
    question: 'Can I report for someone else?',
    answer:
      'Yes. You may submit as a witness and include as much factual detail as possible for proper follow-up.',
  },
]

export function HomeFaq() {
  return (
    <section className="mt-6 space-y-3">
      <h2 className="text-base font-bold text-navy">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  )
}
