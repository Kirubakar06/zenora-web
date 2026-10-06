import { create } from 'zustand';

interface UiStore {
  theme: 'dark' | 'light';
  sidebarCollapsed: boolean;
  activeModal: string | null;
  notificationDrawerOpen: boolean;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setNotificationDrawerOpen: (open: boolean) => void;
}

const THEME_KEY = 'nexora_theme';
const initialTheme = (): 'dark' | 'light' => {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

export const useUiStore = create<UiStore>((set) => ({
  theme: initialTheme(),
  sidebarCollapsed: false,
  activeModal: null,
  notificationDrawerOpen: false,
  mobileNavOpen: false,

  setMobileNavOpen: (open) =>
    set(open ? { mobileNavOpen: true, sidebarCollapsed: false } : { mobileNavOpen: false }),

  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch {
        /* ignore */
      }
      return { theme: nextTheme };
    }),

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  openModal: (modalId) => set({ activeModal: modalId }),

  closeModal: () => set({ activeModal: null }),

  setNotificationDrawerOpen: (open) => set({ notificationDrawerOpen: open }),
}));
