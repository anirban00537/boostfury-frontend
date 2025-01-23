"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Filter,
  Plus,
  AlertCircle,
  Sun,
  Moon,
  Clock,
  CalendarDays,
  Wand2,
} from "lucide-react";
import {
  PostPreview,
  DropdownItem,
} from "@/components/content-create/PostPreview";
import { Button } from "@/components/ui/button";
import { PostType, PostSectionConfig, PostTabId, Post } from "@/types/post";
import { useContentManagement, useContentPosting } from "@/hooks/useContent";
import { POST_STATUS } from "@/lib/core-constants";
import { Pagination } from "@/components/ui/pagination";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

interface PostConfig {
  id: PostTabId;
  title: string;
  icon: React.ReactNode;
  emptyStateMessage: string;
}

const postConfigs: PostConfig[] = [
  {
    id: "draft",
    title: "Drafts",
    icon: <FileText className="w-4 h-4" />,
    emptyStateMessage:
      "Create drafts to save your content ideas and work on them later.",
  },
  {
    id: "scheduled",
    title: "Scheduled",
    icon: <Calendar className="w-4 h-4" />,
    emptyStateMessage:
      "Schedule your posts to be published at the perfect time for your audience.",
  },
  {
    id: "published",
    title: "Published",
    icon: <CheckCircle className="w-4 h-4" />,
    emptyStateMessage:
      "Start sharing your content with your network. Your published posts will appear here.",
  },
  {
    id: "failed",
    title: "Failed",
    icon: <AlertCircle className="w-4 h-4" />,
    emptyStateMessage:
      "Posts that failed to publish will appear here. You can retry or edit them.",
  },
];

interface TabHeaderProps {
  activeTab: PostTabId;
  onTabChange: (tabId: PostTabId) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  const router = useRouter();

