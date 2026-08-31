import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { type LoginData, type TableQueryParams } from '../types/types';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  user: LoginData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: ({ name, _id }: LoginData) => void;
  logout: () => void;
  tableQueryParams: TableQueryParams;
  setQueryParamsData: (data: TableQueryParams) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<LoginData | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      return null;
    }
    return JSON.parse(storedUser) as LoginData;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [tableQueryParams, setTableQueryParams] = useState<TableQueryParams>({
    page: 1,
    limit: 5,
    search: '',
    sortBy: 'id',
    sortOrder: 'asc',
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = ({ _id, name }: LoginData) => {
    localStorage.setItem('user', JSON.stringify({ _id, name }));
    setUser({ _id, name });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    queryClient.clear();
  };

  const setQueryParamsData = (data: TableQueryParams) => {
    setTableQueryParams(data);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    tableQueryParams,
    setQueryParamsData,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = useContext<AuthContextType | null>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
