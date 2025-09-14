'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AuthService } from '@/services/auth-service';

// Mock data structure (replace with actual GraphQL when ready)
interface Recommendation {
  id: string;
  title: string;
  overview: string;
  genre: string;
  rating: number;
  platform: string;
  poster: string;
  backdrop: string;
  trailer?: string;
  reason: string;
  confidence: number;
  createdAt: string;
}

interface WatchHistoryItem {
  id: string;
  contentId: string;
  title: string;
  poster: string;
  watchedAt: string;
  progress: number;
  completed: boolean;
  rating?: number;
}

export function useUserData() {
  const { user, loading: authLoading } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data when user is available
  useEffect(() => {
    if (user && !authLoading) {
      loadUserData();
    }
  }, [user, authLoading]);

  const loadUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock data for now - replace with actual API calls later
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'Inception',
          overview: 'A mind-bending thriller about dreams within dreams.',
          genre: 'Sci-Fi Thriller',
          rating: 8.8,
          platform: 'Netflix',
          poster: '/images/inception-poster.jpg',
          backdrop: '/images/inception-backdrop.jpg',
          reason: 'Because you loved The Dark Knight',
          confidence: 0.95,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Interstellar',
          overview: 'A team of explorers travel through a wormhole in space.',
          genre: 'Sci-Fi Drama',
          rating: 8.6,
          platform: 'Amazon Prime',
          poster: '/images/interstellar-poster.jpg',
          backdrop: '/images/interstellar-backdrop.jpg',
          reason: 'Perfect for your mood: Mind-bending',
          confidence: 0.89,
          createdAt: new Date().toISOString(),
        },
      ];

      const mockWatchHistory: WatchHistoryItem[] = [
        {
          id: '1',
          contentId: 'movie-123',
          title: 'The Dark Knight',
          poster: '/images/dark-knight-poster.jpg',
          watchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          progress: 100,
          completed: true,
          rating: 9.5,
        },
        {
          id: '2',
          contentId: 'series-456',
          title: 'Stranger Things S4',
          poster: '/images/stranger-things-poster.jpg',
          watchedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          progress: 75,
          completed: false,
        },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRecommendations(mockRecommendations);
      setWatchHistory(mockWatchHistory);
    } catch (err: any) {
      setError(err.message || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRecommendations = async () => {
    // Mock implementation - add more recommendations
    const newRecommendations: Recommendation[] = [
      {
        id: '3',
        title: 'The Prestige',
        overview: 'Two magicians engage in a battle of wits.',
        genre: 'Mystery Thriller',
        rating: 8.5,
        platform: 'Hulu',
        poster: '/images/prestige-poster.jpg',
        backdrop: '/images/prestige-backdrop.jpg',
        reason: 'Christopher Nolan collection',
        confidence: 0.82,
        createdAt: new Date().toISOString(),
      },
    ];

    setRecommendations(prev => [...prev, ...newRecommendations]);
  };

  const updateProfile = async (profileData: any) => {
    setLoading(true);
    setError(null);
    try {
      // Mock API call
       const updatedProfile = await AuthService.updateProfile(profileData);
      
      // In real implementation, this would call your backend API
      console.log('Updating profile:', profileData);
      
      // Refresh local user state
    await loadUserData() // This refetches /users/me
    return { success: true, data: updatedProfile };
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences: any) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Updating preferences:', preferences);
      
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Failed to update preferences');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // User data
    user,
    userLoading: authLoading,
    userError: null,

    // Recommendations
    recommendations,
    recommendationsLoading: loading,
    loadMoreRecommendations,

    // Watch history
    watchHistory,
    watchHistoryLoading: loading,

    // General loading and error states
    loading,
    error,

    // Actions
    updateProfile,
    updatePreferences,
    refreshData: loadUserData,
  };
}