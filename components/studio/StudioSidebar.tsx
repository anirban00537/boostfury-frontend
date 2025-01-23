"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Info, ChevronDown, Lightbulb, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { toggleEditor } from "@/state/slices/contentSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const postLengthOptions = [
  {
    value: "short",
    label: "Short",
    description: "~100 words",
    tooltip: "Best for quick updates and engagement posts",
  },
  {
    value: "medium",
    label: "Medium",
    description: "~200 words",
    tooltip: "Ideal for sharing insights and experiences",
  },
  {
    value: "long",
    label: "Long",
    description: "~300 words",
    tooltip: "Perfect for in-depth analysis and thought leadership",
  },
] as const;

const toneOptions = [
  {
    value: "professional",
    label: "Professional",
    emoji: "💼",
    tooltip: "Formal and business-oriented tone",
  },
  {
    value: "casual",
    label: "Casual",
    emoji: "😊",
    tooltip: "Relaxed and conversational style",
  },
  {
    value: "friendly",
    label: "Friendly",
    emoji: "🤝",
    tooltip: "Warm and approachable tone",
  },
  {
    value: "humorous",
    label: "Humorous",
    emoji: "😄",
    tooltip: "Light and entertaining style",
  },
  {
    value: "inspirational",
    label: "Inspirational",
    emoji: "✨",
    tooltip: "Motivational and uplifting content",
  },
  {
    value: "educational",
    label: "Educational",
    emoji: "📚",
    tooltip: "Informative and teaching-focused",
  },
  {
    value: "storytelling",
    label: "Storytelling",
    emoji: "📖",
    tooltip: "Narrative and engaging style",
  },
  {
    value: "analytical",
    label: "Analytical",
    emoji: "📊",
    tooltip: "Data-driven and logical approach",
  },
  {
    value: "persuasive",
    label: "Persuasive",
    emoji: "🎯",
    tooltip: "Convincing and compelling tone",
  },
] as const;

interface StudioSidebarProps {
  // Generation states and handlers
  prompt: string;
  tone: string;
  isGenerating: boolean;
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleGenerate: () => Promise<void>;
  setTone: (tone: string) => void;
  postLength: "short" | "medium" | "long";
  setPostLength: (length: "short" | "medium" | "long") => void;
}

export const StudioSidebar: React.FC<StudioSidebarProps> = ({
  prompt,
  tone,
  isGenerating,
  handlePromptChange,
  handleGenerate,
  setTone,
  postLength,
  setPostLength,
}) => {
  const [showTips, setShowTips] = useState(true);
  const dispatch = useDispatch();

  // Get states from Redux
  const isEditorOpen = useSelector(
    (state: RootState) => state.content.isEditorOpen
  );

  const handleToggle = () => {
    dispatch(toggleEditor());
  };

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: isEditorOpen ? 0 : 400 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed top-0 right-0 h-screen w-[400px] bg-white border-l border-[#e0dfdd] flex flex-col"
    >
      {/* Toggle Button with improved hover effect */}
      <button
        onClick={handleToggle}
        className="absolute -left-12 top-4 p-2.5 bg-white hover:bg-[#f3f2ef] rounded-l-xl border border-r-0 border-[#e0dfdd] group transition-all duration-300 hover:shadow-md"
      >
        <motion.div
          animate={{ rotate: isEditorOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-600 group-hover:text-neutral-900" />
        </motion.div>
      </button>

      {/* Header with AI indicator */}
      <div className="flex-none px-6 py-4 border-b border-[#e0dfdd]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
            AI Post Generator
          </h2>
        </div>
        <p className="text-sm text-neutral-600">
          Generate engaging LinkedIn posts with AI assistance
        </p>
      </div>

      {/* Content with smooth scrolling */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
        <div className="p-6 space-y-8">
          {/* Writing Tips Section */}
          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10"
              >
                <button
                  onClick={() => setShowTips(false)}
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-primary/10 text-primary/60 hover:text-primary"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">
                      Writing Tips
                    </h3>
                    <ul className="text-xs text-neutral-600 space-y-1.5">
                      <li>• Start with a hook to grab attention</li>
                      <li>• Include relevant hashtags for better reach</li>
                      <li>• End with a clear call-to-action</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt Input with character count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-900">
                What would you like to write about?
              </label>
              <span className="text-xs text-neutral-500">
                {prompt.length}/500 characters
              </span>
            </div>
            <div className="relative group">
              <textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your topic or idea..."
                maxLength={500}
                className="w-full h-[120px] px-4 py-3 text-[15px] leading-relaxed bg-blue-50/30 rounded-xl border border-blue-100/60 placeholder:text-gray-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none transition-all duration-200"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-blue-100/50 text-blue-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Be specific about your topic and target audience
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Post Length Selection with tooltips */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-900">
              Select post length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {postLengthOptions.map((option) => (
                <Tooltip key={option.value}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setPostLength(option.value)}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-xl transition-all duration-200 border",
                        postLength === option.value
                          ? "bg-white border-primary shadow-sm text-primary ring-1 ring-primary/20"
                          : "border-transparent bg-blue-50/80 hover:bg-white hover:shadow-sm hover:border-blue-200/60"
                      )}
                    >
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                      <span className="text-xs text-neutral-500 mt-1">
                        {option.description}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{option.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Tone Selection with tooltips */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-900">
              Choose the tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {toneOptions.map((option) => (
                <Tooltip key={option.value}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setTone(option.value)}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-xl transition-all duration-200 border h-[42px]",
                        tone === option.value
                          ? "bg-white border-primary shadow-sm text-primary ring-1 ring-primary/20"
                          : "border-transparent bg-blue-50/80 hover:bg-white hover:shadow-sm hover:border-blue-200/60"
                      )}
                    >
                      <span className="text-lg shrink-0">{option.emoji}</span>
                      <span className="text-xs font-medium truncate">
                        {option.label}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{option.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button with loading state */}
      <div className="flex-none p-6 bg-gradient-to-t from-white via-white to-transparent border-t border-neutral-200/60">
        <GradientButton
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className={cn(
            "w-full h-12 shadow-lg transition-all duration-300",
            !prompt.trim()
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-primary/25 hover:-translate-y-0.5"
          )}
          variant="primary"
        >
          <div className="relative flex items-center justify-center gap-2">
            {isGenerating ? (
              <>
                <div className="w-4 h-4 relative animate-spin">
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white" />
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
