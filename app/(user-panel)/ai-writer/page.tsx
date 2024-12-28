"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { AIWritingPreview } from "@/components/content-create/AIWritingPreview";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentIdeas } from "@/components/content-create/ContentIdeas";
import { Lightbulb, Pencil, Sparkles, ArrowLeft, FileText, Youtube, Link, LayoutTemplate, Upload, X } from "lucide-react";
import { useGenerateContentIdeas } from "@/hooks/useGenerateLinkedInPosts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { PDFToPost } from "@/components/content-create/features/PDFToPost";
import { YouTubeToPost } from "@/components/content-create/features/YouTubeToPost";
import { ArticleToPost } from "@/components/content-create/features/ArticleToPost";
import { FormatContent } from "@/components/content-create/features/FormatContent";
import { ViralPostGenerator } from "@/components/content-create/features/ViralPostGenerator";

// Add this type to define valid tool values
type ToolValue = 'write' | 'ideas' | 'pdf' | 'youtube' | 'article' | 'format';

interface TabItem {
  value: ToolValue;  // Instead of string
  icon: LucideIcon;
  label: string;
  description: string;
}

const tabItems: TabItem[] = [
  {
    value: "write",
    icon: Pencil,
    label: "Viral Post Generator",
    description: "Create engaging viral posts from scratch"
  },
  {
    value: "ideas",
    icon: Lightbulb,
    label: "Idea Generator",
    description: "Get AI-powered content ideas"
  },
  {
    value: "pdf",
    icon: FileText,
    label: "PDF to Post",
    description: "Convert PDF content into engaging posts"
  },
  {
    value: "youtube",
    icon: Youtube,
    label: "YouTube to Post",
    description: "Create posts from YouTube videos"
  },
  {
    value: "article",
    icon: Link,
    label: "Article to Post",
    description: "Transform articles into LinkedIn content"
  },
  {
    value: "format",
    icon: LayoutTemplate,
    label: "Format Content",
    description: "Format and structure your content"
  }
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Now toolColors will be properly typed
const toolColors: Record<ToolValue, { light: string; main: string; hover: string }> = {
  write: { light: '#E3F2FD', main: '#2196F3', hover: '#E3F2FD' },
  ideas: { light: '#F3E5F5', main: '#9C27B0', hover: '#F3E5F5' },
  pdf: { light: '#FFEBEE', main: '#F44336', hover: '#FFEBEE' },
  youtube: { light: '#FCE4EC', main: '#E91E63', hover: '#FCE4EC' },
  article: { light: '#E8F5E9', main: '#4CAF50', hover: '#E8F5E9' },
  format: { light: '#FFF3E0', main: '#FF9800', hover: '#FFF3E0' },
};

// Add this type for the PDF state
interface PDFFile {
  name: string;
  size: number;
  url: string;
}

const ContentCreationTools: React.FC = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const [contentSource, setContentSource] = useState("plain-prompt");
  const [activeTab, setActiveTab] = useState("write");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    content,
    setContent,
    generatedPost,
    isGeneratingLinkedinPosts,
    handleGenerateLinkedIn,
    handleLinkedInTextChange,
    postTone,
    setPostTone,
  } = useGenerateLinkedInPosts();

  const { generateContentIdeas, loading, ideas } = useGenerateContentIdeas();

  // Reference to the bottom of the page
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleLocalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
    handleLinkedInTextChange(e);
  };

  const handleTopicSelect = (topic: any) => {
    setContent(topic.idea);
    setActiveTab("write");
  };

  const handleGenerateIdeas = async (id: string) => {
    try {
      await generateContentIdeas(id);
    } catch (error) {
      console.error("Error generating ideas:", error);
    }
  };

  const handleToolSelect = (value: string) => {
    setSelectedTool(value);
    setActiveTab(value);
  };

  // Slow scroll to the bottom after content is loaded or updated
  useEffect(() => {
    const scrollSlowly = () => {
      const target = bottomRef.current;
      if (target) {
        const scrollHeight = target.offsetTop;
        let currentPosition = window.pageYOffset;

        const interval = setInterval(() => {
          if (currentPosition < scrollHeight) {
            currentPosition += 5; // adjust this value for slower/faster scroll
            window.scrollTo(0, currentPosition);
          } else {
            clearInterval(interval);
          }
        }, 10); // adjust interval for more gradual scrolling
      }
    };

    // Trigger slow scroll when content changes
    scrollSlowly();
  }, [content, ideas, generatedPost, isGeneratingLinkedinPosts]);

  // Add these handler functions
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      });
    }
  };

  const removePdf = () => {
    setPdfFile(null);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="relative h-full p-6">
        {!selectedTool ? (
          // Tool Selection Page
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                ✨ AI-Powered Content Creation
              </span>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                Create Viral LinkedIn Posts
              </h1>
              <p className="text-neutral-500 max-w-2xl mx-auto">
                Transform your ideas into engaging content with our AI writer. Generate
                professional posts that drive engagement and grow your network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleToolSelect(item.value)}
                  className={cn(
                    "flex flex-col items-center p-8 rounded-xl",
                    "bg-white border-2 border-transparent",
                    "transition-all duration-300 group",
                    "hover:shadow-[0_0_30px_rgba(0,0,0,0.05)]",
                    "relative overflow-hidden"
                  )}
                  style={{
                    '--tool-color': toolColors[item.value].main,
                    '--tool-light': toolColors[item.value].light,
                  } as React.CSSProperties}
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ backgroundColor: toolColors[item.value].light }} />

                  {/* Icon container */}
                  <div className={cn(
                    "relative mb-6 rounded-xl p-4",
                    "transition-all duration-300 group-hover:scale-110",
                    "bg-opacity-0 group-hover:bg-opacity-100"
                  )}
                  style={{ backgroundColor: toolColors[item.value].light }}>
                    <item.icon 
                      className="size-8 transition-colors duration-300"
                      style={{ color: toolColors[item.value].main }}
                    />
                  </div>

                  {/* Text content */}
                  <div className="relative text-center">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--tool-color)] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-neutral-500 transition-colors group-hover:text-neutral-600">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom border indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                       style={{ backgroundColor: toolColors[item.value].main }} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Tool Content Page
          <div className="max-w-[1200px] mx-auto space-y-8">
            <button
              onClick={() => setSelectedTool(null)}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-all"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Tools</span>
            </button>

            <div className="pt-2">
              {selectedTool === "write" && (
                <ViralPostGenerator
                  contentInputProps={{
                    contentSource,
                    isGenerating: isGeneratingLinkedinPosts,
                    handleGenerate: handleGenerateLinkedIn,
                    handleTextChange: handleLocalTextChange,
                    setContent,
                    isGeneratingLinkedinPosts,
                    handleGenerateLinkedIn,
                    handleLinkedInTextChange,
                    content,
                    postTone,
                    setPostTone,
                  }}
                  previewProps={{
                    isGenerating: isGeneratingLinkedinPosts,
                    generatedPost,
                    title: "AI Generated LinkedIn Post"
                  }}
                />
              )}

              {selectedTool === "ideas" && (
                <ContentIdeas
                  loading={loading}
                  ideas={ideas}
                  handleGenerateTopic={handleGenerateIdeas}
                  handleTopicSelect={handleTopicSelect}
                />
              )}

              {selectedTool === "pdf" && <PDFToPost />}
              {selectedTool === "youtube" && <YouTubeToPost />}
              {selectedTool === "article" && <ArticleToPost />}
              {selectedTool === "format" && <FormatContent />}
            </div>
          </div>
        )}
      </div>

      {/* Ref for scrolling */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ContentCreationTools;
