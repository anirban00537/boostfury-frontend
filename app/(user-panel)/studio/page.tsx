"use client";
import React, { useState, ChangeEvent } from "react";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Pencil } from "lucide-react";
import StudioSidebar from "@/components/studio/StudioSidebar";
import PromptBox from "@/components/studio/PromptBox";
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

  // Content Management Hook
  const {
    content,
    handleContentChange,
    isCreatingDraft,
    isAutoSaving,
    postDetails,
    handlePostNow,
    isPosting,
    selectedProfile,
    isLoadingDraft,
    handleAddToQueue,
    isAddingToQueue,
    handleSchedule,
    isScheduling,
  } = useContentPosting();

  // AI Generation Hook
  const {
    prompt,
    tone,
    isGenerating,
    // Actions
    setPrompt,
    handlePromptChange,
    handleGenerate,
    setTone,
  } = useGenerateLinkedInPosts({
    onContentGenerated: handleContentChange,
  });

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

  // Create a new handler for input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  if (isLoadingDraft) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading draft...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 relative lg:mr-[400px]">
        <main className="h-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-6">
            <div className="w-[750px] space-y-10">
              {/* Title Section */}
              <div className="space-y-4">
                <h1 className="text-[48px] font-bold text-center leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  What <span className="text-primary">viral post</span> do you
                  <br />
                  want to create?
                </h1>
                <p className="text-gray-500 text-center text-lg">
                  Create engaging LinkedIn content that resonates with your
                  audience
                </p>
              </div>

              {/* PromptBox */}
              <div className="relative">
                <div className="absolute inset-0 -m-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-[32px] blur-2xl" />
                <div className="relative">
                  <PromptBox
                    prompt={prompt}
                    tone={tone}
                    postLength={postLength}
                    isGenerating={isGenerating}
                    onPromptChange={handlePromptChange}
                    onToneChange={setTone}
                    onPostLengthChange={setPostLength}
                    onGenerate={handleGenerate}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <StudioSidebar
        isCollapsed={!isSidebarOpen}
        setIsCollapsed={(collapsed) => setIsSidebarOpen(!collapsed)}
        linkedinProfile={linkedinProfile}
        onPostNow={() =>
          linkedinProfile?.id && handlePostNow(linkedinProfile.id)
        }
        onAddToQueue={() =>
          linkedinProfile?.id && handleAddToQueue(linkedinProfile.id)
        }
        onSchedule={(date) => linkedinProfile?.id && handleSchedule(date)}
        isPosting={isPosting}
        isAddingToQueue={isAddingToQueue}
        isScheduling={isScheduling}
        content={content || "Your generated content will appear here..."}
        isGenerating={isGenerating}
        status={getStatusString(postDetails?.status)}
        user={{
          id: String(userinfo?.id || ""),
          email: userinfo?.email || "",
          first_name: userinfo?.first_name || "",
          last_name: userinfo?.last_name || "",
          user_name: userinfo?.user_name || "",
          photo: userinfo?.photo || null,
        }}
        imageUrls={postDetails?.imageUrls}
        publishedAt={postDetails?.publishedAt || undefined}
        scheduledTime={postDetails?.scheduledTime || undefined}
      />
    </div>
  );
};

export default ContentCreationTools;
