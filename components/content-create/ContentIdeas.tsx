import { Lightbulb, Loader2, Wand2, Sparkles, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { AISettingsModal } from "@/components/ai-settings/AISettingsModal";
import React from "react";
import { cn } from "@/lib/utils";
import ShimmerButton from "../magicui/Shimmer-Button.comp";

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
    <div className="group relative">
      {/* Enhanced Glowing Effects */}
      <div className="absolute -inset-[1px] bg-gradient-to-t from-blue-100/20 via-white to-blue-50/20 rounded-2xl opacity-40 group-hover:opacity-70 transition-all duration-500" />

      {/* Main Content */}
      <div
        className="relative rounded-2xl bg-white border border-neutral-200/60 overflow-hidden 
        shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.06)] 
        hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.06)] 
        transition-shadow duration-300"
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-white rounded-xl blur-md" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-white to-blue-50 rounded-xl flex items-center justify-center border border-blue-100/30 shadow-sm">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                  Content Ideas
                </h3>
                <span className="text-sm text-slate-600">
                  AI-powered content suggestions
                </span>
              </div>
            </div>

            {/* Generate Button */}
            <ShimmerButton
              onClick={handleGenerateClick}
              disabled={loading}
              shimmerColor="rgba(255, 255, 255, 0.6)"
              shimmerSize="0.15em"
              shimmerDuration="2s"
              borderRadius="0.75rem"
              background="linear-gradient(45deg, #2563eb, #3b82f6, #2563eb)"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              {loading ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Ideas</span>
                </>
              )}
            </ShimmerButton>
          </div>

          {/* Ideas List */}
          <div className="min-h-[200px]">
            {ideasArray.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-[200px] space-y-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-white rounded-xl blur-md" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-white to-blue-50 rounded-xl flex items-center justify-center border border-blue-100/30 shadow-sm">
                    <Lightbulb className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium text-slate-900 mb-1">
                    No ideas yet
                  </h4>
                  <p className="text-sm text-slate-600">
                    Click generate to create new ideas
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {ideasArray.map((idea, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleTopicSelect(idea)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div
                      className="relative p-4 text-left rounded-xl bg-white border border-blue-100/50 
                      group-hover:border-blue-200/80 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50/50
                      transition-all duration-200"
                    >
                      <p className="text-sm text-slate-600 group-hover:text-slate-900">
                        {idea.idea}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showAISettings && (
        <AISettingsModal
          open={showAISettings}
          onClose={() => setShowAISettings(false)}
        />
      )}
    </div>
  );
};
