import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createDraft,
  getPosts,
  getDraftPostDetails,
  postNow,
  schedulePost,
  deletePost,
  uploadImage,
  deleteImage,
  reorderImages,
  getScheduledQueue,
  addToQueue,
  shuffleQueue,
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
  LinkedInPostImage,
  UploadImageResponse,
} from "@/types/post";
import { toast } from "react-hot-toast";
import { useState, useCallback, useEffect } from "react";
import { POST_STATUS } from "@/lib/core-constants";
import { useRouter, useSearchParams } from "next/navigation";
import { processApiResponse } from "@/lib/functions";
import debounce from "lodash/debounce";
import { AxiosResponse } from "axios";

interface DraftResponse {
  success: boolean;
  message: string;
  data: {
    post: {
      id: string;
      content: string;
      linkedInProfileId: string;
    };
  };
}

// Define the response types
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface UploadImageData {
  image: LinkedInPostImage;
}

interface DeleteImageData {
  success: boolean;
}

// Define the variables type
type UploadImageVariables = {
  file: File;
  postId: string;
};

// Define response types
interface DeleteImageResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
  };
}

// Define variable types
type DeleteImageVariables = {
  postId: string;
  imageId: string;
};

// Define response type for reorder
interface ReorderImagesResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
  };
}

// Define variable type for reorder
type ReorderImagesVariables = {
  postId: string;
  imageIds: string[];
};

