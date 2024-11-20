"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { AIWritingPreview } from "@/components/content-create/AIWritingPreview";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentIdeas } from "@/components/content-create/ContentIdeas";
import { Lightbulb, Pencil } from "lucide-react";
import { useGenerateContentIdeas } from "@/hooks/useGenerateLinkedInPosts";

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
      console.error('Error generating ideas:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-6">
            <TabsTrigger value="write" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Write Content
            </TabsTrigger>
            <TabsTrigger value="ideas" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Get Ideas
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {/* Left Column */}
            <div className="max-w-[800px] w-full mx-auto lg:mx-0">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
                <div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative px-8 py-6">
                  <TabsContent value="write" className="mt-0">
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
                  </TabsContent>

                  <TabsContent value="ideas" className="mt-0">
                    <ContentIdeas
                      loading={loading}
                      ideas={ideas}
                      handleGenerateTopic={handleGenerateIdeas}
                      handleTopicSelect={handleTopicSelect}
                    />
                  </TabsContent>
                </div>
              </div>
            </div>

            {/* Right Column - Preview Section */}
            <div className="max-w-[800px] w-full mx-auto lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
                    <div
                      className="absolute inset-0 opacity-[0.02]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                        backgroundSize: "24px 24px",
                      }}
                    />

                    <div className="relative px-8 py-6">
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
