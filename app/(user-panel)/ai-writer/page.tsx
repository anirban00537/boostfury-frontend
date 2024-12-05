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
        <Header />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col gap-4 mb-4">
            <div className="relative mx-auto px-3 py-2 w-full max-w-[800px]">
              <TabsList
                className="relative w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-0.5 
                  h-auto bg-gray-100 rounded-lg p-1"
              >
                {tabItems.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className={`
                      relative group px-3 py-2 rounded-md flex items-center gap-2
                      transition-all duration-200 outline-none
                      ${
                        item.value === activeTab
                          ? "bg-white text-gray-900 shadow-sm"
                          : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    <div className="relative flex items-center gap-2 w-full">
                      <div
                        className={`
                          flex items-center justify-center
                          transition-colors duration-200
                          ${
                            item.value === activeTab
                              ? "text-green-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          }
                        `}
                      >
                        {item.icon}
                      </div>

                      <div className="text-left min-w-0 flex-1">
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </div>
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
