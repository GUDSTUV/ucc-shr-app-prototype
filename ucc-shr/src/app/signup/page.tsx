"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormLayout } from '@/src/components/templates/form-layout'
import { FormField } from '@/src/components/molecules/form-field'
import { Input } from '@/src/components/atoms/input'
import { Button } from '@/src/components/atoms/button'
import { AlertBox } from '@/src/components/molecules/alert-box'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedName = fullName.trim() || 'User'
    const normalizedEmail = email.trim() || 'user@ucc.edu.gh'

    router.push(
      `/user/userDashboard?name=${encodeURIComponent(normalizedName)}&email=${encodeURIComponent(normalizedEmail)}`
    )
  }

  return (
    <FormLayout title="Sign Up">
      <AlertBox title="Create your account" variant="info">
        Use an account to manage reports and get updates on submitted cases.
      </AlertBox>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
        <FormField label="Full Name">
          <Input
            placeholder="Your name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </FormField>

        <FormField label="Email">
          <Input
            type="email"
            placeholder="you@ucc.edu.gh"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </FormField>

        <FormField label="Password">
          <Input type="password" placeholder="Create a password" required />
        </FormField>

        <Button type="submit" fullWidth>
          Create Account
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium">
        <Link href="/login" className="text-navy underline underline-offset-2">
          Already have an account? Login
        </Link>
        <Link href="/report/new" className="text-red underline underline-offset-2">
          Continue as Guest
        </Link>
      </div>
    </FormLayout>
  )
}
