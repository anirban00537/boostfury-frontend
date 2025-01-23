"use client";
import React, { useState, useRef, useCallback } from "react";
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
  Smile,
  Image as ImageIcon,
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
import { ImageUploadModal } from "@/components/content-create/ImageUploadModal";
import dynamic from "next/dynamic";
import data from "@emoji-mart/data";
import { LinkedInPostImage } from "@/types/post";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { toggleEditor } from "@/state/slices/contentSlice";

// Dynamic import of EmojiPicker to avoid SSR issues
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-[320px] bg-white animate-pulse rounded-lg" />
  ),
});

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
  images?: LinkedInPostImage[];
  imageUrls?: string[];
  publishedAt?: string;
  scheduledTime?: string;
  onContentChange?: (content: string) => void;
  onEmojiSelect?: (emoji: string) => void;
  onAIRewrite?: () => void;
  onImageUpload?: (file: File) => Promise<boolean>;
  onImageUrlsChange?: (urls: string[]) => void;
  isUploading?: boolean;
  postId: string;
  handleImageDelete?: (imageId: string) => void;
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
  images,
  imageUrls,
  publishedAt,
  scheduledTime,
  onContentChange,
  onEmojiSelect,
  onAIRewrite,
  onImageUpload,
  onImageUrlsChange,
  isUploading,
  postId,
  handleImageDelete,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const isEditorOpen = useSelector(
    (state: RootState) => state.content.isEditorOpen
  );

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

  const handleEmojiSelect = (emoji: any) => {
    const cursorPosition = contentRef.current?.selectionStart || 0;
    const updatedContent =
      content.slice(0, cursorPosition) +
      emoji.native +
      content.slice(cursorPosition);
    onContentChange?.(updatedContent);
    setShowEmojiPicker(false);
  };

  // Create a memoized handler that includes postId
  const handleImageUploadWithPostId = useCallback(
    async (file: File) => {
      if (onImageUpload) {
        const success = await onImageUpload(file);
        if (success) {
          setIsImageModalOpen(false);
        }
        return success;
      }
      return false;
    },
    [onImageUpload]
  );

  const handleToggle = () => {
    dispatch(toggleEditor());
  };

  return (
    <motion.div
      className={cn(
        "fixed top-0 right-0 h-screen bg-white z-40",
        "border-l border-neutral-200/50",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0" : "w-[400px]",
        isEditorOpen ? "translate-x-0" : "translate-x-full"
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
        onClick={handleToggle}
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className={cn(
                        "p-2 rounded-lg text-gray-600 bg-white",
                        "hover:bg-gray-100/80 hover:text-gray-900",
                        "transition-colors duration-150",
                        "active:scale-95"
                      )}
                    >
                      <Smile className="size-[18px]" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add emoji</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsImageModalOpen(true)}
                      className={cn(
                        "p-2 rounded-lg text-gray-600 bg-white",
                        "hover:bg-gray-100/80 hover:text-gray-900",
                        "transition-colors duration-150",
                        "active:scale-95"
                      )}
                    >
                      <ImageIcon className="size-[18px]" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add images</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent>AI rewrite</TooltipContent>
                </Tooltip>

                {/* Emoji Picker Popover */}
                {showEmojiPicker && (
                  <div className="absolute bottom-12 right-0">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      theme="light"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Image Grid */}
          {imageUrls && imageUrls.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                {imageUrls.map((url: string, index: number) => (
                  <div key={`image-${index}`} className="relative group">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200/50 bg-white/90 group-hover:border-primary/20 transition-all">
                      <Image
                        src={url}
                        alt={`Upload ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Delete Button */}
                      {images && images[index] && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageDelete?.(images[index].id);
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isUploading && (
                  <div className="relative w-24 h-24 rounded-xl border-2 border-gray-200/50 bg-white/90">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </div>
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

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onUploadSuccess={() => {}}
        handleImageUpload={handleImageUploadWithPostId}
        isUploading={isUploading || false}
      />
    </motion.div>
  );
};

export default StudioSidebar;
