'use client';

import { useState, useCallback } from 'react';
import { getAuthToken } from '@/lib/auth';

interface UseApiOptions {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export function useApi({ baseURL, defaultHeaders = {} }: UseApiOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async <T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const token = await getAuthToken();
      const url = baseURL ? `${baseURL}${endpoint}` : endpoint;

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...defaultHeaders,
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [baseURL, defaultHeaders]);

  // Convenience methods
  const get = useCallback(<T = any>(endpoint: string, options?: RequestInit) => 
    makeRequest<T>(endpoint, { ...options, method: 'GET' }), [makeRequest]);

  const post = useCallback(<T = any>(endpoint: string, data?: any, options?: RequestInit) => 
    makeRequest<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined 
    }), [makeRequest]);

  const put = useCallback(<T = any>(endpoint: string, data?: any, options?: RequestInit) => 
    makeRequest<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined 
    }), [makeRequest]);

  const del = useCallback(<T = any>(endpoint: string, options?: RequestInit) => 
    makeRequest<T>(endpoint, { ...options, method: 'DELETE' }), [makeRequest]);

  return {
    loading,
    error,
    makeRequest,
    get,
    post,
    put,
    delete: del,
  };
}