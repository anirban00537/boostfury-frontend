import { useMutation, useQuery } from "react-query";
import {
  createDraft,
  getPosts,
  getDraftPostDetails,
  postNow,
  schedulePost,
} from "@/services/content-posting";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  Post,
  PostGroup,
  PostType,
  PostTabId,
  CreateDraftParams,
  PaginationState,
  PostsResponse,
  CreateDraftPostType,
  LinkedInProfileUI,
  SchedulePostType,
} from "@/types/post";
import { toast } from "react-hot-toast";
import { useState, useCallback, useEffect } from "react";
import { POST_STATUS } from "@/lib/core-constants";
import { useRouter, useSearchParams } from "next/navigation";
import { processApiResponse } from "@/lib/functions";
import debounce from "lodash/debounce";

interface DraftResponse {
  success: boolean;
  message: string;
  data: {
    post: {
      id: number;
      content: string;
      // ... other post properties
    };
  };
}

export const useContentPosting = () => {
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft_id");
  const router = useRouter();

  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const { linkedinProfiles } = useSelector((state: RootState) => state.user);
  const [selectedProfile, setSelectedProfile] =
    useState<LinkedInProfileUI | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Add new states for future fields
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);

  useEffect(() => {
    if (postDetails?.linkedInProfile?.id) {
      // If post has a linked profile, find and set it
      const linkedProfile = linkedinProfiles.find(
        (profile) => profile.id === postDetails.linkedInProfile.id
      );
      if (linkedProfile) {
        setSelectedProfile(linkedProfile);
      }
    } else if (linkedinProfiles.length > 0 && !selectedProfile) {
      // Only set first profile if no profile is selected
      setSelectedProfile(linkedinProfiles[0]);
    }
  }, [linkedinProfiles, postDetails]);

  const { isLoading: isLoadingDraft } = useQuery(
    ["draftDetails", draftId],
    () => getDraftPostDetails(draftId || ""),
    {
      enabled: !!draftId,
      onSuccess: (response) => {
        if (response.success) {
          const post = response.data.post;

          // Set all available fields from the draft
          setContent(post.content);
          setPostDetails(post);

          // Set media fields
          if (post.imageUrls) {
            setImageUrls(post.imageUrls);
          }
          if (post.videoUrl) {
            setVideoUrl(post.videoUrl);
          }
          if (post.documentUrl) {
            setDocumentUrl(post.documentUrl);
          }

          // Set metadata fields
          if (post.hashtags) {
            setHashtags(post.hashtags);
          }
          if (post.mentions) {
            setMentions(post.mentions);
          }

          // Set LinkedIn profile if available
          if (post.linkedInProfile?.id) {
            const linkedProfile = linkedinProfiles.find(
              (profile) => profile.id === post.linkedInProfile.id
            );
            if (linkedProfile) {
              setSelectedProfile(linkedProfile);
            }
          }

          // Set scheduled date if available
          if (post.scheduledTime) {
            setScheduledDate(new Date(post.scheduledTime));
          }
        }
      },
      onError: (error) => {
        toast.error("Failed to fetch draft details");
        console.error("Error fetching draft:", error);
      },
    }
  );

  const { mutateAsync: createUpdateDraftMutation, isLoading: isCreatingDraft } =
    useMutation<DraftResponse, Error, CreateDraftPostType>({
      mutationFn: createDraft,
    });

  const { mutateAsync: postNowMutation, isLoading: isPosting } = useMutation({
    mutationFn: postNow,
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Post published successfully!");
        router.push("/my-posts?tab=published");
      } else {
        toast.error(response.message || "Failed to publish post");
      }
    },
    onError: (error: Error) => {
      toast.error(`Error publishing post: ${error.message}`);
      console.error("Posting error:", error);
    },
  });

  const { mutateAsync: schedulePostMutation, isLoading: isScheduling } =
    useMutation({
      mutationFn: ({
        postId,
        scheduleData,
      }: {
        postId: string;
        scheduleData: SchedulePostType;
      }) => schedulePost(postId, scheduleData),
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Post scheduled successfully!");
          router.push("/my-posts?tab=scheduled");
        } else {
          toast.error(response.message || "Failed to schedule post");
        }
      },
      onError: (error: Error) => {
        toast.error(`Error scheduling post: ${error.message}`);
        console.error("Scheduling error:", error);
      },
    });

  // Keep the original handleCreateUpdateDraft
  const handleCreateUpdateDraft = useCallback(
    async (linkedinProfileId: number) => {
      if (isCreatingDraft) return;

      try {
        if (!currentWorkspace?.id) {
          toast.error("Please select a workspace first");
          return null;
        }

        if (!content.trim()) {
          toast.error("Content cannot be empty");
          return null;
        }

        const draftData = {
          ...(draftId && { id: Number(draftId) }),
          content: content.trim(),
          postType: "text" as const,
          workspaceId: currentWorkspace.id,
          linkedInProfileId: linkedinProfileId,
          imageUrls: [] as string[],
          videoUrl: "",
          documentUrl: "",
          hashtags: [] as string[],
          mentions: [] as string[],
        };

        const response = await createUpdateDraftMutation(draftData);
        processApiResponse(response);

        if (!draftId && response.data?.post?.id) {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("draft_id", response.data.post.id.toString());
          window.history.replaceState({}, "", newUrl.toString());
        }

        return response;
      } catch (error) {
        toast.error("Failed to save draft");
        console.error("Draft save error:", error);
        return null;
      }
    },
    [
      content,
      currentWorkspace?.id,
      createUpdateDraftMutation,
      draftId,
      isCreatingDraft,
    ]
  );

  // Modify debouncedSaveDraft to accept full draft data
  const debouncedSaveDraft = useCallback(
    debounce(async (draftData: Omit<CreateDraftPostType, "workspaceId">) => {
      if (
        !draftData.content.trim() ||
        !currentWorkspace?.id ||
        !draftData.linkedInProfileId
      )
        return;

      try {
        setIsAutoSaving(true);
        const response = await createUpdateDraftMutation({
          ...draftData,
          workspaceId: currentWorkspace.id,
          ...(draftId && { id: Number(draftId) }),
        });

        if (!draftId && response.data?.post?.id) {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("draft_id", response.data.post.id.toString());
          window.history.replaceState({}, "", newUrl.toString());
        }
      } catch (error) {
        console.error("Auto-save error:", error);
      } finally {
        setIsAutoSaving(false);
      }
    }, 1500),
    [currentWorkspace?.id, createUpdateDraftMutation, draftId]
  );

  // Watch for changes in any draft-related field
  useEffect(() => {
    if (!selectedProfile?.id) return;

    const draftData = {
      content: content.trim(),
      postType: "text" as const,
      linkedInProfileId: selectedProfile.id,
      imageUrls,
      videoUrl,
      documentUrl,
      hashtags,
      mentions,
    };

    debouncedSaveDraft(draftData);
  }, [
    content,
    selectedProfile?.id,
    imageUrls,
    videoUrl,
    documentUrl,
    hashtags,
    mentions,
    debouncedSaveDraft,
  ]);

  // Modify handleContentChange to only update content
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  // Add handlers for other fields
  const handleImageUrlsChange = useCallback((urls: string[]) => {
    setImageUrls(urls);
  }, []);

  const handleVideoUrlChange = useCallback((url: string) => {
    setVideoUrl(url);
  }, []);

  const handleDocumentUrlChange = useCallback((url: string) => {
    setDocumentUrl(url);
  }, []);

  const handleHashtagsChange = useCallback((tags: string[]) => {
    setHashtags(tags);
  }, []);

  const handleMentionsChange = useCallback((newMentions: string[]) => {
    setMentions(newMentions);
  }, []);

  const handleSchedule = useCallback(
    async (date: Date) => {
      try {
        if (!draftId) {
          toast.error("No draft found to schedule");
          return;
        }

        if (!selectedProfile?.id) {
          toast.error("Please select a LinkedIn profile");
          return;
        }

        // Show scheduling feedback
        toast.loading("Scheduling post...", { id: "scheduling" });

        const scheduleData = {
          scheduledTime: date.toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        await schedulePostMutation({
          postId: draftId,
          scheduleData,
        });

        setScheduledDate(date);
        setIsScheduleModalOpen(false);
        toast.dismiss("scheduling");
      } catch (error) {
        console.error("Error in handleSchedule:", error);
        toast.error("Failed to schedule post");
      }
    },
    [
      draftId,
      selectedProfile?.id,
      schedulePostMutation,
      handleCreateUpdateDraft,
    ]
  );

  const handleCreateDraftFromGenerated = useCallback(
    async ({
      content,
      postType = "text",
      workspaceId = currentWorkspace?.id,
      linkedInProfileId,
      imageUrls = [],
      videoUrl = "",
      documentUrl = "",
      hashtags = [],
      mentions = [],
    }: CreateDraftParams) => {
      if (!workspaceId) {
        toast.error("Please select a workspace first");
        return null;
      }

      if (!content.trim()) {
        toast.error("Please add some content first");
        return null;
      }

      try {
        const response = await createUpdateDraftMutation({
          content,
          postType,
          workspaceId,
          linkedInProfileId: linkedInProfileId || null,
          imageUrls,
          videoUrl,
          documentUrl,
          hashtags,
          mentions,
        });
        if (!response.success) {
          toast.error(response.message || "Failed to save draft");
        }

        return response.data?.post?.id;
      } catch (error) {
        toast.error("Failed to save draft");
        console.error("Draft save error:", error);
        return null;
      }
    },
    [currentWorkspace?.id, createUpdateDraftMutation]
  );

  const handlePostNow = useCallback(
    async (linkedinProfileId: number) => {
      try {
        if (!draftId) {
          toast.error("No draft found to publish");
          return;
        }

        // First save the draft
        // const savedDraft = await handleCreateUpdateDraft(linkedinProfileId);
        // if (!savedDraft?.success) {
        //   toast.error("Failed to save draft before publishing");
        //   return;
        // }

        // Show posting feedback
        toast.loading("Publishing post...", { id: "posting" });

        await postNowMutation(draftId);

        // Success toast will be shown by postNowMutation's onSuccess handler
        toast.dismiss("posting");
      } catch (error) {
        console.error("Error in handlePostNow:", error);
        toast.error("Failed to publish post");
      }
    },
    [draftId, postNowMutation, handleCreateUpdateDraft]
  );

  const clearSelectedProfile = useCallback(() => {
    setSelectedProfile(null);
  }, []);

  return {
    // State
    content,
    setContent: handleContentChange,
    isGenerating,
    setIsGenerating,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    scheduledDate,
    isCreatingDraft,
    isLoadingDraft,
    isEditing: !!draftId,
    selectedProfile,
    linkedinProfiles,
    isAutoSaving,
    isScheduling,
    // Actions
    handleSchedule,
    postDetails,
    handleCreateDraftFromGenerated,
    handlePostNow,
    isPosting,
    setSelectedProfile,
    clearSelectedProfile,
    handleCreateUpdateDraft,
    // Add new state and handlers
    imageUrls,
    videoUrl,
    documentUrl,
    hashtags,
    mentions,
    handleImageUrlsChange,
    handleVideoUrlChange,
    handleDocumentUrlChange,
    handleHashtagsChange,
    handleMentionsChange,
  };
};

