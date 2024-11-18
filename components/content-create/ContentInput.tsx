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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="space-y-2">
      {/* Content Input Section */}
      <div className="space-y-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          {/* Title Group */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-inner">
              <Pencil className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Content Topic
            </h3>
          </div>
          
          {/* Only Generate Topic Button */}
          <Button
            onClick={handleGenerateTopic}
            variant="outline"
            className="flex-1 sm:flex-none h-9 px-3 rounded-xl border border-primary/20 text-primary 
                     hover:bg-primary hover:text-white hover:border-primary
                     transition-all duration-200 shadow-sm text-sm"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Generate Topic
          </Button>
        </div>

        {/* Enhanced Content Input with Surprise Button */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-xl" />
          <textarea
            value={contentSource === "plain-prompt" ? content : undefined}
            onChange={onTextChange}
            className="relative w-full px-5 py-4 h-[120px] max-h-[200px]
                     resize-none outline-none rounded-xl
                     bg-white/50 backdrop-blur-sm
                     border border-gray-200
                     placeholder:text-gray-400 text-gray-600 text-sm
                     transition-all duration-200
                     overflow-y-auto leading-relaxed
                     focus:ring-2 focus:ring-primary/10 focus:border-primary"
            placeholder="What would you like to write about? Be specific to get better results..."
            maxLength={MAX_CHARS}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg 
                          bg-gray-50/80 backdrop-blur-sm
                          text-[10px] font-medium text-gray-500">
              {charCount}/{MAX_CHARS}
            </div>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    toast.loading("Finding something interesting...");
                  }}
                  className="group h-8 w-8 flex items-center justify-center rounded-xl
                           bg-gradient-to-br from-purple-500/80 to-indigo-500/80 
                           hover:from-purple-500 hover:to-indigo-500
                           text-white shadow-lg shadow-indigo-500/25
                           transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Lightbulb className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Surprise me with a random topic</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Style Settings Section */}
      <div className="relative p-4 space-y-4 rounded-xl bg-white/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-xl" />

        {/* Header with Tone Label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-inner">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Style Settings
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Tone of Voice</span>
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
        </div>

        {/* Tone Selection - Now using Select component */}
        <Select value={postTone} onValueChange={setPostTone}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tone" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(toneConfig).map(([tone, config]) => (
              <SelectItem key={tone} value={tone}>
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center ${config.iconBg}`}>
                    {config.icon}
                  </span>
                  <span>{tone}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Generate Content Button */}
        <ShimmerButton
          onClick={onGenerate}
          disabled={isGeneratingContent || !isValidLength}
          background="linear-gradient(145deg, #4f46e5, #2563eb)"
          className="w-full py-3 rounded-xl"
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
                <span>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          )}
        </ShimmerButton>
      </div>
    </div>
  );
};
