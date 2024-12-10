import { Lightbulb, Loader2, Wand2, Sparkles, Settings2 } from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import { motion } from "framer-motion";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { AISettingsModal } from "@/components/ai-settings/AISettingsModal";
import React from "react";
import { cn } from "@/lib/utils";

interface ContentIdea {
  idea: string;
}

interface ContentIdeasResponse {
  ideas: ContentIdea[];
  tokenUsage: {
    wordCount: number;
    remainingTokens: number;
    totalTokens: number;
  };
}

interface ContentIdeasProps {
  loading: boolean;
  ideas: ContentIdeasResponse | ContentIdea[];
  handleGenerateTopic: (id: string) => Promise<any>;
  handleTopicSelect: (topic: ContentIdea) => void;
}

export const ContentIdeas = ({
  loading,
  ideas,
  handleGenerateTopic,
  handleTopicSelect,
}: ContentIdeasProps) => {
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const personalAiVoice = currentWorkspace?.personalAiVoice;
  const [showAISettings, setShowAISettings] = React.useState(false);

  const handleGenerateClick = async () => {
    if (!personalAiVoice) {
      setShowAISettings(true);
      return;
    }
    await handleGenerateTopic(currentWorkspace?.id || "");
  };

  const ideasArray = Array.isArray(ideas) ? ideas : ideas?.ideas || [];

  return (
    <div className="relative rounded-xl bg-white overflow-hidden
      border border-gray-200/90
      shadow-[0_2px_0_0_rgba(0,0,0,0.08),inset_0_-1px_0_0_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(255,255,255,0.5)]">
      <div className="p-6 space-y-6">
        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">
                <span className="text-gray-900">Content</span>{" "}
                <span className="text-primary">Ideas</span>
              </h2>
              <p className="text-sm text-gray-500">
                Generate viral content ideas for your posts
              </p>
            </div>
            <ShimmerButton
              onClick={handleGenerateClick}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generate Ideas
            </ShimmerButton>
          </div>

          {/* Ideas List */}
          <div className="min-h-[200px]">
            {ideasArray.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 
                    flex items-center justify-center shadow-inner">
                  <Lightbulb className="h-5 w-5 text-primary/40" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">No ideas yet</p>
                  <p className="text-xs text-gray-500 mt-0.5">Click generate to create new ideas</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {ideasArray.map((idea, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopicSelect(idea)}
                    className="w-full p-3 text-left rounded-lg border border-gray-200/90 bg-white
                      hover:border-primary/20 hover:bg-primary/5
                      transition-colors duration-200"
                  >
                    <p className="text-sm text-gray-700">{idea.idea}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
