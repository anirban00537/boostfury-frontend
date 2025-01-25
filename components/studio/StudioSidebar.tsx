"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Info, ChevronDown, Wand2, Lightbulb, Zap, Brain } from "lucide-react";
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
    icon: <Zap className="w-4 h-4" />,
  },
  {
    value: "medium",
    label: "Medium",
    tooltip: "Ideal for sharing insights and experiences",
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    value: "long",
    label: "Long",
    tooltip: "Perfect for in-depth analysis and thought leadership",
    icon: <Brain className="w-4 h-4" />,
  },
] as const;

const toneOptions = [
  {
    value: "professional",
    label: "Professional",
    emoji: "💼",
    tooltip: "Formal and business-oriented tone",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    value: "casual",
    label: "Casual",
    emoji: "😊",
    tooltip: "Relaxed and conversational style",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    value: "friendly",
    label: "Friendly",
    emoji: "🤝",
    tooltip: "Warm and approachable tone",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    value: "humorous",
    label: "Humorous",
    emoji: "😄",
    tooltip: "Light and entertaining style",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    value: "inspirational",
    label: "Inspirational",
    emoji: "✨",
    tooltip: "Motivational and uplifting content",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    value: "educational",
    label: "Educational",
    emoji: "📚",
    tooltip: "Informative and teaching-focused",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    value: "storytelling",
    label: "Storytelling",
    emoji: "📖",
    tooltip: "Narrative and engaging style",
    gradient: "from-red-500 to-rose-600",
  },
  {
    value: "analytical",
    label: "Analytical",
    emoji: "📊",
    tooltip: "Data-driven and logical approach",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    value: "persuasive",
    label: "Persuasive",
    emoji: "🎯",
    tooltip: "Convincing and compelling tone",
    gradient: "from-teal-500 to-emerald-600",
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
  const [isPersonalizedGenerating, setIsPersonalizedGenerating] = useState(false);
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
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          right: isEditorOpen ? "400px" : "0px",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 p-2.5 bg-white hover:bg-neutral-50 rounded-l-xl border border-r-0 border-neutral-200/60 group transition-all duration-300 hover:shadow-lg z-50"
      >
        <motion.div
          animate={{ rotate: isEditorOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-600 group-hover:text-neutral-900" />
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{
          opacity: isEditorOpen ? 1 : 0,
          x: isEditorOpen ? 0 : 400,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 right-0 h-screen w-[400px] bg-gradient-to-b from-violet-50/50 via-white to-white flex flex-col",
          !isEditorOpen && "pointer-events-none"
        )}
      >
        {/* Beautiful Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#e9e4ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-violet-100/20 to-transparent" />
        </div>

        {/* Beautiful Header */}
        <div className="relative border-b border-violet-100">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-100/20 via-violet-50/10 to-transparent" />
          <div className="mx-auto px-6 py-5 relative">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-violet-100 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-violet-100 group-hover:border-violet-200 transition-all duration-300">
                  <div className="absolute inset-0 rounded-xl bg-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Wand2 className="w-6 h-6 text-violet-600 relative" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-0.5">
                  <h1 className="text-xl font-semibold text-violet-950">
                    AI Studio
                  </h1>
                  <div className="relative">
                    <div className="absolute inset-0 bg-violet-100 blur opacity-25" />
                    <div className="px-2 py-1 rounded-md bg-white/80 border border-violet-200 backdrop-blur-sm relative">
                      <span className="text-[11px] font-semibold text-violet-600">
                        BETA
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-violet-600/80">
                  Powered by Advanced AI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-transparent">
          <div className="p-6 space-y-8">
            {/* Prompt Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <label className="text-sm font-medium text-neutral-900">
                    What would you like to write about?
                  </label>
                </div>
                <span className="text-xs text-neutral-500">
                  {prompt.length}/500
                </span>
              </div>
              <div className="relative group">
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Enter your topic or idea..."
                  maxLength={500}
                  className="w-full h-[120px] px-4 py-3 text-[15px] leading-relaxed rounded-xl border-2 border-neutral-200 placeholder:text-neutral-400 text-neutral-900 focus:outline-none resize-none transition-all duration-200 bg-white focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#4158D0,#C850C0,#7F00FF,#4158D0)_border-box] focus:border-transparent"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-violet-50 text-violet-400 hover:text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity">
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
            </motion.div>

            {/* Post Length Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-violet-600" />
                <label className="text-sm font-medium text-neutral-900">
                  Select post length
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {postLengthOptions.map((option) => (
                  <Tooltip key={option.value}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setPostLength(option.value)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200",
                          postLength === option.value
                            ? "bg-violet-50 border border-violet-200 shadow-sm"
                            : "bg-white border border-neutral-200 hover:border-violet-200 hover:shadow-sm"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                            postLength === option.value
                              ? "bg-violet-100 text-violet-600"
                              : "bg-neutral-100 text-neutral-500"
                          )}
                        >
                          {option.icon}
                        </div>
                        <span className={cn(
                          "text-sm font-medium",
                          postLength === option.value
                            ? "text-violet-600"
                            : "text-neutral-600"
                        )}>
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
            </motion.div>

            {/* Tone Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-tr from-indigo-100 via-fuchsia-100 to-amber-100">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                </div>
                <label className="text-sm font-medium bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                  Choose the tone
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {toneOptions.map((option) => (
                  <Tooltip key={option.value}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setTone(option.value)}
                        className={cn(
                          "group relative flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-300 border min-h-[52px]",
                          tone === option.value
                            ? "bg-gradient-to-tr from-violet-50/80 to-fuchsia-50/80 border-violet-200 shadow-lg shadow-violet-100/50 scale-[1.02]"
                            : "bg-white hover:bg-gradient-to-tr hover:from-violet-50/40 hover:to-fuchsia-50/40 border-neutral-200/60 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/30 hover:scale-[1.01]"
                        )}
                      >
                        <div className={cn(
                          "relative flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-all duration-300",
                          tone === option.value
                            ? "bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20"
                            : "bg-gradient-to-tr from-neutral-100 to-neutral-50 group-hover:from-violet-100/40 group-hover:to-fuchsia-100/40"
                        )}>
                          <span className="text-lg relative z-10">{option.emoji}</span>
                          <div className={cn(
                            "absolute inset-0 rounded-lg transition-opacity duration-300",
                            tone === option.value
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          )}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-fuchsia-500/10 rounded-lg blur-md" />
                          </div>
                        </div>
                        <span className={cn(
                          "text-sm font-medium flex-1 text-left transition-colors duration-300 line-clamp-2",
                          tone === option.value
                            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
                            : "text-neutral-600 group-hover:text-violet-600"
                        )}>
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
            </motion.div>
          </div>
        </div>

        {/* Generate Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-6 bg-gradient-to-t from-white via-white to-transparent"
        >
          <GradientButton
            onClick={handleRegularGenerate}
            disabled={!prompt.trim() || prompt.length < 10 || isRegularGenerating}
            variant="primary"
            className="w-full relative group shadow-lg shadow-violet-100/50"
            leftIcon={
              isRegularGenerating ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              )
            }
          >
            <span className="relative">
              {isRegularGenerating ? "Generating..." : "Generate Post"}
            </span>
          </GradientButton>
        </motion.div>
      </motion.div>
    </>
  );
};

export default StudioSidebar;
