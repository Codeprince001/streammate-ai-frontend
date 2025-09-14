'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  HomeIcon,
  UserIcon,
  FilmIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Profile', href: '/profile', icon: UserIcon },
  { name: 'Recommendations', href: '/recommendations', icon: SparklesIcon },
  { name: 'My Library', href: '/library', icon: FilmIcon },
  { name: 'Favorites', href: '/favorites', icon: HeartIcon },
  { name: 'Watch Later', href: '/watch-later', icon: ClockIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 pt-16">
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600'
                    : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700 hover:text-secondary-900 dark:hover:text-secondary-200'
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg p-4 text-white">
            <h3 className="font-semibold text-sm">Upgrade to Premium</h3>
            <p className="text-xs mt-1 opacity-90">
              Get unlimited recommendations and advanced features
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}