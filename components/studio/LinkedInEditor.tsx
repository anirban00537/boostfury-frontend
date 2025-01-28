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
      className="w-[650px] bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden"
    >
      {linkedinProfile ? (
        <>
          {/* Profile Header */}
          <div className="flex-none px-6 py-5 flex items-start justify-between border-b border-neutral-100">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12 rounded-full ring-2 ring-white">
                  <img
                    src={linkedinProfile?.avatarUrl || "/linkedin-logo.webp"}
                    alt={linkedinProfile?.name || ""}
                    className="h-full w-full object-cover rounded-full"
                  />
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col mt-0.5">
                <span className="font-semibold text-[15px] text-[#191919]">
                  {linkedinProfile?.name}
                </span>
                <span className="text-[13px] text-neutral-600">
                  {linkedinProfile?.timezone}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-1.5 text-[13px] text-neutral-600 mt-1 hover:bg-neutral-50 px-2 -ml-2 py-1 rounded-md transition-all group">
                      <Globe2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
                      <span className="group-hover:text-neutral-700">
                        Anyone
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-700" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Choose who can see your post</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <RainbowButton
                onClick={onAddToQueue}
                disabled={isAddingToQueue || !content.trim()}
                className="h-10 px-4 flex items-center gap-2"
              >
                {isAddingToQueue ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <span>Add to Queue</span>
                  </>
                )}
              </RainbowButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <RainbowButton
                    disabled={!content.trim()}
                    className="h-10 w-10 flex items-center justify-center p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </RainbowButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] p-1.5">
                  <DropdownMenuItem
                    onClick={onSchedule}
                    disabled={isScheduling || !content.trim()}
                    className="gap-3 h-11 px-4 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600"
                  >
                    {isScheduling ? (
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <span>{isScheduling ? "Scheduling..." : "Schedule"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onPostNow}
                    disabled={isPosting || !content.trim()}
                    className="gap-3 h-11 px-4 rounded-lg data-[highlighted]:bg-green-50 data-[highlighted]:text-green-600"
                  >
                    {isPosting ? (
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 ring-4 ring-green-500/20" />
                      </div>
                    )}
                    <span>{isPosting ? "Posting..." : "Post Now"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="relative h-[calc(60vh-2rem)]">
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="What do you want to talk about?"
                  className="w-full h-full text-[15px] leading-[1.6] bg-white border border-neutral-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent resize-none placeholder:text-neutral-500 transition-all duration-200"
                />
                <div className="absolute right-4 bottom-4 text-xs text-neutral-500 bg-white/90 px-2.5 py-1.5 rounded-md backdrop-blur-sm shadow-sm border border-neutral-100">
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
                    className="grid grid-cols-2 gap-4 mt-6"
                  >
                    {postDetails.images.map((image: LinkedInPostImage) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative group aspect-square rounded-xl overflow-hidden border border-neutral-100 shadow-sm"
                      >
                        <img
                          src={image.imageUrl}
                          alt="Post image"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-all" />
                        <button
                          onClick={() => onImageDelete(image.id)}
                          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-neutral-600 opacity-0 group-hover:opacity-100 hover:bg-white transition-all shadow-sm hover:scale-105"
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

          {/* Action Buttons */}
          <div className="flex-none border-t border-neutral-100 bg-white">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onImageUpload}
                      className="p-2.5 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group"
                    >
                      <ImageIcon className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add media to your post</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onEmojiPickerToggle}
                      className="p-2.5 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group"
                    >
                      <Smile className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add emoji</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-2.5 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group">
                      <Hash className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add hashtag</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-2.5 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group">
                      <Link2 className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add link</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2">
                <RainbowButton
                  onClick={onGeneratePersonalized}
                  disabled={isGeneratingPersonalized}
                  className="h-10 px-4 flex items-center gap-2"
                >
                  {isGeneratingPersonalized ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>AI Personal Writer</span>
                    </>
                  )}
                </RainbowButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <RainbowButton
                      disabled={isRewriting}
                      className="h-10 w-10 flex items-center justify-center p-0"
                    >
                      {isRewriting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Wand2 className="h-5 w-5" />
                      )}
                    </RainbowButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] p-1.5">
                    <DropdownMenuItem
                      onClick={() =>
                        onRewriteContent?.(
                          LINKEDIN_REWRITE_INSTRUCTIONS.IMPROVE
                        )
                      }
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <Sparkles className="h-3.5 w-3.5 text-neutral-700" />
                      </div>
                      <span>Improve Overall</span>
                    </DropdownMenuItem>
                    {/* ... rest of rewrite options ... */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LinkedInConnect variant="redirect" />
      )}
    </motion.div>
  );
};