export const useContentManagement = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState<PostTabId>("scheduled");
  const [postsData, setPostsData] = useState<Record<PostTabId, PostGroup[]>>({
    scheduled: [],
    draft: [],
    published: [],
    failed: [],
  });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  });

  // Map tab ID to status number
  const getStatusFromTab = (tab: PostTabId): PostType => {
    const statusMap: Record<PostTabId, PostType> = {
      draft: POST_STATUS.DRAFT,
      scheduled: POST_STATUS.SCHEDULED,
      published: POST_STATUS.PUBLISHED,
      failed: POST_STATUS.FAILED,
    };
    return statusMap[tab];
  };

  // Query for fetching posts
  const {
    data,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
  } = useQuery<PostsResponse>(
    ["posts", currentWorkspace?.id, activeTab, pagination.currentPage],
    () =>
      getPosts({
        workspace_id: currentWorkspace?.id || 0,
        status: getStatusFromTab(activeTab),
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      }),
    {
      enabled: !!currentWorkspace?.id,
      onSuccess: (response) => {
        setPostsData((prev) => ({
          ...prev,
          [activeTab]: organizePostsByDate(response.data.posts),
        }));
        setPagination(response.data.pagination);
      },
      onError: (error) => {
        toast.error("Failed to fetch posts");
        console.error("Error fetching posts:", error);
      },
    }
  );

  // Helper function to organize posts by date
  const organizePostsByDate = (posts: Post[]): PostGroup[] => {
    if (!Array.isArray(posts)) return [];

    const grouped = posts.reduce((acc: Record<string, Post[]>, post) => {
      const date = getPostDate(post);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        ...post,
        scheduledTime: post.scheduledTime,
        content: post.content,
        status: post.status,
      });
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, posts]) => ({
      date,
      posts,
    }));
  };

  // Helper function to get relevant date from post
  const getPostDate = (post: Post): string => {
    if (post.publishedAt)
      return new Date(post.publishedAt).toLocaleDateString();
    if (post.scheduledTime)
      return new Date(post.scheduledTime).toLocaleDateString();
    return "No Date";
  };

  const handleTabChange = useCallback((tab: PostTabId) => {
    setActiveTab(tab);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  }, []);

  return {
    activeTab,
    postsData,
    isLoadingPosts,
    handleTabChange,
    refetchPosts,
    pagination,
    handlePageChange,
  };
};
