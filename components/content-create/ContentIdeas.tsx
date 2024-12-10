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
    <>
      <div className="relative rounded-3xl border border-gray-100/20 bg-gradient-to-br from-gray-50/50 to-white/30 backdrop-blur-xl overflow-hidden shadow-md">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-purple-400/10 blur-3xl"
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
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
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
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 
                            backdrop-blur-md flex items-center justify-center shadow-xl ring-1 ring-primary/20">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lightbulb className="h-7 w-7 text-primary" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Content Ideas</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1 h-1 rounded-full bg-primary/20" />
                  <span className="text-sm text-gray-500">
                    AI-powered topic suggestions
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAISettings(true)}
                className={cn(
                  "h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-200",
                  "bg-white/40 backdrop-blur-lg border border-gray-200/50 shadow-inner",
                  "hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                )}
                title="AI Settings"
              >
                <Settings2 className="h-5 w-5 text-gray-600" />
              </button>

              <ShimmerButton
                onClick={handleGenerateClick}
                disabled={loading}
                className={cn(
                  "h-11 px-5 rounded-xl text-sm font-medium",
                  "bg-gradient-to-br from-primary to-primary/90",
                  "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                )}
              >
                <div className="flex items-center gap-3">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                  <span>{loading ? "Generating..." : "Generate Ideas"}</span>
                </div>
              </ShimmerButton>
            </div>
          </div>

          {/* Ideas Content */}
          <div className="relative rounded-2xl bg-white/40 backdrop-blur-lg border border-gray-200/50 shadow-inner overflow-hidden">
            {!ideasArray || ideasArray.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[300px] flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-white
                              flex items-center justify-center mb-4 shadow-inner">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Lightbulb className="h-7 w-7 text-primary/40" />
                  </motion.div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Ready to Generate Ideas
                </h4>
                <p className="text-sm text-gray-500 max-w-md">
                  Click the generate button above to get AI-powered content ideas
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {ideasArray.map((topic: ContentIdea, index: number) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleTopicSelect(topic)}
                    className={cn(
                      "group relative p-4 rounded-xl text-left",
                      "bg-white/60 backdrop-blur-sm border border-gray-200/50",
                      "hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5",
                      "transition-all duration-200"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 
                                    flex items-center justify-center shadow-inner">
                        <Lightbulb className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                      </div>
                      <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                        {topic.idea}
                      </p>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 rounded-xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 
                                  transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AISettingsModal 
        trigger={<div />} 
        open={showAISettings} 
        onOpenChange={setShowAISettings}
      />
    </>
  );
};
