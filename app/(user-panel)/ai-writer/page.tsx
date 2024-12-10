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

const tabItems = [
  {
    value: "write",
    icon: <Pencil className="h-4 w-4" />,
    label: "Viral Post Generator",
    description: "Create your content with AI assistance",
  },
  {
    value: "ideas",
    icon: <Lightbulb className="h-4 w-4" />,
    label: "Idea Generator",
    description: "Generate creative content ideas",
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
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto ">
        <Header />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab List */}
          <div className="flex flex-col gap-6 mb-16">
            <div className="relative mx-auto w-full max-w-3xl">
              <TabsList className="w-full grid grid-cols-2 gap-4 p-0 bg-transparent border-0">
                {tabItems.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className={cn(
                      "group relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300",
                      "bg-white border border-gray-100",
                      "data-[state=active]:border-primary/20 data-[state=active]:bg-gradient-to-br data-[state=active]:from-white data-[state=active]:to-primary/5",
                      "outline-none ring-0 hover:border-primary/10",
                      "hover:shadow-lg hover:-translate-y-0.5",
                      item.value === activeTab
                        ? "shadow-md"
                        : "hover:border-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "size-10 rounded-xl flex items-center justify-center transition-all duration-300",
                        "bg-gradient-to-br",
                        item.value === activeTab
                          ? "from-primary/20 to-primary/5 text-primary shadow-inner"
                          : "from-gray-50/80 to-white text-gray-400 group-hover:from-primary/10 group-hover:to-primary/5 group-hover:text-primary"
                      )}
                    >
                      {item.icon}
                    </div>

                    <div className="flex flex-col items-start text-left">
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors duration-300",
                          item.value === activeTab
                            ? "text-gray-900"
                            : "text-gray-600 group-hover:text-gray-900"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                        {item.description}
                      </span>
                    </div>

                    {/* Active indicator */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl border-2 border-primary/20 opacity-0 scale-105",
                        "transition-all duration-300",
                        item.value === activeTab && "opacity-100 scale-100"
                      )}
                    />
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

      {/* Ref for scrolling */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ContentCreationTools;
