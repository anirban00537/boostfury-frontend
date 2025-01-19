"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  BarChart3,
  Calendar,
  Clock,
  Linkedin,
  PenSquare,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { linkedinProfile } = useSelector((state: RootState) => state.user);

  // Dummy data for upcoming posts
  const upcomingPosts = [
    {
      id: 1,
      content: "Exciting news! We're launching a new feature next week...",
      scheduledTime: "2024-03-25T10:00:00Z",
      type: "text",
    },
    {
      id: 2,
      content: "Join us for an exclusive webinar on AI and content creation...",
      scheduledTime: "2024-03-26T14:30:00Z",
      type: "text",
    },
    {
      id: 3,
      content: "Here are 5 tips for improving your LinkedIn engagement...",
      scheduledTime: "2024-03-27T09:00:00Z",
      type: "text",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your content hub</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Linkedin className="h-6 w-6 text-[#0A66C2]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Connected Profile</p>
              <p className="font-medium text-gray-900">{linkedinProfile?.name}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Scheduled Posts</p>
              <p className="font-medium text-gray-900">12</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Published Posts</p>
              <p className="font-medium text-gray-900">48</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Followers</p>
              <p className="font-medium text-gray-900">2,845</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white"
        >
          <h2 className="text-lg font-semibold mb-2">AI Content Studio</h2>
          <p className="text-blue-100 mb-4">
            Create engaging content with AI assistance
          </p>
          <Link href="/studio">
            <Button
              className="bg-white text-blue-600 hover:bg-blue-50"
              size="sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Open Studio
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white"
        >
          <h2 className="text-lg font-semibold mb-2">Content Calendar</h2>
          <p className="text-purple-100 mb-4">
            View and manage your content schedule
          </p>
          <Link href="/post-queue">
            <Button
              className="bg-white text-purple-600 hover:bg-purple-50"
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Schedule
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Upcoming Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Posts</h2>
          <p className="text-sm text-gray-500">Your next scheduled content</p>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingPosts.map((post) => (
            <div key={post.id} className="p-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{post.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Scheduled for{" "}
                  {new Date(post.scheduledTime).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <Link href={`/studio?draft_id=${post.id}`}>
                <Button variant="ghost" size="sm">
                  <PenSquare className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage; 