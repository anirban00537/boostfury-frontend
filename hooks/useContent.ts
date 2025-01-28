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
import { useSelector, useDispatch } from "react-redux";
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
import {
  setContent,
  setPostDetails,
  setIsAutoSaving,
  setIsLoadingDraft,
  setIsCreatingDraft,
  setIsPosting,
  setIsAddingToQueue,
  setIsScheduling,
  setIsUploading,
  removeImage,
  reorderImages as dispatchReorderImages,
} from "../state/slices/contentSlice";

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

interface PostResponse {
  success: boolean;
  message?: string;
  data?: {
    post?: Post;
  };
}

interface SchedulePostResponse {
  success: boolean;
  message?: string;
  data?: {
    post?: Post;
  };
}

// API function types
type PostNowFn = (postId: string) => Promise<PostResponse>;
type AddToQueueFn = (postId: string, timezone: string) => Promise<PostResponse>;
type SchedulePostFn = (
  postId: string,
  scheduleData: SchedulePostType
) => Promise<SchedulePostResponse>;

// Declare API functions with types
const postNowApi: PostNowFn = postNow;
const addToQueueApi: AddToQueueFn = addToQueue;
const schedulePostApi: SchedulePostFn = schedulePost;

export const useContentPosting = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const draftId = searchParams?.get("draft_id");
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  // Convert Redux state to local state
  const [content, setContent] = useState("");
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isAddingToQueue, setIsAddingToQueue] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<LinkedInPostImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Save draft mutation
  const { mutateAsync: saveDraft } = useMutation<
    DraftResponse,
    Error,
    CreateDraftPostType
  >(createDraft, {
    onSuccess: async (response) => {
      console.log("Save draft mutation success response:", response);
      if (!response.success) {
        console.error("Save draft failed:", response.message);
        return;
      }

      console.log("Updating post details:", response.data.post);
      setPostDetails(response.data.post as Post);

      if (response.data.post.id) {
        console.log("Refetching draft details for ID:", response.data.post.id);
        await queryClient.invalidateQueries([
          "draftDetails",
          response.data.post.id,
        ]);
      }
    },
    onError: (error) => {
      console.error("Save draft mutation error:", error);
    },
  });

  // Debounced save draft with proper cleanup
  const debouncedSaveDraft = useCallback(
    debounce(async (draftData: CreateDraftPostType) => {
      console.log("Debounced save draft called with data:", draftData);

      if (!linkedinProfile?.id) {
        console.error("No LinkedIn profile selected for draft save");
        return;
      }

      try {
        console.log("Starting auto-save process");
        setIsAutoSaving(true);
        const response = await saveDraft(draftData);
        console.log("Auto-save response:", response);

        if (response.success && response.data?.post) {
          console.log(
            "Auto-save successful, updating post details:",
            response.data.post
          );
          setPostDetails(response.data.post as Post);

          console.log("Refetching draft details");
          await queryClient.invalidateQueries([
            "draftDetails",
            response.data.post.id,
          ]);
        } else {
          console.error("Auto-save failed:", response);
        }
      } catch (error) {
        console.error("Auto-save error:", error);
      } finally {
        console.log("Auto-save process completed");
        setIsAutoSaving(false);
      }
    }, 1500),
    [linkedinProfile?.id, saveDraft]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [debouncedSaveDraft]);

  // Content change handler
  const handleContentChange = useCallback(
    async (newContent: string, category?: string) => {
      console.log("Content change triggered:", {
        newContent: newContent.slice(0, 50) + "...",
        draftId,
        hasLinkedInProfile: !!linkedinProfile?.id,
        category,
      });

      // Update local state immediately for UI responsiveness
      setContent(newContent);

      // Don't proceed if no LinkedIn profile is selected
      if (!linkedinProfile?.id) {
        console.error("No LinkedIn profile selected for content change");
        return;
      }

      const draftData: CreateDraftPostType = {
        content: newContent.trim(),
        postType: "text" as const,
        linkedInProfileId: linkedinProfile.id,
        category,
        ...(draftId ? { id: draftId } : {}),
      };
      console.log("Prepared draft data:", draftData);

      try {
        if (draftId) {
          console.log("Existing draft, using debounced save for ID:", draftId);
          debouncedSaveDraft(draftData);
        } else if (newContent.trim()) {
          console.log("New content, creating draft immediately");
          setIsCreatingDraft(true);
          const response = await saveDraft(draftData);
          console.log("Create draft response:", response);

          if (response.success && response.data?.post?.id) {
            const newUrl = `/studio?draft_id=${response.data.post.id}`;
            console.log("Updating URL to:", newUrl);
            window.history.pushState({}, "", newUrl);

            console.log("Updating post details:", response.data.post);
            setPostDetails(response.data.post as Post);
          }
        }
      } catch (error) {
        console.error("Content change error:", error);
      } finally {
        setIsCreatingDraft(false);
      }
    },
    [draftId, linkedinProfile?.id, saveDraft, debouncedSaveDraft]
  );

  // Generated content handler
  const handleGenerateContent = useCallback(
    async (generatedContent: string) => {
      if (!linkedinProfile?.id) {
        return;
      }

      // Update content state immediately for the preview
      setContent(generatedContent);

      // If we have a draft, update it
      if (draftId) {
        const draftData: CreateDraftPostType = {
          id: draftId,
          content: generatedContent,
          postType: "text" as const,
          linkedInProfileId: linkedinProfile.id,
        };

        try {
          const response = await saveDraft(draftData);
          if (response.success && response.data?.post) {
            // Update post details while preserving existing data
            setPostDetails({
              ...postDetails,
              ...response.data.post,
              content: generatedContent,
            } as Post);
          }
        } catch (error) {
          console.error(
            "Failed to update draft with generated content:",
            error
          );
        }
      } else {
        // Create new draft with generated content
        const draftData: CreateDraftPostType = {
          content: generatedContent,
          postType: "text" as const,
          linkedInProfileId: linkedinProfile.id,
        };

        try {
          const response = await saveDraft(draftData);
          if (response.success && response.data?.post) {
            setPostDetails(response.data.post as Post);
            router.push(`/studio?draft_id=${response.data.post.id}`);
          }
        } catch (error) {
          console.error(
            "Failed to create draft with generated content:",
            error
          );
        }
      }
    },
    [linkedinProfile?.id, draftId, saveDraft, router]
  );

  // Update upload mutation with correct types
  const { mutateAsync: uploadImageMutation } = useMutation<
    UploadImageResponse,
    Error,
    UploadImageVariables
  >(({ file, postId }) => uploadImage(postId, file), {
    onSuccess: async (response) => {
      if (response.success) {
        if (draftId) {
          await queryClient.invalidateQueries(["draftDetails", draftId]);
        }
      }
    },
    onError: (error) => {
      console.error("Upload error:", error);
    },
  });

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
          setImages((prevImages) =>
            prevImages.filter((img) => img.id !== variables.imageId)
          );
          if (draftId) {
            await queryClient.invalidateQueries(["draftDetails", draftId]);
          }
        }
      },
      onError: (error) => {
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
    async ({ postId, imageIds }) => {
      const response = await reorderImages(postId, imageIds);
      return response.data;
    },
    {
      onSuccess: (response, variables) => {
        if (response.success) {
          const newImages = variables.imageIds.map(
            (id) => images.find((img) => img.id === id)!
          );
          setImages(newImages);
        }
      },
      onError: (error) => {
        console.error("Reorder error:", error);
      },
    }
  );

  // Load draft details query
  useQuery(
    ["draftDetails", draftId],
    () => getDraftPostDetails(draftId || ""),
    {
      enabled: Boolean(draftId && linkedinProfile?.id),
      onSuccess: (response) => {
        if (!response.success || !response.data.post) return;

        const post = response.data.post;

        // Only update content if we don't have any content yet
        if (!content) {
          setContent(post.content || "");
        }

        // Update post details while preserving content
        setPostDetails({
          ...post,
          content: content || post.content,
        } as Post);
      },
      onError: (error) => {
        console.error("Error fetching draft:", error);
      },
    }
  );

  // Post actions
  const { mutateAsync: postNowMutation } = useMutation<
    PostResponse,
    Error,
    string
  >(
    async (postId) => {
      return await postNowApi(postId);
    },
    {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/my-posts?tab=published");
        }
      },
    }
  );

  const { mutateAsync: addToQueueMutation } = useMutation<
    PostResponse,
    Error,
    string
  >(
    async (postId) => {
      return await addToQueueApi(postId, "Asia/Dhaka");
    },
    {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/my-posts?tab=scheduled");
        }
      },
    }
  );

  const { mutateAsync: schedulePostMutation } = useMutation<
    SchedulePostResponse,
    Error,
    { postId: string; scheduleData: SchedulePostType }
  >(
    async ({ postId, scheduleData }) => {
      return await schedulePostApi(postId, scheduleData);
    },
    {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/my-posts?tab=scheduled");
        }
      },
    }
  );

  // Action handlers
  const handlePostNow = useCallback(
    async (linkedinProfileId: string) => {
      if (!draftId) {
        return;
      }
      await postNowMutation(draftId);
    },
    [draftId, postNowMutation]
  );

  const handleAddToQueue = useCallback(
    async (linkedinProfileId: string) => {
      if (!draftId) {
        return;
      }
      await addToQueueMutation(draftId);
    },
    [draftId, addToQueueMutation]
  );

  const handleSchedule = useCallback(
    async (date: Date) => {
      if (!draftId || !linkedinProfile?.id) {
        return;
      }

      await schedulePostMutation({
        postId: draftId,
        scheduleData: {
          scheduledTime: date.toISOString(),
          timezone: "Asia/Dhaka",
        },
      });
    },
    [draftId, linkedinProfile?.id, schedulePostMutation]
  );

  const { mutateAsync: shuffleQueueMutation, isLoading: isShuffling } =
    useMutation({
      mutationFn: () => shuffleQueue(),
      onSuccess: (response) => {
        if (response.success) {
          queryClient.invalidateQueries(["scheduledQueue"]);
        }
      },
      onError: (error: Error) => {
        console.error("Shuffle error:", error);
      },
    });

  return {
    // States
    content,
    postDetails,
    isAutoSaving,
    isLoadingDraft,
    isCreatingDraft,
    isPosting,
    isAddingToQueue,
    isScheduling,
    // Actions
    handleContentChange,
    handleGenerateContent,
    handlePostNow,
    handleAddToQueue,
    handleSchedule,
    shuffleQueue: () => shuffleQueueMutation(linkedinProfile?.id || ""),
    isShuffling,
    // Image related states and actions
    images,
    isUploading,
    handleImageUpload: async (file: File) => {
      if (!postDetails?.id) return false;
      try {
        setIsUploading(true);
        await uploadImageMutation({ file, postId: postDetails.id });
        await queryClient.invalidateQueries(["draftDetails", draftId]);
        return true;
      } catch (error) {
        return false;
      } finally {
        setIsUploading(false);
      }
    },
    handleImageDelete: async (imageId: string) => {
      if (!postDetails?.id) return;
      try {
        await deleteImageMutation({ postId: postDetails.id, imageId });
        await queryClient.invalidateQueries(["draftDetails", draftId]);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    },
    handleImageReorder: async (imageIds: string[]) => {
      if (!postDetails?.id) return;
      await reorderImagesMutation({ postId: postDetails.id, imageIds });
    },
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
