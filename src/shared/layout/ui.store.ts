import { create } from 'zustand';

type UiState = {
  sidebarHidden: boolean;
  toggleSidebar: () => void;
  setSidebarHidden: (hidden: boolean) => void;
};

const STORAGE_KEY = 'deppi.sidebar';

function loadInitial(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'hidden';
  } catch {
    return false;
  }
}

function persist(hidden: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, hidden ? 'hidden' : 'visible');
  } catch {
    /* ignore */
  }
}

export const useUi = create<UiState>((set) => ({
  sidebarHidden: loadInitial(),
  toggleSidebar: () => set(s => {
    const sidebarHidden = !s.sidebarHidden;
    persist(sidebarHidden);
    return { sidebarHidden };
  }),
  setSidebarHidden: (sidebarHidden) => {
    persist(sidebarHidden);
    set({ sidebarHidden });
  },
}));
