"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Button } from "../ui/button";
import {
  Send,
  Clock,
  Sparkles,
  HelpCircle,
  ListPlus,
  Loader2,
  Calendar,
  Settings,
} from "lucide-react";
import { ScheduleModal } from "./ScheduleModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkedInProfile, Post } from "@/types/post";
import { LinkedInProfileUI } from "@/types/post";
import dynamic from "next/dynamic";
import data from "@emoji-mart/data";
import {
  Image as ImageIcon,
  Smile,
  Link2,
  FileText,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ImageUploadModal } from "./ImageUploadModal";
import { useContentPosting } from "@/hooks/useContent";
import Image from "next/image";
import { AIAssistantModal } from "./AIAssistantModal";
import { GradientButton } from "../ui/gradient-button";
import { formatDistanceToNow } from "date-fns";
import { POST_STATUS } from "@/lib/core-constants";

interface ComposeSectionProps {
  content: string;
  setContent: (newContent: string) => void;
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (isOpen: boolean) => void;
  scheduledDate: Date | null;
  onSchedule: (date: Date) => void;
  isEditing?: boolean;
  postDetails?: Post | null;
  onPostNow: (linkedinProfileId: string) => void;
  isPosting: boolean;
  selectedLinkedInProfile: LinkedInProfileUI | null;
  onProfileSelect: (profile: LinkedInProfileUI) => void;
  isAutoSaving?: boolean;
  imageUrls: string[];
  onImageUrlsChange: (urls: string[]) => void;
  postId: string;
  handleImageUpload: (file: File, postId: string) => Promise<boolean>;
  handleImageDelete: (postId: string, imageId: string) => Promise<void>;
  handleImageReorder: (postId: string, imageIds: string[]) => Promise<void>;
  isUploading: boolean;
  imageOrder: string[];
  onAddToQueue: (linkedinProfileId: string) => void;
  isAddingToQueue: boolean;
}

const CHAR_LIMIT = 3000;

// Dynamic import of EmojiPicker to avoid SSR issues
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-[320px] bg-white animate-pulse rounded-lg" />
  ),
});

// Add this helper function at the top of the file, outside the component
const getStatusDetails = (status: number) => {
  switch (status) {
    case POST_STATUS.DRAFT:
      return {
        label: "Draft",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
      };
    case POST_STATUS.SCHEDULED:
      return {
        label: "Scheduled",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
      };
    case POST_STATUS.PUBLISHED:
      return {
        label: "Published",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
      };
    case POST_STATUS.FAILED:
      return {
        label: "Failed",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
      };

    default:
      return {
        label: "Unknown",
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
      };
  }
};

