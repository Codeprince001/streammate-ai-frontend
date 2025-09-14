'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { 
  FilmIcon, 
  UserGroupIcon, 
  ClockIcon, 
  SparklesIcon, 
  HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Movies Watched',
      value: '142',
      icon: FilmIcon,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Hours Streamed',
      value: '1,205',
      icon: ClockIcon,
      change: '+18%',
      changeType: 'positive',
    },
    {
      name: 'Recommendations',
      value: '89',
      icon: SparklesIcon,
      change: '+5%',
      changeType: 'positive',
    },
    {
      name: 'Friends',
      value: '24',
      icon: UserGroupIcon,
      change: '+2',
      changeType: 'positive',
    },
  ];

  const recentActivity = [
    { type: 'watched', title: 'The Dark Knight', platform: 'Netflix', time: '2 hours ago' },
    { type: 'liked', title: 'Stranger Things S4', platform: 'Netflix', time: '1 day ago' },
    { type: 'added', title: 'Dune: Part Two', platform: 'Watch Later', time: '2 days ago' },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Inception',
      genre: 'Sci-Fi Thriller',
      rating: 8.8,
      platform: 'Netflix',
      poster: '/images/inception-poster.jpg',
      reason: 'Because you loved The Dark Knight'
    },
    {
      id: 2,
      title: 'Interstellar',
      genre: 'Sci-Fi Drama',
      rating: 8.6,
      platform: 'Amazon Prime',
      poster: '/images/interstellar-poster.jpg',
      reason: 'Perfect for your mood: Mind-bending'
    },
    {
      id: 3,
      title: 'The Prestige',
      genre: 'Mystery Thriller',
      rating: 8.5,
      platform: 'Hulu',
      poster: '/images/prestige-poster.jpg',
      reason: 'Christopher Nolan collection'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white mt-20">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName || 'there'}! 👋
        </h1>
        <p className="text-primary-100 text-lg">
          Ready to discover your next favorite show? Here's what's trending for you.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={clsx(
                  'text-sm font-medium',
                  stat.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                )}>
                  {stat.change}
                </span>
                <span className="text-sm text-secondary-500 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Recommendations */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700">
            <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                  🤖 AI Recommendations for You
                </h2>
                <Link 
                  href="/recommendations"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg bg-secondary-100 dark:bg-secondary-700 aspect-[2/3] mb-3">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {item.genre} • ⭐ {item.rating}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                            {item.platform}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                          <HeartIcon className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700">
            <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={clsx(
                      'w-2 h-2 rounded-full',
                      activity.type === 'watched' && 'bg-green-500',
                      activity.type === 'liked' && 'bg-red-500',
                      activity.type === 'added' && 'bg-blue-500'
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-secondary-900 dark:text-secondary-100">
                        <span className="font-medium">{activity.type}</span> {activity.title}
                      </p>
                      <p className="text-xs text-secondary-500">
                        {activity.platform} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700">
            <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                Quick Actions
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="outline" fullWidth className="justify-start">
                <SparklesIcon className="h-4 w-4 mr-3" />
                Get New Recommendations
              </Button>
              <Button variant="outline" fullWidth className="justify-start">
                <FilmIcon className="h-4 w-4 mr-3" />
                Browse Trending
              </Button>
              <Button variant="outline" fullWidth className="justify-start">
                <UserGroupIcon className="h-4 w-4 mr-3" />
                Find Friends
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}