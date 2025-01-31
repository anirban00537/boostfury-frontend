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
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";

const ContentCreationTools: React.FC = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Get states from Redux
  const { linkedinProfile } = useSelector((state: RootState) => state.user);

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
    isLoadingDraft,
    isAutoSaving,
    draftId,
  } = useContentPosting();

  const {
    prompt,
    tone,
    handlePromptChange,
    handleGenerate,
    handleGeneratePersonalized,
    handleRewriteContent,
    setTone,
    isGenerating,
    isGeneratingPersonalized,
    isRewriting,
    postLength,
    setPostLength,
  } = useGenerateLinkedInPosts({
    onContentGenerated: (content: string, category?: string) => {
      handleContentChange(content, category);
    },
    currentPostId: postDetails?.id,
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

  const handlePromptChangeWithCategory = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    category?: string
  ) => {
    handlePromptChange(e, category);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-slate-100"
    >
      <div
        className={cn(
          "w-full min-h-[calc(100vh-148px)] flex justify-center transition-all duration-300",
          "px-4 lg:px-0",
          isSidebarCollapsed ? "lg:pr-[80px]" : "lg:pr-[400px]"
        )}
      >
        <div className="w-full lg:w-[550px] py-8">
          {isLoadingDraft && draftId ? (
            <div className="w-full lg:w-[650px] bg-white rounded-2xl border border-[#0A66C2]/10 shadow-[0_0_0_1px_rgba(10,102,194,0.1)] overflow-hidden">
              <LoadingSection className="min-h-[400px]" />
            </div>
          ) : (
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
                isGenerating={isGenerating}
                isGeneratingPersonalized={isGeneratingPersonalized}
                isRewriting={isRewriting}
                isAutoSaving={isAutoSaving}
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
                onRewriteContent={handleRewriteContent}
              />
            </motion.div>
          )}

          {/* Emoji Picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-20 right-4 lg:right-20 z-50 shadow-xl rounded-xl overflow-hidden border border-neutral-200/60 bg-white"
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

      {isLoadingDraft && draftId ? (
        <div
          className={cn(
            "h-full fixed right-0 top-0 bg-white shadow-[-1px_0_0_0_rgba(0,0,0,0.05)] z-10 transition-all duration-300 hidden lg:block",
            isSidebarCollapsed ? "w-[80px]" : "w-[380px]"
          )}
        >
          <LoadingSection className="min-h-screen" />
        </div>
      ) : (
        <StudioSidebar
          prompt={prompt}
          tone={tone}
          postLength={postLength}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
          handleGeneratePersonalized={handleGeneratePersonalized}
          handlePromptChange={handlePromptChangeWithCategory}
          setTone={setTone}
          setPostLength={setPostLength}
          isCollapsed={isSidebarCollapsed}
          onCollapse={setIsSidebarCollapsed}
        />
      )}
    </motion.div>
  );
};

export default ContentCreationTools;
