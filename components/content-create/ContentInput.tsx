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
} from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

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
    <div className="space-y-6">
      <div className="relative rounded-3xl border border-gray-100/20 bg-gradient-to-br from-gray-50/50 to-white/30 backdrop-blur-xl overflow-hidden shadow-md">
        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              x: [0, -70, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative space-y-8 p-8">
          {/* Header with improved styling */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 
                            backdrop-blur-md flex items-center justify-center shadow-xl ring-1 ring-primary/20">
                <Pencil className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Content Editor</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1 h-1 rounded-full bg-primary/20" />
                  <span className="text-sm text-gray-500">Powered by AI assistance</span>
                </div>
              </div>
            </div>

            {/* Enhanced character counter */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50/50 backdrop-blur-sm 
                          border border-gray-200/50 shadow-inner">
              <div className={`h-2.5 w-2.5 rounded-full transition-colors duration-300
                ${charCount >= MIN_CHARS ? "bg-green-400" : "bg-gray-300"}`} />
              <span className="text-sm font-medium text-gray-600">
                {charCount}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {/* Modern textarea design */}
          <div className="relative mt-6">
            <textarea
              value={contentSource === "plain-prompt" ? content : undefined}
              onChange={onTextChange}
              className="w-full min-h-[180px] p-6 rounded-2xl
                       bg-white/40 backdrop-blur-lg border border-gray-200/50
                       shadow-inner hover:border-primary/30
                       focus:border-primary/40 focus:ring-4 focus:ring-primary/10
                       placeholder:text-gray-400 text-gray-600
                       text-base leading-relaxed resize-none outline-none
                       transition-all duration-300"
              placeholder="What would you like to write about? Be specific to get better results..."
              maxLength={MAX_CHARS}
            />
          </div>

          {/* Modern tone selector */}
          <div className="space-y-3 pt-4 border-t border-gray-100/50">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-medium text-gray-700">Content Tone</h4>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="text-xs">Choose a tone that matches your audience and purpose</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(toneConfig).map(([tone, config]) => (
                <button
                  key={tone}
                  onClick={() => setPostTone(tone)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg
                    border border-gray-200/50 backdrop-blur-sm
                    transition-all duration-200 group
                    ${postTone === tone ? config.activeColor : config.hoverColor}
                  `}
                >
                  <div className={`w-7 h-7 rounded-lg ${config.iconBg} flex items-center justify-center`}>
                    {config.icon}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-medium">{tone}</span>
                    <span className="text-[10px] opacity-70">{config.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <div className="flex justify-end pt-6">
            <ShimmerButton
              onClick={onGenerate}
              disabled={!isValidLength || isGeneratingContent}
              className="w-full sm:w-auto"
            >
              {isGeneratingContent ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Content</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
};
