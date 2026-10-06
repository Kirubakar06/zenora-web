import { create } from 'zustand';
import { User } from '../types/user';
import { AuthTokens, LoginCredentials, RegisterCredentials } from '../types/auth';
import { tokenStorage } from '../lib/auth/tokens';
import { MOCK_USER } from '../lib/api/mockData';
import { storage } from '../lib/storage/localStorage';
import { nameFromEmail } from '../lib/utils/nameFromEmail';

const USER_KEY = 'auth_user';

const loadUser = (): User | null =>
  tokenStorage.hasValidToken() ? storage.get<User | null>(USER_KEY, null) : null;

const buildUser = (email: string, name?: string): User => ({
  ...MOCK_USER,
  id: 'usr_' + email,
  email,
  name: name || nameFromEmail(email),
  avatar: email.toLowerCase() === MOCK_USER.email ? MOCK_USER.avatar : undefined,
});

interface AuthStore {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: loadUser(),
  tokens: tokenStorage.getTokens(),
  isAuthenticated: loadUser() !== null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 600));

      const mockTokens = {
        accessToken: 'mock_jwt_session_' + Date.now(),
        refreshToken: 'mock_ref_' + Date.now(),
        expiresIn: 3600,
      };

      const updatedUser = buildUser(credentials.email);
      storage.set(USER_KEY, updatedUser);

      tokenStorage.setTokens(mockTokens);
      set({
        user: updatedUser,
        tokens: mockTokens,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (err: any) {
      set({ error: err.message || 'Login failed', isLoading: false });
      return false;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockTokens = {
        accessToken: 'mock_jwt_session_' + Date.now(),
        refreshToken: 'mock_ref_' + Date.now(),
        expiresIn: 3600,
      };
      const newUser = buildUser(credentials.email, credentials.name);
      storage.set(USER_KEY, newUser);

      tokenStorage.setTokens(mockTokens);
      set({
        user: newUser,
        tokens: mockTokens,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (err: any) {
      set({ error: err.message || 'Registration failed', isLoading: false });
      return false;
    }
  },

  logout: () => {
    tokenStorage.clearTokens();
    storage.remove(USER_KEY);
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
}));
