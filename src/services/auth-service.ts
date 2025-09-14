import { getAuthToken } from '@/lib/auth';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001/api/v1/auth';

export class AuthService {
  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    const token = await getAuthToken();
    
    const response = await fetch(`${AUTH_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Validate token with backend
  static async validateToken(): Promise<boolean> {
    try {
      const token = await getAuthToken();
      if (!token) return false;

      const response = await this.makeRequest('/validate', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });

      return response.valid;
    } catch {
      return false;
    }
  }

  // Get current user profile
  static async getCurrentUser() {
    const response = await this.makeRequest('/me');
    return response.data;
  }

  // Update user profile
  static async updateProfile(data: any) {
    const response = await this.makeRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  // Change password
  static async changePassword(currentPassword: string, newPassword: string) {
    const response = await this.makeRequest('/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return response;
  }
}