import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Wand2, Edit, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useContentPosting } from "@/hooks/useContent";
import { useRouter } from "next/navigation";

interface AIWritingPreviewProps {
  isGenerating: boolean;
  generatedPost?: string;
  title?: string;
}

const LoadingAnimation = () => (
  <div className="relative space-y-4 p-6 bg-white">
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <div className="h-4 bg-primary/10 rounded-lg">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Floating Sparkles */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * 200,
            y: Math.random() * 200,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-3 h-3 text-primary" />
        </motion.div>
      ))}
    </div>

    {/* Central Loading Indicator */}
    <div className="absolute inset-0 backdrop-blur-[1px] bg-white/30 flex items-center justify-center">
      <motion.div
        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10
                   border border-primary/20 shadow-xl backdrop-blur-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-5 h-5">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary border-b-transparent opacity-50"
            animate={{ rotate: -180 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-primary">
            AI is writing
          </span>
          <motion.div
            className="flex gap-1"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1 h-1 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity }}
              />
            ))}
          </motion.div>
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
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wand2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-500">
                {content.length} characters
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {content && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={`
                  h-8 gap-2 text-xs transition-all duration-200
                  ${
                    isCopied
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handleSaveAndEdit}
                disabled={isCreatingDraft}
                className="h-8 gap-2 text-xs bg-primary hover:bg-primary/90 text-white"
              >
                {isCreatingDraft ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Edit className="h-3.5 w-3.5" />
                    Save & Edit
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Content Area */}
      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {isGenerating ? (
          <LoadingAnimation />
        ) : content ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="p-6 bg-white rounded-xl">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                  {content}
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <div
                className="flex items-center gap-1.5 text-[10px] font-medium text-primary bg-primary/10 
                            px-2 py-1 rounded-full"
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
            className="min-h-[300px] flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50/50"
          >
            <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wand2 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Ready to Generate
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Use the editor on the left to start generating AI-powered content
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
