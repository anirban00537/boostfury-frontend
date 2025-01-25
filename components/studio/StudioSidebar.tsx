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
    tooltip: "Best for quick updates and engagement posts",
  },
  {
    value: "medium",
    label: "Medium",
    tooltip: "Ideal for sharing insights and experiences",
  },
  {
    value: "long",
    label: "Long",
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
  postLength: "short" | "medium" | "long";
  isGenerating: boolean;
  handleGenerate: () => void;
  handleGeneratePersonalized: () => void;
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setTone: (tone: string) => void;
  setPostLength: (length: "short" | "medium" | "long") => void;
}

export const StudioSidebar = ({
  prompt,
  tone,
  postLength,
  isGenerating,
  handleGenerate,
  handleGeneratePersonalized,
  handlePromptChange,
  setTone,
  setPostLength,
}: StudioSidebarProps) => {
  const [isRegularGenerating, setIsRegularGenerating] = useState(false);
  const [isPersonalizedGenerating, setIsPersonalizedGenerating] =
    useState(false);
  const [showTips, setShowTips] = useState(true);
  const dispatch = useDispatch();

  // Get states from Redux
  const isEditorOpen = useSelector(
    (state: RootState) => state.content.isEditorOpen
  );

  const handleToggle = () => {
    dispatch(toggleEditor());
  };

  const handleRegularGenerate = async () => {
    setIsRegularGenerating(true);
    await handleGenerate();
    setIsRegularGenerating(false);
  };

  const handlePersonalizedGenerate = async () => {
    setIsPersonalizedGenerating(true);
    await handleGeneratePersonalized();
    setIsPersonalizedGenerating(false);
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

      {/* Modern Header */}
      <div className="relative border-b border-neutral-200/60 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="mx-auto px-8 py-8 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute -inset-3 bg-blue-500 opacity-20 blur-lg rounded-full" />
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20 ring-1 ring-blue-400/30">
                  <Wand2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-bold bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                    AI Post Studio
                  </h1>
                  <div className="w-2 h-2 rounded-full bg-neutral-200 mt-2" />
                  <span className="text-neutral-400 mt-2">v1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content with smooth scrolling */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
        <div className="p-6 space-y-8">
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

      {/* Generate Buttons */}
      <div className="space-y-3 px-6 pb-6">
        <GradientButton
          onClick={handleRegularGenerate}
          disabled={!prompt.trim() || prompt.length < 10 || isRegularGenerating}
          variant="primary"
          className="w-full"
          leftIcon={
            isRegularGenerating ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )
          }
        >
          {isRegularGenerating ? "Generating..." : "Generate Post"}
        </GradientButton>
      </div>
    </motion.div>
  );
};

export default StudioSidebar;
