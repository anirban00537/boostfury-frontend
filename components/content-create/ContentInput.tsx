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
    icon: <Briefcase className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border-blue-200",
    hoverColor: "hover:bg-blue-50/80 hover:border-blue-200",
    iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
    description: "Business and corporate content",
    category: "Business",
  },
  Casual: {
    icon: <Smile className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-green-50 to-green-100 text-green-600 border-green-200",
    hoverColor: "hover:bg-green-50/80 hover:border-green-200",
    iconBg: "bg-gradient-to-br from-green-100 to-green-200",
    description: "Relaxed and conversational",
    category: "Social",
  },
  Friendly: {
    icon: <MessageCircle className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 border-purple-200",
    hoverColor: "hover:bg-purple-50/80 hover:border-purple-200",
    iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
    description: "Warm and approachable tone",
    category: "Social",
  },
  Authoritative: {
    icon: <BookMarked className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-red-50 to-red-100 text-red-600 border-red-200",
    hoverColor: "hover:bg-red-50/80 hover:border-red-200",
    iconBg: "bg-gradient-to-br from-red-100 to-red-200",
    description: "Expert and commanding voice",
    category: "Professional",
  },
  Humorous: {
    icon: <Sparkles className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600 border-yellow-200",
    hoverColor: "hover:bg-yellow-50/80 hover:border-yellow-200",
    iconBg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    description: "Light and entertaining style",
    category: "Creative",
  },
  Formal: {
    icon: <FileText className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 border-gray-200",
    hoverColor: "hover:bg-gray-50/80 hover:border-gray-200",
    iconBg: "bg-gradient-to-br from-gray-100 to-gray-200",
    description: "Traditional and proper tone",
    category: "Professional",
  },
  Inspirational: {
    icon: <Lightbulb className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 border-amber-200",
    hoverColor: "hover:bg-amber-50/80 hover:border-amber-200",
    iconBg: "bg-gradient-to-br from-amber-100 to-amber-200",
    description: "Motivational and uplifting",
    category: "Creative",
  },
  Technical: {
    icon: <Code className="h-4 w-4" />,
    activeColor:
      "bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 border-indigo-200",
    hoverColor: "hover:bg-indigo-50/80 hover:border-indigo-200",
    iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
    description: "Detailed and precise content",
    category: "Technical",
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
              {toneOptions.map(({ tone, icon: Icon }) => (
                <button
                  key={tone}
                  onClick={() => setPostTone(tone)}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div
                    className={cn(
                      "relative flex items-center gap-2 p-3 rounded-xl border transition-all duration-200",
                      "hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50",
                      postTone === tone
                        ? "bg-white border-blue-200 shadow-sm"
                        : "bg-white/80 border-blue-100/50"
                    )}
                  >
                    <div
                      className={cn(
                        "size-8 rounded-lg flex items-center justify-center transition-all duration-200",
                        postTone === tone
                          ? "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 shadow-inner"
                          : "bg-white/80 text-slate-500 group-hover:text-blue-500"
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        postTone === tone
                          ? "text-blue-900"
                          : "text-slate-600 group-hover:text-blue-800"
                      )}
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
