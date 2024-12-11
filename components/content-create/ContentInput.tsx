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
      <div className="absolute -inset-[1px] bg-gradient-to-t from-neutral-200/0 via-neutral-200/10 to-neutral-200/0 rounded-2xl group-hover:via-neutral-200/20 transition-all duration-500" />
      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Main Content */}
      <div className="relative rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <Pencil className="w-5 h-5 text-neutral-900" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  Content Editor
                </h3>
                <span className="text-sm text-neutral-600">Write or edit your content</span>
              </div>
            </div>

            {/* Character counter */}
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60">
                <div className={`h-2 w-2 rounded-full transition-colors duration-200
                  ${charCount >= MIN_CHARS ? "bg-neutral-900" : "bg-neutral-300"}`} />
                <span className="text-sm text-neutral-600">
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
            <textarea
              value={content}
              onChange={handleLinkedInTextChange}
              placeholder="What would you like to write about?"
              className="relative w-full min-h-[200px] p-4 rounded-xl bg-white/80 backdrop-blur-sm 
                text-neutral-700 text-sm resize-none outline-none
                border border-neutral-200/60
                focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200/50
                transition-all duration-200"
            />
          </div>

          {/* Content Tone Section - Updated Design */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-900">
              Content Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {toneOptions.map(({ tone, icon: Icon }) => (
                <button
                  key={tone}
                  onClick={() => setPostTone(tone)}
                  className={cn(
                    "group relative",
                    "transition-all duration-200"
                  )}
                >
                  {/* Hover/Active Glowing Effects */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  
                  <div className={cn(
                    "relative flex items-center gap-2 p-3 rounded-xl border transition-all duration-200",
                    "hover:bg-white/80",
                    postTone === tone
                      ? "bg-white border-neutral-300/80 shadow-sm"
                      : "bg-white/50 border-neutral-200/60"
                  )}>
                    <div className={cn(
                      "size-8 rounded-lg flex items-center justify-center transition-colors",
                      postTone === tone
                        ? "bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner"
                        : "bg-white/80 text-neutral-500 group-hover:text-primary/80"
                    )}>
                      <Icon className="size-4" />
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      postTone === tone
                        ? "text-neutral-900"
                        : "text-neutral-600 group-hover:text-neutral-800"
                    )}>
                      {tone}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <div className="flex justify-end pt-4 border-t border-neutral-200/60">
            <button
              onClick={onGenerate}
              disabled={!isValidLength || isGeneratingContent}
              className="group relative"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative flex items-center gap-2 px-6 py-2.5 rounded-xl 
                bg-neutral-900 text-white text-sm font-medium
                hover:bg-neutral-800 disabled:bg-neutral-300
                transition-all duration-200">
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
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
