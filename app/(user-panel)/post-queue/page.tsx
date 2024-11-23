"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  RefreshCw,
  Shuffle,
  PenSquare,
  Eye,
  ExternalLink,
  Linkedin,
  Calendar,
  CalendarX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScheduledQueue } from "@/hooks/useContent";
import { format } from "date-fns";
import { GradientButton } from "@/components/ui/gradient-button";

// Define interfaces for type safety
interface PostImage {
  id: string;
  imageUrl: string;
  order: number;
}

interface Post {
  id: string;
  content: string;
  scheduledTime: string;
  status: number;
  statusLabel: string;
  timeUntilPublishing: string;
  images: PostImage[];
  postType: string;
  visibility: string;
}

interface GroupedPosts {
  [key: string]: Post[];
}

export default function PostQueuePage() {
  const { queueData, isLoadingQueue } = useScheduledQueue();
  const posts = queueData?.data?.posts || [];
  const totalPosts = posts.length;

  // Group posts by date
  const groupPostsByDate = (posts: Post[]): GroupedPosts => {
    return posts.reduce((acc: GroupedPosts, post) => {
      const date = format(new Date(post.scheduledTime), "EEEE | MMMM d");
      if (!acc[date]) acc[date] = [];
      acc[date].push(post);
      return acc;
    }, {});
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Queue</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your scheduled posts
            </p>
          </div>
          {/* Queue Summary */}
          {totalPosts > 0 && (
            <div className="mt-4 p-2 bg-green-50 border border-green-100 rounded-md">
              <p className="text-sm text-green-700">
                You have {totalPosts} posts scheduled. The last one will be
                published on{" "}
                {format(
                  new Date(posts[posts.length - 1].scheduledTime),
                  "EEEE MMMM do"
                )}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Re-Queue
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
            <GradientButton
              variant="primary"
              leftIcon={<PenSquare className="h-4 w-4" />}
              size="sm"
              className="gap-2"
            >
              Edit queue
            </GradientButton>
          </div>
        </div>

        {/* Posts List or Empty State */}
        {totalPosts > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupPostsByDate(posts)).map(
              ([date, datePosts]) => (
                <div key={date}>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {date}
                  </h3>
                  <div className="space-y-2">
                    {datePosts.map((post: Post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200"
                      >
                        <div className="p-3 flex items-center gap-4">
                          <div className="text-gray-400 text-sm min-w-[60px]">
                            {format(new Date(post.scheduledTime), "hh:mm a")}
                          </div>

                          <Linkedin className="h-4 w-4 text-[#0077b5]" />

                          <p className="text-sm text-gray-600 flex-1 line-clamp-1">
                            {post.content}
                          </p>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ExternalLink className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-dashed border-gray-300">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <CalendarX className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No scheduled posts yet
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4 max-w-sm">
              Start scheduling your LinkedIn posts to build a consistent content
              calendar.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoadingQueue && (
          <div className="mt-8 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-lg border border-gray-100 p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-4 bg-gray-200 rounded" />
                  <div className="h-4 w-4 bg-gray-200 rounded-full" />
                  <div className="flex-1 h-4 bg-gray-200 rounded" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded" />
                    <div className="w-8 h-8 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
