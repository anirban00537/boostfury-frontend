"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Pencil } from "lucide-react";
import StudioSidebar from "@/components/studio/StudioSidebar";
import StudioNavbar from "@/components/studio/StudioNavbar";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { useContentPosting } from "@/hooks/useContent";
import { POST_STATUS } from "@/lib/core-constants";
import { toast } from "react-hot-toast";

const ContentCreationTools: React.FC = () => {
  const { linkedinProfile, userinfo } = useSelector(
    (state: RootState) => state.user
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [postLength, setPostLength] = useState<"short" | "medium" | "long">(
    "medium"
  );

  const {
    generatedPost,
    isGeneratingLinkedinPosts,
    handleGenerateLinkedIn,
    handleLinkedInTextChange,
    postTone,
    setPostTone,
  } = useGenerateLinkedInPosts();

  const {
    content,
    handleContentChange,
    handleGenerateContent,
    isCreatingDraft,
    isAutoSaving,
    postDetails,
    handlePostNow,
    isPosting,
    selectedProfile,
    isLoadingDraft,
    prompt,
    handlePromptChange,
    handleAddToQueue,
    isAddingToQueue,
    handleSchedule,
    isScheduling,
  } = useContentPosting();

  const getStatusString = (
    status: number | undefined
  ): "scheduled" | "draft" | "published" | "failed" => {
    switch (status) {
      case POST_STATUS.SCHEDULED:
        return "scheduled";
      case POST_STATUS.PUBLISHED:
        return "published";
      case POST_STATUS.FAILED:
        return "failed";
      case POST_STATUS.DRAFT:
      default:
        return "draft";
    }
  };

  if (isLoadingDraft) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading draft...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-200">
      <StudioSidebar
        isCollapsed={!isSidebarOpen}
        setIsCollapsed={(collapsed) => setIsSidebarOpen(!collapsed)}
        content={prompt}
        onContentChange={(e) => {
          handlePromptChange(e);
          handleLinkedInTextChange(e);
        }}
        onGenerate={async () => {
          if (!linkedinProfile) {
            toast.error("Please connect your LinkedIn account first");
            return;
          }
          await handleGenerateLinkedIn();
          if (generatedPost) {
            handleGenerateContent(generatedPost);
          }
        }}
        isGenerating={isGeneratingLinkedinPosts}
        tone={postTone}
        onToneChange={setPostTone}
        postLength={postLength}
        onPostLengthChange={setPostLength}
        linkedinProfile={linkedinProfile}
      />
      <div className="flex-1">
        <StudioNavbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onPostNow={() =>
            linkedinProfile?.id && handlePostNow(linkedinProfile.id)
          }
          onAddToQueue={() =>
            linkedinProfile?.id && handleAddToQueue(linkedinProfile.id)
          }
          onSchedule={(date) => linkedinProfile?.id && handleSchedule(date)}
          isPosting={isPosting}
          isAddingToQueue={isAddingToQueue}
          isAutoSaving={isAutoSaving}
          isScheduling={isScheduling}
        />
        <main className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="relative px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-xl mx-auto">
              <PostPreviewNotRedux
                content={
                  content || "Your generated content will appear here..."
                }
                isGenerating={isGeneratingLinkedinPosts}
                status={getStatusString(postDetails?.status)}
                linkedInProfile={selectedProfile || linkedinProfile}
                user={{
                  id: String(userinfo?.id || ""),
                  email: userinfo?.email || "",
                  first_name: userinfo?.first_name || "",
                  last_name: userinfo?.last_name || "",
                  user_name: userinfo?.user_name || "",
                  photo: userinfo?.photo || null,
                }}
                imageUrls={postDetails?.imageUrls || []}
                dropdownItems={[
                  {
                    label: "Post Now",
                    icon: <Pencil className="h-4 w-4" />,
                    onClick: () =>
                      linkedinProfile?.id && handlePostNow(linkedinProfile.id),
                  },
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentCreationTools;
