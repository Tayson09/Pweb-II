import { create } from 'zustand';

export type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const STORAGE_KEY = 'deppi.theme';

function loadInitial(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export const useTheme = create<ThemeState>((set) => ({
  theme: loadInitial(),
  toggle: () => set(s => {
    const theme = s.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, theme);
    return { theme };
  }),
  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
}));
