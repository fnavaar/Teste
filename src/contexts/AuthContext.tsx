import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'

type User = {
  id: string
  email: string
}

type Session = {
  access_token: string
  refresh_token: string
  expires_at: number
  user: User
}

interface AuthContextType {
  session: Session | null
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SESSION_KEY = 'crm_session'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
  }, [])

  const setupRefreshTimer = useCallback((expiresAt: number, refreshToken: string) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)

    const expiresIn = expiresAt - Date.now()
    const refreshTime = expiresIn - 5 * 60 * 1000 // 5 minutes before expiration

    if (refreshTime > 0) {
      refreshTimerRef.current = setTimeout(() => {
        performTokenRefresh(refreshToken)
      }, refreshTime)
    } else {
      performTokenRefresh(refreshToken)
    }
  }, []) // performTokenRefresh is attached later to avoid circular dependency

  const performTokenRefresh = useCallback(
    async (refreshToken: string) => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

        let data

        if (supabaseUrl && anonKey) {
          const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: anonKey,
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          })

          if (!response.ok) throw new Error('Refresh failed')
          data = await response.json()
        } else {
          await new Promise((r) => setTimeout(r, 500))
          data = {
            access_token: 'mock_access_token_' + Date.now(),
            refresh_token: 'mock_refresh_token_' + Date.now(),
            expires_in: 3600,
            user: session?.user || { id: '1', email: 'admin@admin.com' },
          }
        }

        const expires_at = Date.now() + data.expires_in * 1000
        const newSession: Session = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_at,
          user: { id: data.user.id, email: data.user.email },
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
        setSession(newSession)
        setupRefreshTimer(expires_at, newSession.refresh_token)
      } catch (error) {
        console.error('Failed to refresh token:', error)
        logout()
      }
    },
    [session?.user, logout, setupRefreshTimer],
  )

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      try {
        const parsed: Session = JSON.parse(stored)
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

        if (parsed.expires_at > Date.now()) {
          setSession(parsed)
          setupRefreshTimer(parsed.expires_at, parsed.refresh_token)
          setIsLoading(false)
        } else if (parsed.expires_at > thirtyDaysAgo) {
          performTokenRefresh(parsed.refresh_token).finally(() => setIsLoading(false))
        } else {
          logout()
          setIsLoading(false)
        }
      } catch (e) {
        logout()
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
    }
  }, [setupRefreshTimer, performTokenRefresh, logout])

  const login = async (email: string, password: string) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    let data

    if (supabaseUrl && anonKey) {
      try {
        const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: anonKey,
          },
          body: JSON.stringify({ email, password }),
        })

        data = await response.json()

        if (!response.ok) {
          if (data.error_description?.includes('Invalid login credentials')) {
            throw new Error('Email ou senha incorretos')
          }
          if (data.error_description?.includes('Email not confirmed')) {
            throw new Error('Este email não está registrado')
          }
          throw new Error('Erro ao conectar. Tente novamente em alguns segundos')
        }
      } catch (error: any) {
        if (error.message === 'Failed to fetch' || error.message.includes('network')) {
          throw new Error('Erro ao conectar. Tente novamente em alguns segundos')
        }
        throw error
      }
    } else {
      await new Promise((r) => setTimeout(r, 1000))

      if (email === 'error@crm.com') {
        throw new Error('Erro ao conectar. Tente novamente em alguns segundos')
      }
      if (email !== 'admin@admin.com') {
        throw new Error('Este email não está registrado')
      }
      if (password !== 'password123') {
        throw new Error('Email ou senha incorretos')
      }

      data = {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
        expires_in: 3600,
        user: { id: 'mock-user-1', email },
      }
    }

    const expires_at = Date.now() + data.expires_in * 1000

    const newSession: Session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at,
      user: { id: data.user.id, email: data.user.email },
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
    setSession(newSession)
    setupRefreshTimer(expires_at, newSession.refresh_token)
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user || null, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
