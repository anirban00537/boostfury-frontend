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
            <div className="relative overflow-hidden rounded-2xl 
                          border-t-gray-200/60 border-l-gray-200/60 
                          border-r-gray-300/70 border-b-gray-400/70 
                          shadow-[6px_6px_12px_rgba(0,0,0,0.1),_-2px_-2px_8px_rgba(255,255,255,0.9),_inset_1px_1px_1px_rgba(255,255,255,0.8),_inset_-1px_-1px_1px_rgba(0,0,0,0.05)] 
                          backdrop-blur-sm 
                          bg-gradient-to-br from-white/90 via-white/95 to-gray-100/90
                          hover:shadow-[8px_8px_16px_rgba(0,0,0,0.12),_-3px_-3px_12px_rgba(255,255,255,0.95),_inset_1px_1px_1px_rgba(255,255,255,0.8),_inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                          hover:translate-y-[-2px] hover:translate-x-[-1px]
                          active:translate-y-[1px] active:translate-x-[0px]
                          active:shadow-[4px_4px_8px_rgba(0,0,0,0.08),_-2px_-2px_8px_rgba(255,255,255,0.9),_inset_1px_1px_1px_rgba(255,255,255,0.8),_inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                          transition-all duration-300">
              {/* Main Background with 3D Gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#ffffff,#f8fafc,#f1f5f9)]" />
              
              {/* Subtle Color Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-indigo-50/10" />
              
              {/* Top Edge Highlight */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
              
              {/* Left Edge Highlight */}
              <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent opacity-80" />
              
              {/* Bottom Edge Shadow */}
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400/20 to-transparent" />
              
              {/* Right Edge Shadow */}
              <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gray-400/20 to-transparent" />
              
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-100/50 
                            shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(0,0,0,0.05)]" />
              
              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-5"
                   style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                     backgroundSize: '32px 32px'
                   }} />

              {/* Inner Shadow Overlay */}
              <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />

              {/* Content Container with Inner Padding Glow */}
              <div className="relative px-8 py-6 bg-gradient-to-b from-transparent via-white/20 to-transparent">
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
                <div className="relative overflow-hidden rounded-2xl 
                              border-t-gray-200/60 border-l-gray-200/60 
                              border-r-gray-300/70 border-b-gray-400/70 
                              shadow-[6px_6px_12px_rgba(0,0,0,0.1),_-2px_-2px_8px_rgba(255,255,255,0.9),_inset_1px_1px_1px_rgba(255,255,255,0.8),_inset_-1px_-1px_1px_rgba(0,0,0,0.05)] 
                              backdrop-blur-sm 
                              bg-gradient-to-br from-white/90 via-white/95 to-gray-100/90
                              hover:shadow-[8px_8px_16px_rgba(0,0,0,0.12),_-3px_-3px_12px_rgba(255,255,255,0.95),_inset_1px_1px_1px_rgba(255,255,255,0.8),_inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                              hover:translate-y-[-2px] hover:translate-x-[-1px]
                              active:translate-y-[1px] active:translate-x-[0px]
                              active:shadow-[4px_4px_8px_rgba(0,0,0,0.08),_-2px_-2px_8px_rgba(255,255,255,0.9),_inset_1px_1px_1px_rgba(255,255,255,0.8),_inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                              transition-all duration-300">
                  {/* Main Background with 3D Gradient */}
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,#ffffff,#f8fafc,#f1f5f9)]" />
                  
                  {/* Subtle Color Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-indigo-50/10" />
                  
                  {/* Top Edge Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                  
                  {/* Left Edge Highlight */}
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent opacity-80" />
                  
                  {/* Bottom Edge Shadow */}
                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400/20 to-transparent" />
                  
                  {/* Right Edge Shadow */}
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gray-400/20 to-transparent" />
                  
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-100/50 
                                shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(0,0,0,0.05)]" />
                  
                  {/* Subtle Pattern Overlay */}
                  <div className="absolute inset-0 opacity-5"
                       style={{
                         backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                         backgroundSize: '32px 32px'
                       }} />

                  {/* Inner Shadow Overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />

                  {/* Content Container with Inner Padding Glow */}
                  <div className="relative px-8 py-6 bg-gradient-to-b from-transparent via-white/20 to-transparent">
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
