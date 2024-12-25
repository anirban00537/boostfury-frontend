"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { AIWritingPreview } from "@/components/content-create/AIWritingPreview";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentIdeas } from "@/components/content-create/ContentIdeas";
import { Lightbulb, Pencil, Sparkles } from "lucide-react";
import { useGenerateContentIdeas } from "@/hooks/useGenerateLinkedInPosts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TabItem {
  value: string;
  icon: LucideIcon;
  label: string;
}

const tabItems: TabItem[] = [
  {
    value: "write",
    icon: Pencil,
    label: "Viral Post Generator",
  },
  {
    value: "ideas",
    icon: Lightbulb,
    label: "Idea Generator",
  },
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ContentCreationTools: React.FC = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const [contentSource, setContentSource] = useState("plain-prompt");
  const [activeTab, setActiveTab] = useState("write");

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative px-4 sm:px-6 lg:px-8 py-12">
        {/* Centered Header */}
        <Header />

        {/* Content Area with Max Width */}
        <div className=" mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Tab List - Centered */}
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="relative">
                <TabsList className="w-[400px] grid grid-cols-2 p-0.5 bg-neutral-100/80 rounded-2xl">
                  {tabItems.map((item) => (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className={cn(
                        "relative flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-200",
                        "outline-none ring-0",
                        item.value === activeTab
                          ? [
                              "bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF]",
                              "text-white [&_*]:text-white",
                              "shadow-[0_2px_4px_rgba(10,102,194,0.2)]",
                              "border-none",
                            ].join(" ")
                          : "text-neutral-500 hover:text-neutral-700 hover:bg-white/40"
                      )}
                    >
                      <div className="size-4 flex items-center justify-center">
                        <item.icon className="size-3.5" />
                      </div>
                      <span className="text-[13px] font-medium">
                        {item.label}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Content Area */}
            <div
              className={cn(
                "grid gap-8",
                activeTab === "write"
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1"
              )}
            >
              <div className={activeTab === "ideas" ? "col-span-full" : ""}>
                <TabsContent value="write" className="mt-0">
                  <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    animate="visible"
                  >
                    <ContentInput
                      {...{
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
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="ideas" className="mt-0">
                  <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    animate="visible"
                  >
                    <ContentIdeas
                      loading={loading}
                      ideas={ideas}
                      handleGenerateTopic={handleGenerateIdeas}
                      handleTopicSelect={handleTopicSelect}
                    />
                  </motion.div>
                </TabsContent>
              </div>

              {activeTab === "write" && (
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      variants={fadeInUpVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      <AIWritingPreview
                        isGenerating={isGeneratingLinkedinPosts}
                        generatedPost={generatedPost}
                        title="AI Generated LinkedIn Post"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Ref for scrolling */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ContentCreationTools;
