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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update sidebar state when content or draft_id changes
  useEffect(() => {
    if (content || postDetails?.id) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [content, postDetails?.id]);

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
    <div className="flex h-screen ">
      {/* Main Content */}
      <div
        className={cn(
          "flex-1 relative transition-all duration-300",
          !isSidebarOpen ? "mr-0" : "lg:mr-[400px]"
        )}
      >
        <main className="h-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-6">
            <div
              className={cn(
                "w-[750px] space-y-10 transition-all duration-300",
                !isSidebarOpen && "translate-x-0"
              )}
            >
              {/* Title Section */}
              <div className="relative space-y-4">
                {/* AI Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-white/10 border border-primary/10 shadow-sm">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-xs font-medium bg-gradient-to-br from-primary to-primary bg-clip-text text-transparent">
                      AI-Powered Content Creation
                    </span>
                  </div>
                </div>

                {/* Main Title */}
                <div className="relative">
                  <div className="absolute inset-0 -top-10 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-3xl rounded-full" />
                  <h1 className="relative text-[38px] font-bold text-center leading-tight">
                    <span className="inline-block bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      What{" "}
                      <span className="inline-block bg-gradient-to-br from-primary via-primary to-primary-dark bg-clip-text text-transparent">
                        viral post
                      </span>{" "}
                      do you
                      <br />
                      want to create?
                    </span>
                  </h1>
                </div>

                {/* Subtitle */}
                <p className="relative text-gray-500 text-center text-lg">
                  Create engaging LinkedIn content that resonates with your
                  audience
                </p>

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full blur-3xl opacity-20" />
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
      />
    </div>
  );
};

export default ContentCreationTools;
