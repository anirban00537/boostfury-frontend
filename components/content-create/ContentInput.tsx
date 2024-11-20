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
    activeColor: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border-blue-200",
    hoverColor: "hover:bg-blue-50/80 hover:border-blue-200",
    iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
    description: "Business and corporate content",
    category: "Business"
  },
  Casual: {
    icon: <Smile className="h-4 w-4" />,
    activeColor: "bg-gradient-to-br from-green-50 to-green-100 text-green-600 border-green-200",
    hoverColor: "hover:bg-green-50/80 hover:border-green-200",
    iconBg: "bg-gradient-to-br from-green-100 to-green-200",
    description: "Relaxed and conversational",
    category: "Social"
  },
  Friendly: {
    icon: <MessageCircle className="h-4 w-4" />,
    activeColor: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 border-purple-200",
    hoverColor: "hover:bg-purple-50/80 hover:border-purple-200",
    iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
    description: "Warm and approachable tone",
    category: "Social"
  },
  Authoritative: {
    icon: <BookMarked className="h-4 w-4" />,
    activeColor: "bg-gradient-to-br from-red-50 to-red-100 text-red-600 border-red-200",
    hoverColor: "hover:bg-red-50/80 hover:border-red-200",
    iconBg: "bg-gradient-to-br from-red-100 to-red-200",
    description: "Expert and commanding voice",
    category: "Professional"
  },
  Humorous: {
    icon: <Sparkles className="h-4 w-4" />,
    activeColor: "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600 border-yellow-200",
    hoverColor: "hover:bg-yellow-50/80 hover:border-yellow-200",
    iconBg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    description: "Light and entertaining style",
    category: "Creative"
  },
  Formal: {
    icon: <FileText className="h-4 w-4" />,
    activeColor: "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 border-gray-200",
    hoverColor: "hover:bg-gray-50/80 hover:border-gray-200",
    iconBg: "bg-gradient-to-br from-gray-100 to-gray-200",
    description: "Traditional and proper tone",
    category: "Professional"
  },
  Inspirational: {
    icon: <Lightbulb className="h-4 w-4" />,
    activeColor: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 border-amber-200",
    hoverColor: "hover:bg-amber-50/80 hover:border-amber-200",
    iconBg: "bg-gradient-to-br from-amber-100 to-amber-200",
    description: "Motivational and uplifting",
    category: "Creative"
  },
  Technical: {
    icon: <Code className="h-4 w-4" />,
    activeColor: "bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 border-indigo-200",
    hoverColor: "hover:bg-indigo-50/80 hover:border-indigo-200",
    iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
    description: "Detailed and precise content",
    category: "Technical"
  }
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
      {/* Main Content Area */}
      <div className="rounded-2xl border-none bg-white overflow-hidden">
        <div className="relative p-6 space-y-6">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />

          {/* Header */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 
                            flex items-center justify-center shadow-inner ring-1 ring-primary/10">
                <Pencil className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Content Topic</h3>
                <p className="text-sm text-gray-500">Share your ideas and let AI enhance them</p>
              </div>
            </div>

            {/* Character Counter */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <div className={`h-2 w-2 rounded-full ${
                charCount >= MIN_CHARS ? 'bg-green-400' : 'bg-gray-300'
              }`} />
              <span>{charCount}/{MAX_CHARS} characters</span>
            </div>
          </div>

          {/* Enhanced Textarea */}
          <div className="relative mt-4">
            <textarea
              value={contentSource === "plain-prompt" ? content : undefined}
              onChange={onTextChange}
              className="w-full min-h-[120px] p-4 rounded-xl
                       bg-gray-50/50 backdrop-blur-sm
                       border border-gray-200 hover:border-primary/20
                       focus:border-primary/30 focus:ring-4 focus:ring-primary/10
                       placeholder:text-gray-400 text-gray-600
                       text-sm leading-relaxed resize-none outline-none
                       transition-all duration-200"
              placeholder="What would you like to write about? Be specific to get better results..."
              maxLength={MAX_CHARS}
            />
          </div>

          {/* Tone Selection */}
          <div className="relative space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-gray-900">Content Tone</h4>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p className="text-xs">Choose a tone that matches your audience and purpose</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Tone Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(toneConfig).map(([tone, config]) => (
                <button
                  key={tone}
                  onClick={() => setPostTone(tone)}
                  className={`
                    group relative p-3 rounded-xl border
                    transition-all duration-200 hover:scale-[1.02]
                    ${tone === postTone 
                      ? `${config.activeColor} shadow-lg` 
                      : 'bg-white hover:bg-gray-50/80 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${tone === postTone ? config.iconBg : 'bg-gray-100'}
                      transition-colors duration-200
                    `}>
                      {config.icon}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{tone}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{config.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <ShimmerButton
            onClick={onGenerate}
            disabled={isGeneratingContent || !isValidLength}
            background="linear-gradient(145deg, #4F46E5, #4338CA)"
            className="w-full py-4 mt-6"
          >
            <div className="flex items-center justify-center gap-3">
              {isGeneratingContent ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Crafting your content...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Generate Content</span>
                  <div className="hidden sm:flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-md">
                    <span>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>
                    <span>↵</span>
                  </div>
                </>
              )}
            </div>
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};
