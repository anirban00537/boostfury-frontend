import { Lightbulb, Loader2, Wand2, Sparkles, Settings2 } from "lucide-react";
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
                  <Lightbulb className="w-5 h-5 text-neutral-900" />
                </div>
              </div>
              <div>
                <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-bold">
                  <span className="bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                    Content
                  </span>{" "}
                  <span className="bg-gradient-to-b from-neutral-700 to-neutral-500 bg-clip-text text-transparent">
                    Ideas
                  </span>
                </h2>
                <p className="text-sm text-neutral-600">
                  Generate viral content ideas for your posts
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateClick}
              disabled={loading}
              className="group relative"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl
                bg-neutral-900 text-white text-sm font-medium
                hover:bg-neutral-800 disabled:bg-neutral-300
                transition-all duration-200">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Generate Ideas
              </div>
            </button>
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
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                  <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                  <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                    <Lightbulb className="w-5 h-5 text-neutral-400" />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent mb-1">
                    No ideas yet
                  </h4>
                  <p className="text-sm text-neutral-600">
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
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="relative p-4 text-left rounded-xl bg-white/50 backdrop-blur-sm 
                      border border-neutral-200/60 
                      group-hover:bg-white/80 group-hover:border-neutral-300/80
                      transition-all duration-200">
                      <p className="text-sm text-neutral-600 group-hover:text-neutral-900">
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
