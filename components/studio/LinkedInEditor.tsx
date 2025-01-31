import React, { useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { LinkedInConnect } from "@/components/ui/linkedin-connect";
import {
  Smile,
  ImageIcon,
  Clock,
  Globe2,
  MoreHorizontal,
  Hash,
  Link2,
  Info,
  ChevronDown,
  Linkedin,
  Sparkles,
  Wand2,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import { LinkedInPostImage } from "@/types/post";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GradientButton } from "@/components/ui/gradient-button";
import { RewriteInstructionType } from "@/services/ai-content";
import { LINKEDIN_REWRITE_INSTRUCTIONS } from "@/lib/core-constants";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { POST_STATUS } from "@/lib/core-constants";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface LinkedInEditorProps {
  content: string;
  linkedinProfile: any;
  postDetails: any;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isScheduling: boolean;
  isGenerating: boolean;
  isGeneratingPersonalized: boolean;
  isRewriting: boolean;
  isAutoSaving: boolean;
  onContentChange: (content: string) => void;
  onImageUpload: () => void;
  onEmojiPickerToggle: () => void;
  onSchedule: () => void;
  onAddToQueue: () => void;
  onPostNow: () => void;
  onImageDelete: (imageId: string) => void;
  onGeneratePersonalized: () => void;
  onRewriteContent: (type: RewriteInstructionType) => void;
}

export const LinkedInEditor: React.FC<LinkedInEditorProps> = ({
  content,
  linkedinProfile,
  postDetails,
  isPosting,
  isAddingToQueue,
  isScheduling,
  isGenerating,
  isGeneratingPersonalized,
  isRewriting,
  isAutoSaving,
  onContentChange,
  onImageUpload,
  onEmojiPickerToggle,
  onSchedule,
  onAddToQueue,
  onPostNow,
  onImageDelete,
  onGeneratePersonalized,
  onRewriteContent,
}) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[650px] bg-gradient-to-b from-white via-white to-blue-50/20 rounded-3xl border border-[#0A66C2]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden backdrop-blur-xl"
    >
      {linkedinProfile ? (
        <>
          {/* Profile Header with AI Buttons */}
          <div className="flex-none px-7 py-6 flex items-start justify-between border-b border-neutral-100 bg-gradient-to-b from-white to-blue-50/20">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent rounded-full blur-md" />
                <Avatar className="relative h-12 w-12 rounded-full ring-[3px] ring-white shadow-md">
                  <img
                    src={linkedinProfile?.avatarUrl || "/linkedin-logo.webp"}
                    alt={linkedinProfile?.name || ""}
                    className="h-full w-full object-cover rounded-full"
                  />
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white shadow-md" />
              </div>
              <div className="flex flex-col mt-0.5">
                <span className="font-semibold text-[15px] bg-gradient-to-r from-[#191919] to-[#404040] bg-clip-text text-transparent">
                  {linkedinProfile?.name}
                </span>
                <span className="text-[13px] text-neutral-600">
                  {linkedinProfile?.timezone}
                </span>
                {postDetails?.status !== undefined && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <div
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm",
                        postDetails.status === POST_STATUS.DRAFT &&
                          "bg-neutral-900/5 text-neutral-700 border border-neutral-200/50",
                        postDetails.status === POST_STATUS.SCHEDULED &&
                          "bg-blue-500/5 text-blue-700 border border-blue-200/50",
                        postDetails.status === POST_STATUS.PUBLISHED &&
                          "bg-green-500/5 text-green-700 border border-green-200/50",
                        postDetails.status === POST_STATUS.FAILED &&
                          "bg-red-500/5 text-red-700 border border-red-200/50"
                      )}
                    >
                      {postDetails.status === POST_STATUS.DRAFT && "Draft"}
                      {postDetails.status === POST_STATUS.SCHEDULED &&
                        "Scheduled"}
                      {postDetails.status === POST_STATUS.PUBLISHED &&
                        "Published"}
                      {postDetails.status === POST_STATUS.FAILED && "Failed"}
                    </div>
                    {postDetails.status === POST_STATUS.SCHEDULED &&
                      postDetails.scheduledTime && (
                        <span className="text-xs text-neutral-500 bg-neutral-900/5 px-2.5 py-1 rounded-full shadow-sm border border-neutral-200/50 backdrop-blur-sm">
                          {new Date(postDetails.scheduledTime).toLocaleString()}
                        </span>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* AI Writer Buttons */}
            <div className="flex items-center gap-2 mt-1">
              <ShimmerButton
                onClick={onGeneratePersonalized}
                disabled={
                  isGeneratingPersonalized ||
                  isPosting ||
                  isAddingToQueue ||
                  isScheduling
                }
                className="h-10 px-4 flex items-center gap-2 text-[14px] font-medium rounded-xl"
                shimmerColor="rgba(255, 255, 255, 0.2)"
                background="linear-gradient(110deg, #2563eb, #3b82f6)"
              >
                <div className="flex items-center gap-2">
                  {isGeneratingPersonalized ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  <span>AI Personal Writer</span>
                </div>
              </ShimmerButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ShimmerButton
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="h-10 w-10 flex items-center justify-center p-0 rounded-xl"
                    shimmerColor="rgba(255, 255, 255, 0.2)"
                    background="linear-gradient(110deg, #2563eb, #3b82f6)"
                  >
                    {isRewriting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )}
                  </ShimmerButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] p-1.5">
                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(LINKEDIN_REWRITE_INSTRUCTIONS.IMPROVE)
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>Improve Overall</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(LINKEDIN_REWRITE_INSTRUCTIONS.SHORTER)
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>Make it Shorter</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(LINKEDIN_REWRITE_INSTRUCTIONS.LONGER)
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>Make it Longer</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(
                        LINKEDIN_REWRITE_INSTRUCTIONS.PROFESSIONAL
                      )
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>More Professional</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(LINKEDIN_REWRITE_INSTRUCTIONS.CASUAL)
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>More Casual</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(
                        LINKEDIN_REWRITE_INSTRUCTIONS.SEO_OPTIMIZE
                      )
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>SEO Optimize</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(
                        LINKEDIN_REWRITE_INSTRUCTIONS.STORYTELLING
                      )
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>Make it a Story</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(
                        LINKEDIN_REWRITE_INSTRUCTIONS.PERSUASIVE
                      )
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>More Persuasive</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      onRewriteContent?.(
                        LINKEDIN_REWRITE_INSTRUCTIONS.IMPROVE_HOOK
                      )
                    }
                    disabled={
                      isRewriting ||
                      isPosting ||
                      isAddingToQueue ||
                      isScheduling
                    }
                    className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wand2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span>Improve Hook</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white via-white to-blue-50/30">
            <div className="p-7">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/5 via-blue-500/5 to-transparent rounded-3xl blur-lg" />
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="What do you want to talk about?"
                  className="relative w-full min-h-[400px] text-[16px] leading-[1.7] bg-white/80 border border-neutral-200/80 rounded-2xl p-6 focus:outline-none focus:ring-[3px] focus:ring-blue-500/10 focus:border-blue-200 resize-none placeholder:text-neutral-400 transition-all duration-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #ffffff, #fafbff)",
                  }}
                />
                <div className="absolute right-5 bottom-5 flex items-center gap-2">
                  {isAutoSaving ? (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-neutral-100 backdrop-blur-sm">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : null}
                  <div className="text-xs text-neutral-500 bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-neutral-100 backdrop-blur-sm">
                    {content.length} characters
                  </div>
                </div>
              </div>

              {/* Image Grid */}
              <AnimatePresence>
                {postDetails?.images && postDetails.images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-wrap gap-2 mt-4 p-2 bg-neutral-50/50 rounded-xl border border-neutral-200/50 backdrop-blur-sm"
                  >
                    {postDetails.images.map((image: LinkedInPostImage) => (
                      <Dialog key={image.id}>
                        <DialogTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative group w-16 h-16 rounded-lg overflow-hidden border border-neutral-200/80 shadow-sm bg-white cursor-pointer hover:border-blue-200 transition-colors"
                          >
                            <img
                              src={image.imageUrl}
                              alt="Post image"
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onImageDelete(image.id);
                              }}
                              className="absolute top-1 right-1 p-1.5 bg-white/95 rounded-full text-neutral-600 opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300 shadow-sm hover:scale-110"
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </button>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                          <div className="relative group">
                            <div className="absolute inset-0 -z-10 bg-black/90 backdrop-blur-xl" />
                            <button
                              onClick={() => onImageDelete(image.id)}
                              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/90 transition-all duration-300 backdrop-blur-sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                document
                                  .querySelector('[role="dialog"]')
                                  ?.closest("dialog")
                                  ?.close()
                              }
                              className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/90 transition-all duration-300 backdrop-blur-sm"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <img
                              src={image.imageUrl}
                              alt="Post image"
                              className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex-none border-t border-neutral-100 bg-gradient-to-b from-white to-blue-50/20">
            <div className="p-4 flex items-center justify-between">
              {/* Media Buttons */}
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onImageUpload}
                      disabled={isPosting || isAddingToQueue || isScheduling}
                      className="p-2.5 text-neutral-600 hover:bg-blue-50/50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPosting || isAddingToQueue || isScheduling ? (
                        <Loader2 className="w-[18px] h-[18px] animate-spin" />
                      ) : (
                        <ImageIcon className="w-[18px] h-[18px] group-hover:text-blue-600 transition-colors" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add media to your post</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          disabled={
                            isPosting || isAddingToQueue || isScheduling
                          }
                          className="p-2.5 text-neutral-600 hover:bg-blue-50/50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPosting || isAddingToQueue || isScheduling ? (
                            <Loader2 className="w-[18px] h-[18px] animate-spin" />
                          ) : (
                            <Smile className="w-[18px] h-[18px] group-hover:text-blue-600 transition-colors" />
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 border-none shadow-xl"
                        side="top"
                        align="start"
                        sideOffset={10}
                      >
                        <EmojiPicker
                          onEmojiClick={(emoji) => {
                            if (contentRef.current) {
                              const start = contentRef.current.selectionStart;
                              const end = contentRef.current.selectionEnd;
                              const text = content;
                              const before = text.substring(0, start);
                              const after = text.substring(end);
                              const newText = before + emoji.emoji + after;
                              onContentChange(newText);

                              // Set cursor position after emoji
                              setTimeout(() => {
                                if (contentRef.current) {
                                  const newPosition =
                                    start + emoji.emoji.length;
                                  contentRef.current.selectionStart =
                                    newPosition;
                                  contentRef.current.selectionEnd = newPosition;
                                  contentRef.current.focus();
                                }
                              }, 0);
                            }
                          }}
                          theme={Theme.LIGHT}
                          searchDisabled
                          width={350}
                          height={400}
                        />
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add emoji</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Schedule Buttons */}
              <div className="flex items-center gap-2">
                <GradientButton
                  onClick={onAddToQueue}
                  disabled={
                    isAddingToQueue ||
                    !content.trim() ||
                    postDetails?.scheduledTime ||
                    postDetails?.status === POST_STATUS.SCHEDULED
                  }
                  variant="primary"
                  className="h-9 px-4 text-[14px] font-medium rounded-[18px]"
                  leftIcon={
                    isAddingToQueue ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )
                  }
                >
                  {isAddingToQueue ? "Adding to Queue..." : "Add to Queue"}
                </GradientButton>

                <GradientButton
                  onClick={onSchedule}
                  disabled={isScheduling || !content.trim()}
                  variant="outline"
                  className="h-9 px-4 text-[14px] font-medium rounded-[18px]"
                  leftIcon={
                    isScheduling ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )
                  }
                >
                  {isScheduling ? "Scheduling..." : "Schedule"}
                </GradientButton>

                <GradientButton
                  onClick={onPostNow}
                  disabled={isPosting || !content.trim()}
                  variant="outline"
                  className="h-9 px-4 text-[14px] font-medium rounded-[18px]"
                  leftIcon={
                    isPosting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Linkedin className="h-4 w-4" />
                    )
                  }
                >
                  {isPosting ? "Posting..." : "Post Now"}
                </GradientButton>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LinkedInConnect variant="redirect" className="p-8" />
      )}
    </motion.div>
  );
};
