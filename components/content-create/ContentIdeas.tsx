import { Lightbulb, Loader2, Wand2 } from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
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
  const handleGenerate = () => {
    handleGenerateTopic(currentWorkspace?.id || "");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-xl">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent -z-1" />

      {/* Content Container */}
      <div className="relative space-y-4 p-6">
        {/* Header with Generate Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-inner ring-1 ring-primary/5">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Content Ideas
              </h3>
              <p className="text-sm text-gray-500">
                AI-powered topic suggestions
              </p>
            </div>
          </div>

          {/* Generate Ideas Button */}
          <ShimmerButton
            onClick={handleGenerate}
            disabled={loading}
            enableShimmer={false}
            background="linear-gradient(145deg, #4f46e5, #2563eb)"
            className="h-9 px-4 rounded-lg text-sm font-medium"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
                {loading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Wand2 className="h-3.5 w-3.5" />
                )}
              </div>
              <span>{loading ? "Generating..." : "Generate Ideas"}</span>
              <span className="hidden sm:inline-block bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                AI
              </span>
            </div>
          </ShimmerButton>
        </div>

        {/* Ideas Grid */}
        <div className="relative min-h-[200px] rounded-xl bg-primary/5 border border-gray-200/50 backdrop-blur-sm ring-1 ring-black/5">
          {!ideas || ideas.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 
                   flex items-center justify-center mb-4 ring-1 ring-primary/10"
              >
                <Lightbulb className="h-8 w-8 text-primary/40" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                No ideas generated yet
              </h4>
              <p className="text-xs text-gray-500 max-w-[240px]">
                Click the generate button above to get AI-powered content
                ideas based on your preferences
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 p-3">
              {ideas.map((topic: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleTopicSelect(topic)}
                  className="group relative px-4 py-3 rounded-lg 
                   bg-gradient-to-br from-white to-gray-50/50
                   border border-gray-200/50 hover:border-primary/20
                   ring-1 ring-black/[0.02] hover:ring-primary/10
                   shadow-sm hover:shadow
                   transition-all duration-200 text-left
                   active:scale-[0.98] min-h-[52px]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 
                         flex items-center justify-center flex-shrink-0 ring-1 ring-primary/10"
                    >
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-600 break-words">
                      {topic.idea}
                    </p>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary 
                       scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
