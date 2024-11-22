import { Lightbulb, Loader2, Wand2, Sparkles } from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import { motion } from "framer-motion";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface ContentIdeasProps {
  loading: boolean;
  ideas: any[];
  handleGenerateTopic: (id: string) => Promise<any>;
  handleTopicSelect: (topic: any) => void;
}

export const ContentIdeas = ({
  loading,
  ideas,
  handleGenerateTopic,
  handleTopicSelect,
}: ContentIdeasProps) => {
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-slate-100 shadow-md">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30" />

      {/* Content Container */}
      <div className="relative space-y-6 p-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 
                          flex items-center justify-center shadow-inner ring-1 ring-primary/10
                          backdrop-blur-xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lightbulb className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-700 
                           bg-clip-text text-transparent">
                Content Ideas
              </h3>
              <p className="text-sm text-gray-500">
                AI-powered topic suggestions
              </p>
            </div>
          </div>

          {/* Enhanced Generate Button */}
          <ShimmerButton
            onClick={() => handleGenerateTopic(currentWorkspace?.id || "")}
            disabled={loading}
            enableShimmer={!loading}
            background="linear-gradient(145deg, #4f46e5, #4338ca)"
            className="h-10 px-4 rounded-xl text-sm font-medium shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </div>
              <span>{loading ? "Generating..." : "Generate Ideas"}</span>
              <span className="hidden sm:flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-lg text-[10px]">
                <Sparkles className="h-3 w-3" />
                AI
              </span>
            </div>
          </ShimmerButton>
        </div>

        {/* Enhanced Ideas Grid */}
        <div className="relative min-h-[240px] rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-50/80 
                      border border-gray-200/50 shadow-sm">
          {!ideas || ideas.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/5 via-white to-primary/10 
                           flex items-center justify-center mb-4 ring-1 ring-primary/10
                           shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Lightbulb className="h-10 w-10 text-primary/40" />
                </motion.div>
              </div>
              <h4 className="text-base font-medium text-gray-900 mb-2">
                No ideas generated yet
              </h4>
              <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed">
                Click the generate button above to get AI-powered content
                ideas based on your preferences
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4">
              {ideas.map((topic: any, index: number) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTopicSelect(topic)}
                  className="group relative px-4 py-3 rounded-xl 
                           bg-gradient-to-br from-white to-gray-50/90
                           border border-gray-200/50 hover:border-primary/20
                           ring-1 ring-black/[0.02] hover:ring-primary/10
                           shadow-sm hover:shadow-md
                           transition-all duration-200 text-left
                           hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 via-white to-primary/5 
                                flex items-center justify-center flex-shrink-0 ring-1 ring-primary/10
                                group-hover:shadow-inner transition-all duration-200">
                      <Lightbulb className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                      {topic.idea}
                    </p>
                  </div>
                  
                  {/* Enhanced hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
