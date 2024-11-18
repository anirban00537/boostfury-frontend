"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { AIWritingPreview } from "@/components/content-create/AIWritingPreview";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { Sparkles } from "lucide-react";

const ContentCreationTools: React.FC = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const [contentSource, setContentSource] = useState("plain-prompt");

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

  const handleLocalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
    handleLinkedInTextChange(e);
  };

  return (
    <div className="min-h-screen ">
      <Header />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Left Column - Input Section */}
          <div className="max-w-[800px] w-full mx-auto lg:mx-0">
            <div
              className="relative overflow-hidden rounded-2xl 
                          border border-gray-200
                          bg-white
                          shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                          hover:shadow-[0_16px_32px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.02)]
                          hover:translate-y-[-2px]
                          active:translate-y-[1px]
                          transition-all duration-300"
            >
              {/* Card Header Accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

              {/* Subtle Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Content */}
              <div className="relative px-8 py-6">
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
          </div>

          {/* Center Separator */}
          <div className="hidden lg:block absolute right-1/2 top-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="w-16 h-16 rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] 
                       flex items-center justify-center transform -translate-x-1/2 
                       border-4 border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 
                         flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Preview Section */}
          <div className="max-w-[800px] w-full mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <div
                  className="relative overflow-hidden rounded-2xl 
                              border border-gray-200
                              bg-white
                              shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                              hover:shadow-[0_16px_32px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.02)]
                              hover:translate-y-[-2px]
                              active:translate-y-[1px]
                              transition-all duration-300"
                >
                  {/* Card Header Accent */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

                  {/* Subtle Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Content */}
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
      </div>
    </div>
  );
};

export default ContentCreationTools;
