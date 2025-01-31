import React, { useRef } from "react";
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
import EmojiPicker, { Theme } from 'emoji-picker-react';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[650px] bg-gradient-to-b from-white via-white to-blue-50/20 rounded-2xl border border-[#0A66C2]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
    >
      {linkedinProfile ? (
        <>
          {/* Profile Header with AI Buttons */}
          <div className="flex-none px-6 py-5 flex items-start justify-between border-b border-neutral-100 bg-white">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12 rounded-full ring-[3px] ring-white shadow-sm">
                  <img
                    src={linkedinProfile?.avatarUrl || "/linkedin-logo.webp"}
                    alt={linkedinProfile?.name || ""}
                    className="h-full w-full object-cover rounded-full"
                  />
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white" />
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
                        "px-2.5 py-1 rounded-full text-xs font-medium shadow-sm",
                        postDetails.status === POST_STATUS.DRAFT &&
                          "bg-neutral-100 text-neutral-700",
                        postDetails.status === POST_STATUS.SCHEDULED &&
                          "bg-blue-50 text-blue-700",
                        postDetails.status === POST_STATUS.PUBLISHED &&
                          "bg-green-50 text-green-700",
                        postDetails.status === POST_STATUS.FAILED &&
                          "bg-red-50 text-red-700"
                      )}
                    >
                      {postDetails.status === POST_STATUS.DRAFT && "Draft"}
                      {postDetails.status === POST_STATUS.SCHEDULED && "Scheduled"}
                      {postDetails.status === POST_STATUS.PUBLISHED && "Published"}
                      {postDetails.status === POST_STATUS.FAILED && "Failed"}
                    </div>
                    {postDetails.status === POST_STATUS.SCHEDULED &&
                      postDetails.scheduledTime && (
                        <span className="text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full shadow-sm">
                          {new Date(postDetails.scheduledTime).toLocaleString()}
                        </span>
                      )}
                  </div>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-1.5 text-[13px] text-neutral-600 mt-2 hover:bg-neutral-50 px-2.5 -ml-2.5 py-1 rounded-lg transition-all group">
                      <Globe2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
                      <span className="group-hover:text-neutral-700">Anyone</span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-700" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Choose who can see your post</p>
                  </TooltipContent>
                </Tooltip>
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
                className="h-9 px-4 flex items-center gap-2 text-[14px] font-medium"
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

              <ShimmerButton
                disabled={
                  isRewriting || isPosting || isAddingToQueue || isScheduling
                }
                className="h-9 w-9 flex items-center justify-center p-0"
                shimmerColor="rgba(255, 255, 255, 0.2)"
                background="linear-gradient(110deg, #2563eb, #3b82f6)"
                borderRadius="9999px"
              >
                {isRewriting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </ShimmerButton>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white via-white to-blue-50/30">
            <div className="p-7">
              <div className="relative h-[calc(60vh-2rem)]">
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="What do you want to talk about?"
                  className="w-full h-full text-[15px] leading-[1.6] bg-white/80 border border-neutral-200 rounded-2xl p-5 focus:outline-none focus:ring-[3px] focus:ring-blue-500/10 focus:border-blue-200 resize-none placeholder:text-neutral-400 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, #ffffff, #fafbff)'
                  }}
                />
                <div className="absolute right-4 bottom-4 text-xs text-neutral-500 bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-neutral-100">
                  {content.length} characters
                </div>
              </div>

              {/* Image Grid */}
              <AnimatePresence>
                {postDetails?.images && postDetails.images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-2 gap-5 mt-7"
                  >
                    {postDetails.images.map((image: LinkedInPostImage) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative group aspect-square rounded-2xl overflow-hidden border border-neutral-100 shadow-sm bg-neutral-50"
                      >
                        <img
                          src={image.imageUrl}
                          alt="Post image"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <button
                          onClick={() => onImageDelete(image.id)}
                          className="absolute top-3 right-3 p-2 bg-white/95 rounded-full text-neutral-600 opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex-none border-t border-neutral-100 bg-white">
            <div className="p-4 flex items-center justify-between">
              {/* Media Buttons */}
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onImageUpload}
                      disabled={isPosting || isAddingToQueue || isScheduling}
                      className="p-2.5 text-neutral-600 hover:bg-neutral-50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPosting || isAddingToQueue || isScheduling ? (
                        <Loader2 className="w-[18px] h-[18px] animate-spin" />
                      ) : (
                        <ImageIcon className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
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
                          disabled={isPosting || isAddingToQueue || isScheduling}
                          className="p-2.5 text-neutral-600 hover:bg-neutral-50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPosting || isAddingToQueue || isScheduling ? (
                            <Loader2 className="w-[18px] h-[18px] animate-spin" />
                          ) : (
                            <Smile className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
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
                                  const newPosition = start + emoji.emoji.length;
                                  contentRef.current.selectionStart = newPosition;
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
