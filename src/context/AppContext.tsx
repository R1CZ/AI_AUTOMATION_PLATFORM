import { createContext, useContext } from 'react';
import { User } from '../types';

export interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean> | boolean;
  logout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  sidebarOpen: true,
  setSidebarOpen: () => {},
});

export const useAppContext = () => useContext(AppContext);
