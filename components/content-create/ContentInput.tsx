import {
  ArrowRight,
  Loader2,
  HelpCircle,
  Pencil,
  MessageCircle,
  Lightbulb,
  Smile,
  Briefcase,
  Sparkles,
  Code,
  BookMarked,
  FileText,
  Zap,
  Wand2,
  Settings,
} from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { AISettingsModal } from "@/components/ai-settings/AISettingsModal";
import { useGenerateContentIdeas } from "@/hooks/useGenerateLinkedInPosts";

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
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const personalAiVoice = currentWorkspace?.personalAiVoice;
  const charCount = content.length;
  const isValidLength = charCount >= MIN_CHARS;
  const { generateContentIdeas, loading, ideas } = useGenerateContentIdeas();
  const aiSettingsButtonRef = useRef<HTMLButtonElement>(null);

  const handleGenerateTopic = useCallback(async () => {
    try {
      if (!currentWorkspace?.id) {
        toast.error("Please select a workspace first");
        return;
      }

      if (!personalAiVoice) {
        toast.error("Please set up your AI voice first to get personalized content ideas", {
          duration: 4000,
          icon: '🎯',
        });
        aiSettingsButtonRef.current?.click();
        return;
      }

      const loadingToast = toast.loading("Finding something interesting...");
      await generateContentIdeas(currentWorkspace.id);
      toast.dismiss(loadingToast);
      toast.success("Topics generated successfully!");
    } catch (error) {
      toast.error("Failed to generate topics");
    }
  }, [currentWorkspace?.id, personalAiVoice, generateContentIdeas]);

  // Add handler for topic selection
  const handleTopicSelect = useCallback(
    (topic: any) => {
      setContent(topic.idea);
      toast.success("Topic selected!");
    },
    [setContent]
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-xl">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent -z-1" />

      {/* Content Container */}
      <div className="relative space-y-4 p-6">
        {/* Header with Title and Style Settings */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-inner ring-1 ring-primary/5">
              <Pencil className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Content Topic
              </h3>
              <p className="text-sm text-gray-500">
                Write your content topic
              </p>
            </div>
          </div>

          {/* Style Settings */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Select value={postTone} onValueChange={setPostTone}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Select tone" />
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
            </div>

            <AISettingsModal
              trigger={
                <button
                  ref={aiSettingsButtonRef}
                  className="group h-9 w-9 flex items-center justify-center rounded-lg
                           bg-gray-50 hover:bg-gray-100
                           border border-gray-200
                           transition-all duration-200 hover:shadow-sm
                           active:scale-[0.98]"
                >
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary/10 to-secondary/10 
                               flex items-center justify-center">
                    <Settings className="h-3.5 w-3.5 text-primary" />
                  </div>
                </button>
              }
            />
          </div>
        </div>

        {/* Text Input Area */}
        <div className="relative min-h-[200px] rounded-xl bg-primary/5 border border-gray-200/50 backdrop-blur-sm ring-1 ring-black/5">
          <div className="relative p-3">
            <textarea
              value={contentSource === "plain-prompt" ? content : undefined}
              onChange={onTextChange}
              className="w-full min-h-[120px] px-4 py-3 rounded-lg
                       bg-white/50 backdrop-blur-sm
                       border border-gray-200/50
                       placeholder:text-gray-400 text-gray-600 text-sm
                       transition-all duration-200
                       resize-none outline-none
                       focus:ring-2 focus:ring-primary/10 focus:border-primary"
              placeholder="What would you like to write about? Be specific to get better results..."
              maxLength={MAX_CHARS}
            />

            {/* Bottom Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="px-2.5 py-1 rounded-lg 
                           bg-gray-50/80 backdrop-blur-sm
                           text-[10px] font-medium text-gray-500">
                {charCount}/{MAX_CHARS}
              </div>

              <ShimmerButton
                onClick={onGenerate}
                disabled={isGeneratingContent || !isValidLength}
                enableShimmer={false}
                background="linear-gradient(145deg, #4f46e5, #2563eb)"
                className="h-9 px-4 rounded-lg text-sm font-medium"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
                    {isGeneratingContent ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <span>{isGeneratingContent ? "Generating..." : "Generate Content"}</span>
                  <span className="hidden sm:inline-block bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                    AI
                  </span>
                </div>
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
