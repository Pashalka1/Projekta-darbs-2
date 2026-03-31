import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthUser, Page } from '../shared/types/app';

interface AppContextValue {
  user: AuthUser | null;
  currentPage: Page;
  login: (user: AuthUser) => void;
  logout: () => void;
  navigate: (page: Page) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);
const STORAGE_KEY = 'bakugan-universe-user';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (!savedUser) return;

    try {
      const parsedUser = JSON.parse(savedUser) as AuthUser;
      setUser(parsedUser);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    user,
    currentPage,
    login: (nextUser) => {
      setUser(nextUser);
      setCurrentPage('home');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    },
    logout: () => {
      setUser(null);
      setCurrentPage('home');
      localStorage.removeItem(STORAGE_KEY);
    },
    navigate: (page) => setCurrentPage(page),
  }), [currentPage, user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext jāizmanto AppProvider ietvaros.');
  }
  return context;
}
