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
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Left Column - Input Section */}
          <div className="max-w-[800px] w-full mx-auto lg:mx-0">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
              {/* Gradient Backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-priamry/50 to-indigo-100/30" />
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />

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
              className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-priamry shadow-md 
                       flex items-center justify-center transform -translate-x-1/2 backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-primary to-primary 
                            flex items-center justify-center shadow-md"
              >
                <Sparkles className="w-5 h-5 text-white" />
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
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
                  {/* Gradient Backgrounds */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-priamry/50 to-indigo-100/30" />
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />

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
