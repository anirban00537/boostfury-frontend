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
    <div className="relative rounded-xl bg-white overflow-hidden
      border border-gray-200/90
      shadow-[0_2px_0_0_rgba(0,0,0,0.08),inset_0_-1px_0_0_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(255,255,255,0.5)]">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 
                          flex items-center justify-center">
              <Pencil className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900">Content Editor</h3>
              <span className="text-sm text-gray-500">Write or edit your content</span>
            </div>
          </div>

          {/* Character counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
            <div className={`h-2 w-2 rounded-full transition-colors duration-200
              ${charCount >= MIN_CHARS ? "bg-green-400" : "bg-gray-300"}`} />
            <span className="text-sm text-gray-600">
              {charCount}/{MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={content}
            onChange={handleLinkedInTextChange}
            placeholder="What would you like to write about?"
            className="w-full min-h-[200px] p-4 rounded-xl bg-white text-gray-700 text-sm resize-none outline-none
              border border-gray-200/90
              shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),inset_0_2px_2px_rgba(0,0,0,0.025)]
              focus:border-blue-200 focus:ring-2 focus:ring-blue-100/50
              transition-all duration-200"
          />
        </div>

        {/* Tone selector */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
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
                  border transition-all duration-200 group
                  ${
                    postTone === tone
                      ? "bg-primary/5 border-primary/20 shadow-sm"
                      : "bg-gray-50 border-gray-200 hover:border-primary/20 hover:bg-primary/5"
                  }
                `}
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center
                  ${postTone === tone ? "bg-primary/10" : "bg-white border border-gray-200"}`}>
                  {config.icon}
                </div>
                <div className="text-left">
                  <span className="block text-xs font-medium">{tone}</span>
                  <span className="text-[10px] text-gray-500">{config.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <ShimmerButton
            onClick={onGenerate}
            disabled={!isValidLength || isGeneratingContent}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                     bg-primary text-white shadow-sm
                     hover:shadow-md transition-all duration-200"
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
  );
};
