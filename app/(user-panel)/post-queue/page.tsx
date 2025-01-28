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
import { EmptyState } from "@/components/ui/empty-state";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";

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
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
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
    if (!linkedinProfile?.id) {
      toast.error("No LinkedIn profile selected");
      return;
    }

    try {
      await shuffleQueue();
      // Refetch both queue and scheduled posts
      await Promise.all([refetchQueue(), refetchPosts()]);
    } catch (error) {
      console.error("Error shuffling queue:", error);
      toast.error("Failed to shuffle queue");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-8 pt-8 pb-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <Clock className="w-5 h-5 text-neutral-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  Post Queue
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Schedule and manage your upcoming content
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <GradientButton
                variant="primary"
                onClick={() => handleOpenModal("add")}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <PenSquare className="h-4 w-4" />
                  <span>Edit Preferred Time</span>
                </div>
              </GradientButton>

              <GradientButton
                variant="default"
                onClick={handleShuffleQueue}
                disabled={isShuffling || totalPosts < 2}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <Shuffle className="h-4 w-4" />
                  <span>{isShuffling ? "Shuffling..." : "Shuffle"}</span>
                </div>
              </GradientButton>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-8 mx-auto">
        {isLoadingQueue ? (
          <LoadingSection className="min-h-[200px]" />
        ) : (
          <>
            {/* Queue Summary */}
            {totalPosts > 0 && (
              <div className="relative mb-8 group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/50 via-neutral-300/50 to-neutral-200/50 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Calendar className="size-5 text-primary" />
                    </div>
                    <p className="text-sm text-neutral-600">
                      You have{" "}
                      <span className="font-medium text-neutral-900">
                        {totalPosts} posts
                      </span>{" "}
                      scheduled. The last one will be published on{" "}
                      <span className="font-medium text-neutral-900">
                        {format(
                          new Date(posts[posts.length - 1].scheduledTime),
                          "EEEE MMMM do"
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Posts List */}
            {totalPosts > 0 ? (
              <div className="space-y-12">
                {Object.entries(groupPostsByDate(posts)).map(
                  ([date, datePosts]) => (
                    <div key={date}>
                      {/* Date Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="relative size-8 rounded-lg bg-neutral-100/80 flex items-center justify-center shrink-0">
                          <Calendar className="size-4 text-neutral-600" />
                        </div>
                        <h3 className="text-sm font-medium text-neutral-900">
                          {date}
                        </h3>
                      </div>

                      {/* Posts Grid */}
                      <div className="space-y-3">
                        {datePosts.map((post: Post) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative"
                          >
                            <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                            <div className="relative flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 overflow-hidden">
                              {/* Time */}
                              <div className="min-w-[100px] shrink-0">
                                <div className="text-sm font-medium text-neutral-900">
                                  {format(
                                    new Date(post.scheduledTime),
                                    "hh:mm a"
                                  )}
                                </div>
                                <div className="text-xs text-neutral-500 mt-0.5">
                                  {post.timeUntilPublishing}
                                </div>
                              </div>

                              {/* Platform Icon */}
                              <div className="relative size-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center shrink-0">
                                <Linkedin className="size-5 text-[#0077b5]" />
                              </div>

                              {/* Content */}
                              <div className="w-[400px] lg:w-[500px] shrink-0">
                                <p className="text-sm text-neutral-700 truncate">
                                  {post.content}
                                </p>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0">
                                <Link href={`/studio?draft_id=${post.id}`}>
                                  <button className="relative size-8 rounded-lg flex items-center justify-center hover:bg-neutral-100/80 transition-colors">
                                    <PenSquare className="size-4 text-neutral-500" />
                                  </button>
                                </Link>
                                <button className="relative size-8 rounded-lg flex items-center justify-center hover:bg-neutral-100/80 transition-colors">
                                  <Eye className="size-4 text-neutral-500" />
                                </button>
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
              <EmptyState
                icon={Calendar}
                title="Your Queue is Empty"
                description="Start scheduling your posts to maintain a consistent presence on your social media platforms."
              />
            )}
          </>
        )}
      </div>

      <QueueModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        post={selectedPost}
        onSave={handleSaveQueue}
      />
    </div>
  );
}
