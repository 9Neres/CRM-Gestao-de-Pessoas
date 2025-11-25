"use client"

import type { ReactNode } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { TicketsProvider } from "@/hooks/use-tickets"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <AuthProvider>
        <TicketsProvider>{children}</TicketsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

