import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { tokenStorage } from '../../lib/auth/tokens';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Check initial auth state from storage
    if (!tokenStorage.hasValidToken()) {
      // For demo seamless experience, default session is already initialized in store
    }
  }, [setUser]);

  return <>{children}</>;
};
