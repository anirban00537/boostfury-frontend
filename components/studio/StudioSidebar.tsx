"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Info,
  ChevronDown,
  Wand2,
  Lightbulb,
  Zap,
  Brain,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RainbowButton } from "@/components/ui/rainbow-button";

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

const categoryOptions = [
  {
    value: "thought_leadership",
    label: "Thought Leadership",
    description: "Share industry insights and expert opinions",
  },
  {
    value: "industry_insight",
    label: "Industry Insight",
    description: "Analysis and trends in your industry",
  },
  {
    value: "career_milestone",
    label: "Career Milestone",
    description: "Professional achievements and career updates",
  },
  {
    value: "educational_content",
    label: "Educational Content",
    description: "Share knowledge and learning resources",
  },
  {
    value: "personal_story",
    label: "Personal Story",
    description: "Share personal experiences and lessons",
  },
  {
    value: "value_driven_promotion",
    label: "Value-Driven Promotion",
    description: "Promote while providing value",
  },
  {
    value: "commentary_opinion",
    label: "Commentary / Opinion",
    description: "Share your perspective on industry topics",
  },
  {
    value: "how_to_tips",
    label: "How-To / Tips",
    description: "Practical advice and tutorials",
  },
  {
    value: "behind_the_scenes",
    label: "Behind-The-Scenes",
    description: "Share work culture and processes",
  },
  {
    value: "personal_achievement",
    label: "Personal Achievement",
    description: "Celebrate personal wins and milestones",
  },
] as const;

const toneOptions = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal and business-oriented tone",
  },
  {
    value: "casual",
    label: "Casual",
    description: "Relaxed and conversational style",
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm and approachable tone",
  },
  {
    value: "humorous",
    label: "Humorous",
    description: "Light and entertaining style",
  },
  {
    value: "inspirational",
    label: "Inspirational",
    description: "Motivational and uplifting content",
  },
  {
    value: "educational",
    label: "Educational",
    description: "Informative and teaching-focused",
  },
  {
    value: "storytelling",
    label: "Storytelling",
    description: "Narrative and engaging style",
  },
  {
    value: "analytical",
    label: "Analytical",
    description: "Data-driven and logical approach",
  },
] as const;

type CategoryOption = (typeof categoryOptions)[number];
type CategoryValue = CategoryOption["value"];
type ToneOption = (typeof toneOptions)[number];
type ToneValue = ToneOption["value"];

