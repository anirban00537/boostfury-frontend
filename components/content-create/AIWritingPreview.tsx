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
  <div className="relative min-h-[300px] p-8">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50/90 backdrop-blur-sm" />
    
    {/* Enhanced loading animation */}
    <div className="relative space-y-6">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          <div className={`h-4 rounded-lg bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5
                          ${i === 0 ? 'w-3/5' : i === 3 ? 'w-2/5' : 'w-4/5'}`}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      ))}
    </div>

    {/* AI Writing indicator */}
    <motion.div
      className="absolute inset-0 backdrop-blur-[2px] bg-white/70 
                 flex items-center justify-center"
    >
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
    </motion.div>
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
    <div className="space-y-6">
      <div className="relative rounded-3xl border border-gray-100/20 bg-gradient-to-br from-gray-50/50 to-white/30 backdrop-blur-xl overflow-hidden shadow-md">
        {/* Enhanced floating elements */}
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
          {/* Header with improved styling */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 
                            backdrop-blur-md flex items-center justify-center shadow-xl ring-1 ring-primary/20">
                <Wand2 className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1 h-1 rounded-full bg-primary/20" />
                  <span className="text-sm text-gray-500">
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
                      gap-2.5 text-xs font-medium transition-all duration-300
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
                    className="text-xs font-medium w-32"
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

          {/* Content Area with Enhanced Styling */}
          <div className="relative mt-6">
            {isGenerating ? (
              <LoadingAnimation />
            ) : content ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="p-8 rounded-2xl bg-white/40 backdrop-blur-lg border border-gray-200/50 shadow-inner">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-base text-gray-600 leading-relaxed">
                      {content}
                    </div>
                  </div>
                </div>
                {/* AI Enhanced Badge */}
                <div className="absolute bottom-5 right-5">
                  <div
                    className="flex items-center gap-2 text-[11px] font-medium
                              px-3 py-1.5 rounded-full
                              bg-gradient-to-r from-primary/90 to-primary
                              text-white border border-white/10"
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
                className="relative min-h-[300px] flex flex-col items-center justify-center p-8 text-center
                           rounded-2xl bg-white/40 backdrop-blur-lg border border-gray-200/50 shadow-inner"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-white
                              flex items-center justify-center mb-4 shadow-inner">
                  <Wand2 className="h-7 w-7 text-primary/40" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate</h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Use the editor on the left to start generating AI-powered content
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
