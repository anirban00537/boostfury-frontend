import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Wand2, Edit } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useContentPosting } from "@/hooks/useContent";
import { useRouter } from "next/navigation";
import { GradientButton } from "../ui/gradient-button";
import { cn } from "@/lib/utils";

interface AIWritingPreviewProps {
  isGenerating: boolean;
  generatedPost?: string;
  title?: string;
}

const LoadingAnimation = () => (
  <div className="relative min-h-[300px] p-8">
    <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-50/90 backdrop-blur-sm" />

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
          <div
            className={`h-4 rounded-lg bg-gradient-to-r from-neutral-200/20 via-neutral-200/40 to-neutral-200/20
                          ${i === 0 ? "w-3/5" : i === 3 ? "w-2/5" : "w-4/5"}`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      ))}
    </div>

    {/* AI Writing indicator */}
    <motion.div className="absolute inset-0 backdrop-blur-[2px] bg-white/70 flex items-center justify-center">
      <motion.div
        className="flex items-center gap-5 px-10 py-5 rounded-2xl
                   bg-white/50 backdrop-blur-sm border border-neutral-200/60"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated Icon */}
        <div className="relative w-6 h-6">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-neutral-900 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-neutral-400 border-b-transparent"
            animate={{ rotate: -180 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-1 rounded-full bg-neutral-200"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Text and Dots */}
        <div className="flex flex-col items-start">
          <motion.span
            className="text-sm font-medium bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI is writing
          </motion.span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-neutral-400"
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
                    <Wand2 className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                    {title}
                  </h3>
                  <span className="text-sm text-slate-600">
                    {content.length} characters
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {content && !isGenerating && (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <button onClick={handleCopy} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div
                        className={cn(
                          "relative flex items-center gap-2 px-3 py-1.5 rounded-xl",
                          "bg-white border border-blue-100/50",
                          "hover:border-blue-200/80 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50",
                          "transition-all duration-200",
                          isCopied && "text-blue-600"
                        )}
                      >
                        {isCopied ? <Check size={16} /> : <Copy size={16} />}
                      </div>
                    </button>

                    <GradientButton
                      onClick={handleSaveAndEdit}
                      disabled={isCreatingDraft}
                      variant="primary"
                      className="flex items-center gap-2"
                      leftIcon={
                        isCreatingDraft ? (
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Edit className="h-4 w-4" />
                        )
                      }
                    >
                      {isCreatingDraft ? "Saving..." : "Save & Edit"}
                    </GradientButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Area */}
            <div className="relative rounded-xl border border-blue-100/50 overflow-hidden">
              {isGenerating ? (
                <LoadingAnimation />
              ) : content ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-white"
                >
                  <div className="p-6">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-base text-slate-600 leading-relaxed">
                        {content}
                      </div>
                    </div>
                  </div>
                  {/* AI Badge */}
                  <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-blue-100/50">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                      <span className="text-[10px] font-medium text-slate-600">
                        AI Enhanced
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-8 text-center bg-white"
                >
                  <div className="relative mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-white rounded-xl blur-md" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-white to-blue-50 rounded-xl flex items-center justify-center border border-blue-100/30 shadow-sm">
                      <Wand2 className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900 mb-1">
                    Ready to Generate
                  </h4>
                  <p className="text-sm text-slate-600">
                    Use the editor on the left to start generating AI-powered
                    content
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
