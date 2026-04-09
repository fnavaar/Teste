import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Eye, EyeOff, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login, session } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  if (session) {
    return <Navigate to="/kanban" replace />
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPassword = password.length >= 8
  const isFormValid = isValidEmail && isValidPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/kanban')
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Falha na autenticação',
        description: error.message || 'Erro ao conectar. Tente novamente em alguns segundos',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f6f8fa] p-4 font-sans">
      <div className="w-full max-w-[340px] space-y-4">
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="h-12 w-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-light tracking-tight text-slate-900">Entrar no CRM</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/60">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={cn(
                    'h-10 transition-all duration-200',
                    email && !isValidEmail
                      ? 'border-red-500 focus-visible:ring-red-500/20'
                      : 'focus-visible:ring-primary/20',
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {email && !isValidEmail && (
                <p className="text-xs text-red-500 animate-fade-in">Formato de email inválido.</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Senha
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={cn(
                    'h-10 pr-10 transition-all duration-200',
                    password && !isValidPassword
                      ? 'border-amber-500 focus-visible:ring-amber-500/20'
                      : 'focus-visible:ring-primary/20',
                  )}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && !isValidPassword && (
                <p className="text-xs text-amber-600 animate-fade-in">
                  A senha deve ter no mínimo 8 caracteres.
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium shadow-sm transition-colors mt-2"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Autenticando...' : 'Entrar'}
            </Button>
          </form>
        </div>

        <div className="text-center p-4 rounded-lg border border-blue-100 bg-blue-50/50">
          <p className="text-xs text-blue-800">
            Acesso de teste:
            <br />
            <span className="font-semibold">admin@admin.com</span> /{' '}
            <span className="font-semibold">password123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
