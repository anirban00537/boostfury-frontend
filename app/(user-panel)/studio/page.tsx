"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useContentPosting } from "@/hooks/useContent";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { ImageUploadModal } from "@/components/content-create/ImageUploadModal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ScheduleModal } from "@/components/content-create/ScheduleModal";
import { LinkedInEditor } from "@/components/studio/LinkedInEditor";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Wand2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ContentCreationTools: React.FC = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Get states from Redux
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const isEditorOpen = useSelector(
    (state: RootState) => state.content.isEditorOpen
  );

  // Get states and handlers from hooks
  const {
    content,
    postDetails,
    isPosting,
    isAddingToQueue,
    isScheduling,
    handlePostNow,
    handleAddToQueue,
    handleSchedule,
    handleContentChange,
    handleImageUpload,
    isUploading,
    handleImageDelete,
  } = useContentPosting();

  const {
    prompt,
    tone,
    handlePromptChange,
    handleGenerate,
    setTone,
    isGenerating,
  } = useGenerateLinkedInPosts({
    onContentGenerated: handleContentChange,
  });

  const handleEmojiSelect = (emoji: any) => {
    handleContentChange?.(content.slice(0, content.length) + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleImageUploadWithPostId = async (file: File) => {
    if (handleImageUpload) {
      const success = await handleImageUpload(file);
      if (success) {
        setIsImageModalOpen(false);
      }
      return success;
    }
    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-white"
    >
      {/* Modern Header */}
      <div className="relative border-b border-neutral-200/60 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="mx-auto px-8 py-8 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute -inset-3 bg-blue-500 opacity-20 blur-lg rounded-full" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20 ring-1 ring-blue-400/30">
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                    AI Post Studio
                  </h1>
                  <div className="w-2 h-2 rounded-full bg-neutral-200 mt-2" />
                  <span className="text-neutral-400 mt-2">v1.0</span>
                </div>
                <p className="text-[15px] text-neutral-500 font-medium">
                  Create engaging LinkedIn posts with AI-powered content
                  generation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/5 rounded-full border border-blue-100">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-medium text-blue-700">
                AI Powered
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full min-h-[calc(100vh-148px)] flex justify-center transition-all duration-300",
          isEditorOpen ? "pr-[400px]" : ""
        )}
      >
        <div className="w-[550px] py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LinkedInEditor
              content={content}
              linkedinProfile={linkedinProfile}
              postDetails={postDetails}
              isPosting={isPosting}
              isAddingToQueue={isAddingToQueue}
              isScheduling={isScheduling}
              onContentChange={handleContentChange}
              onImageUpload={() => setIsImageModalOpen(true)}
              onEmojiPickerToggle={() => setShowEmojiPicker(!showEmojiPicker)}
              onSchedule={() => setIsScheduleModalOpen(true)}
              onAddToQueue={() =>
                linkedinProfile?.id && handleAddToQueue(linkedinProfile.id)
              }
              onPostNow={() =>
                linkedinProfile?.id && handlePostNow(linkedinProfile.id)
              }
              onImageDelete={handleImageDelete}
            />
          </motion.div>

          {/* Emoji Picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-20 right-20 z-50 shadow-xl rounded-xl overflow-hidden border border-neutral-200/60 bg-white"
              >
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modals */}
          <ImageUploadModal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            onUpload={handleImageUploadWithPostId}
            isUploading={isUploading}
          />
          <ScheduleModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            onSchedule={handleSchedule}
            isScheduling={isScheduling}
          />
        </div>
      </div>

      <StudioSidebar
        prompt={prompt}
        tone={tone}
        isGenerating={isGenerating}
        handlePromptChange={handlePromptChange}
        handleGenerate={handleGenerate}
        setTone={setTone}
      />
    </motion.div>
  );
};

export default ContentCreationTools;
