"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Pencil, Sparkles } from "lucide-react";
import StudioSidebar from "@/components/studio/StudioSidebar";
import PromptBox from "@/components/studio/PromptBox";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { useContentPosting } from "@/hooks/useContent";
import { POST_STATUS } from "@/lib/core-constants";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

const ContentCreationTools: React.FC = () => {
  const { linkedinProfile, userinfo } = useSelector(
    (state: RootState) => state.user
  );
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

  // Initialize sidebar state based on content or draft_id
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Update sidebar state when content or draft_id changes

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
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div
        className={cn(
          "flex-1 relative transition-all duration-300",
          !isSidebarOpen ? "mr-0" : "lg:mr-[400px]"
        )}
      >
        <main className="h-screen overflow-y-auto hide-scrollbar">
          <div className="flex items-center justify-center min-h-screen p-6">
            <div
              className={cn(
                "max-w-[750px] w-full space-y-10 transition-all duration-300",
                !isSidebarOpen && "translate-x-0"
              )}
            >
              {/* Title Section */}
              <div className="relative space-y-6">
                {/* Main Title */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-indigo-500/10 to-purple-500/5 blur-3xl rounded-full opacity-80" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/20 to-purple-500/10 blur-2xl rounded-full opacity-50 animate-pulse" />
                  <h1 className="relative text-[38px] font-bold text-center leading-tight tracking-tight">
                    <span className="inline-block bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      Create your viral{" "}
                      <span className="inline-block bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative group">
                        Linkedin post
                        <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </span>{" "}
                      with AI
                    </span>
                  </h1>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse delay-150" />
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
        content={content}
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
        onContentChange={handleContentChange}
      />
    </div>
  );
};

export default ContentCreationTools;
