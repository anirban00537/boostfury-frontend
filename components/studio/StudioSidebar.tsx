"use client";
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  HelpCircle,
  Sparkles,
  Wand2,
  Loader2,
  ChevronLeft,
  MessageSquare,
  Zap,
  Linkedin,
  Plus,
  Save,
  Calendar,
  Pencil,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  SmilePlus,
  ImagePlus,
  Wand,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GradientButton } from "@/components/ui/gradient-button";
import { ScheduleModal } from "@/components/content-create/ScheduleModal";
import { Avatar } from "@/components/ui/avatar";

interface LinkedInProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  linkedInProfileUrl?: string | null;
}

interface StudioSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  linkedinProfile: LinkedInProfile;
  onPostNow: () => void;
  onAddToQueue: () => void;
  onSchedule: (date: Date) => void;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isScheduling: boolean;
  content: string;
  isGenerating: boolean;
  status: "scheduled" | "draft" | "published" | "failed";
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    user_name: string;
    photo: string | null;
  };
  imageUrls?: string[];
  publishedAt?: string;
  scheduledTime?: string;
  onContentChange?: (content: string) => void;
  onEmojiSelect?: (emoji: string) => void;
  onAIRewrite?: () => void;
  onImageUpload?: () => void;
}

const StudioSidebar: React.FC<StudioSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  linkedinProfile,
  onPostNow,
  onAddToQueue,
  onSchedule,
  isPosting,
  isAddingToQueue,
  isScheduling,
  content,
  isGenerating,
  status,
  user,
  imageUrls,
  publishedAt,
  scheduledTime,
  onContentChange,
  onEmojiSelect,
  onAIRewrite,
  onImageUpload,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const getStatusConfig = (status: string | undefined) => {
    switch (status) {
      case "scheduled":
        return {
          icon: <Calendar className="h-3.5 w-3.5" />,
          text: "Scheduled",
          className: "text-blue-600 bg-blue-50 border border-blue-200",
        };
      case "draft":
        return {
          icon: <FileText className="h-3.5 w-3.5" />,
          text: "Draft",
          className: "text-gray-600 bg-gray-50 border border-gray-200",
        };
      case "published":
        return {
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          text: "Published",
          className: "text-green-600 bg-green-50 border border-green-200",
        };
      case "failed":
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          text: "Failed",
          className: "text-red-600 bg-red-50 border border-red-200",
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig(status);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      className={cn(
        "fixed top-0 right-0 h-screen bg-white z-40",
        "border-l border-neutral-200/50",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0" : "w-[400px]"
      )}
      animate={{
        width: isCollapsed ? 0 : 400,
        opacity: isCollapsed ? 0 : 1,
        x: isCollapsed ? 20 : 0,
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
    >
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute top-6 -left-3 size-6 bg-white rounded-full",
          "border border-neutral-200/50 shadow-sm",
          "flex items-center justify-center",
          "hover:bg-neutral-50 hover:scale-110",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          isCollapsed ? "-left-10 shadow-md" : "-left-3"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft
          className={cn(
            "size-4 text-neutral-500 transition-transform duration-200",
            isCollapsed && "rotate-180"
          )}
        />
      </motion.button>

      <div className={cn("h-full flex flex-col", isCollapsed && "hidden")}>
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-neutral-200/50">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex gap-3 items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <Avatar className="h-9 w-9 rounded-full ring-2 ring-white">
                  <img
                    src={linkedinProfile?.avatarUrl || "/linkedin-logo.webp"}
                    alt={linkedinProfile?.name || ""}
                    className="h-full w-full object-cover rounded-full"
                  />
                </Avatar>
                <div className="absolute -bottom-1 -right-1 size-3.5 bg-blue-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {linkedinProfile?.name || "LinkedIn Profile"}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                  {publishedAt && <span>{formatDate(publishedAt)}</span>}
                  {scheduledTime && (
                    <span>Scheduled for {formatDate(scheduledTime)}</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Status Badge */}
            {statusConfig && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium",
                  statusConfig.className
                )}
              >
                {statusConfig.icon}
                <span>{statusConfig.text}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {isGenerating ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full w-3/4" />
              <div className="h-4 bg-gray-200 rounded-full w-1/2" />
              <div className="h-4 bg-gray-200 rounded-full w-5/6" />
            </div>
          ) : (
            <motion.div
              className="space-y-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <textarea
                ref={contentRef}
                value={content}
                placeholder="Write your post here..."
                onChange={(e) => onContentChange?.(e.target.value)}
                readOnly={!onContentChange}
                className={cn(
                  "w-full whitespace-pre-wrap break-words",
                  "min-h-[300px] p-4",
                  "bg-gray-50/50 rounded-xl",
                  "border border-gray-200",
                  "text-[15px] leading-relaxed",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300",
                  "transition-all duration-200",
                  "resize-none font-[inherit]",
                  "placeholder:text-gray-400"
                )}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  lineHeight: "1.6",
                  fontFamily: "inherit",
                }}
              />

              {/* Editor Controls */}
              <div className="flex items-center justify-end gap-1.5 -mt-10 mr-2 relative z-10">
                <button
                  onClick={() => onEmojiSelect?.("😊")}
                  className={cn(
                    "p-2 rounded-lg text-gray-600 bg-white",
                    "hover:bg-gray-100/80 hover:text-gray-900",
                    "transition-colors duration-150",
                    "active:scale-95"
                  )}
                >
                  <SmilePlus className="size-[18px]" />
                </button>
                <button
                  onClick={onImageUpload}
                  className={cn(
                    "p-2 rounded-lg text-gray-600 bg-white",
                    "hover:bg-gray-100/80 hover:text-gray-900",
                    "transition-colors duration-150",
                    "active:scale-95"
                  )}
                >
                  <ImagePlus className="size-[18px]" />
                </button>
                <button
                  onClick={onAIRewrite}
                  className={cn(
                    "p-2 rounded-lg text-blue-600 bg-white",
                    "hover:bg-blue-50/80 hover:text-blue-700",
                    "transition-colors duration-150",
                    "active:scale-95"
                  )}
                >
                  <Wand className="size-[18px]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Image Grid */}
          {imageUrls && imageUrls.length > 0 && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div
                className={cn(
                  "grid gap-3",
                  "w-full rounded-lg overflow-hidden",
                  imageUrls.length === 1
                    ? "grid-cols-1"
                    : imageUrls.length === 2
                    ? "grid-cols-2"
                    : imageUrls.length === 3
                    ? "grid-cols-2"
                    : imageUrls.length === 4
                    ? "grid-cols-2"
                    : "grid-cols-3"
                )}
              >
                {imageUrls.map((url, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "relative",
                      "group cursor-pointer",
                      "overflow-hidden rounded-lg",
                      imageUrls.length === 3 && index === 0
                        ? "row-span-2"
                        : imageUrls.length > 4 && index >= 4
                        ? "hidden md:block"
                        : ""
                    )}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={cn(
                        "relative",
                        imageUrls.length === 1 ? "pt-[52%]" : "pt-[100%]"
                      )}
                    >
                      <img
                        src={url}
                        alt={`Post image ${index + 1}`}
                        className={cn(
                          "absolute inset-0 w-full h-full",
                          "object-cover transition-transform duration-300",
                          "group-hover:scale-105"
                        )}
                      />
                      {imageUrls.length > 4 && index === 4 && (
                        <div
                          className={cn(
                            "absolute inset-0",
                            "bg-black/50 backdrop-blur-sm",
                            "flex items-center justify-center",
                            "transition-opacity duration-200"
                          )}
                        >
                          <span className="text-white text-lg font-medium">
                            +{imageUrls.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Actions Footer */}
        <motion.div
          className="px-6 py-4 bg-white border-t border-neutral-200/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <GradientButton
              variant="outline"
              size="sm"
              shadow="soft"
              onClick={() => setIsScheduleModalOpen(true)}
              disabled={isScheduling}
              leftIcon={<Calendar className="size-4" />}
              className={cn(
                "flex-1 transition-all duration-200",
                "hover:border-blue-200 hover:bg-blue-50/50",
                "active:scale-[0.98]"
              )}
            >
              {isScheduling ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Scheduling...
                </span>
              ) : (
                "Schedule"
              )}
            </GradientButton>

            <GradientButton
              variant="outline"
              size="sm"
              shadow="soft"
              onClick={onAddToQueue}
              disabled={isAddingToQueue}
              leftIcon={<Plus className="size-4" />}
              className={cn(
                "flex-1 transition-all duration-200",
                "hover:border-purple-200 hover:bg-purple-50/50",
                "active:scale-[0.98]"
              )}
            >
              {isAddingToQueue ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Adding...
                </span>
              ) : (
                "Queue"
              )}
            </GradientButton>

            <GradientButton
              variant="primary"
              size="sm"
              shadow="default"
              onClick={onPostNow}
              disabled={isPosting}
              className={cn(
                "flex-1 relative h-9",
                "bg-gradient-to-r from-[#0A66C2] via-[#2C8EFF] to-[#0A66C2]",
                "hover:from-[#004182] hover:via-[#0A66C2] hover:to-[#004182]",
                "border-0 shadow-lg hover:shadow-xl",
                "hover:shadow-blue-500/20",
                "transition-all duration-300",
                "active:scale-[0.98]"
              )}
              leftIcon={<Save className="size-4" />}
            >
              {isPosting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Publishing...
                </span>
              ) : (
                "Publish"
              )}
            </GradientButton>
          </div>
        </motion.div>
      </div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
        isScheduling={isScheduling}
      />
    </motion.div>
  );
};

export default StudioSidebar;
