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
import { LinkedInPostImage, Post, LinkedInProfileUI } from "@/types/post";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { toggleEditor } from "@/state/slices/contentSlice";
import { useContentPosting } from "@/hooks/useContent";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";

// Dynamic import of EmojiPicker to avoid SSR issues
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-[320px] bg-white animate-pulse rounded-lg" />
  ),
});

const postLengthOptions = [
  { value: "short", label: "Short", description: "~100 words" },
  { value: "medium", label: "Medium", description: "~200 words" },
  { value: "long", label: "Long", description: "~300 words" },
] as const;

const toneOptions = [
  { value: "professional", label: "Professional", emoji: "💼" },
  { value: "casual", label: "Casual", emoji: "😊" },
  { value: "friendly", label: "Friendly", emoji: "🤝" },
  { value: "humorous", label: "Humorous", emoji: "😄" },
] as const;

interface StudioSidebarProps {
  // Content states and handlers
  content: string;
  postDetails: Post | null;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isScheduling: boolean;
  isUploading: boolean;
  handlePostNow: (linkedinProfileId: string) => Promise<void>;
  handleAddToQueue: (linkedinProfileId: string) => Promise<void>;
  handleSchedule: (date: Date) => Promise<void>;
  handleContentChange: (content: string) => void;
  handleImageUpload: (file: File) => Promise<boolean>;
  handleImageDelete: (imageId: string) => Promise<void>;
  // Generation states and handlers
  prompt: string;
  tone: string;
  isGenerating: boolean;
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleGenerate: () => Promise<void>;
  setTone: (tone: string) => void;
  // Other props
  linkedinProfile: LinkedInProfileUI | null;
}

export const StudioSidebar: React.FC<StudioSidebarProps> = ({
  content,
  postDetails,
  isPosting,
  isAddingToQueue,
  isScheduling,
  isUploading,
  handlePostNow,
  handleAddToQueue,
  handleSchedule,
  handleContentChange,
  handleImageUpload,
  handleImageDelete,
  prompt,
  tone,
  isGenerating,
  handlePromptChange,
  handleGenerate,
  setTone,
  linkedinProfile,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const [postLength, setPostLength] = useState<"short" | "medium" | "long">(
    "medium"
  );

  // Get states from Redux
  const isEditorOpen = useSelector(
    (state: RootState) => state.content.isEditorOpen
  );

  // Create user object from linkedinProfile
  const user = {
    id: linkedinProfile?.id || "",
    email: "",
    first_name: linkedinProfile?.name?.split(" ")[0] || "",
    last_name: linkedinProfile?.name?.split(" ")[1] || "",
    user_name: linkedinProfile?.name || "",
    photo: linkedinProfile?.avatarUrl || null,
  };

  const handleToggle = () => {
    dispatch(toggleEditor());
  };

  const handleEmojiSelect = (emoji: any) => {
    const cursorPosition = contentRef.current?.selectionStart || 0;
    const updatedContent =
      content.slice(0, cursorPosition) +
      emoji.native +
      content.slice(cursorPosition);
    handleContentChange?.(updatedContent);
    setShowEmojiPicker(false);
  };

  // Create a memoized handler that includes postId
  const handleImageUploadWithPostId = useCallback(
    async (file: File) => {
      if (handleImageUpload) {
        const success = await handleImageUpload(file);
        if (success) {
          setIsImageModalOpen(false);
        }
        return success;
      }
      return false;
    },
    [handleImageUpload]
  );

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
      initial={{ x: 400 }}
      animate={{ x: isEditorOpen ? 0 : 400 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed top-0 right-0 h-screen w-[400px] bg-white shadow-xl border-l border-[#e0dfdd] flex flex-col"
    >
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="absolute -left-12 top-4 p-2.5 bg-white hover:bg-[#f3f2ef] rounded-l-xl border border-r-0 border-[#e0dfdd] group transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-transform duration-300",
            isEditorOpen ? "rotate-0" : "rotate-180"
          )}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-[#e0dfdd]">
        <h2 className="text-lg font-semibold text-[#191919]">
          AI Post Generator
        </h2>
        <p className="text-sm text-[#666666] mt-1">
          Generate engaging LinkedIn posts with AI
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium text-[#191919] mb-2">
                What would you like to write about?
              </label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Enter your topic or idea..."
                  className="w-full h-[120px] px-4 py-3 text-[15px] leading-relaxed bg-[#f3f2ef] rounded-xl border-0 placeholder:text-[#666666] text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#0a66c2] resize-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#f3f2ef]/[0.01] to-[#f3f2ef]/[0.02] pointer-events-none rounded-xl" />
              </div>
            </div>

            {/* Post Length Selection */}
            <div>
              <label className="block text-sm font-medium text-[#191919] mb-3">
                Select post length
              </label>
              <div className="grid grid-cols-3 gap-2">
                {postLengthOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPostLength(option.value)}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-xl transition-all border",
                      postLength === option.value
                        ? "bg-white border-[#0a66c2] shadow-sm text-[#0a66c2]"
                        : "border-transparent bg-[#f3f2ef] hover:bg-white/80"
                    )}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-[#666666] mt-1">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-medium text-[#191919] mb-3">
                Choose the tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toneOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTone(option.value)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-xl transition-all border",
                      tone === option.value
                        ? "bg-white border-[#0a66c2] shadow-sm text-[#0a66c2]"
                        : "border-transparent bg-[#f3f2ef] hover:bg-white/80"
                    )}
                  >
                    <span className="text-xl">{option.emoji}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex-none p-6 bg-gradient-to-t from-white/80 to-white border-t border-[#e0dfdd]">
        <GradientButton
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full h-11 shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          variant="primary"
        >
          <div className="relative flex items-center justify-center gap-2">
            {isGenerating ? (
              <>
                <div className="w-4 h-4 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                </div>
                <span className="font-medium">Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-medium">Generate Post</span>
              </>
            )}
          </div>
        </GradientButton>
      </div>
    </motion.div>
  );
};

export default StudioSidebar;