interface StudioSidebarProps {
  // Generation states and handlers
  prompt: string;
  tone: string;
  postLength: "short" | "medium" | "long";
  isGenerating: boolean;
  handleGenerate: () => void;
  handleGeneratePersonalized: () => void;
  handlePromptChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    category?: string
  ) => void;
  setTone: (tone: string) => void;
  setPostLength: (length: "short" | "medium" | "long") => void;
  // Collapse functionality
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
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
  isCollapsed = false,
  onCollapse,
}: StudioSidebarProps) => {
  const [isRegularGenerating, setIsRegularGenerating] = useState(false);
  const [isPersonalizedGenerating, setIsPersonalizedGenerating] =
    useState(false);
  const [showTips, setShowTips] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue>("thought_leadership");
  const [selectedTone, setSelectedTone] = useState<ToneValue>("professional");
  const dispatch = useDispatch();

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

  const handleCategoryChange = (value: CategoryValue) => {
    setSelectedCategory(value);
    // Pass both content and category when category changes
    handlePromptChange(
      {
        target: { value: prompt },
      } as React.ChangeEvent<HTMLTextAreaElement>,
      value
    );
  };

  const handlePromptChangeWithCategory = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handlePromptChange(e, selectedCategory);
  };

  const handleToggleCollapse = () => {
    onCollapse?.(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white fixed right-0 top-0 shadow-[-1px_0_0_0_rgba(0,0,0,0.05)] z-10 transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[380px]"
      )}
    >
      {/* Collapse Button */}
      <button
        onClick={handleToggleCollapse}
        className="absolute -left-3 top-8 size-6 rounded-full bg-white shadow-md border border-neutral-200/60 flex items-center justify-center hover:scale-110 transition-all duration-200 group"
      >
        {isCollapsed ? (
          <ChevronLeft className="size-3 text-neutral-600 group-hover:text-neutral-900" />
        ) : (
          <ChevronRight className="size-3 text-neutral-600 group-hover:text-neutral-900" />
        )}
      </button>

      {/* Content Area */}
      <div
        className={cn(
          "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent hover:scrollbar-thumb-neutral-300",
          isCollapsed && "opacity-0 invisible"
        )}
      >
        <div className="px-7 py-8 space-y-8">
          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-blue-100 via-cyan-100 to-sky-100">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <label className="text-sm font-medium bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Select Post Category
              </label>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger
                className="w-full h-12 text-[15px] bg-white rounded-xl border border-neutral-200/60 
                text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                focus:border-blue-500/30 transition-all duration-200"
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-sm"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-neutral-500 mt-1">
              {
                categoryOptions.find((c) => c.value === selectedCategory)
                  ?.description
              }
            </p>
          </motion.div>

          {/* Tone Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-blue-100 via-cyan-100 to-sky-100">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <label className="text-sm font-medium bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Select Writing Tone
              </label>
            </div>
            <Select
              value={selectedTone}
              onValueChange={(value: ToneValue) => {
                setSelectedTone(value);
                setTone(value);
              }}
            >
              <SelectTrigger
                className="w-full h-12 text-[15px] bg-white rounded-xl border border-neutral-200/60 
                text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                focus:border-blue-500/30 transition-all duration-200"
              >
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map((tone) => (
                  <SelectItem
                    key={tone.value}
                    value={tone.value}
                    className="text-sm"
                  >
                    {tone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-neutral-500 mt-1">
              {toneOptions.find((t) => t.value === selectedTone)?.description}
            </p>
          </motion.div>

          {/* Post Length Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
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
                          ? "bg-blue-50 border border-blue-200 shadow-sm"
                          : "bg-white border border-neutral-200 hover:border-blue-200 hover:shadow-sm"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                          postLength === option.value
                            ? "bg-blue-100 text-blue-600"
                            : "bg-neutral-100 text-neutral-500"
                        )}
                      >
                        {option.icon}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          postLength === option.value
                            ? "text-blue-600"
                            : "text-neutral-600"
                        )}
                      >
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

      {/* Prompt Input Section */}
      <div
        className={cn(
          "flex-none px-7 py-6 border-t border-neutral-100/80 space-y-4 bg-gradient-to-b from-white to-blue-50/30",
          isCollapsed && "opacity-0 invisible"
        )}
      >
        {/* Prompt Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-sky-500/20">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <label className="text-sm font-medium bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                What would you like to write about?
              </label>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-md bg-gradient-to-r from-blue-100 to-sky-100 text-blue-600">
              {prompt.length}/500
            </span>
          </div>
          <div className="relative group">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500" />
            <div className="absolute inset-[-1px] bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 rounded-xl opacity-20" />
            <textarea
              value={prompt}
              onChange={handlePromptChangeWithCategory}
              placeholder="Enter your topic or idea..."
              maxLength={500}
              className="relative w-full h-[120px] px-4 py-3 text-[15px] leading-relaxed rounded-xl border-0 placeholder:text-neutral-400 text-neutral-900 focus:outline-none resize-none transition-all duration-200 bg-white shadow-lg shadow-blue-500/5 backdrop-blur-xl"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1.5 rounded-md bg-gradient-to-r from-blue-50 to-sky-50 text-blue-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110">
                    <Info className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Be specific about your topic and target audience
                  </p>
                </TooltipContent>
              </Tooltip>
              <div className="size-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </motion.div>

        {/* Generate Button */}
        <RainbowButton
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full h-12 flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/10"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="inline-flex items-center gap-1">
                Generating<span className="animate-pulse">...</span>
              </span>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              <span>Generate Content</span>
            </>
          )}
        </RainbowButton>
      </div>

      {/* Collapsed State Mini Actions */}
      {isCollapsed && (
        <div className="absolute inset-x-0 bottom-6">
          <div className="px-2 space-y-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full p-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Wand2 className="size-5 mx-auto" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudioSidebar;