export const useContentPosting = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const draftId = searchParams?.get("draft_id");
  const { linkedinProfile } = useSelector((state: RootState) => state.user);

  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [selectedProfile, setSelectedProfile] =
    useState<LinkedInProfileUI | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Add new states for future fields
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [imageOrder, setImageOrder] = useState<string[]>([]);
  const [images, setImages] = useState<LinkedInPostImage[]>([]);

  // Add new state for prompt
  const [prompt, setPrompt] = useState("");

  const queryClient = useQueryClient();

  // First, declare the mutation
  const { mutateAsync: createUpdateDraftMutation, isLoading: isCreatingDraft } =
    useMutation<DraftResponse, Error, CreateDraftPostType>({
      mutationFn: createDraft,
    });

  // Single declaration of debouncedSaveDraft
  const debouncedSaveDraft = useCallback(
    debounce(async (draftData: Omit<CreateDraftPostType, "id">) => {
      console.log("debouncedSaveDraft called with:", draftData);

      if (!linkedinProfile?.id) {
        console.log("Aborting save: No linkedin profile");
        return;
      }
      if (!draftData.linkedInProfileId) {
        console.log("Aborting save: No linkedin profile");
        return;
      }
      if (!draftId) {
        console.log("Aborting save: No draft ID");
        return;
      }

      try {
        console.log("Starting auto-save...");
        setIsAutoSaving(true);

        const saveData = {
          ...draftData,
          linkedInProfileId: linkedinProfile.id,
          id: draftId,
        };
        console.log("Saving draft with data:", saveData);

        const response = await createUpdateDraftMutation(saveData);
        processApiResponse(response);
      } catch (error) {
        console.error("Auto-save error:", error);
      } finally {
        setIsAutoSaving(false);
        console.log("Auto-save complete");
      }
    }, 1500),
    [linkedinProfile?.id, createUpdateDraftMutation, draftId]
  );

  const { isLoading: isLoadingDraft } = useQuery(
    ["draftDetails", draftId],
    () => getDraftPostDetails(draftId || ""),
    {
      enabled: !!draftId && !!linkedinProfile?.id,
      onSuccess: (response) => {
        if (response.success && response.data.post) {
          const post = response.data.post;

          // Set all the state values
          setContent(post.content || "");
          setPostDetails(post);
          setImageUrls(post.imageUrls || []);
          setVideoUrl(post.videoUrl || "");
          setDocumentUrl(post.documentUrl || "");
          setHashtags(post.hashtags || []);
          setMentions(post.mentions || []);
          setImages(post.images || []);
          setScheduledDate(
            post.scheduledTime ? new Date(post.scheduledTime) : null
          );
          // Set the selected profile from the draft
          if (post.linkedInProfile) {
            setSelectedProfile({
              id: post.linkedInProfile.id,
              name: post.linkedInProfile.name,
              avatarUrl: post.linkedInProfile.avatarUrl,
              type: "linkedin",
              status: "connected",
            });
          }
        }
      },
      onError: (error) => {
        toast.error("Failed to fetch draft details");
        console.error("Error fetching draft:", error);
      },
    }
  );

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

  // Update upload mutation with correct types
  const { mutateAsync: uploadImageMutation, isLoading: isUploading } =
    useMutation<UploadImageResponse, Error, UploadImageVariables>(
      // First argument is the mutation function
      ({ file, postId }) => uploadImage(postId, file),
      // Second argument is the options object
      {
        onSuccess: (response) => {
          if (response.success) {
            const newImage = response.data.image;
            setImages((prev) => [...prev, newImage]);
            setImageUrls((prev) => [...prev, newImage.imageUrl]);
            toast.success("Image uploaded successfully");
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to upload image");
          console.error("Upload error:", error);
        },
      }
    );

  // Update delete mutation with proper typing
  const { mutateAsync: deleteImageMutation } = useMutation<
    DeleteImageResponse,
    Error,
    DeleteImageVariables,
    unknown
  >(
    async ({ postId, imageId }) => {
      const response = await deleteImage(postId, imageId);
      return response.data;
    },
    {
      onSuccess: async (response, variables) => {
        if (response.success) {
          // Remove image from local state
          setImages((prev) =>
            prev.filter((img) => img.id !== variables.imageId)
          );
          setImageUrls((prev) =>
            prev.filter((_, index) => images[index].id !== variables.imageId)
          );

          // Refetch post details to get updated image list
          if (draftId) {
            await queryClient.invalidateQueries(["draftDetails", draftId]);
          }

          toast.success("Image deleted successfully");
        }
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete image");
        console.error("Delete error:", error);
      },
    }
  );

  // Update reorder mutation with proper typing
  const { mutateAsync: reorderImagesMutation } = useMutation<
    ReorderImagesResponse,
    Error,
    ReorderImagesVariables,
    unknown
  >(
    // First argument is the mutation function
    async ({ postId, imageIds }) => {
      const response = await reorderImages(postId, imageIds);
      return response.data; // Extract the data from Axios response
    },
    // Second argument is the options object
    {
      onSuccess: (response, variables) => {
        if (response.success) {
          const { imageIds } = variables;
          const newImages = imageIds.map(
            (id) => images.find((img) => img.id === id)!
          );
          setImages(newImages);
          setImageUrls(newImages.map((img) => img.imageUrl));
        }
      },
      onError: (error) => {
        toast.error(error.message || "Failed to reorder images");
        console.error("Reorder error:", error);
      },
    }
  );

  // Keep the original handleCreateUpdateDraft
  const handleCreateUpdateDraft = useCallback(
    async (linkedinProfileId: string) => {
      if (isCreatingDraft) return;

      try {
        if (!linkedinProfile?.id) {
          toast.error("Please select a LinkedIn profile first");
          return null;
        }

        const draftData = {
          ...(draftId && { id: String(draftId) }),
          content: content.trim(),
          postType: "text" as const,
          linkedInProfileId: linkedinProfileId,
          videoUrl: "",
          documentUrl: "",
          hashtags: [] as string[],
          mentions: [] as string[],
        };

        const response = await createUpdateDraftMutation(draftData);
        processApiResponse(response);
        return response;
      } catch (error) {
        toast.error("Failed to save draft");
        console.error("Draft save error:", error);
        return null;
      }
    },
    [
      content,
      linkedinProfile?.id,
      createUpdateDraftMutation,
      draftId,
      isCreatingDraft,
    ]
  );

  // Add cleanup
  useEffect(() => {
    // Cleanup function to cancel any pending debounced saves
    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [debouncedSaveDraft]);

  // Handle content changes with automatic draft creation
  const handleContentChange = useCallback(
    async (newContent: string) => {
      setContent(newContent);

      // If we have a draft_id, use debounced save
      if (draftId && linkedinProfile?.id) {
        debouncedSaveDraft({
          content: newContent,
          postType: "text",
          linkedInProfileId: linkedinProfile.id,
        });
      }
      // If no draft_id, create a new draft
      else if (!draftId && linkedinProfile?.id && newContent.trim()) {
        try {
          const response = await createUpdateDraftMutation({
            content: newContent,
            postType: "text",
            linkedInProfileId: linkedinProfile.id,
          });

          if (response.success && response.data?.post?.id) {
            router.push(`/studio?draft_id=${response.data.post.id}`);
          }
        } catch (error) {
          console.error("Failed to create draft:", error);
        }
      }
    },
    [
      draftId,
      linkedinProfile?.id,
      createUpdateDraftMutation,
      router,
      debouncedSaveDraft,
    ]
  );

  // Handle prompt change
  const handlePromptChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
    },
    []
  );

  // Handle generated content with automatic draft creation
  const handleGenerateContent = useCallback(
    async (generatedContent: string) => {
      setContent(generatedContent);

      if (linkedinProfile?.id) {
        try {
          const draftData: CreateDraftPostType = {
            content: generatedContent,
            postType: "text" as const,
            linkedInProfileId: linkedinProfile.id,
            ...(draftId ? { id: draftId } : {}),
          };

          const response = await createUpdateDraftMutation(draftData);

          if (response.success && response.data?.post) {
            setPostDetails(response.data.post as Post);

            if (!draftId) {
              router.push(`/studio?draft_id=${response.data.post.id}`);
            }
          }
        } catch (error) {
          console.error("Failed to save generated content:", error);
          toast.error("Failed to save generated content");
        }
      }
    },
    [linkedinProfile?.id, createUpdateDraftMutation, router, draftId]
  );

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
          timezone: "Asia/Dhaka",
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
      linkedInProfileId,
      videoUrl = "",
      documentUrl = "",
      hashtags = [],
      mentions = [],
    }: CreateDraftParams) => {
      try {
        const response = await createUpdateDraftMutation({
          content,
          postType,
          linkedInProfileId: linkedInProfileId || null,
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
    [createUpdateDraftMutation]
  );

  const handlePostNow = useCallback(
    async (linkedinProfileId: string) => {
      try {
        if (!draftId) {
          toast.error("No draft found to publish");
          return;
        }

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

  // Effect to save draft on initial load and when dependencies change
  useEffect(() => {
    if (content.trim()) {
      debouncedSaveDraft({
        content: content,
        postType: "text",
        linkedInProfileId: selectedProfile?.id || "",
        videoUrl: "",
        documentUrl: documentUrl || "",
        hashtags: [],
        mentions: [],
      });
    }
  }, [content, selectedProfile?.id, imageUrls, documentUrl]);

  const handleImageUpload = useCallback(
    async (file: File, postId: string): Promise<boolean> => {
      try {
        await uploadImageMutation({ file, postId });
        return true;
      } catch (error) {
        return false;
      }
    },
    [uploadImageMutation]
  );

  const handleImageDelete = useCallback(
    async (postId: string, imageId: string) => {
      try {
        await deleteImageMutation({ postId, imageId });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    },
    [deleteImageMutation]
  );

  const handleImageReorder = useCallback(
    async (postId: string, imageIds: string[]) => {
      try {
        await reorderImagesMutation({ postId, imageIds });
      } catch (error) {
        console.error("Reorder error:", error);
        toast.error("Failed to reorder images");
      }
    },
    [reorderImagesMutation]
  );

  // Add this effect after your other effects
  useEffect(() => {
    if (!isLoadingDraft && draftId && selectedProfile?.id && content.trim()) {
      console.log("Content/Profile changed, saving draft");
      debouncedSaveDraft({
        content: content.trim(),
        postType: "text",
        linkedInProfileId: selectedProfile.id,
        videoUrl: videoUrl || "",
        documentUrl: documentUrl || "",
        hashtags: hashtags || [],
        mentions: mentions || [],
      });
    }
  }, [content, selectedProfile?.id, videoUrl, documentUrl, hashtags, mentions]);

  // Add effect specifically for profile selection
  useEffect(() => {
    if (draftId && selectedProfile?.id) {
      console.log("Profile selected, triggering save:", {
        profileId: selectedProfile.id,
        content,
      });

      debouncedSaveDraft({
        content: content || "", // Allow empty content
        postType: "text",
        linkedInProfileId: selectedProfile.id,
        videoUrl: videoUrl || "",
        documentUrl: documentUrl || "",
        hashtags: hashtags || [],
        mentions: mentions || [],
      });
    }
  }, [selectedProfile]); // Only trigger on profile changes

  // Add new mutation for adding to queue
  const { mutateAsync: addToQueueMutation, isLoading: isAddingToQueue } =
    useMutation({
      mutationFn: (postId: string) => addToQueue(postId, "Asia/Dhaka"),
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Post added to queue successfully!");
          router.push("/my-posts?tab=scheduled");
        } else {
          toast.error(response.message || "Failed to add post to queue");
        }
      },
      onError: (error: Error) => {
        toast.error(`Error adding post to queue: ${error.message}`);
        console.error("Queue error:", error);
      },
    });

  // Add new handler for adding to queue
  const handleAddToQueue = useCallback(
    async (linkedInProfileId: string) => {
      try {
        if (!draftId) {
          toast.error("No draft found to add to queue");
          return;
        }

        toast.loading("Adding post to queue...", { id: "queueing" });
        await addToQueueMutation(draftId);
        toast.dismiss("queueing");
        router.push("/my-posts?tab=scheduled");
      } catch (error) {
        console.error("Error in handleAddToQueue:", error);
        toast.error("Failed to add post to queue");
      }
    },
    [draftId, addToQueueMutation, router]
  );

  const { mutateAsync: shuffleQueueMutation, isLoading: isShuffling } =
    useMutation({
      mutationFn: () => shuffleQueue(),
      onSuccess: (response) => {
        if (response.success) {
          // Refetch the queue data to show updated order
          queryClient.invalidateQueries(["scheduledQueue"]);
        } else {
          toast.error(response.message || "Failed to shuffle queue");
        }
      },
      onError: (error: Error) => {
        toast.error(`Error shuffling queue: ${error.message}`);
        console.error("Shuffle error:", error);
      },
    });

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
    linkedinProfile,
    isAutoSaving,
    isScheduling,
    // Actions
    handleSchedule,
    postDetails,
    handleCreateDraftFromGenerated,
    handlePostNow,
    isPosting,
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
    handleImageUpload,
    handleImageDelete,
    handleImageReorder,
    isUploading,
    imageOrder,
    images,
    handleAddToQueue,
    isAddingToQueue,
    shuffleQueue: () => shuffleQueueMutation(linkedinProfile?.id || ""),
    isShuffling,
    // New content handling functions
    handleContentChange,
    handleGenerateContent,
    prompt,
    handlePromptChange,
  };
};

export const useContentManagement = () => {
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
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
    ["posts", linkedinProfile?.id, activeTab, pagination.currentPage],
    () =>
      getPosts({
        linkedInProfileId: linkedinProfile?.id || "",
        status: getStatusFromTab(activeTab),
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      }),
    {
      enabled: !!linkedinProfile?.id,
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
  const { mutateAsync: deletePostMutation, isLoading: isDeleting } =
    useMutation({
      mutationFn: (postId: string) => deletePost(postId),
      onSuccess: (response) => {
        processApiResponse(response);
      },
      onError: (error: Error) => {
        toast.error(`Error deleting post`);
        console.error("Deleting error:", error);
      },
    });

  const handleDeletePost = useCallback(
    async (postId: string) => {
      try {
        await deletePostMutation(postId);
        refetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    [deletePostMutation]
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
    handleDeletePost,
  };
};

export const useScheduledQueue = () => {
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  });

  const {
    data: queueData,
    isLoading: isLoadingQueue,
    refetch: refetchQueue,
  } = useQuery(
    ["scheduledQueue", linkedinProfile?.id, pagination.currentPage],
    () => {
      if (!linkedinProfile?.id) {
        throw new Error("No linkedin profile selected");
      }

      return getScheduledQueue({
        linkedInProfileId: linkedinProfile.id,
        status: POST_STATUS.SCHEDULED,
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      });
    },
    {
      enabled: !!linkedinProfile?.id,
      onError: (error) => {
        toast.error("Failed to fetch scheduled queue");
        console.error("Error fetching scheduled queue:", error);
      },
    }
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  }, []);

  return {
    queueData,
    isLoadingQueue,
    refetchQueue,
    pagination,
    handlePageChange,
  };
};
