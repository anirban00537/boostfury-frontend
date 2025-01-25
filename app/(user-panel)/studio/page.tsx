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
    handleGeneratePersonalized,
    setTone,
    isGenerating,
    postLength,
    setPostLength,
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
      <div
        className={cn(
          "w-full min-h-[calc(100vh-148px)] flex justify-center transition-all duration-300",
          isEditorOpen ? "pr-[400px]" : "pr-0"
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
              isGeneratingPersonalized={isGenerating}
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
              onGeneratePersonalized={handleGeneratePersonalized}
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
        handleGeneratePersonalized={handleGeneratePersonalized}
        setTone={setTone}
        postLength={postLength}
        setPostLength={setPostLength}
      />
    </motion.div>
  );
};

export default ContentCreationTools;
