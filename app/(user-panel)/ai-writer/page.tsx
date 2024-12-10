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
      <div className="max-w-[1600px] mx-auto ">
        <Header />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col gap-6 mb-8">
           <div className="relative mx-auto w-full max-w-[900px]">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-indigo-500/5 to-emerald-500/5 blur-3xl" />
              <TabsList className="relative w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-1.5 h-auto rounded-2xl p-1.5 bg-white/5 backdrop-blur-xl border border-black/5 shadow-md shadow-black/10">
                {tabItems.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className={`
                      relative group px-4 py-3 rounded-xl flex items-center gap-3
                      transition-all duration-500 outline-none
                      overflow-hidden isolate
                      ${
                        item.value === activeTab
                          ? "bg-white/90 text-zinc-900 shadow-lg shadow-black/20"
                          : "hover:bg-white/20 text-zinc-600 hover:text-zinc-900"
                      }
                    `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex items-center gap-3 w-full">
                      <div
                        className={`
                          flex items-center justify-center p-2 rounded-lg
                          transition-all duration-500 ease-out
                          ${
                            item.value === activeTab
                              ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20"
                              : "bg-white/5 text-zinc-400 group-hover:text-zinc-100 group-hover:bg-gradient-to-br group-hover:from-indigo-500/50 group-hover:to-violet-500/50"
                          }
                        `}
                      >
                        {item.icon}
                      </div>

                      <div className="text-left flex flex-col">
                        <div className="text-sm font-semibold tracking-tight">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-zinc-500 font-medium">
                          {item.description}
                        </div>
                      </div>

                      {item.value === activeTab && (
                        <motion.div
                          layoutId="active-tab-indicator"
                          className="absolute right-3 h-5 w-5 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 opacity-20"
                        />
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <div
            className={`grid ${
              activeTab === "write"
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            } gap-6 relative px-4`}
          >
            <div className={`${activeTab === "ideas" ? "col-span-full" : ""}`}>
              <TabsContent value="write" className="mt-0 border-none">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-xl border border-black/5  shadow-md shadow-black/20 ring-1 ring-black/5"
                >
                  <div className="absolute inset-0" />
                  <div className="relative">
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
                </motion.div>
              </TabsContent>

              <TabsContent value="ideas" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-xl border border-black/5 bg-white shadow-md shadow-black/20 ring-1 ring-black/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-transparent" />
                  <div className="relative">
                    <ContentIdeas
                      loading={loading}
                      ideas={ideas}
                      handleGenerateTopic={handleGenerateIdeas}
                      handleTopicSelect={handleTopicSelect}
                    />
                  </div>
                </motion.div>
              </TabsContent>
            </div>

            {activeTab === "write" && (
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-black/5 bg-zinc-50/50 shadow-md shadow-black/20 ring-1 ring-black/5">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
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
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentCreationTools;
