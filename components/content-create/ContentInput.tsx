import {
  ArrowRight,
  Loader2,
  HelpCircle,
  Pencil,
  MessageCircle,
  BookOpen,
  Lightbulb,
  Smile,
  Briefcase,
  Sparkles,
  Code,
  BookMarked,
  ArrowRightCircle,
  GraduationCap,
  Target,
  BarChart2,
  MessagesSquare,
  FileText,
  Zap,
  Wand2,
} from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentInputProps {
  contentSource: string;
  isGenerating: boolean;
  handleGenerate: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setContent: (content: string) => void;
  isGeneratingLinkedinPosts: boolean;
  handleGenerateLinkedIn: () => void;
  handleLinkedInTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
  postTone: string;
  setPostTone: (tone: string) => void;
}

// Define interfaces for the configuration objects
interface StyleConfigItem {
  icon: JSX.Element;
  activeColor: string;
  hoverColor: string;
  iconBg: string;
  description: string;
  category?: string;
}

interface ToneConfigType {
  [key: string]: StyleConfigItem;
}

interface StyleConfigType {
  [key: string]: StyleConfigItem;
}

// Update the tone configuration with proper typing
const toneConfig: ToneConfigType = {
  Professional: {
    icon: <Briefcase className="size-4" />,
    activeColor: "#0A66C2", // LinkedIn blue
    hoverColor: "#2C8EFF",
    iconBg: "from-[#0A66C2]/10 to-[#2C8EFF]/5",
    description: "Formal and business-oriented content",
  },
  Casual: {
    icon: <MessageCircle className="size-4" />,
    activeColor: "#FF6B6B", // Warm red
    hoverColor: "#FF8787",
    iconBg: "from-[#FF6B6B]/10 to-[#FF8787]/5",
    description: "Friendly and conversational tone",
  },
  Storytelling: {
    icon: <BookOpen className="size-4" />,
    activeColor: "#845EF7", // Purple
    hoverColor: "#9775FA",
    iconBg: "from-[#845EF7]/10 to-[#9775FA]/5",
    description: "Narrative and engaging style",
  },
  Inspirational: {
    icon: <Sparkles className="size-4" />,
    activeColor: "#FAB005", // Gold
    hoverColor: "#FFD43B",
    iconBg: "from-[#FAB005]/10 to-[#FFD43B]/5",
    description: "Motivational and uplifting content",
  },
  Educational: {
    icon: <GraduationCap className="size-4" />,
    activeColor: "#20C997", // Teal
    hoverColor: "#38D9A9",
    iconBg: "from-[#20C997]/10 to-[#38D9A9]/5",
    description: "Informative and instructional",
  },
  Analytical: {
    icon: <BarChart2 className="size-4" />,
    activeColor: "#4C6EF5", // Indigo
    hoverColor: "#748FFC",
    iconBg: "from-[#4C6EF5]/10 to-[#748FFC]/5",
    description: "Data-driven and logical approach",
  },
};

const MIN_CHARS = 10;
const MAX_CHARS = 500;

const toneOptions = [
  { tone: "Professional", icon: Briefcase },
  { tone: "Casual", icon: Smile },
  { tone: "Friendly", icon: MessageCircle },
  { tone: "Confident", icon: Target },
  { tone: "Informative", icon: BookOpen },
  { tone: "Creative", icon: Lightbulb },
];

