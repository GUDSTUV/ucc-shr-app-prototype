"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormLayout } from '@/src/components/templates/form-layout'
import { FormField } from '@/src/components/molecules/form-field'
import { Input } from '@/src/components/atoms/input'
import { Button } from '@/src/components/atoms/button'
import { AlertBox } from '@/src/components/molecules/alert-box'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim() || 'user@ucc.edu.gh'
    const nameFromEmail = normalizedEmail.split('@')[0].replace(/[._-]/g, ' ')
    const displayName = nameFromEmail
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'User'

    router.push(
      `/user/userDashboard?name=${encodeURIComponent(displayName)}&email=${encodeURIComponent(normalizedEmail)}`
    )
  }

  return (
    <FormLayout title="Login">
      <AlertBox title="Secure access" variant="info">
        Login with your account to manage reports and access protected features.
      </AlertBox>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
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
          <Input type="password" placeholder="Enter your password" required />
        </FormField>

        <Button type="submit" fullWidth>
          Sign In
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium">
        <Link href="/signup" className="text-navy underline underline-offset-2">
          Create account
        </Link>
        <Link href="/report/new" className="text-red underline underline-offset-2">
          Continue as Guest
        </Link>
      </div>
    </FormLayout>
  )
}
