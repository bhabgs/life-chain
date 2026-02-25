import { useAuthStore } from '@/stores/auth.store'

export function usePermission() {
  const user = useAuthStore((s) => s.user)

  const isAdmin = user?.role === 'admin'
  const isAuditor = user?.role === 'auditor'

  const hasPermission = (requiredRole: string): boolean => {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.role === requiredRole
  }

  return { isAdmin, isAuditor, hasPermission }
}
