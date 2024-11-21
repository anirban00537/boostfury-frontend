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
    activeGradient: "from-indigo-600/30 via-blue-600/30 to-sky-500/30",
    iconGradient: "from-indigo-600 to-blue-600",
    activeColor: "text-indigo-700",
    bgGlow: "bg-indigo-500/10",
    glowColor: "group-hover:shadow-indigo-500/20",
    ringColor: "group-hover:ring-indigo-500/20",
    dotColor: "bg-indigo-600"
  },
  {
    value: "ideas",
    icon: <Lightbulb className="h-4 w-4" />,
    label: "Get Ideas",
    description: "Generate creative content ideas",
    activeGradient: "from-amber-600/30 via-orange-500/30 to-yellow-500/30",
    iconGradient: "from-amber-600 to-orange-500",
    activeColor: "text-amber-700",
    bgGlow: "bg-amber-500/10",
    glowColor: "group-hover:shadow-amber-500/20",
    ringColor: "group-hover:ring-amber-500/20",
    dotColor: "bg-amber-600"
  }
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
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm mb-4">
            <Zap className="h-4 w-4" />
            AI-Powered Writing
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            What <span className="text-primary">Viral Post</span> Would You Like
            to Create?
          </h1>
          {/* <p className="text-lg text-gray-500">
            Transform your ideas into engaging content with{" "}
            <span className="text-primary">AI-powered</span> assistance
          </p> */}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col gap-4 mb-4">
            <div className="relative mx-auto px-3 py-2 w-full max-w-[800px]">
              <TabsList
                className="relative w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 
                h-auto sm:h-[80px] bg-white rounded-2xl p-2 ring-1 ring-gray-200/50"
              >
                {tabItems.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className={`
                      relative group px-4 sm:px-6 py-3 rounded-xl flex items-center gap-3
                      min-w-0 sm:min-w-[280px] transition-all duration-300
                      bg-white
                      ${
                        item.value === activeTab
                          ? "shadow-none scale-[1.02] ring-1 ring-gray-200/50"
                          : "hover:-translate-y-0.5 hover:bg-gray-50/50"
                      }
                    `}
                  >
                    {/* Fancy Background Effects */}
                    {item.value === activeTab && (
                      <>
                        <div
                          className={`
                          absolute inset-0 rounded-xl bg-gradient-to-br ${item.activeGradient}
                          opacity-100 transition-opacity duration-300
                        `}
                        />
                        <div className="absolute inset-0 rounded-xl bg-white/95" />

                        {/* Animated Corner Dots */}
                        <div
                          className={`absolute top-2 right-2 w-1 h-1 rounded-full ${item.dotColor} animate-pulse`}
                        />
                        <div
                          className={`absolute bottom-2 left-2 w-1 h-1 rounded-full ${item.dotColor} animate-pulse delay-75`}
                        />
                      </>
                    )}

                    <div className="relative flex items-center gap-2 sm:gap-3 w-full">
                      {/* Icon Container */}
                      <div
                        className={`
                          w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 
                          flex items-center justify-center
                          transition-all duration-300 group-hover:scale-105
                          ${
                            item.value === activeTab
                              ? `bg-gradient-to-br ${item.iconGradient} text-white 
                                shadow-lg shadow-${item.value === "write" ? "indigo" : "amber"}-500/30
                                ring-2 ring-white`
                              : "bg-gray-100 text-gray-500 group-hover:bg-gray-50 group-hover:shadow-md"
                          }
                        `}
                      >
                        <motion.div
                          animate={
                            item.value === activeTab
                              ? {
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, -5, 0],
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {item.icon}
                        </motion.div>
                      </div>

                      <div className="text-left min-w-0 flex-1">
                        <div className={`
                          text-sm font-semibold transition-colors duration-200
                          truncate
                          ${
                            item.value === activeTab
                              ? item.activeColor
                              : "text-gray-600 group-hover:text-gray-900"
                          }
                        `}>
                          {item.label}

                          {/* Active Indicator Dot */}
                          {item.value === activeTab && (
                            <span
                              className={`ml-2 inline-block w-1.5 h-1.5 rounded-full ${item.dotColor}`}
                            />
                          )}
                        </div>
                        <div className={`
                          text-xs transition-colors duration-200
                          truncate
                          ${
                            item.value === activeTab
                              ? "text-gray-600"
                              : "text-gray-400 group-hover:text-gray-500"
                          }
                        `}>
                          {item.description}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Active State Background */}
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative px-3">
            {/* Left Column */}
            <div className="w-full">
              <TabsContent value="write" className="mt-0 border-none">
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-md shadow-gray-100/50 hover:shadow-lg hover:shadow-gray-200/50 transition-shadow duration-200">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
                  <div className="relative ">
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
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-md shadow-gray-100/50 hover:shadow-lg hover:shadow-gray-200/50 transition-shadow duration-200">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
                  <div className="relative p-8">
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
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-slate-100 shadow-md shadow-gray-100/50 hover:shadow-lg hover:shadow-gray-200/50 transition-shadow duration-200">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
                    <div className="relative p-8">
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