export const ContentInput = ({
  contentSource,
  isGenerating,
  handleGenerate,
  handleTextChange,
  setContent,
  isGeneratingLinkedinPosts,
  handleGenerateLinkedIn,
  handleLinkedInTextChange,
  content,
  postTone,
  setPostTone,
}: ContentInputProps) => {
  const isGeneratingContent =
    contentSource === "plain-prompt" ? isGeneratingLinkedinPosts : isGenerating;
  const onGenerate =
    contentSource === "plain-prompt" ? handleGenerateLinkedIn : handleGenerate;
  const onTextChange =
    contentSource === "plain-prompt"
      ? handleLinkedInTextChange
      : handleTextChange;

  const charCount = content.length;
  const isValidLength = charCount >= MIN_CHARS;

  return (
    <div className="group relative">
      {/* Enhanced Glowing Effects */}
      <div className="absolute -inset-[1px] bg-gradient-to-t from-blue-100/20 via-white to-blue-50/20 rounded-2xl opacity-40 group-hover:opacity-70 transition-all duration-500" />

      {/* Main Content */}
      <div
        className="relative rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-blue-100/50 overflow-hidden backdrop-blur-sm 
        shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.06)] 
        hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.06)] 
        transition-shadow duration-300"
      >
        <div className="p-8 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Container with enhanced glassmorphism */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-white rounded-xl blur-md" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-white to-blue-50 rounded-xl flex items-center justify-center border border-blue-100/30 shadow-sm">
                  <Pencil className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                  Content Editor
                </h3>
                <span className="text-sm text-slate-600">
                  Write or edit your content
                </span>
              </div>
            </div>

            {/* Enhanced character counter */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-white/80 to-blue-50/50 border border-blue-100/50">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    charCount >= MIN_CHARS
                      ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      : "bg-slate-300"
                  )}
                />
                <span className="text-sm text-slate-600">
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Textarea */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <textarea
              value={content}
              onChange={handleLinkedInTextChange}
              placeholder="What would you like to write about?"
              className={cn(
                "relative w-full min-h-[200px] p-4 rounded-xl",
                "bg-white/80 backdrop-blur-sm text-slate-700 text-sm",
                "border border-blue-100/50",
                "placeholder:text-slate-400",
                "resize-none outline-none",
                "focus:border-blue-200 focus:ring-2 focus:ring-blue-100",
                "transition-all duration-200"
              )}
            />
          </div>

          {/* Enhanced Content Tone Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-900">
              Content Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(toneConfig).map(([tone, config]) => (
                <button
                  key={tone}
                  onClick={() => setPostTone(tone)}
                  className="group relative"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--hover-color)]/10 to-transparent rounded-xl transition-all duration-300"
                    style={
                      {
                        "--hover-color": config.activeColor,
                      } as React.CSSProperties
                    }
                  />
                  <div
                    className={cn(
                      "relative flex items-center gap-2 p-3 rounded-xl border transition-all duration-200",
                      "hover:bg-gradient-to-br hover:from-white hover:to-[var(--hover-color)]/20",
                      postTone === tone
                        ? [
                            "bg-white border-[var(--active-color)] shadow-sm",
                            "shadow-[var(--active-color)]/10",
                          ].join(" ")
                        : "bg-white/80 border-[var(--active-color)]/20"
                    )}
                    style={
                      {
                        "--active-color": config.activeColor,
                        "--hover-color": config.activeColor,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className={cn(
                        "size-8 rounded-lg flex items-center justify-center transition-all duration-200",
                        postTone === tone
                          ? [
                              "bg-gradient-to-br",
                              config.iconBg,
                              "text-[var(--active-color)]",
                              "shadow-inner",
                            ].join(" ")
                          : [
                              "bg-white/80",
                              "text-[var(--active-color)]",
                            ].join(" ")
                      )}
                      style={
                        {
                          "--active-color": config.activeColor,
                        } as React.CSSProperties
                      }
                    >
                      {config.icon}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        postTone === tone
                          ? "text-[var(--active-color)]"
                          : "text-[var(--active-color)]/70 group-hover:text-[var(--active-color)]"
                      )}
                      style={
                        {
                          "--active-color": config.activeColor,
                        } as React.CSSProperties
                      }
                    >
                      {tone}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate button section */}
          <div className="flex justify-end pt-4 border-t border-blue-100/50">
            <ShimmerButton
              onClick={onGenerate}
              disabled={!isValidLength || isGeneratingContent}
              shimmerColor="rgba(255, 255, 255, 0.6)"
              shimmerSize="0.15em"
              shimmerDuration="2s"
              borderRadius="0.75rem"
              background={
                isValidLength
                  ? "linear-gradient(45deg, #2563eb, #3b82f6, #2563eb)"
                  : "#94a3b8"
              }
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 text-sm font-medium",
                "border border-white/20",
                "shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
                !isValidLength && "opacity-50 cursor-not-allowed"
              )}
              enableShimmer={isValidLength && !isGeneratingContent}
            >
              {isGeneratingContent ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  <span>Generate Content</span>
                </>
              )}
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
};
