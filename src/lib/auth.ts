import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001/api/v1/auth';

// Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  avatar?: string;
  preferences?: any;
  streamingServices?: any;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Configure axios defaults
axios.defaults.withCredentials = true;

// Create axios instance for auth requests
const authApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling auth errors
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAuthToken();
        const token = getStoredToken();
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Token management
export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

export const getStoredRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  // Also set as httpOnly cookie for additional security (optional)
  Cookies.set('auth-token', accessToken, { 
    expires: 1/96, // 15 minutes
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

export const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  Cookies.remove('auth-token');
};

// Authentication functions
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await authApi.post('/register', userData);
    
    if (response.data.success) {
      setTokens(response.data.data.accessToken, response.data.data.refreshToken);
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await authApi.post('/login', credentials);
    
    if (response.data.success) {
      setTokens(response.data.data.accessToken, response.data.data.refreshToken);
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const refreshAuthToken = async (): Promise<void> => {
  const refreshToken = getStoredRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response: AxiosResponse<any> = await authApi.post('/refresh', {
      refreshToken,
    });

    if (response.data.success) {
      setTokens(response.data.data.accessToken, response.data.data.refreshToken);
    } else {
      throw new Error('Token refresh failed');
    }
  } catch (error) {
    clearTokens();
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const refreshToken = getStoredRefreshToken();
  
  try {
    if (refreshToken) {
      await authApi.post('/logout', { refreshToken });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearTokens();
  }
};

export const logoutAll = async (): Promise<void> => {
  try {
    await authApi.post('/logout-all');
  } catch (error) {
    console.error('Logout all error:', error);
  } finally {
    clearTokens();
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = getStoredToken();
  
  if (!token) {
    return null;
  }

  try {
    const response: AxiosResponse<any> = await authApi.get('/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  const token = getStoredToken();
  
  if (!token) {
    return null;
  }

  // Check if token is expired (basic check)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp < currentTime) {
      // Token expired, try to refresh
      await refreshAuthToken();
      return getStoredToken();
    }
    
    return token;
  } catch (error) {
    // Invalid token format
    clearTokens();
    return null;
  }
};

// Google OAuth
export const loginWithGoogle = (): void => {
  window.location.href = `${API_URL}/google`;
};