"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUserData } from "@/hooks/use-user-data";
import { Button } from "@/components/ui/button";
import {
  User as UserIcon,
  Settings,
  Film,
  History,
  Loader2,
  Edit3,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const { user, watchHistory, recommendations, updateProfile, updatePreferences, loading } =
    useUserData();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    displayName: user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`
      : user?.email?.split("@")[0] || "",
    bio: "",
    location: "",
  });

  const handleSave = async () => {
    await updateProfile(form);
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <p className="text-gray-600 dark:text-gray-300">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-blue-500" /> My Profile
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-12">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {user.firstName?.[0] || user.email[0]}
            </div>
            <div>
              {editing ? (
                <input
                  className="border rounded px-3 py-1 text-lg font-semibold"
                  value={form.displayName}
                  onChange={(e) =>
                    setForm({ ...form, displayName: e.target.value })
                  }
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {form.displayName}
                </h2>
              )}
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          {editing ? (
            <textarea
              className="border rounded px-3 py-2 w-full"
              placeholder="Write something about yourself..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              {form.bio || "No bio added yet."}
            </p>
          )}

          <div className="flex gap-3">
            {editing ? (
              <Button onClick={handleSave} disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
                Save
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setEditing(true)}>
                <Edit3 className="mr-2" /> Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        {/* Watch History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6"
        >
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-6">
            <History className="w-5 h-5 text-purple-500" /> Watch History
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchHistory.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h4 className="mt-3 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.completed ? "Completed" : `Progress: ${item.progress}%`}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6"
        >
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-6">
            <Film className="w-5 h-5 text-blue-500" /> Recommendations
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <img
                  src={rec.poster}
                  alt={rec.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h4 className="mt-3 font-semibold text-gray-900 dark:text-white">
                  {rec.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {rec.overview}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
