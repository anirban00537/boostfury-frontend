"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Send, Clock, Sparkles, HelpCircle } from "lucide-react";
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
import FileUploadModal from "../editor/file_upload_modal/file-Upload-Modal.comp";
import { X } from "lucide-react";

interface ComposeSectionProps {
  content: string;
  setContent: (content: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
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
}

const CHAR_LIMIT = 3000;

// Dynamic import of EmojiPicker to avoid SSR issues
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-[320px] bg-white animate-pulse rounded-lg" />
  ),
});

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
}: ComposeSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const characterCount = content.length;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  return (
    <div className="flex flex-col bg-gray-50/95 backdrop-blur-sm rounded-2xl overflow-hidden 
                    border border-primary/10 shadow-[0_8px_40px_rgb(var(--primary-rgb),0.08)]">
      {/* Editor Header */}
      <div className="px-6 py-4 border-b border-primary/5 bg-gray-50/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-primary">
                AI-Powered Editor
              </h2>
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all border",
                isAutoSaving
                  ? "bg-primary/5 text-primary border-primary/20"
                  : "bg-green-50/50 text-green-600 border-green-100"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isAutoSaving ? "bg-primary animate-pulse" : "bg-green-500"
                )}
              />
              {isAutoSaving ? "Saving..." : "Saved"}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="px-6 py-3 border-b border-primary/5 flex items-center justify-between 
                    bg-gray-50/95">
        <div className="flex items-center gap-2">
          {/* Media Tools */}
          <div className="flex items-center gap-1 p-1 bg-white/80 rounded-lg 
                        border border-primary/10 shadow-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/5 rounded-md transition-all"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <ImageIcon className="w-4 h-4 text-primary/80" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white">
                Add Image
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white rounded-md transition-colors"
                >
                  <Video className="w-4 h-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Video</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white rounded-md transition-colors"
                >
                  <FileText className="w-4 h-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Document</TooltipContent>
            </Tooltip>
          </div>

          {/* Text Tools */}
          <div className="flex items-center gap-1 p-1 bg-white/80 rounded-lg border border-blue-100/50 shadow-sm ml-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white rounded-md transition-colors"
                >
                  <Link2 className="w-4 h-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Link</TooltipContent>
            </Tooltip>
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-white rounded-md transition-colors"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="w-4 h-4 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Emoji</TooltipContent>
              </Tooltip>
              {showEmojiPicker && (
                <div className="absolute top-full mt-1 left-0 z-50">
                  <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-100">
                    <Picker
                      data={data}
                      onEmojiSelect={onEmojiSelect}
                      theme="light"
                      previewPosition="none"
                      skinTonePosition="none"
                      searchPosition="none"
                      perLine={8}
                      maxFrequentRows={1}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Assist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-4 gap-2 bg-primary text-white hover:bg-primary/90 
                   rounded-full shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">AI Assist</span>
        </Button>
      </div>

      {/* Editor Content */}
      <div className="flex-grow relative bg-gray-50/95">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What would you like to share? Use AI to enhance your content..."
          className="w-full h-full px-6 py-5 resize-none focus:outline-none
                   text-gray-700 placeholder-gray-400/80 bg-transparent
                   text-base leading-relaxed"
          style={{ minHeight: "240px" }}
        />

        {/* Character Counter */}
        <div className="absolute bottom-4 right-6">
          <div
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border shadow-sm",
              characterCount > CHAR_LIMIT
                ? "bg-red-50 text-red-600 border-red-100"
                : characterCount > CHAR_LIMIT * 0.9
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : "bg-white text-primary border-primary/20"
            )}
          >
            {characterCount}/{CHAR_LIMIT}
          </div>
        </div>
      </div>

      {/* Image Preview Section */}
      {imageUrls.length > 0 && (
        <div className="px-6 py-4 border-t border-primary/5 bg-gray-50/95">
          <div className="flex flex-wrap gap-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg 
                         border border-primary/10 shadow-sm"
                />
                <button
                  onClick={() => {
                    const newUrls = imageUrls.filter((_, i) => i !== index);
                    onImageUrlsChange(newUrls);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white 
                         rounded-full p-1.5 opacity-0 group-hover:opacity-100 
                         transition-all shadow-lg hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Footer */}
      <div className="px-6 py-4 border-t border-primary/5 bg-gray-50/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 gap-2 bg-white hover:bg-primary/5 
                     transition-all hover:text-primary border-primary/20"
            onClick={() => setIsScheduleModalOpen(true)}
            disabled={!selectedLinkedInProfile || !content.trim()}
          >
            <Clock className="w-4 h-4" />
            Schedule
          </Button>

          <Button
            variant="default"
            size="sm"
            className={cn(
              "h-9 px-4 gap-2 bg-gradient-to-br from-primary to-primary text-white hover:bg-primary/90 shadow-md",
              (!selectedLinkedInProfile ||
                characterCount > CHAR_LIMIT ||
                !content.trim() ||
                isPosting) &&
                "opacity-50"
            )}
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
            {isPosting ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent 
                              rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Publish Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
        isScheduling={isPosting}
      />

      <FileUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};
