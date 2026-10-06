import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, tokens, isAuthenticated, isLoading, error, login, register, logout } = useAuthStore();

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    role: user?.role,
    tenantId: user?.tenantId,
  };
}
