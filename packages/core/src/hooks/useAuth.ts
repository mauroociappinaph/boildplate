import { useState, useCallback } from 'react';
import { api } from '../api';
import { ApiResponse } from '../api/types';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<User>>('/auth/login', credentials);
    setState({
      isAuthenticated: true,
      user: response.data.data,
    });
    return response.data.data;
  }, []);

  const logout = useCallback(() => {
    setState({
      isAuthenticated: false,
      user: null,
    });
  }, []);

  return {
    ...state,
    login,
    logout,
  };
};
