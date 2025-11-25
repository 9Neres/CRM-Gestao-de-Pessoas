"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "leader" | "developer"
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  error: string | null
  hydrated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const STORAGE_KEY = "iriy-hub:user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [user, hydrated])

  const login = useCallback(async (rawEmail: string, rawPassword: string) => {
    setLoading(true)
    setError(null)

    try {
      const email = rawEmail.trim().toLowerCase()
      const password = rawPassword.trim()

      const adminEmails = ["admin@email.com", "admin"]
      const adminPasswords = ["password123", "123"]

      const isAdmin =
        adminEmails.includes(email) && adminPasswords.includes(password)

      if (!isAdmin) {
        setError("Credenciais inválidas. Use admin@email.com / password123")
        return
      }

      const normalizedEmail = email.includes("@") ? email : "admin@email.com"

      const newUser: User = {
        id: "1",
        email: normalizedEmail,
        name: "admin",
        role: "admin",
      }

      setUser(newUser)
    } catch {
      setError("Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      hydrated,
      login,
      logout,
    }),
    [user, loading, error, hydrated, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}
