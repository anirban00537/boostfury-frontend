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
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue>("thought_leadership");
  const [selectedTone, setSelectedTone] = useState<ToneValue>("professional");
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
          "fixed top-0 right-0 h-screen w-[400px] bg-white flex flex-col border-l border-neutral-200/60",
          !isEditorOpen && "pointer-events-none"
        )}
      >
        {/* Beautiful Header */}
        <div className="relative border-b border-neutral-100">
          <div className="mx-auto px-5 py-4 relative">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 group-hover:border-violet-200 transition-all duration-300">
                  <Wand2 className="w-4 h-4 text-violet-600 relative" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-semibold text-neutral-800">
                    AI Studio
                  </h1>
                  <div className="px-1.5 py-0.5 rounded-md bg-violet-50 border border-violet-100">
                    <span className="text-[10px] font-medium text-violet-600 uppercase tracking-wide">
                      Beta
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500">
                  Powered by Advanced AI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
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
                  onChange={handlePromptChangeWithCategory}
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

            {/* Category Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-tr from-indigo-100 via-fuchsia-100 to-amber-100">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                </div>
                <label className="text-sm font-medium bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                  Select Post Category
                </label>
              </div>
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger
                  className="w-full h-12 text-[15px] bg-white rounded-xl border border-neutral-200/60 
                  text-neutral-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 
                  focus:border-violet-500/30 transition-all duration-200"
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
                <div className="p-1.5 rounded-lg bg-gradient-to-tr from-indigo-100 via-fuchsia-100 to-amber-100">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                </div>
                <label className="text-sm font-medium bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
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
                  text-neutral-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 
                  focus:border-violet-500/30 transition-all duration-200"
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
                        <span
                          className={cn(
                            "text-sm font-medium",
                            postLength === option.value
                              ? "text-violet-600"
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

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-6 bg-gradient-to-t from-white via-white to-transparent"
        >
          <GradientButton
            onClick={handleRegularGenerate}
            disabled={
              !prompt.trim() || prompt.length < 10 || isRegularGenerating
            }
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
