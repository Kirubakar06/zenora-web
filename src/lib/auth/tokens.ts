import { storage } from '../storage/localStorage';
import { AuthTokens } from '../../types/auth';

const TOKEN_KEY = 'auth_tokens';

export const tokenStorage = {
  getTokens(): AuthTokens | null {
    return storage.get<AuthTokens | null>(TOKEN_KEY, null);
  },

  setTokens(tokens: AuthTokens): void {
    storage.set(TOKEN_KEY, tokens);
  },

  clearTokens(): void {
    storage.remove(TOKEN_KEY);
  },

  hasValidToken(): boolean {
    const tokens = this.getTokens();
    return Boolean(tokens && tokens.accessToken);
  },
};
