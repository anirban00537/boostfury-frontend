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
import { generateContentIdeasForWorkspace } from "@/services/ai-content";
import { AxiosResponse } from "axios";

interface DraftResponse {
  success: boolean;
  message: string;
  data: {
    post: {
      id: string;
      content: string;
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
  const [imageOrder, setImageOrder] = useState<string[]>([]);
  const [images, setImages] = useState<LinkedInPostImage[]>([]);

  const queryClient = useQueryClient();

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

  // Update upload mutation with correct types
  const { mutateAsync: uploadImageMutation, isLoading: isUploading } = useMutation<
    UploadImageResponse,
    Error,
    UploadImageVariables
  >(
    // First argument is the mutation function
    ({ file, postId }) => uploadImage(postId, file),
    // Second argument is the options object
    {
      onSuccess: (response) => {
        if (response.success) {
          const newImage = response.data.image;
          setImages(prev => [...prev, newImage]);
          setImageUrls(prev => [...prev, newImage.imageUrl]);
          toast.success('Image uploaded successfully');
        }
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to upload image');
        console.error('Upload error:', error);
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
          setImages(prev => prev.filter(img => img.id !== variables.imageId));
          setImageUrls(prev => 
            prev.filter((_, index) => images[index].id !== variables.imageId)
          );
          
          // Refetch post details to get updated image list
          if (draftId) {
            await queryClient.invalidateQueries(["draftDetails", draftId]);
          }
          
          toast.success('Image deleted successfully');
        }
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete image');
        console.error('Delete error:', error);
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
          const newImages = imageIds.map(id => 
            images.find(img => img.id === id)!
          );
          setImages(newImages);
          setImageUrls(newImages.map(img => img.imageUrl));
        }
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to reorder images');
        console.error('Reorder error:', error);
      },
    }
  );



  // Keep the original handleCreateUpdateDraft
  const handleCreateUpdateDraft = useCallback(
    async (linkedinProfileId: string) => {
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
          ...(draftId && { id: String(draftId) }),
          content: content.trim(),
          postType: "text" as const,
          workspaceId: currentWorkspace.id,
          linkedInProfileId: linkedinProfileId,
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

  // Create debounced function
  const debouncedSaveDraft = useCallback(
    debounce(async (draftData: Omit<CreateDraftPostType, "workspaceId">) => {
      if (
        !draftData.content.trim() ||
        !currentWorkspace?.id ||
        !draftData.linkedInProfileId ||
        !draftId
      )
        return;

      try {
        setIsAutoSaving(true);
        const response = await createUpdateDraftMutation({
          ...draftData,
          workspaceId: currentWorkspace.id,
          id: draftId,
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

  // Add cleanup
  useEffect(() => {
    // Cleanup function to cancel any pending debounced saves
    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [debouncedSaveDraft]);

  // Handle content change
  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent);

      // Only trigger debounced save if we have a draftId
      if (draftId && selectedProfile?.id) {
        debouncedSaveDraft({
          content: newContent,
          postType: "text",
          linkedInProfileId: selectedProfile.id,
          videoUrl,
          documentUrl,
          hashtags,
          mentions,
        });
      }
    },
    [
      debouncedSaveDraft,
      selectedProfile?.id,
      draftId,
      imageUrls,
      videoUrl,
      documentUrl,
      hashtags,
      mentions,
    ]
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
      videoUrl = "",
      documentUrl = "",
      hashtags = [],
      mentions = [],
    }: CreateDraftParams) => {
      if (!workspaceId) {
        toast.error("Please select a workspace first");
        return null;
      }

      try {
        const response = await createUpdateDraftMutation({
          content,
          postType,
          workspaceId,
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
    [currentWorkspace?.id, createUpdateDraftMutation]
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
    if (selectedProfile?.id && content.trim()) {
      debouncedSaveDraft({
        content: content,
        postType: "text",
        linkedInProfileId: selectedProfile.id,
        videoUrl: "",
        documentUrl: documentUrl || "",
        hashtags: [],
        mentions: [],
      });
    }
  }, [
    content,
    selectedProfile?.id,
    imageUrls,
    documentUrl,
  ]);

  const handleImageUpload = useCallback(async (file: File, postId: string): Promise<boolean> => {
    try {
      await uploadImageMutation({ file, postId });
      return true;
    } catch (error) {
      return false;
    }
  }, [uploadImageMutation]);

  const handleImageDelete = useCallback(async (postId: string, imageId: string) => {
    try {
      await deleteImageMutation({ postId, imageId });
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }, [deleteImageMutation]);

  const handleImageReorder = useCallback(async (postId: string, imageIds: string[]) => {
    try {
      await reorderImagesMutation({ postId, imageIds });
    } catch (error) {
      console.error('Reorder error:', error);
      toast.error('Failed to reorder images');
    }
  }, [reorderImagesMutation]);

  // Add this effect after your other effects
  useEffect(() => {
    // Only trigger initial save if we have content and a profile
    if (draftId && selectedProfile?.id && content.trim()) {
      debouncedSaveDraft({
        content: content,
        postType: "text",
        linkedInProfileId: selectedProfile.id,
        videoUrl: videoUrl || "",
        documentUrl: documentUrl || "",
        hashtags: hashtags || [],
        mentions: mentions || [],
      });
    }
  }, [
    // Only run this effect when these dependencies change
    draftId,
    selectedProfile?.id,
    content,
    debouncedSaveDraft,
    videoUrl,
    documentUrl,
    hashtags,
    mentions,
  ]);

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
    handleImageUpload,
    handleImageDelete,
    handleImageReorder,
    isUploading,
    imageOrder,
    images,
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
        workspace_id: currentWorkspace?.id || "",
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
