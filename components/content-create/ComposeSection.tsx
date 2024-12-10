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

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-primary/10 transition-all">
      {/* Toolbar */}
      <div className="border-b-2 border-gray-100/80 p-3 bg-gradient-to-r from-gray-50/80 to-white/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-1.5 bg-white/90 rounded-xl border border-gray-200/80 backdrop-blur-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsImageModalOpen(true)}
                  className="h-8 w-8 p-0 hover:bg-primary/5 hover:border-primary/20 transition-colors rounded-lg border border-transparent"
                >
                  <ImageIcon className="w-4 h-4 text-primary/80" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Image</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-7 w-px bg-gradient-to-b from-primary/10 via-purple-500/10 to-transparent rounded-full" />

          <Tooltip>
            <TooltipTrigger asChild>
              <GradientButton
                variant="outline"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                className={cn(
                  "h-8 px-3.5 gap-2 transition-all rounded-lg border-2",
                  selectedText
                    ? "bg-gradient-to-r from-primary/5 to-purple-500/5 text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 border-primary/20 hover:border-primary/40"
                    : "bg-gray-50/80 text-gray-400 cursor-not-allowed border-gray-200/50"
                )}
                onClick={() => selectedText && setIsAIModalOpen(true)}
                disabled={!selectedText}
              >
                AI Assist
              </GradientButton>
            </TooltipTrigger>
            <TooltipContent>
              {selectedText
                ? "Enhance selected text with AI"
                : "Select text to use AI assistance"}
            </TooltipContent>
          </Tooltip>

          {/* Auto-save indicator */}
          <div className="ml-auto">
            <div
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border",
                isAutoSaving
                  ? "bg-gradient-to-r from-blue-50/80 to-blue-100/50 text-blue-600 border-blue-200/50"
                  : "bg-gradient-to-r from-green-50/80 to-green-100/50 text-green-600 border-green-200/50"
              )}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isAutoSaving ? "bg-blue-500 animate-pulse" : "bg-green-500"
                  )}
                />
                {isAutoSaving ? "Saving..." : "Saved"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="relative bg-gradient-to-br from-white to-gray-50/50">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onMouseUp={handleTextSelection}
          onKeyUp={handleTextSelection}
          onSelect={handleTextSelection}
          placeholder="What would you like to share? Use AI to enhance your content..."
          className="w-full min-h-[400px] p-7 resize-none focus:outline-none
                   text-gray-700 placeholder-gray-400/80 bg-transparent
                   text-base leading-relaxed transition-colors"
        />

        {/* Character Counter */}
        <div className="absolute bottom-5 right-7">
          <div
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border",
              characterCount > CHAR_LIMIT
                ? "bg-gradient-to-r from-red-50/90 to-red-100/50 text-red-600 border-red-200/50"
                : "bg-gradient-to-r from-gray-50/90 to-gray-100/50 text-gray-600 border-gray-200/50"
            )}
          >
            {characterCount}/{CHAR_LIMIT}
          </div>
        </div>
      </div>

      {/* Image Preview */}
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

      {/* Post Details */}
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

      {/* Footer */}
      <div className="border-t-2 border-gray-100/80 p-5 bg-gradient-to-br from-gray-50/50 to-white/50">
        <div className="flex items-center justify-end gap-3">
          <GradientButton
            variant="outline"
            size="sm"
            leftIcon={<Calendar className="w-4 h-4" />}
            className="border-2 border-primary/20 hover:border-primary/40 transition-all rounded-lg"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            Schedule
          </GradientButton>
          <div className="h-6 w-px bg-gradient-to-b from-primary/10 via-purple-500/10 to-transparent rounded-full" />
          <GradientButton
            variant="outline"
            size="sm"
            leftIcon={<Clock className="w-4 h-4" />}
            className="border-2 border-primary/20 hover:border-primary/40 transition-all rounded-lg"
            onClick={() =>
              selectedLinkedInProfile?.id &&
              onAddToQueue(selectedLinkedInProfile.id)
            }
            disabled={isAddingToQueue}
          >
            Queue
            {isAddingToQueue && (
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin ml-2" />
            )}
          </GradientButton>
          <GradientButton
            variant="primary"
            size="sm"
            leftIcon={
              isPosting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )
            }
            className="border-2 border-transparent hover:border-primary/20 transition-all"
            disabled={
              !selectedLinkedInProfile ||
              characterCount > CHAR_LIMIT ||
              !content.trim() ||
              isPosting
            }
            onClick={() =>
              selectedLinkedInProfile?.id &&
              onPostNow(selectedLinkedInProfile.id)
            }
          >
            {isPosting ? "Publishing..." : "Publish Now"}
          </GradientButton>
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
        onContentUpdate={(newContent) => {
          const textarea = textareaRef.current;
          if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue =
              content.substring(0, start) + newContent + content.substring(end);
            setContent(newValue);
          }
          setIsAIModalOpen(false);
          setSelectedText("");
        }}
      />
    </div>
  );
};
