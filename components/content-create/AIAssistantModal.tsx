import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  X,
  Wand2,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Type,
  MessageSquare,
  Zap,
  ListChecks,
  Palette,
  Languages,
  BrainCircuit,
  Lightbulb,
  Pencil,
  FileText,
  SplitSquareHorizontal,
  Check,
  Briefcase,
  Users,
  TrendingUp,
  Target,
  Hash,
  Share2,
  LineChart,
  Calendar,
} from "lucide-react";
import { contentRewrite } from "@/services/ai-content";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onContentUpdate: (newContent: string) => void;
}

export const AIAssistantModal = ({
  isOpen,
  onClose,
  selectedText,
  onContentUpdate,
}: AIAssistantModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAction, setActiveAction] = useState<string>("");
  const [rewrittenContent, setRewrittenContent] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [activeTab, setActiveTab] = useState<"writing">("writing");
  const [wordCount, setWordCount] = useState({ words: 0, characters: 0 });

  useEffect(() => {
    if (!isOpen) {
      setRewrittenContent("");
      setActiveAction("");
      setHistory([]);
      setCurrentVersion(0);
    } else if (selectedText && history.length === 0) {
      setHistory([selectedText]);
    }
  }, [isOpen, selectedText]);

  const handleRewrite = async (instructions: string) => {
    if (!selectedText) return;

    setIsProcessing(true);
    setActiveAction(instructions);

    const prompts = {
      "Improve Writing":
        "Rewrite this text to be more professional, engaging, and impactful. Focus on:" +
        "\n- Improving clarity and readability" +
        "\n- Enhancing the flow and structure" +
        "\n- Using more compelling language" +
        "\n- Fixing grammar and style issues" +
        "\n- Maintaining the original message and tone",

      "Fix Grammar":
        "Review and correct the text for grammar, punctuation, and style. Focus on:" +
        "\n- Fixing grammatical errors" +
        "\n- Correcting punctuation mistakes" +
        "\n- Ensuring proper sentence structure" +
        "\n- Maintaining consistent tense" +
        "\n- Improving word choice and clarity" +
        "\n- Keeping the original meaning intact",

      "Make Shorter":
        "Condense this text while maintaining its impact. Focus on:" +
        "\n- Keeping all key points and main message" +
        "\n- Removing redundant or unnecessary information" +
        "\n- Using more concise language" +
        "\n- Preserving the original tone" +
        "\n- Making it 40-50% shorter",

      "Make Longer":
        "Expand this text thoughtfully and meaningfully. Focus on:" +
        "\n- Adding relevant examples and details" +
        "\n- Including supporting evidence or context" +
        "\n- Elaborating on key points" +
        "\n- Maintaining consistent tone and style" +
        "\n- Making it approximately twice as long",
    };

    try {
      const response = await contentRewrite({
        content: rewrittenContent || selectedText,
        instructions:
          prompts[instructions as keyof typeof prompts] || instructions,
      });

      if (response.success) {
        const newContent = response.data.content;
        setRewrittenContent(newContent);
        setHistory((prev) => [
          ...prev.slice(0, currentVersion + 1),
          newContent,
        ]);
        setCurrentVersion((prev) => prev + 1);
        toast.success("Content rewritten successfully!");
      } else {
        toast.error(response.message || "Failed to rewrite content");
      }
    } catch (error) {
      console.error("Error rewriting content:", error);
      toast.error("Failed to rewrite content");
    } finally {
      setIsProcessing(false);
      setActiveAction("");
    }
  };

  const handleInsert = () => {
    onContentUpdate(rewrittenContent);
    onClose();
  };

  const handleUndo = () => {
    if (currentVersion > 0) {
      setCurrentVersion((prev) => prev - 1);
      setRewrittenContent(history[currentVersion - 1]);
    }
  };

  const handleRedo = () => {
    if (currentVersion < history.length - 1) {
      setCurrentVersion((prev) => prev + 1);
      setRewrittenContent(history[currentVersion + 1]);
    }
  };

  const linkedInActions = {
    "Improve Writing": {
      icon: <Pencil className="w-4 h-4" />,
      prompt:
        "Rewrite this text to be more professional, engaging, and impactful. Focus on:" +
        "\n- Improving clarity and readability" +
        "\n- Enhancing the flow and structure" +
        "\n- Using more compelling language" +
        "\n- Fixing grammar and style issues" +
        "\n- Maintaining the original message and tone",
    },
    "Fix Grammar": {
      icon: <CheckCircle2 className="w-4 h-4" />,
      prompt:
        "Review and correct the text for grammar, punctuation, and style. Focus on:" +
        "\n- Fixing grammatical errors" +
        "\n- Correcting punctuation mistakes" +
        "\n- Ensuring proper sentence structure" +
        "\n- Maintaining consistent tense" +
        "\n- Improving word choice and clarity" +
        "\n- Keeping the original meaning intact",
    },
    "Make Shorter": {
      icon: <SplitSquareHorizontal className="w-4 h-4" />,
      prompt:
        "Condense this text while maintaining its impact. Focus on:" +
        "\n- Keeping all key points and main message" +
        "\n- Removing redundant or unnecessary information" +
        "\n- Using more concise language" +
        "\n- Preserving the original tone" +
        "\n- Making it 40-50% shorter",
    },
    "Make Longer": {
      icon: <FileText className="w-4 h-4" />,
      prompt:
        "Expand this text thoughtfully and meaningfully. Focus on:" +
        "\n- Adding relevant examples and details" +
        "\n- Including supporting evidence or context" +
        "\n- Elaborating on key points" +
        "\n- Maintaining consistent tone and style" +
        "\n- Making it approximately twice as long",
    },
  };

  const getActiveActions = () => {
    return linkedInActions;
  };

  useEffect(() => {
    if (rewrittenContent || selectedText) {
      const text = rewrittenContent || selectedText;
      const words = text.trim().split(/\s+/).length;
      const characters = text.length;
      setWordCount({ words, characters });
    }
  }, [rewrittenContent, selectedText]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] p-0 flex flex-col overflow-hidden bg-white">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-primary/0 rounded-xl blur-sm" />
                <div className="relative size-12 rounded-xl bg-primary/5 flex items-center justify-center">
                  <Wand2 className="size-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  AI Writing Studio
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enhance your content with AI-powered writing tools
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-gray-50 p-1 rounded-lg">
                <button
                  className="h-9 px-4 rounded-lg flex items-center gap-2 bg-white shadow-sm text-sm font-medium text-gray-700"
                >
                  <Pencil className="size-4" />
                  Writing
                </button>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <button
                  onClick={handleUndo}
                  disabled={currentVersion === 0}
                  className={cn(
                    "size-8 rounded-lg flex items-center justify-center transition-colors",
                    currentVersion === 0
                      ? "text-gray-300"
                      : "hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <RotateCcw className="size-4" />
                </button>
                <span className="text-sm font-medium px-2">
                  {currentVersion + 1}/{history.length}
                </span>
                <button
                  onClick={handleRedo}
                  disabled={currentVersion === history.length - 1}
                  className={cn(
                    "size-8 rounded-lg flex items-center justify-center transition-colors transform scale-x-[-1]",
                    currentVersion === history.length - 1
                      ? "text-gray-300"
                      : "hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <RotateCcw className="size-4" />
                </button>
                <button
                  onClick={onClose}
                  className="size-8 rounded-lg flex items-center justify-center hover:bg-gray-100 hover:text-gray-900 ml-2 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Left Sidebar */}
            <div className="w-[300px] p-6 border-r border-gray-100 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
                    <span className="size-2 rounded-full bg-primary/60" />
                    Writing Tools
                  </h3>
                  <div className="space-y-1">
                    {Object.entries(getActiveActions()).map(([action, { icon, prompt }]) => (
                      <button
                        key={action}
                        onClick={() => handleRewrite(prompt)}
                        disabled={!selectedText || isProcessing}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors",
                          activeAction === action
                            ? "bg-primary/5 text-primary"
                            : "text-gray-700 hover:bg-gray-50",
                          (!selectedText || isProcessing) && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {icon}
                          <span>{action}</span>
                        </div>
                        <ArrowRight className={cn(
                          "size-4 transition-opacity",
                          activeAction === action ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                        )} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Original Content */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <span className="size-2 rounded-full bg-primary/60" />
                      Original Content
                    </h3>
                    <span className="text-sm text-gray-500">
                      {wordCount.words} words | {wordCount.characters} characters
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700 min-h-[150px] whitespace-pre-wrap">
                    {selectedText.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < selectedText.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Enhanced Content */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <span className="size-2 rounded-full bg-primary/60" />
                      Enhanced Content
                    </h3>
                    <span className="text-sm text-gray-500">
                      Version {currentVersion + 1} of {history.length}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="p-4 bg-primary/5 rounded-xl text-sm text-gray-700 min-h-[200px] whitespace-pre-wrap">
                      {rewrittenContent ? (
                        rewrittenContent.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < rewrittenContent.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))
                      ) : (
                        <div className="text-gray-400 text-center mt-8">
                          Enhanced content will appear here
                        </div>
                      )}
                    </div>
                    {isProcessing && <AILoader />}
                    {rewrittenContent && (
                      <button
                        onClick={handleInsert}
                        className="absolute top-3 right-3 h-9 px-4 rounded-lg bg-primary text-white 
                                 hover:bg-primary/90 transition-colors shadow-sm hover:shadow flex items-center gap-2"
                      >
                        <Check className="size-4" />
                        Insert
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AILoader = () => (
  <motion.div 
    className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="flex flex-col items-center gap-4"
      initial={{ y: 10 }}
      animate={{ y: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm" />
        <div className="relative size-10 rounded-full border-2 border-primary border-t-transparent" />
      </motion.div>
      <motion.p 
        className="text-sm font-medium text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Enhancing your content...
      </motion.p>
    </motion.div>
  </motion.div>
);
