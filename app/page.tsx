"use client"

import { Dashboard } from "@/components/dashboard/dashboard"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { user, hydrated } = useAuth()

  if (!hydrated) {
    return null
  }

  return user ? <Dashboard /> : <LoginForm />
}
