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

const AILoader = () => (
  <motion.div 
    className="absolute inset-0 flex items-center justify-center bg-blue-50/80 backdrop-blur-sm z-30"
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
      >
        <Loader2 className="w-8 h-8 text-blue-600" />
      </motion.div>
      <motion.p 
        className="text-sm text-blue-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Enhancing your content...
      </motion.p>
    </motion.div>
  </motion.div>
);

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
      <DialogContent className="sm:max-w-[1200px] bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wand2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xl font-semibold text-blue-600">
              AI Writing Studio
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-50 p-1 rounded-full">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-4 gap-2 bg-white shadow"
              >
                <Pencil className="w-4 h-4" />
                writing
              </Button>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <RotateCcw
                className="w-4 h-4 cursor-pointer hover:text-gray-700"
                onClick={handleUndo}
              />
              <span className="text-sm">{currentVersion + 1}/4</span>
              <RotateCcw
                className="w-4 h-4 cursor-pointer hover:text-gray-700 transform scale-x-[-1]"
                onClick={handleRedo}
              />
              <X
                className="w-4 h-4 cursor-pointer hover:text-gray-700 ml-2"
                onClick={onClose}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-[300px_1fr] gap-6 py-4">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600/60" />
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tools
              </h3>
              <div className="space-y-2">
                {Object.entries(getActiveActions()).map(
                  ([action, { icon, prompt }]) => (
                    <button
                      key={action}
                      onClick={() => handleRewrite(prompt)}
                      disabled={!selectedText || isProcessing}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg group transition-all",
                        activeAction === action && "bg-blue-50 text-blue-600"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {icon}
                        <span>{action}</span>
                      </div>
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity",
                          activeAction === action && "opacity-100"
                        )}
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 h-[calc(100vh-200px)] overflow-hidden">
            {/* Original Content */}
            <div className="h-[40%]">
              <div className="flex items-center justify-between mb-2 sticky top-0 bg-white z-10">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600/60" />
                  Original Content
                </h3>
                <span className="text-sm text-gray-500">
                  {wordCount.words} words | {wordCount.characters} characters
                </span>
              </div>
              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 min-h-[150px] whitespace-pre-wrap">
                  {selectedText.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < selectedText.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="h-[60%]">
              <div className="flex items-center justify-between mb-2 sticky top-0 bg-white z-10">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600/60" />
                  Enhanced Content
                </h3>
                <span className="text-sm text-gray-500">
                  Version {currentVersion + 1} of {history.length}
                </span>
              </div>
              <div className="h-full relative">
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                  <div className="p-4 bg-blue-50/50 rounded-lg text-sm text-gray-700 min-h-full whitespace-pre-wrap">
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
                </div>
                {isProcessing && <AILoader />}
                {rewrittenContent && (
                  <Button
                    onClick={handleInsert}
                    className="absolute top-2 right-2 bg-blue-600 text-white hover:bg-blue-700 z-20"
                    size="sm"
                  >
                    Insert
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
