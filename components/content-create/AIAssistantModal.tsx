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
  const [activeTab, setActiveTab] = useState<
    "linkedin" | "strategy" | "audience" | "enhance"
  >("linkedin");
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
    "Hook Optimizer": {
      icon: <Zap className="w-4 h-4" />,
      prompt:
        "Transform the opening of this post to maximize LinkedIn engagement. Focus on:" +
        "\n- Creating a compelling first line that stops the scroll" +
        "\n- Using power words and emotional triggers" +
        "\n- Adding curiosity gaps" +
        "\n- Incorporating relevant statistics or surprising facts" +
        "\n- Making the value proposition clear immediately",
    },
    "Storytelling Format": {
      icon: <BookOpen className="w-4 h-4" />,
      prompt:
        "Restructure this content as an engaging LinkedIn story. Include:" +
        "\n- A personal or professional challenge" +
        "\n- The journey or solution process" +
        "\n- Key learnings and insights" +
        "\n- Actionable takeaways for readers" +
        "\n- A compelling call-to-action",
    },
    "Viral Framework": {
      icon: <TrendingUp className="w-4 h-4" />,
      prompt:
        "Optimize this post for maximum LinkedIn virality using proven frameworks:" +
        "\n- AIDA (Attention, Interest, Desire, Action)" +
        "\n- PAS (Problem, Agitation, Solution)" +
        "\n- Before/After/Bridge" +
        "\n- Include elements that encourage sharing and saving",
    },
  };

  const strategyActions = {
    "Authority Builder": {
      icon: <Briefcase className="w-4 h-4" />,
      prompt:
        "Position this content to establish professional authority:" +
        "\n- Incorporate industry expertise and insights" +
        "\n- Add relevant credentials or experience" +
        "\n- Include data-backed statements" +
        "\n- Share unique professional perspectives" +
        "\n- Reference relevant industry trends",
    },
    "Engagement Magnet": {
      icon: <MessageSquare className="w-4 h-4" />,
      prompt:
        "Transform this post to maximize engagement:" +
        "\n- Add thought-provoking questions" +
        "\n- Include poll-style elements" +
        "\n- Encourage sharing of experiences" +
        "\n- Create discussion points" +
        "\n- End with a strong call-to-action",
    },
    "Content Calendar": {
      icon: <Calendar className="w-4 h-4" />,
      prompt:
        "Optimize this content for strategic posting:" +
        "\n- Align with content themes (Monday Motivation, etc.)" +
        "\n- Include trending industry topics" +
        "\n- Reference current events or seasons" +
        "\n- Maintain consistent branding" +
        "\n- Plan for series potential",
    },
  };

  const audienceActions = {
    "Niche Targeting": {
      icon: <Target className="w-4 h-4" />,
      prompt:
        "Tailor this content for specific professional audiences:" +
        "\n- Use industry-specific terminology" +
        "\n- Address common pain points" +
        "\n- Reference relevant tools or platforms" +
        "\n- Include role-specific insights" +
        "\n- Maintain professional credibility",
    },
    "Network Growth": {
      icon: <Users className="w-4 h-4" />,
      prompt:
        "Optimize for building meaningful connections:" +
        "\n- Encourage meaningful interactions" +
        "\n- Create opportunities for collaboration" +
        "\n- Include industry-specific hashtags" +
        "\n- Tag relevant thought leaders" +
        "\n- Foster community engagement",
    },
    "Lead Generation": {
      icon: <LineChart className="w-4 h-4" />,
      prompt:
        "Structure content to generate quality leads:" +
        "\n- Demonstrate clear value proposition" +
        "\n- Include social proof elements" +
        "\n- Add clear next steps or CTAs" +
        "\n- Incorporate lead magnets" +
        "\n- Maintain professional tone",
    },
  };

  const enhanceActions = {
    "Format Optimizer": {
      icon: <SplitSquareHorizontal className="w-4 h-4" />,
      prompt:
        "Enhance the visual structure for LinkedIn:" +
        "\n- Add line breaks for readability" +
        "\n- Create scannable sections" +
        "\n- Use emojis strategically" +
        "\n- Include bullet points or numbers" +
        "\n- Optimize paragraph length",
    },
    "SEO & Hashtags": {
      icon: <Hash className="w-4 h-4" />,
      prompt:
        "Optimize for LinkedIn's algorithm:" +
        "\n- Add relevant industry hashtags (3-5)" +
        "\n- Include trending keywords" +
        "\n- Optimize first 2-3 lines" +
        "\n- Add relevant mentions" +
        "\n- Use strategic formatting",
    },
    "CTA Enhancer": {
      icon: <Zap className="w-4 h-4" />,
      prompt:
        "Strengthen the call-to-action:" +
        "\n- Create urgency or exclusivity" +
        "\n- Make next steps clear" +
        "\n- Add value proposition" +
        "\n- Include social proof" +
        "\n- Use action-oriented language",
    },
  };

  const formatActions = {
    "Structure Content": {
      icon: <SplitSquareHorizontal className="w-4 h-4" />,
      prompt:
        "Organize the content with proper headings, subheadings, and sections.",
    },
    "Create Summary": {
      icon: <FileText className="w-4 h-4" />,
      prompt:
        "Generate a concise summary of the main points and key takeaways.",
    },
    "Format Lists": {
      icon: <ListChecks className="w-4 h-4" />,
      prompt:
        "Convert appropriate content into well-structured bullet points or numbered lists.",
    },
  };

  const analyzeActions = {
    "Readability Score": {
      icon: <BookOpen className="w-4 h-4" />,
      prompt:
        "Analyze the text's readability and suggest improvements for better comprehension.",
    },
    "Style Analysis": {
      icon: <Type className="w-4 h-4" />,
      prompt:
        "Analyze writing style and provide suggestions for consistency and improvement.",
    },
    "Sentiment Check": {
      icon: <MessageSquare className="w-4 h-4" />,
      prompt:
        "Analyze the tone and sentiment of the text and suggest adjustments if needed.",
    },
  };

  const getActiveActions = () => {
    switch (activeTab) {
      case "linkedin":
        return linkedInActions;
      case "strategy":
        return strategyActions;
      case "audience":
        return audienceActions;
      case "enhance":
        return enhanceActions;
      default:
        return linkedInActions;
    }
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
              {(["linkedin", "strategy", "audience", "enhance"] as const).map(
                (tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "rounded-full px-4 gap-2",
                      activeTab === tab
                        ? "bg-white shadow"
                        : "hover:bg-white/50"
                    )}
                  >
                    {tab === "linkedin" && <Briefcase className="w-4 h-4" />}
                    {tab === "strategy" && <Target className="w-4 h-4" />}
                    {tab === "audience" && <Users className="w-4 h-4" />}
                    {tab === "enhance" && <Zap className="w-4 h-4" />}
                    {tab}
                  </Button>
                )
              )}
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
