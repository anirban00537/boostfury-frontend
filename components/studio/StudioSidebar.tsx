"use client";
import React, { useState, useCallback, memo } from "react";
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
  Bot,
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
import { Textarea } from "@/components/ui/textarea";
import { ShimmerButton } from "@/components/ui/shimmer-button";

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

const tones = [
  "professional",
  "casual",
  "friendly",
  "humorous",
  "formal",
  "enthusiastic",
];

const PromptInput = memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }) => (
    <Textarea
      value={value}
      onChange={onChange}
      placeholder="What would you like to write about?"
      className="min-h-[120px] bg-white border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
      autoComplete="off"
      spellCheck="false"
    />
  )
);

PromptInput.displayName = "PromptInput";

const StudioSidebar = ({
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
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue>("thought_leadership");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleRegularGenerate = useCallback(async () => {
    setIsRegularGenerating(true);
    await handleGenerate();
    setIsRegularGenerating(false);
  }, [handleGenerate]);

  const handleCategorySelect = useCallback((value: CategoryValue) => {
    setSelectedCategory(value);
  }, []);

  const sidebarContent = (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent hover:scrollbar-thumb-blue-200">
      {!isCollapsed && (
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                AI Studio
              </h2>
              <p className="text-sm text-neutral-500">
                Generate LinkedIn content
              </p>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Enter a prompt
            </label>
            <PromptInput value={prompt} onChange={handlePromptChange} />
          </div>

          {/* Category Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategorySelect}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tone Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm capitalize",
                    tone === t
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Post Length */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Post Length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["short", "medium", "long"].map((length) => (
                <button
                  key={length}
                  onClick={() =>
                    setPostLength(length as "short" | "medium" | "long")
                  }
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm capitalize",
                    postLength === length
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  )}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "h-full fixed right-0 top-0 bg-white shadow-md z-10 transition-all duration-300 hidden lg:block",
          isCollapsed ? "w-[80px]" : "w-[380px]"
        )}
      >
        <button
          onClick={() => onCollapse?.(!isCollapsed)}
          className="absolute -left-3 top-8 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {sidebarContent}

        {/* Fixed Generate Button */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100">
            <ShimmerButton
              onClick={handleRegularGenerate}
              disabled={isRegularGenerating || !prompt.trim()}
              className="w-full h-12 gap-2"
              background="linear-gradient(110deg, #2563eb, #3b82f6)"
            >
              {isRegularGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              <span className="font-medium">Generate Content</span>
            </ShimmerButton>
          </div>
        )}
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden fixed right-4 top-4 z-50 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <Menu className="h-5 w-5 text-neutral-600" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[380px] p-0">
          {sidebarContent}
          {/* Fixed Generate Button for Mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100">
            <ShimmerButton
              onClick={handleRegularGenerate}
              disabled={isRegularGenerating || !prompt.trim()}
              className="w-full h-12 gap-2"
              background="linear-gradient(110deg, #2563eb, #3b82f6)"
            >
              {isRegularGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              <span className="font-medium">Generate Content</span>
            </ShimmerButton>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

StudioSidebar.displayName = "StudioSidebar";

export default memo(StudioSidebar);
