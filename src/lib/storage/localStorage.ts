const PREFIX = 'supportpulse_';

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = window.localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set failed:', e);
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(PREFIX + key);
    } catch (e) {
      console.warn('Storage remove failed:', e);
    }
  },

  clear(): void {
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith(PREFIX))
        .forEach((k) => window.localStorage.removeItem(k));
    } catch (e) {
      console.warn('Storage clear failed:', e);
    }
  },
};
