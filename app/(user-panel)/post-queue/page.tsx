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
import {
  useScheduledQueue,
  useContentPosting,
  useContentManagement,
} from "@/hooks/useContent";
import { format } from "date-fns";
import { GradientButton } from "@/components/ui/gradient-button";
import { QueueModal } from "@/components/queue/QueueModal";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Link from "next/link";

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
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const { queueData, isLoadingQueue, refetchQueue } = useScheduledQueue();
  const { shuffleQueue, isShuffling } = useContentPosting();
  const { refetchPosts } = useContentManagement();
  const posts = queueData?.data?.posts || [];
  const totalPosts = posts.length;
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"add" | "edit">("add");
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const handleOpenModal = useCallback((mode: "add" | "edit", post?: Post) => {
    setModalMode(mode);
    setSelectedPost(post || null);
    setModalOpen(true);
  }, []);

  const handleSaveQueue = async (data: any) => {
    try {
      // Here you would implement your API call to save/update the post
      if (modalMode === "add") {
        // Add new post
        toast.success("Post scheduled successfully");
      } else {
        // Update existing post
        toast.success("Post updated successfully");
      }
      // Refresh queue data
      // You might want to implement a refetch function in your useScheduledQueue hook
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  // Group posts by date
  const groupPostsByDate = (posts: Post[]): GroupedPosts => {
    return posts.reduce((acc: GroupedPosts, post) => {
      const date = format(new Date(post.scheduledTime), "EEEE | MMMM d");
      if (!acc[date]) acc[date] = [];
      acc[date].push(post);
      return acc;
    }, {});
  };

  const handleShuffleQueue = async () => {
    if (!currentWorkspace?.id) {
      toast.error("No workspace selected");
      return;
    }

    try {
      await shuffleQueue(currentWorkspace.id);
      // Refetch both queue and scheduled posts
      await Promise.all([refetchQueue(), refetchPosts()]);
    } catch (error) {
      console.error("Error shuffling queue:", error);
      toast.error("Failed to shuffle queue");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-8 py-10">
        {/* Header Section - Enhanced with better visual hierarchy */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              My Queue
            </h1>
            <p className="text-base text-gray-500 mt-2 tracking-wide">
              Schedule and manage your upcoming content
            </p>
          </div>

          {/* Action Buttons - Improved visual hierarchy and interactions */}
          <div className="flex gap-4">
            <GradientButton
              variant="primary"
              size="lg"
              className="gap-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 transition-all duration-200"

              leftIcon={<PenSquare className="h-4 w-4" />}
              onClick={() => handleOpenModal("add")}
            >
              Edit Preferred Time
            </GradientButton>
            <GradientButton
              variant="outline"
              size="lg"
              className="gap-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 transition-all duration-200"
              leftIcon={<Shuffle className="h-4 w-4" />}
              onClick={handleShuffleQueue}
              disabled={isShuffling || totalPosts < 2}

            >
              {isShuffling ? "Shuffling..." : "Shuffle"}
            </GradientButton>
          </div>
        </div>
        {/* Queue Summary - Enhanced with more visual appeal */}
        {totalPosts > 0 && (
          <div className="mb-12 p-5 bg-gradient-to-r from-emerald-50/70 via-green-50/70 to-emerald-50/70 border border-emerald-100/80 rounded-2xl backdrop-blur-sm">
            <p className="text-[15px] text-emerald-700 flex items-center gap-3 font-medium">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-emerald-600" />
              </div>
              You have <span className="font-semibold">{totalPosts} posts</span>{" "}
              scheduled. The last one will be published on{" "}
              <span className="font-semibold">
                {format(
                  new Date(posts[posts.length - 1].scheduledTime),
                  "EEEE MMMM do"
                )}
              </span>
            </p>
          </div>
        )}
        {/* Posts List - Enhanced with better visual structure */}
        {totalPosts > 0 && (
          <div className="space-y-14">
            {Object.entries(groupPostsByDate(posts)).map(
              ([date, datePosts]) => (
                <div key={date}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-3 pl-1">
                    <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </div>
                    {date}
                  </h3>
                  <div className="space-y-4">
                    {datePosts.map((post: Post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative border border-gray-100 hover:border-gray-200 rounded-2xl transition-all duration-200 hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.05)]"
                      >
                        <div className="p-6 flex items-center gap-6">
                          {/* Time with enhanced styling */}
                          <div className="min-w-[100px]">
                            <div className="text-gray-600 font-medium">
                              {format(new Date(post.scheduledTime), "hh:mm a")}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {post.timeUntilPublishing}
                            </div>
                          </div>

                          {/* Platform icon with enhanced styling */}
                          <div className="h-10 w-10 rounded-xl bg-[#0077b5]/10 flex items-center justify-center">
                            <Linkedin className="h-5 w-5 text-[#0077b5]" />
                          </div>

                          {/* Content with better typography */}
                          <div className="flex-1">
                            <p className="text-[15px] text-gray-700 line-clamp-1 font-medium">
                              {post.content}
                            </p>
                            {post.images?.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                {post.images.map((image) => (
                                  <div
                                    key={image.id}
                                    className="h-6 w-6 rounded-md bg-gray-100"
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action buttons with improved interaction */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <Link href={`/compose?draft_id=${post.id}`}>
                              <Button
                                variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-xl hover:bg-gray-50"
                              onClick={() => handleOpenModal("edit", post)}
                            >
                                <PenSquare className="h-4 w-4 text-gray-500" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-xl hover:bg-gray-50"
                            >
                              <Eye className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>

                          {/* Status indicator */}
                          <div className="absolute top-0 right-0 mt-2 mr-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
        <QueueModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          post={selectedPost}
          onSave={handleSaveQueue}
        />{" "}
      </div>
    </div>
  );
}
