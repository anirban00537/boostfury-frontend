"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useContentPosting } from "@/hooks/useContent";
import { ImageUploadModal } from "@/components/content-create/ImageUploadModal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ScheduleModal } from "@/components/content-create/ScheduleModal";
import { LinkedInEditor } from "@/components/studio/LinkedInEditor";
import { StudioSidebar } from "@/components/studio/StudioSidebar";

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
    <div className="relative min-h-screen bg-[#f3f2ef]">
      <div
        className={`w-full h-full flex justify-center transition-all duration-300 ${
          isEditorOpen ? "pr-[400px]" : ""
        }`}
      >
        <div className="w-[550px] py-8">
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

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute top-20 right-20 z-50">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}

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

      <StudioSidebar />
    </div>
  );
};

export default ContentCreationTools;