export const ComposeSection = ({
  content,
  setContent,
  isGenerating,
  setIsGenerating,
  isScheduleModalOpen,
  setIsScheduleModalOpen,
  scheduledDate,
  onSchedule,
  isEditing,
  postDetails,
  onPostNow,
  isPosting,
  selectedLinkedInProfile,
  onProfileSelect,
  isAutoSaving,
  imageUrls,
  onImageUrlsChange,
  postId,
  handleImageUpload,
  handleImageDelete,
  handleImageReorder,
  isUploading,
  imageOrder,
  onAddToQueue,
  isAddingToQueue,
}: ComposeSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const characterCount = content.length;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  // Local keyboard handler for other shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Post Now: Cmd/Ctrl + Enter
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (
        !isPosting &&
        content.trim().length > 0 &&
        characterCount <= CHAR_LIMIT &&
        selectedLinkedInProfile?.id
      ) {
        onPostNow(selectedLinkedInProfile.id);
      }
    }
  };

  const onEmojiSelect = (emoji: any) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    const updatedContent =
      content.slice(0, cursorPosition) +
      emoji.native +
      content.slice(cursorPosition);
    setContent(updatedContent);
    setShowEmojiPicker(false);
  };

  const handleImageSelect = (url: string) => {
    onImageUrlsChange([...imageUrls, url]);
    setIsImageModalOpen(false);
  };

  // Create a memoized handler that includes postId
  const handleImageUploadWithPostId = useCallback(
    (file: File) => handleImageUpload(file, postId),
    [handleImageUpload, postId]
  );

  const handleAddToQueue = async () => {
    console.log("selectedLinkedInProfile?.id", selectedLinkedInProfile?.id);
    if (selectedLinkedInProfile?.id && onAddToQueue && content.trim()) {
      try {
        await onAddToQueue(selectedLinkedInProfile.id);
        // Optionally, you could add a success notification here
      } catch (error) {
        console.error("Error adding to queue:", error);
        // Optionally, you could add an error notification here
      }
    }
  };

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() || "";
    setSelectedText(selectedText);
  };

  // Add handleAIContentUpdate function
  const handleAIContentUpdate = (newContent: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const updatedContent = 
        content.substring(0, start) + 
        newContent + 
        content.substring(end);
      
      setContent(updatedContent);
    }
    setIsAIModalOpen(false);
    setSelectedText("");
  };

  return (
    <div className="group relative">
      {/* Main Container */}
      <div className="relative rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 overflow-hidden">
        {/* Editor Header */}
        <div className="p-6 border-b border-neutral-200/60">
          <div className="flex items-center justify-between">
            {/* Tools */}
            <div className="flex items-center gap-3">
              {/* Image Upload */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => setIsImageModalOpen(true)}
                    className="group relative"
                  >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="relative flex items-center gap-2 p-2 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 hover:bg-white/80 transition-all">
                      <ImageIcon className="size-4 text-neutral-600" />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Add images</TooltipContent>
              </Tooltip>

              {/* Emoji Picker */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="group relative"
                  >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="relative flex items-center gap-2 p-2 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 hover:bg-white/80 transition-all">
                      <Smile className="size-4 text-neutral-600" />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Add emoji</TooltipContent>
              </Tooltip>

              {/* AI Assist */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => selectedText && setIsAIModalOpen(true)}
                    disabled={!selectedText}
                    className={cn(
                      "group relative",
                      !selectedText && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 hover:bg-white/80 transition-all">
                      <Sparkles className="size-4 text-neutral-600" />
                      <span className="text-sm font-medium text-neutral-700">AI Assist</span>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {selectedText ? "Enhance selected text with AI" : "Select text to use AI assistance"}
                </TooltipContent>
              </Tooltip>

              {/* Auto-save Status */}
              <div className="ml-auto">
                <div className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border",
                  isAutoSaving
                    ? "bg-white/50 text-primary border-primary/20"
                    : "bg-white/50 text-green-600 border-green-200/50"
                )}>
                  <div className={cn(
                    "size-1.5 rounded-full",
                    isAutoSaving ? "bg-primary animate-pulse" : "bg-green-500"
                  )} />
                  {isAutoSaving ? "Saving..." : "Saved"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            onSelect={handleTextSelection}
            placeholder="What would you like to share? Use AI to enhance your content..."
            className="w-full min-h-[400px] p-6 resize-none bg-white/30
                     text-neutral-700 placeholder-neutral-400/80
                     text-base leading-relaxed focus:outline-none
                     transition-colors"
          />

          {/* Character Counter */}
          <div className="absolute bottom-4 right-4">
            <div className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all",
              characterCount > CHAR_LIMIT
                ? "bg-white/50 text-red-600 border-red-200/50"
                : "bg-white/50 text-neutral-600 border-neutral-200/50"
            )}>
              {characterCount}/{CHAR_LIMIT}
            </div>
          </div>
        </div>

        {/* Image Preview Section */}
        {(imageUrls.length > 0 ||
          (postDetails?.images && postDetails.images.length > 0)) && (
          <div className="border-t-2 border-gray-100/80 p-5 bg-gradient-to-br from-gray-50/50 to-white/50">
            <div className="flex flex-wrap gap-3">
              {postDetails?.images?.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200/50 bg-white/90 group-hover:border-primary/20 transition-all">
                    <Image
                      src={image.imageUrl}
                      alt="Uploaded image"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <button
                    onClick={() => handleImageDelete(postId, image.id)}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full 
                             opacity-0 group-hover:opacity-100 transition-all border border-red-400
                             hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {imageUrls.map((url, index) => (
                <div key={`new-${index}`} className="relative group">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200/50 bg-white/90 group-hover:border-primary/20 transition-all">
                    <Image
                      src={url}
                      alt={`New upload ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <button
                    onClick={() => handleImageDelete(postId, imageOrder[index])}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full 
                             opacity-0 group-hover:opacity-100 transition-all border border-red-400
                             hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
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

        {/* Post Details Section */}
        {postDetails && (
          <div className="border-t-2 border-gray-100/80 p-5 bg-gradient-to-br from-gray-50/50 to-white/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(() => {
                  const { label, bgColor, textColor } = getStatusDetails(
                    postDetails.status
                  );
                  return (
                    <span
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border",
                        bgColor.replace("bg-", "border-").replace("50", "200/50"),
                        bgColor,
                        textColor
                      )}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      {label}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-6 border-t border-neutral-200/60">
          <div className="flex items-center justify-end gap-3">
            <GradientButton
              variant="default"
              size="sm"
              onClick={() => setIsScheduleModalOpen(true)}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>Schedule</span>
              </div>
            </GradientButton>

            <div className="h-6 w-px bg-neutral-200/60" />

            <GradientButton
              variant="default"
              size="sm"
              onClick={() => selectedLinkedInProfile?.id && onAddToQueue(selectedLinkedInProfile.id)}
              disabled={isAddingToQueue}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>Queue</span>
                {isAddingToQueue && (
                  <Loader2 className="size-3 animate-spin" />
                )}
              </div>
            </GradientButton>

            <GradientButton
              variant="primary"
              size="sm"
              onClick={() => selectedLinkedInProfile?.id && onPostNow(selectedLinkedInProfile.id)}
              disabled={!selectedLinkedInProfile || characterCount > CHAR_LIMIT || !content.trim() || isPosting}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                {isPosting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Publish Now</span>
                  </>
                )}
              </div>
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
      />
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onUploadSuccess={() => {}}
        handleImageUpload={handleImageUploadWithPostId}
        isUploading={isUploading}
      />
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => {
          setIsAIModalOpen(false);
          setSelectedText("");
        }}
        selectedText={selectedText}
        onContentUpdate={handleAIContentUpdate}
      />
    </div>
  );
};
