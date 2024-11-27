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
    <div className="flex flex-col bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-sm rounded-2xl overflow-hidden 
                    border border-primary/10 shadow-[0_8px_40px_rgb(var(--primary-rgb),0.08)] min-h-screen">
      {/* Editor Header - Updated Design */}
      <div className="flex-none px-6 py-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <h2 className="text-sm font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AI-Powered Editor
              </h2>
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                isAutoSaving
                  ? "bg-primary/5 text-primary border-primary/20 animate-pulse"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 border-green-100"
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

      {/* Editor Toolbar - Updated Design */}
      <div className="flex-none px-6 py-3 border-b border-primary/10 flex items-center justify-between 
                    bg-gradient-to-b from-white/80 to-gray-50/80">
        <div className="flex items-center gap-3">
          {/* Media Tools */}
          <div
            className="flex items-center gap-1 p-1.5 bg-white rounded-xl 
                        border border-primary/10 shadow-sm hover:shadow-md transition-all"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/5 rounded-lg transition-all"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <ImageIcon className="w-4 h-4 text-primary/80" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900/95 text-white backdrop-blur-sm">
                Add Image
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Text Tools */}
          <div className="flex items-center gap-1 p-1.5 bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all">
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/5 rounded-lg transition-all"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="w-4 h-4 text-primary/80" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900/95 text-white backdrop-blur-sm">
                  Add Emoji
                </TooltipContent>
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

        {/* AI Assist Button - Updated Design */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-4 gap-2 bg-gradient-to-r from-primary to-primary/90 text-white 
                     hover:from-primary/95 hover:to-primary/85 rounded-xl shadow-md transition-all
                     disabled:from-gray-400 disabled:to-gray-400"
          onClick={() => setIsAIModalOpen(true)}
          disabled={!selectedText}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">AI Assist</span>
        </Button>
      </div>

      {/* Editor Content - Updated for flexible height */}
      <div className="flex-grow relative bg-gray-50/95">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onMouseUp={handleTextSelection}
          onKeyUp={handleTextSelection}
          placeholder="What would you like to share? Use AI to enhance your content..."
          className="w-full h-full px-8 py-6 resize-none focus:outline-none
                   text-gray-700 placeholder-gray-400/80 bg-transparent
                   text-lg leading-relaxed font-normal overflow-y-auto
                   min-h-[calc(100vh-400px)] max-h-[80vh] pb-20"
          style={{ height: "auto" }}
        />

        {/* Character Counter - Adjusted position */}
        <div className="absolute bottom-6 right-8 z-10">
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
      {((postDetails?.images && postDetails.images.length > 0) ||
        imageUrls.length > 0) && (
        <div className="flex-none px-6 py-4 border-t border-primary/5">
          <div className="flex flex-wrap gap-3">
            {/* Show images from postDetails */}
            {postDetails?.images?.map((image) => (
              <div key={image.id} className="relative group">
                <Image
                  src={image.imageUrl}
                  alt="Uploaded image"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover border border-gray-200"
                />
                <button
                  onClick={() => handleImageDelete(postId, image.id)}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full text-white 
                           hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Show images from imageUrls */}
            {imageUrls.map((url, index) => (
              <div key={`new-${index}`} className="relative group">
                <Image
                  src={url}
                  alt={`New upload ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover border border-gray-200"
                />
                <button
                  onClick={() => handleImageDelete(postId, imageOrder[index])}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full text-white 
                           hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Footer - Fixed to bottom */}
      <div className="flex-none px-6 py-4 border-t border-primary/5 bg-gray-50/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <GradientButton
              variant="outline"
              size="sm"
              onClick={() => setIsScheduleModalOpen(true)}
              disabled={!selectedLinkedInProfile || !content.trim()}
              leftIcon={<Clock className="w-4 h-4" />}
            >
              Schedule
            </GradientButton>

            <GradientButton
              variant="outline"
              size="sm"
              onClick={handleAddToQueue}
              disabled={
                !selectedLinkedInProfile || !content.trim() || isAddingToQueue
              }
              leftIcon={
                isAddingToQueue ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ListPlus className="w-4 h-4" />
                )
              }
            >
              {isAddingToQueue ? (
                <>
                  <span
                    className="w-4 h-4 border-2 border-current border-t-transparent 
                                rounded-full animate-spin"
                  />
                  Adding to Queue...
                </>
              ) : (
                <>Add to Queue</>
              )}
            </GradientButton>
          </div>

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
                <span
                  className="w-4 h-4 border-2 border-current border-t-transparent 
                              rounded-full animate-spin"
                />
                Publishing...
              </>
            ) : (
              <>Publish Now</>
            )}
          </GradientButton>
        </div>
      </div>

      {/* Modals */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
        isScheduling={isPosting}
      />
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onUploadSuccess={() => setIsImageModalOpen(false)}
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
          // Replace the selected text with the new content
          const textarea = textareaRef.current;
          if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue =
              content.substring(0, start) + newContent + content.substring(end);
            setContent(newValue);
          }
        }}
      />
    </div>
  );
};
