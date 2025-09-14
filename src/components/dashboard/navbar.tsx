"use client";

import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightCircleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import type { User } from "@/lib/auth";

interface DashboardNavbarProps {
  user: User | null;
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {
  const { logout, logoutAll } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications] = useState([
    { id: 1, title: "New recommendations available", time: "5 min ago" },
    { id: 2, title: "Your favorite show has new episodes", time: "1 hour ago" },
  ]);

  const handleLogout = async () => {
    await logout();
  };

  const handleLogoutAll = async () => {
    if (confirm("This will log you out from all devices. Continue?")) {
      await logoutAll();
    }
  };

  return (
    <nav className="bg-white dark:bg-secondary-800 shadow-sm border-b border-secondary-200 dark:border-secondary-700 fixed w-full top-0 z-30">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <h1 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
              StreamMate AI
            </h1>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies, TV shows, or ask AI for recommendations..."
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-secondary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </Button>

          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-700">
              <BellIcon className="h-6 w-6 text-secondary-600 dark:text-secondary-200" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg bg-white dark:bg-secondary-800 shadow-lg ring-1 ring-black/5 focus:outline-none divide-y divide-secondary-200 dark:divide-secondary-700">
                <div className="px-4 py-2 text-sm font-semibold text-secondary-700 dark:text-secondary-200">
                  Notifications
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 hover:bg-secondary-50 dark:hover:bg-secondary-700 cursor-pointer"
                    >
                      <p className="text-sm text-secondary-900 dark:text-secondary-100">
                        {n.title}
                      </p>
                      <span className="text-xs text-secondary-500">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 rounded-full focus:outline-none">
              <UserCircleIcon className="h-8 w-8 text-secondary-600 dark:text-secondary-200" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-secondary-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                    {user?.firstName ?? "Guest User"}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {user?.email ?? ""}
                  </p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-secondary-100 dark:bg-secondary-700"
                            : ""
                        } flex w-full items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-200`}
                      >
                        <Cog6ToothIcon className="h-5 w-5 mr-2" />
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active
                            ? "bg-secondary-100 dark:bg-secondary-700"
                            : ""
                        } flex w-full items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-200`}
                      >
                        <ArrowRightCircleIcon className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogoutAll}
                        className={`${
                          active
                            ? "bg-secondary-100 dark:bg-secondary-700"
                            : ""
                        } flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                      >
                        <ArrowRightCircleIcon className="h-5 w-5 mr-2" />
                        Logout All Devices
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
