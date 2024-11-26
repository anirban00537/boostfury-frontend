import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Wand2, Edit, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useContentPosting } from "@/hooks/useContent";
import { useRouter } from "next/navigation";
import { GradientButton } from "../ui/gradient-button";

interface AIWritingPreviewProps {
  isGenerating: boolean;
  generatedPost?: string;
  title?: string;
}

const LoadingAnimation = () => (
  <div className="relative min-h-[300px] p-8 bg-gradient-to-br from-white via-gray-50/95 to-gray-50/90">
    {/* Enhanced Shimmer Lines */}
    <div className="space-y-6 relative">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          <div
            className={`h-3.5 rounded-full bg-gradient-to-r from-primary/3 via-primary/6 to-primary/3
                        ${i === 0 ? "w-3/5" : i === 3 ? "w-2/5" : "w-4/5"}`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Refined Loading Indicator */}
    <div className="absolute inset-0 backdrop-blur-[2px] bg-white/70 flex items-center justify-center">
      <motion.div
        className="flex items-center gap-5 px-10 py-5 rounded-2xl
                   bg-gradient-to-br from-white/95 to-white/80
                   border border-primary/5"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated Icon */}
        <div className="relative w-6 h-6">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30 border-b-transparent"
            animate={{ rotate: -180 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-1 rounded-full bg-primary/10"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Text and Dots */}
        <div className="flex flex-col items-start">
          <motion.span
            className="text-sm font-medium bg-gradient-to-r from-primary to-primary/80 
                       bg-clip-text text-transparent"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI is writing
          </motion.span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/60"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export const AIWritingPreview = ({
  isGenerating,
  generatedPost,
  title = "AI Generated Content",
}: AIWritingPreviewProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const content = generatedPost || "";
  const router = useRouter();
  const { handleCreateDraftFromGenerated, isCreatingDraft } =
    useContentPosting();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy content");
      console.error("Copy failed:", err);
    }
  };

  const handleSaveAndEdit = async () => {
    if (!content.trim()) {
      toast.error("Please generate content first");
      return;
    }

    try {
      const draftId = await handleCreateDraftFromGenerated({
        content: content.trim(),
      });

      if (draftId) {
        router.push(`/compose?draft_id=${draftId}`);
      }
    } catch (error) {
      toast.error("Failed to save draft");
      console.error("Save draft error:", error);
    }
  };

  return (
    <div className="space-y-7">
      {/* Refined Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div
            className="w-12 h-12 rounded-xl
                       bg-gradient-to-br from-gray-50/95 to-white
                       border border-primary/5
                       flex items-center justify-center
                       transition-colors duration-200 group"
          >
            <Wand2 className="h-5 w-5 text-primary/70 group-hover:text-primary/90 transition-colors duration-200" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1 h-1 rounded-full bg-primary/20" />
              <span className="text-xs text-gray-500 font-medium">
                {content.length} characters
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {content && !isGenerating && (
            <motion.div
              className="flex items-center gap-3.5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GradientButton
                variant="default"
                size="sm"
                onClick={handleCopy}
                leftIcon={isCopied ? <Check size={18} /> : <Copy size={18} />}
                className={`
                  h-10 gap-2.5 text-xs font-medium transition-all duration-300
                  border border-primary/5 hover:border-primary/10
                  ${
                    isCopied
                      ? "text-green-600 bg-green-50/90"
                      : "text-primary/70 hover:text-primary/90 bg-gradient-to-b from-white to-gray-50/95"
                  }
                `}
              />

              <GradientButton
                variant="primary"
                size="sm"
                onClick={handleSaveAndEdit}
                disabled={isCreatingDraft}
                leftIcon={
                  isCreatingDraft ? (
                    <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Edit size={16} />
                  )
                }
              >
                {isCreatingDraft ? <>Saving...</> : <>Save & Edit</>}
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Refined Content Area */}
      <div
        className="relative rounded-xl overflow-hidden 
                  border border-primary/5 hover:border-primary/10
                  bg-gradient-to-br from-white via-white to-gray-50/95
                  transition-all duration-300"
      >
        {isGenerating ? (
          <LoadingAnimation />
        ) : content ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="p-8 bg-gradient-to-br from-white via-white to-gray-50/95 rounded-xl">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed">
                  {content}
                </div>
              </div>
            </div>
            {/* Refined AI Enhanced Badge */}
            <div className="absolute bottom-5 right-5">
              <div
                className="flex items-center gap-2 text-[11px] font-medium text-white
                          bg-gradient-to-r from-primary/90 to-primary/80
                          px-3 py-1.5 rounded-full border border-white/10
                          transition-all duration-200 hover:from-primary hover:to-primary/90"
              >
                <Sparkles className="h-3 w-3" />
                AI Enhanced
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[300px] flex flex-col items-center justify-center text-center 
                     border border-primary/5 rounded-xl p-10
                     bg-gradient-to-br from-white via-gray-50/90 to-gray-50/80"
          >
            <div
              className="w-16 h-16 mb-5 rounded-xl 
                        bg-gradient-to-br from-gray-50/95 to-white
                        border border-primary/5
                        flex items-center justify-center
                        group transition-all duration-200"
            >
              <Wand2 className="h-8 w-8 text-primary/60 group-hover:text-primary/80 transition-colors duration-200" />
            </div>
            <h3 className="text-base font-medium text-gray-800 mb-2">
              Ready to Generate
            </h3>
            <p className="text-sm text-gray-500/90 max-w-sm">
              Use the editor on the left to start generating AI-powered content
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
