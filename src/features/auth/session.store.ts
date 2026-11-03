import { create } from 'zustand';
import type { Role } from '../../shared/routes';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  siape?: string;
  matricula?: string;
  criadoEm?: string;
};

type SessionState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const STORAGE_KEY = 'deppi.session';

function loadInitial(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useSession = create<SessionState>((set) => ({
  user: loadInitial(),
  login: (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));
