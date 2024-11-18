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
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

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
    icon: <Briefcase className="h-3.5 w-3.5" />,
    activeColor:
      "bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-600 border-blue-200 ring-blue-200",
    hoverColor: "hover:bg-blue-50/50 hover:border-blue-200/60",
    iconBg: "bg-blue-100",
  },
  Casual: {
    icon: <Smile className="h-3.5 w-3.5" />,
    activeColor:
      "bg-gradient-to-r from-green-50 to-green-100/50 text-green-600 border-green-200 ring-green-200",
    hoverColor: "hover:bg-green-50/50 hover:border-green-200/60",
    iconBg: "bg-green-100",
  },
  Friendly: {
    icon: <MessageCircle className="h-3.5 w-3.5" />,
    activeColor:
      "bg-gradient-to-r from-purple-50 to-purple-100/50 text-purple-600 border-purple-200 ring-purple-200",
    hoverColor: "hover:bg-purple-50/50 hover:border-purple-200/60",
    iconBg: "bg-purple-100",
  },
  Authoritative: {
    icon: <BookMarked className="h-3.5 w-3.5" />,
    activeColor:
      "bg-gradient-to-r from-red-50 to-red-100/50 text-red-600 border-red-200 ring-red-200",
    hoverColor: "hover:bg-red-50/50 hover:border-red-200/60",
    iconBg: "bg-red-100",
  },
  Humorous: {
    icon: <Sparkles className="h-3 w-3" />,
    activeColor:
      "bg-gradient-to-r from-yellow-50 to-yellow-100/50 text-yellow-600 border-yellow-200 ring-yellow-200",
    hoverColor: "hover:bg-yellow-50/50 hover:border-yellow-200/60",
    iconBg: "bg-yellow-100",
  },
  Formal: {
    icon: <FileText className="h-3 w-3" />,
    activeColor:
      "bg-gradient-to-r from-gray-50 to-gray-100/50 text-gray-600 border-gray-200 ring-gray-200",
    hoverColor: "hover:bg-gray-50/50 hover:border-gray-200/60",
    iconBg: "bg-gray-100",
  },
  Inspirational: {
    icon: <Lightbulb className="h-3 w-3" />,
    activeColor:
      "bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-600 border-amber-200 ring-amber-200",
    hoverColor: "hover:bg-amber-50/50 hover:border-amber-200/60",
    iconBg: "bg-amber-100",
  },
  Technical: {
    icon: <Code className="h-3 w-3" />,
    activeColor:
      "bg-gradient-to-r from-indigo-50 to-indigo-100/50 text-indigo-600 border-indigo-200 ring-indigo-200",
    hoverColor: "hover:bg-indigo-50/50 hover:border-indigo-200/60",
    iconBg: "bg-indigo-100",
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

  const handleGenerateTopic = useCallback(async () => {
    try {
      // Add your topic generation logic here
      toast.loading("Generating topic suggestion...");
      // Example: const topic = await generateTopic();
      // setContent(topic);
    } catch (error) {
      toast.error("Failed to generate topic");
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Content Input Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-inner">
              <Pencil className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Content Topic
              </h3>
              <p className="text-sm text-gray-500">Write about your ideas</p>
            </div>
          </div>
          
          {/* Add Generate Topic Button */}
          <Button
            onClick={handleGenerateTopic}
            variant="outline"
            className="h-9 px-3 rounded-xl border border-primary/20 text-primary 
                     hover:bg-primary hover:text-white hover:border-primary
                     transition-all duration-200"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Generate Topic
          </Button>
        </div>

        {/* Enhanced Content Input */}
        <div className="space-y-2">
          <div
            className={`
            relative overflow-hidden rounded-xl bg-white
            ${
              !isValidLength && charCount > 0
                ? "border-red-200"
                : "border-gray-200"
            }
            transition-all duration-200 group
            shadow-sm hover:shadow-md
          `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            <textarea
              value={contentSource === "plain-prompt" ? content : undefined}
              onChange={onTextChange}
              className="relative w-full px-5 py-4 h-[120px] max-h-[200px]
                       resize-none outline-none border  bg-transparent
                       placeholder:text-gray-400 text-gray-600 text-sm
                       transition-all duration-200
                       overflow-y-auto leading-relaxed"
              placeholder="What would you like to write about? Be specific to get better results..."
              maxLength={MAX_CHARS}
            />
            <div
              className="absolute bottom-2 right-3 px-2 py-1 rounded-md bg-gray-50/80 backdrop-blur-sm
                          text-[10px] font-medium text-gray-400"
            >
              {charCount}/{MAX_CHARS}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Post Settings Section */}
      <div className="space-y-6 rounded-xl border border-gray-200 overflow-hidden bg-white/50 backdrop-blur-sm">
        <div className="relative p-6 space-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

          {/* Section Header */}
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-inner">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Style Settings
              </h3>
              <p className="text-sm text-gray-500">
                Customize your content's voice
              </p>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="relative grid gap-8">
            {/* Tone Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Tone of Voice
                </h4>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white">
                    <p className="text-xs">
                      Select the tone that best matches your intended audience
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {Object.entries(toneConfig).map(([tone, config]) => (
                  <button
                    key={tone}
                    onClick={() => setPostTone(tone)}
                    className={`
                      group px-2 py-1 flex items-center gap-2.5 text-sm rounded-xl border 
                      transition-all duration-200 relative overflow-hidden
                      ${
                        tone === postTone
                          ? `${config.activeColor} shadow-sm`
                          : `border-gray-200/80 text-gray-600 ${config.hoverColor} hover:border`
                      }
                      hover:shadow-md active:scale-95
                    `}
                  >
                    <span
                      className={`
                      w-6 h-6 rounded-md flex items-center justify-center
                      ${tone === postTone ? config.iconBg : "bg-gray-100"}
                      group-hover:${config.iconBg.replace(
                        "bg-",
                        ""
                      )} transition-colors duration-200
                    `}
                    >
                      {config.icon}
                    </span>
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Generate Button */}
          <ShimmerButton
            onClick={onGenerate}
            disabled={isGeneratingContent || !isValidLength}
            background="linear-gradient(145deg, #4f46e5, #2563eb)"
            className="w-full py-4"
          >
            {isGeneratingContent ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating your content...</span>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Generate Content</span>
                <div className="flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  <span>
                    {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            )}
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};
