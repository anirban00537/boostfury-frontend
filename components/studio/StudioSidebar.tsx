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
  Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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

  const SidebarContent = () => (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent hover:scrollbar-thumb-blue-200">
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-8"
          >
            {/* Prompt Input */}
            <div className="relative mb-8 group">
              <label className="text-[13px] font-semibold text-neutral-800 mb-2.5 block">
                Prompt
              </label>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/5 via-blue-500/5 to-transparent rounded-2xl blur-lg group-focus-within:from-blue-500/10 group-focus-within:via-blue-500/10 transition-all duration-300" />
              <textarea
                value={prompt}
                onChange={handlePromptChangeWithCategory}
                placeholder="What would you like to write about?"
                className="relative w-full h-32 text-[15px] leading-relaxed bg-white/95 border border-neutral-200/80 rounded-xl p-5 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20 focus:border-blue-200 resize-none placeholder:text-neutral-400 transition-all duration-200 shadow-[0_8px_24px_rgb(0,0,0,0.04)]"
                style={{
                  backgroundImage: "linear-gradient(145deg, #ffffff, #fafbff)",
                }}
              />
            </div>

            {/* Post Length Selector */}
            <div className="space-y-2.5 mb-8">
              <label className="text-[13px] font-semibold text-neutral-800">
                Post Length
              </label>
              <div className="grid grid-cols-3 gap-3">
                {postLengthOptions.map((option) => (
                  <Tooltip key={option.value}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setPostLength(option.value)}
                        className={cn(
                          "group relative flex flex-col items-center gap-2 py-4 px-3 rounded-xl border transition-all duration-300",
                          postLength === option.value
                            ? "bg-gradient-to-b from-blue-600 to-blue-500 border-blue-400 shadow-[0_8px_24px_-4px_rgba(37,99,235,0.24)] scale-[1.02]"
                            : "bg-gradient-to-b from-white to-neutral-50/80 border-neutral-200/80 hover:border-blue-200/60 hover:bg-gradient-to-b hover:from-blue-50/50 hover:to-blue-50/20 hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(37,99,235,0.06),0_8px_24px_-4px_rgba(37,99,235,0.04)]"
                        )}
                      >
                        <div
                          className={cn(
                            "p-2 rounded-lg transition-all duration-300",
                            postLength === option.value
                              ? "bg-white/20 text-white"
                              : "bg-gradient-to-br from-neutral-100/80 to-neutral-50/50 text-neutral-600 group-hover:text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-100/60 group-hover:to-blue-50/40"
                          )}
                        >
                          {option.icon}
                        </div>
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors duration-300",
                            postLength === option.value
                              ? "text-white"
                              : "text-neutral-600 group-hover:text-blue-600"
                          )}
                        >
                          {option.label}
                        </span>
                        <div
                          className={cn(
                            "absolute inset-0 opacity-0 transition-opacity duration-300",
                            postLength === option.value && "opacity-100"
                          )}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-xl blur-xl" />
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] px-3 py-2"
                    >
                      <p className="text-xs font-medium text-neutral-600">
                        {option.tooltip}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-2.5 mb-8">
              <label className="text-[13px] font-semibold text-neutral-800">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full h-12 bg-white/95 border-neutral-200/80 rounded-xl focus:ring-[3px] focus:ring-blue-500/20 focus:border-blue-200 shadow-[0_8px_24px_rgb(0,0,0,0.04)] text-[13px] font-medium">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px] p-2 bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-[0_16px_32px_rgb(0,0,0,0.08)]">
                  {categoryOptions.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="py-2.5 px-3 text-[13px] font-medium text-neutral-800 rounded-lg data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-blue-50 data-[highlighted]:to-blue-50/50 data-[highlighted]:text-blue-700 cursor-pointer transition-all duration-200"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-neutral-800">
                Tone
              </label>
              <Select
                value={selectedTone}
                onValueChange={(value: ToneValue) => {
                  setSelectedTone(value);
                  setTone(value);
                }}
              >
                <SelectTrigger className="w-full h-12 bg-white/95 border-neutral-200/80 rounded-xl focus:ring-[3px] focus:ring-blue-500/20 focus:border-blue-200 shadow-[0_8px_24px_rgb(0,0,0,0.04)] text-[13px] font-medium">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px] p-2 bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-[0_16px_32px_rgb(0,0,0,0.08)]">
                  {toneOptions.map((tone) => (
                    <SelectItem
                      key={tone.value}
                      value={tone.value}
                      className="py-2.5 px-3 text-[13px] font-medium text-neutral-800 rounded-lg data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-blue-50 data-[highlighted]:to-blue-50/50 data-[highlighted]:text-blue-700 cursor-pointer transition-all duration-200"
                    >
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prompt Tips */}
            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8"
                >
                  <div className="p-5 bg-gradient-to-br from-blue-50/80 via-blue-50/60 to-blue-50/40 rounded-xl border border-blue-100/80 shadow-[0_8px_24px_rgb(0,0,0,0.04)]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100/90 to-blue-100/60">
                          <Info className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span className="text-[13px] font-semibold text-neutral-800">
                          Prompt Tips
                        </span>
                      </div>
                      <button
                        onClick={() => setShowTips(false)}
                        className="text-neutral-400 hover:text-blue-600 transition-colors"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    <ul className="mt-4 space-y-2.5 text-[13px] text-neutral-600">
                      <li className="flex items-start gap-2.5">
                        <span className="text-blue-500 text-lg leading-none">
                          •
                        </span>
                        Be specific about your topic and target audience
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-blue-500 text-lg leading-none">
                          •
                        </span>
                        Include key points you want to cover
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-blue-500 text-lg leading-none">
                          •
                        </span>
                        Mention desired style and perspective
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-blue-500 text-lg leading-none">
                          •
                        </span>
                        Add relevant keywords or industry terms
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Mobile trigger button
  const MobileTrigger = () => (
    <button
      className="lg:hidden fixed right-4 top-4 z-50 h-10 w-10 rounded-full bg-gradient-to-b from-white to-blue-50/30 shadow-[0_8px_24px_rgb(0,0,0,0.08)] border border-blue-100/30 flex items-center justify-center hover:scale-110 transition-all duration-200 group backdrop-blur-2xl"
      onClick={() => setIsSheetOpen(true)}
    >
      <Menu className="h-5 w-5 text-neutral-600 group-hover:text-blue-600" />
    </button>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "h-full flex flex-col bg-gradient-to-br from-white via-white to-blue-50/40 fixed right-0 top-0 shadow-[-16px_0_50px_rgb(0,0,0,0.06)] z-10 transition-all duration-300 backdrop-blur-2xl border-l border-[#0A66C2]/10",
          isCollapsed ? "w-[60px]" : "w-[380px]",
          "hidden lg:flex" // Hide on mobile, show on desktop
        )}
      >
        {/* Collapse Button */}
        <button
          onClick={handleToggleCollapse}
          className="absolute -left-4 top-8 h-8 w-8 rounded-full bg-gradient-to-b from-white to-blue-50/30 shadow-[0_8px_24px_rgb(0,0,0,0.08)] border border-blue-100/30 flex items-center justify-center hover:scale-110 transition-all duration-200 group backdrop-blur-2xl"
        >
          {isCollapsed ? (
            <ChevronLeft className="h-4 w-4 text-neutral-600 group-hover:text-blue-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-blue-600" />
          )}
        </button>

        <SidebarContent />

        {/* Bottom Generate Button */}
        {!isCollapsed && (
          <div className="flex-none px-8 py-6 pt-0 border-t border-neutral-100/80 bg-gradient-to-br from-white via-white to-blue-50/40">
            <RainbowButton
              onClick={handleRegularGenerate}
              disabled={isRegularGenerating}
              className="w-full h-[52px] text-[14px] font-medium rounded-xl shadow-[0_8px_24px_rgb(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-3 justify-center">
                {isRegularGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                ) : (
                  <div className="p-1.5 rounded-lg bg-white/20">
                    <Sparkles className="h-4 w-4 text-black" />
                  </div>
                )}
                <span>Generate with AI</span>
              </div>
            </RainbowButton>
          </div>
        )}
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <MobileTrigger />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[380px] p-0 bg-gradient-to-br from-white via-white to-blue-50/40"
        >
          <SidebarContent />
          <div className="flex-none px-8 py-6 pt-0 border-t border-neutral-100/80 bg-gradient-to-br from-white via-white to-blue-50/40">
            <RainbowButton
              onClick={handleRegularGenerate}
              disabled={isRegularGenerating}
              className="w-full h-[52px] text-[14px] font-medium rounded-xl shadow-[0_8px_24px_rgb(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-3 justify-center">
                {isRegularGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                ) : (
                  <div className="p-1.5 rounded-lg bg-white/20">
                    <Sparkles className="h-4 w-4 text-black" />
                  </div>
                )}
                <span>Generate with AI</span>
              </div>
            </RainbowButton>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default StudioSidebar;
