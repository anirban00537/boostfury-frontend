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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GradientButton } from "@/components/ui/gradient-button";

interface LinkedInEditorProps {
  content: string;
  linkedinProfile: any;
  postDetails: any;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isScheduling: boolean;
  isGeneratingPersonalized: boolean;
  onContentChange: (content: string) => void;
  onImageUpload: () => void;
  onEmojiPickerToggle: () => void;
  onSchedule: () => void;
  onAddToQueue: () => void;
  onPostNow: () => void;
  onImageDelete: (imageId: string) => void;
  onGeneratePersonalized: () => void;
  onRewriteContent?: (type: number) => void;
}

export const LinkedInEditor: React.FC<LinkedInEditorProps> = ({
  content,
  linkedinProfile,
  postDetails,
  isPosting,
  isAddingToQueue,
  isScheduling,
  isGeneratingPersonalized,
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
      className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden"
    >
      {linkedinProfile ? (
        <>
          {/* Profile Header */}
          <div className="flex-none px-4 py-3 flex items-start justify-between border-b border-neutral-100">
            <div className="flex items-start gap-3.5">
              <div className="relative">
                <Avatar className="h-11 w-11 rounded-full ring-2 ring-white">
                  <img
                    src={linkedinProfile?.avatarUrl || "/linkedin-logo.webp"}
                    alt={linkedinProfile?.name || ""}
                    className="h-full w-full object-cover rounded-full"
                  />
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col mt-0.5">
                <span className="font-semibold text-[15px] text-[#191919]">
                  {linkedinProfile?.name}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-1.5 text-[13px] text-neutral-600 mt-0.5 hover:bg-neutral-50 px-2 -ml-2 py-1 rounded-md transition-all group">
                      <Globe2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
                      <span className="group-hover:text-neutral-700">Anyone</span>
                      <svg
                        className="w-3 h-3 ml-0.5 group-hover:text-neutral-700"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 10L4 6h8l-4 4z" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Choose who can see your post</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="flex items-center">
              <motion.button
                onClick={onAddToQueue}
                disabled={isAddingToQueue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "h-9 px-4 text-sm font-medium text-white bg-[#8B5CF6]",
                  "hover:bg-[#7C3AED] rounded-l-lg transition-all shadow-sm",
                  "flex items-center gap-2 border border-[#7C3AED]/20 border-r-0",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#8B5CF6]"
                )}
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                {isAddingToQueue ? "Adding..." : "Add to Queue"}
              </motion.button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-9 w-9 bg-[#8B5CF6] hover:bg-[#7C3AED] 
                    rounded-r-lg transition-all shadow-sm border border-[#7C3AED]/20 border-l-white/20 flex items-center justify-center"
                  >
                    <ChevronDown className="h-4 w-4 text-white" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] p-1">
                  <DropdownMenuItem
                    onClick={onSchedule}
                    disabled={isScheduling}
                    className="gap-2.5 h-10 px-4 rounded-lg data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600"
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Schedule</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onPostNow}
                    disabled={isPosting}
                    className="gap-2.5 h-10 px-4 rounded-lg data-[highlighted]:bg-green-50 data-[highlighted]:text-green-600"
                  >
                    {isPosting ? (
                      <div className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center">
                        <div className="h-4 w-4 relative animate-spin">
                          <div className="absolute inset-0 rounded-full border-2 border-neutral-200 border-t-neutral-600" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center">
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
            <div className="p-4">
              <div className="relative h-[calc(60vh-2rem)]">
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="What do you want to talk about?"
                  className="w-full h-full text-[#333333] text-[15px] leading-[1.6] bg-white border border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 resize-none placeholder:text-neutral-500 transition-all duration-200"
                />
                <div className="absolute right-3 bottom-3 text-xs text-neutral-500 bg-white/90 px-2 py-1 rounded-md backdrop-blur-sm shadow-sm border border-neutral-100">
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
                    className="grid grid-cols-2 gap-3 mt-4"
                  >
                    {postDetails.images.map((image: LinkedInPostImage) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-100 shadow-sm"
                      >
                        <img
                          src={image.imageUrl}
                          alt="Post image"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-all" />
                        <button
                          onClick={() => onImageDelete(image.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-neutral-600 opacity-0 group-hover:opacity-100 hover:bg-white transition-all shadow-sm hover:scale-105"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
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
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onImageUpload}
                      className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group"
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
                      className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group"
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
                    <button className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group">
                      <Hash className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add hashtag</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all group">
                      <Link2 className="w-[18px] h-[18px] group-hover:text-neutral-900 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add link</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <GradientButton
                      onClick={onGeneratePersonalized}
                      disabled={isGeneratingPersonalized}
                      isLoading={isGeneratingPersonalized}
                      variant="primary"
                      size="default"
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 h-9 rounded-lg shadow-sm flex items-center gap-2 transition-all"
                      leftIcon={<Sparkles className="w-4 h-4" />}
                    >
                      {isGeneratingPersonalized ? "Generating..." : "Generate AI Post"}
                    </GradientButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Generate a personalized post using AI
                    </p>
                  </TooltipContent>
                </Tooltip>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <GradientButton
                      variant="primary"
                      size="default"
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 h-9 rounded-lg shadow-sm flex items-center gap-2 transition-all"
                      leftIcon={<Wand2 className="w-4 h-4" />}
                    >
                      AI Rewrite
                    </GradientButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] p-1">
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(1)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <Sparkles className="h-3.5 w-3.5 text-neutral-700" />
                      </div>
                      <span>Improve Overall</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(2)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-neutral-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 6h18M3 12h10M3 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span>Make it Shorter</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(3)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-neutral-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span>Make it Longer</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(4)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-neutral-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span>More Professional</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(5)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <Smile className="h-3.5 w-3.5 text-neutral-700" />
                      </div>
                      <span>More Casual</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(6)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-neutral-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 8h10M7 12h10M7 16h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="19" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span>SEO Optimize</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(7)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-neutral-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Add Storytelling</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(8)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-neutral-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                      <span>More Persuasive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewriteContent?.(9)}
                      className="gap-2 h-9 px-3 rounded-lg data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-neutral-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Improve Hook</span>
                    </DropdownMenuItem>
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
