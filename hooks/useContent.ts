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

  // Core states
  const [content, setContent] = useState("");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [selectedProfile, setSelectedProfile] =
    useState<LinkedInProfileUI | null>(null);
  const [images, setImages] = useState<LinkedInPostImage[]>([]);

  // Save draft mutation
  const { mutateAsync: saveDraft, isLoading: isCreatingDraft } = useMutation<
    DraftResponse,
    Error,
    CreateDraftPostType
  >(createDraft, {
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || "Failed to save draft");
        return;
      }
      setPostDetails(response.data.post as Post);
    },
    onError: (error) => {
      toast.error("Failed to save draft");
    },
  });

  // Debounced save draft
  const debouncedSaveDraft = useCallback(
    debounce(async (draftData: CreateDraftPostType) => {
      if (!linkedinProfile?.id) return;

      setIsAutoSaving(true);
      try {
        await saveDraft(draftData);
      } finally {
        setIsAutoSaving(false);
      }
    }, 1500),
    [linkedinProfile?.id, saveDraft]
  );

  // Content change handler
  const handleContentChange = useCallback(
    async (newContent: string) => {
      setContent(newContent);

      if (!linkedinProfile?.id) return;

      const draftData: CreateDraftPostType = {
        content: newContent.trim(),
        postType: "text" as const,
        linkedInProfileId: linkedinProfile.id,
        ...(draftId ? { id: draftId } : {}),
      };

      if (draftId) {
        debouncedSaveDraft(draftData);
      } else if (newContent.trim()) {
        const response = await saveDraft(draftData);
        if (response.success && response.data?.post?.id) {
          router.push(`/studio?draft_id=${response.data.post.id}`);
        }
      }
    },
    [draftId, linkedinProfile?.id, saveDraft, router, debouncedSaveDraft]
  );

  // Generated content handler
  const handleGenerateContent = useCallback(
    async (generatedContent: string) => {
      if (!linkedinProfile?.id) {
        toast.error("Please select a LinkedIn profile");
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
            setPostDetails(
              (prev) =>
                ({
                  ...prev,
                  ...response.data.post,
                  content: generatedContent, // Ensure we keep the generated content
                } as Post)
            );
          }
        } catch (error) {
          console.error(
            "Failed to update draft with generated content:",
            error
          );
          toast.error("Failed to save generated content");
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
          toast.error("Failed to save generated content");
        }
      }
    },
    [linkedinProfile?.id, draftId, saveDraft, router]
  );
  // Update upload mutation with correct types
  const { mutateAsync: uploadImageMutation, isLoading: isUploading } =
    useMutation<UploadImageResponse, Error, UploadImageVariables>(
      ({ file, postId }) => uploadImage(postId, file),
      {
        onSuccess: async (response) => {
          if (response.success) {
            // Refetch post details to get updated image list
            if (draftId) {
              await queryClient.invalidateQueries(["draftDetails", draftId]);
            }
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
        }
      },
      onError: (error) => {
        toast.error(error.message || "Failed to reorder images");
        console.error("Reorder error:", error);
      },
    }
  );

  // Load draft details - update to preserve generated content
  const { isLoading: isLoadingDraft } = useQuery(
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
        setPostDetails(
          (prev) =>
            ({
              ...prev,
              ...post,
              content: content || post.content, // Keep current content if it exists
            } as Post)
        );

        if (post.linkedInProfile) {
          setSelectedProfile({
            id: post.linkedInProfile.id,
            name: post.linkedInProfile.name,
            avatarUrl: post.linkedInProfile.avatarUrl,
            type: "linkedin",
            status: "connected",
          });
        }
      },
      onError: (error) => {
        toast.error("Failed to fetch draft details");
        console.error("Error fetching draft:", error);
      },
    }
  );

  // Post actions
  const { mutateAsync: postNowMutation, isLoading: isPosting } = useMutation<
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
          toast.success("Post published successfully!");
          router.push("/my-posts?tab=published");
        } else {
          toast.error(response.message || "Failed to publish post");
        }
      },
    }
  );

  const { mutateAsync: addToQueueMutation, isLoading: isAddingToQueue } =
    useMutation<PostResponse, Error, string>(
      async (postId) => {
        return await addToQueueApi(postId, "Asia/Dhaka");
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("Post added to queue successfully!");
            router.push("/my-posts?tab=scheduled");
          } else {
            toast.error(response.message || "Failed to add post to queue");
          }
        },
      }
    );

  const { mutateAsync: schedulePostMutation, isLoading: isScheduling } =
    useMutation<
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
            toast.success("Post scheduled successfully!");
            router.push("/my-posts?tab=scheduled");
          } else {
            toast.error(response.message || "Failed to schedule post");
          }
        },
      }
    );

  // Action handlers
  const handlePostNow = useCallback(
    async (linkedinProfileId: string) => {
      if (!draftId) {
        toast.error("No draft found to publish");
        return;
      }
      await postNowMutation(draftId);
    },
    [draftId, postNowMutation]
  );

  const handleAddToQueue = useCallback(
    async (linkedinProfileId: string) => {
      if (!draftId) {
        toast.error("No draft found to add to queue");
        return;
      }
      await addToQueueMutation(draftId);
    },
    [draftId, addToQueueMutation]
  );

  const handleSchedule = useCallback(
    async (date: Date) => {
      if (!draftId || !selectedProfile?.id) {
        toast.error("Missing draft or profile");
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
    [draftId, selectedProfile?.id, schedulePostMutation]
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
    // States
    content,
    postDetails,
    selectedProfile,
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
        await uploadImageMutation({ file, postId: postDetails.id });
        // Refetch post details after successful upload
        await queryClient.invalidateQueries(["draftDetails", draftId]);
        return true;
      } catch (error) {
        return false;
      }
    },
    handleImageDelete: async (imageId: string) => {
      if (!postDetails?.id) return;
      try {
        await deleteImageMutation({ postId: postDetails.id, imageId });
        // Ensure we refetch post details after deletion
        await queryClient.invalidateQueries(["draftDetails", draftId]);
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Failed to delete image");
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
