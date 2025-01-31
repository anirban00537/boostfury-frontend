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

interface UploadImageVariables {
  file: File;
  postId: string;
}

interface DeleteImageResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
  };
}

interface DeleteImageVariables {
  postId: string;
  imageId: string;
}

interface ReorderImagesResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
  };
}

interface ReorderImagesVariables {
  postId: string;
  imageIds: string[];
}

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

type PostNowFn = (postId: string) => Promise<PostResponse>;
type AddToQueueFn = (postId: string, timezone: string) => Promise<PostResponse>;
type SchedulePostFn = (
  postId: string,
  scheduleData: SchedulePostType
) => Promise<SchedulePostResponse>;

const postNowApi: PostNowFn = postNow;
const addToQueueApi: AddToQueueFn = addToQueue;
const schedulePostApi: SchedulePostFn = schedulePost;

export const useContentPosting = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const draftId = searchParams?.get("draft_id");
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [images, setImages] = useState<LinkedInPostImage[]>([]);
  const [isCreatingInitialDraft, setIsCreatingInitialDraft] = useState(false);

  const { mutateAsync: saveDraft } = useMutation<
    DraftResponse,
    Error,
    CreateDraftPostType
  >(createDraft, {
    onSuccess: async (response) => {
      if (!response.success) {
        console.error("Save draft failed:", response.message);
        return;
      }
      setPostDetails(response.data.post as Post);
      if (response.data.post.id) {
        await queryClient.invalidateQueries([
          "draftDetails",
          response.data.post.id,
        ]);
      }
    },
  });

  const debouncedSaveDraft = useCallback(
    debounce(async (draftData: CreateDraftPostType) => {
      if (!linkedinProfile?.id) return;

      try {
        setIsAutoSaving(true);
        const response = await saveDraft(draftData);
        if (response.success && response.data?.post) {
          setPostDetails(response.data.post as Post);
          await queryClient.invalidateQueries([
            "draftDetails",
            response.data.post.id,
          ]);
        }
      } finally {
        setIsAutoSaving(false);
      }
    }, 1500),
    [linkedinProfile?.id, saveDraft]
  );

  const handleContentChange = useCallback(
    async (newContent: string, category?: string) => {
      setContent(newContent);

      if (!linkedinProfile?.id) return;

      const draftData: CreateDraftPostType = {
        content: newContent.trim(),
        postType: "text" as const,
        linkedInProfileId: linkedinProfile.id,
        category,
        ...(draftId ? { id: draftId } : {}),
      };

      if (draftId) {
        debouncedSaveDraft(draftData);
      } else if (newContent.trim()) {
        setIsCreatingInitialDraft(true);
        try {
          const response = await saveDraft(draftData);
          if (response.success && response.data?.post?.id) {
            router.replace(`/studio?draft_id=${response.data.post.id}`, { scroll: false });
            setPostDetails(response.data.post as Post);
          }
        } finally {
          setIsCreatingInitialDraft(false);
        }
      }
    },
    [draftId, linkedinProfile?.id, saveDraft, debouncedSaveDraft, router]
  );

  const { isLoading: isLoadingDraft } = useQuery(
    ["draftDetails", draftId],
    () => getDraftPostDetails(draftId || ""),
    {
      enabled: Boolean(draftId && linkedinProfile?.id && !isCreatingInitialDraft),
      onSuccess: (response) => {
        if (!response.success || !response.data.post) return;
        const post = response.data.post;
        if (!content) {
          setContent(post.content || "");
        }
        setPostDetails({
          ...post,
          content: content || post.content,
        } as Post);
      },
    }
  );

  const { mutateAsync: postNowMutation, isLoading: isPosting } = useMutation<
    PostResponse,
    Error,
    string
  >(postNowApi, {
    onSuccess: (response) => {
      if (response.success) {
        router.push("/my-posts?tab=published");
      }
    },
  });

  const { mutateAsync: addToQueueMutation, isLoading: isAddingToQueue } =
    useMutation<PostResponse, Error, string>(
      (postId) => addToQueueApi(postId, "Asia/Dhaka"),
      {
        onSuccess: (response) => {
          if (response.success) {
            router.push("/my-posts?tab=scheduled");
          }
        },
      }
    );

  const { mutateAsync: schedulePostMutation, isLoading: isScheduling } =
    useMutation<
      SchedulePostResponse,
      Error,
      { postId: string; scheduleData: SchedulePostType }
    >(({ postId, scheduleData }) => schedulePostApi(postId, scheduleData), {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/my-posts?tab=scheduled");
        }
      },
    });

  const { mutateAsync: uploadImageMutation, isLoading: isUploading } =
    useMutation<UploadImageResponse, Error, UploadImageVariables>(
      ({ file, postId }) => uploadImage(postId, file),
      {
        onSuccess: async (response) => {
          if (response.success && draftId) {
            await queryClient.invalidateQueries(["draftDetails", draftId]);
          }
        },
      }
    );

  const { mutateAsync: deleteImageMutation } = useMutation<
    DeleteImageResponse,
    Error,
    DeleteImageVariables
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
    }
  );

  const handlePostNow = useCallback(
    async (linkedinProfileId: string) => {
      if (!draftId) return;
      await postNowMutation(draftId);
    },
    [draftId, postNowMutation]
  );

  const handleAddToQueue = useCallback(
    async (linkedinProfileId: string) => {
      if (!draftId) return;
      await addToQueueMutation(draftId);
    },
    [draftId, addToQueueMutation]
  );

  const handleSchedule = useCallback(
    async (date: Date) => {
      if (!draftId || !linkedinProfile?.id) return;
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
    useMutation<PostResponse, Error, string>(shuffleQueue);

  const createInitialDraft = async () => {
    if (!linkedinProfile?.id) return null;
    const draftData: CreateDraftPostType = {
      content: content.trim(),
      postType: "text" as const,
      linkedInProfileId: linkedinProfile.id,
    };
    
    const response = await saveDraft(draftData);
    if (response.success && response.data?.post?.id) {
      router.replace(`/studio?draft_id=${response.data.post.id}`, { scroll: false });
      setPostDetails(response.data.post as Post);
      return response.data.post.id;
    }
    return null;
  };

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      let currentDraftId = draftId || postDetails?.id || undefined;

      // If no draft exists, create one
      if (!currentDraftId) {
        const newDraftId = await createInitialDraft();
        if (!newDraftId) return false;
        currentDraftId = newDraftId;
      }

      // Upload image with the draft ID
      const uploadResponse = await uploadImageMutation({ file, postId: currentDraftId });
      if (uploadResponse.success) {
        // Fetch updated draft details to get the new image
        const draftResponse = await getDraftPostDetails(currentDraftId);
        if (draftResponse.success && draftResponse.data.post) {
          setPostDetails(draftResponse.data.post);
          if (draftResponse.data.post.images) {
            setImages(draftResponse.data.post.images);
          }
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error uploading image:", error);
      return false;
    }
  }, [draftId, postDetails, uploadImageMutation, createInitialDraft]);

  const handleImageDelete = useCallback(
    async (imageId: string) => {
      if (!postDetails?.id) return;
      await deleteImageMutation({ postId: postDetails.id, imageId });
    },
    [postDetails, deleteImageMutation]
  );

  return {
    content,
    postDetails,
    isAutoSaving,
    isLoadingDraft,
    isPosting,
    isAddingToQueue,
    isScheduling,
    isUploading,
    draftId,
    handleContentChange,
    handlePostNow,
    handleAddToQueue,
    handleSchedule,
    shuffleQueueMutation: shuffleQueue,
    isShuffling,
    images,
    handleImageUpload,
    handleImageDelete,
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

  const getStatusFromTab = (tab: PostTabId): PostType => {
    const statusMap: Record<PostTabId, PostType> = {
      draft: POST_STATUS.DRAFT,
      scheduled: POST_STATUS.SCHEDULED,
      published: POST_STATUS.PUBLISHED,
      failed: POST_STATUS.FAILED,
    };
    return statusMap[tab];
  };

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