  return (
    <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="px-8 pt-8 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
              <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
              <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                <FileText className="w-5 h-5 text-neutral-900" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                Content Manager
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                Manage your drafts and scheduled posts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/studio">
              <GradientButton
                variant="primary"
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Create New</span>
                </div>
              </GradientButton>
            </Link>

            <Link href="/dashboard">
              <GradientButton
                variant="default"
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </GradientButton>
            </Link>
          </div>
        </div>

        <div className="flex gap-1">
          {postConfigs.map((config) => (
            <button
              key={config.id}
              onClick={() => onTabChange(config.id)}
              className={cn(
                "group relative px-4 py-3",
                "transition-all duration-200 focus:outline-none"
              )}
            >
              <div className="relative flex items-center gap-2">
                <div
                  className={cn(
                    "size-8 rounded-lg flex items-center justify-center transition-colors",
                    activeTab === config.id
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner"
                      : "text-neutral-500 group-hover:text-primary/80"
                  )}
                >
                  {config.icon}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    activeTab === config.id
                      ? "text-neutral-900"
                      : "text-neutral-600 group-hover:text-neutral-800"
                  )}
                >
                  {config.title}
                </span>
              </div>

              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200",
                  activeTab === config.id
                    ? "bg-primary"
                    : "bg-transparent group-hover:bg-neutral-200"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContentManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    activeTab,
    postsData,
    isLoadingPosts,
    handleTabChange,
    pagination,
    handlePageChange,
    handleDeletePost,
  } = useContentManagement();

  // Handle URL query params for active tab
  useEffect(() => {
    const tab = searchParams?.get("tab") as PostTabId;
    if (tab && postConfigs.some((config) => config.id === tab)) {
      handleTabChange(tab);
    } else if (searchParams && !searchParams.get("tab")) {
      // Set default tab to 'draft' if none exists
      updateQueryParams("draft");
    }
  }, [searchParams, handleTabChange]);

  // Update URL when tab changes
  const updateQueryParams = (tab: PostTabId) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tab);
    window.history.pushState({}, "", newUrl.toString());
    handleTabChange(tab);
  };

  // Update tab click handler
  const handleTabClick = (tabId: PostTabId) => {
    updateQueryParams(tabId);
  };

  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      console.log("Deleting post:", postId);
    }
    if (confirmed) {
      await handleDeletePost(postId);
    }
  };

  const getDropdownItems = (post: any): DropdownItem[] => {
    const items: DropdownItem[] = [];

    // Add edit option only for draft posts
    if (activeTab === "draft") {
      items.push({
        label: "Edit",
        icon: <Pencil className="h-4 w-4" />,
        href: `/studio?draft_id=${post.id}`,
      });
    }

    // Add delete option for all posts
    items.push({
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDelete(post.id),
      className: "text-red-600",
    });

    return items;
  };

  // Function to format the date group header
  const formatDateGroup = (date: string, tabType?: PostTabId) => {
    const momentDate = moment(date);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const oneWeekAgo = moment().subtract(7, "days").startOf("day");
    const oneYearAgo = moment().subtract(1, "year").startOf("day");

    if (momentDate.isSame(today, "day")) {
      return "Today";
    } else if (momentDate.isSame(yesterday, "day")) {
      return "Yesterday";
    } else if (momentDate.isAfter(oneWeekAgo)) {
      return momentDate.format("dddd");
    } else if (momentDate.isAfter(oneYearAgo)) {
      return momentDate.format("dddd, MMMM D");
    } else {
      return momentDate.format("dddd, MMMM D, YYYY");
    }
  };

  const getDateIcon = (date: string, tabType?: PostTabId) => {
    const momentDate = moment(date);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const oneWeekAgo = moment().subtract(7, "days").startOf("day");

    if (momentDate.isSame(today, "day")) {
      return <Clock className="w-4 h-4 text-primary" />;
    } else if (momentDate.isSame(yesterday, "day")) {
      return <Moon className="w-4 h-4 text-indigo-500" />;
    } else if (momentDate.isAfter(oneWeekAgo)) {
      return <Sun className="w-4 h-4 text-amber-500" />;
    } else {
      return <CalendarDays className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen">
      <TabHeader activeTab={activeTab} onTabChange={handleTabClick} />
      <div className=" px-4 sm:px-6 py-8">
        <div className="p-6">
          {isLoadingPosts ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              {postsData[activeTab]?.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* Only show date section if not in draft tab */}
                  {group.date && activeTab !== "draft" && (
                    <div className="relative py-4">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-200/70" />
                      </div>
                      <div className="relative flex justify-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="px-4 bg-white rounded-full shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
                              <div className="flex items-center gap-2.5 py-1.5 px-3">
                                {getDateIcon(group.date, activeTab)}
                                <span className="text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                  {formatDateGroup(group.date, activeTab)}
                                </span>
                                <div className="flex gap-1">
                                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                                  <div className="w-1 h-1 rounded-full bg-primary/60" />
                                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                                </div>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              {moment(group.date).format("dddd, MMMM D, YYYY")}
                              <span className="text-gray-400 ml-1">
                                ({moment(group.date).fromNow()})
                              </span>
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  )}

                  {/* Grid Container */}
                  <div
                    className={`
                    grid gap-4 sm:gap-6
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 
                    lg:grid-cols-2 
                    xl:grid-cols-3 
                    ${activeTab === "draft" ? "gap-6" : "gap-4"}
                  `}
                  >
                    {group.posts.map((post: Post, postIndex) => (
                      <div key={postIndex} className="flex w-full">
                        <PostPreviewNotRedux
                          content={post.content}
                          isGenerating={false}
                          hideViewModeSelector
                          status={
                            activeTab as
                              | "scheduled"
                              | "draft"
                              | "published"
                              | "failed"
                          }
                          dropdownItems={getDropdownItems(post)}
                          linkedInProfile={post.linkedInProfile}
                          user={post.user}
                          postLogs={post.postLogs}
                          publishedAt={post.publishedAt}
                          scheduledTime={post.scheduledTime}
                          imageUrls={post.imageUrls}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {(!postsData[activeTab] || postsData[activeTab].length === 0) && (
                <EmptyState
                  icon={
                    postConfigs.find((config) => config.id === activeTab)?.icon
                      ? (
                          postConfigs.find((config) => config.id === activeTab)
                            ?.icon as any
                        ).type
                      : FileText
                  }
                  title={
                    activeTab === "published"
                      ? "Ready to share your story?"
                      : postConfigs.find((config) => config.id === activeTab)
                          ?.title || ""
                  }
                  description={
                    postConfigs.find((config) => config.id === activeTab)
                      ?.emptyStateMessage || ""
                  }
                />
              )}

              {pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    totalCount={pagination.totalCount}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
