"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { AIWritingPreview } from "@/components/content-create/AIWritingPreview";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentIdeas } from "@/components/content-create/ContentIdeas";
import { Lightbulb, Pencil, Zap } from "lucide-react";
import { useGenerateContentIdeas } from "@/hooks/useGenerateLinkedInPosts";

const tabItems = [
  {
    value: "write",
    icon: <Pencil className="h-4 w-4" />,
    label: "Write Content",
    description: "Create your content with AI assistance",
    activeGradient: "from-blue-500/10 via-indigo-500/10 to-purple-500/10",
    iconGradient: "from-blue-500/20 to-indigo-500/20",
    activeColor: "text-blue-700",
    bgGlow: "bg-blue-500/5",
  },
  {
    value: "ideas",
    icon: <Lightbulb className="h-4 w-4" />,
    label: "Get Ideas",
    description: "Generate creative content ideas",
    activeGradient: "from-amber-500/10 via-orange-500/10 to-yellow-500/10",
    iconGradient: "from-amber-500/20 to-orange-500/20",
    activeColor: "text-amber-700",
    bgGlow: "bg-amber-500/5",
  },
];

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

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {/* Centered Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm mb-4">
            <Zap className="h-4 w-4" />
            AI-Powered Writing
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            What <span className="text-primary">Viral Post</span> Would You Like
            to Create?
          </h1>
          <p className="text-lg text-gray-500">
            Transform your ideas into engaging content with{" "}
            <span className="text-primary">AI-powered</span> assistance
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col gap-4 mb-12">
            <TabsList
              className="relative w-fit mx-auto grid grid-cols-2 gap-2 p-1 h-[72px]
                               bg-gray-50/50 backdrop-blur-sm rounded-xl"
            >
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className={`
                    relative group px-4 py-2.5 rounded-xl flex items-center gap-2
                    min-w-[220px] transition-all duration-200
                    ${
                      item.value === activeTab
                        ? "shadow-lg scale-[1.02] ring-1 ring-black/5"
                        : "hover:bg-white/50"
                    }
                  `}
                >
                  {/* Background Gradient for Active State */}
                  {item.value === activeTab && (
                    <div
                      className={`
                      absolute inset-0 rounded-xl bg-gradient-to-br ${item.activeGradient}
                      opacity-40
                    `}
                    />
                  )}

                  <div className="relative flex items-center gap-2.5">
                    <div
                      className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      transition-colors duration-200
                      ${
                        item.value === activeTab
                          ? `bg-gradient-to-br ${item.iconGradient} ${item.activeColor}`
                          : "bg-gray-100/50 text-gray-500"
                      }
                    `}
                    >
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <div
                        className={`text-sm font-medium 
                        ${
                          item.value === activeTab
                            ? item.activeColor
                            : "text-gray-500"
                        }
                      `}
                      >
                        {item.label}
                      </div>
                      <div
                        className={`text-xs 
                        ${
                          item.value === activeTab
                            ? "text-gray-600"
                            : "text-gray-400"
                        }
                      `}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.value === activeTab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl bg-white shadow-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {/* Left Column */}
            <div className="w-full">
              <TabsContent value="write" className="mt-0 border-none">
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
                  <div className="relative p-6">
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
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ideas" className="mt-0">
                <div className="relative overflow-hidden rounded-2xl  bg-white shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
                  <div className="relative">
                    <ContentIdeas
                      loading={loading}
                      ideas={ideas}
                      handleGenerateTopic={handleGenerateIdeas}
                      handleTopicSelect={handleTopicSelect}
                    />
                  </div>
                </div>
              </TabsContent>
            </div>

            {/* Right Column - Preview */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
                    <div className="relative p-6">
                      <AIWritingPreview
                        isGenerating={isGeneratingLinkedinPosts}
                        generatedPost={generatedPost}
                        title="AI Generated LinkedIn Post"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentCreationTools;
