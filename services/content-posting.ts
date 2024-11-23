import request from "@/lib/request";
import fRequest from "@/lib/f-request";
import {
  CreateDraftPostType,
  GetPostsType,
  SchedulePostType,
  UploadImageResponse,
} from "@/types/post";

export const createDraft = async (data: CreateDraftPostType) => {
  const response = await request.post(
    "/content-posting/create-or-update-draft",
    data
  );
  return response.data;
};

export const getPosts = async (data: GetPostsType) => {
  const response = await request.get(
    `/content-posting/get-posts?workspace_id=${data.workspace_id}&status=${data.status}&page=${data.page}&pageSize=${data.pageSize}`
  );
  return response.data;
};
export const getDraftPostDetails = async (id: string) => {
  const response = await request.get(
    `/content-posting/get-draft-post-details/${id}`
  );
  return response.data;
};
export const postNow = async (postId: string) => {
  const response = await request.post(`/content-posting/post-now/${postId}`);
  return response.data;
};

export const schedulePost = async (
  postId: string,
  scheduleData: SchedulePostType
) => {
  const response = await request.post(
    `/content-posting/schedule/${postId}`,
    scheduleData
  );
  return response.data;
};

export const deletePost = async (postId: string) => {
  const response = await request.delete(
    `/content-posting/delete-post/${postId}`
  );
  return response.data;
};

// Add new functions for image handling
export const uploadImage = async (
  postId: string,
  file: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fRequest.post(
    `/content-posting/${postId}/upload-image`,
    formData
  );
  return response;
};

export const deleteImage = async (postId: string, imageId: string) => {
  const response = await request.delete(
    `/content-posting/${postId}/images/${imageId}`
  );
  return response;
};

export const reorderImages = async (postId: string, imageIds: string[]) => {
  const response = await request.post(
    `/content-posting/${postId}/reorder-images`,
    {
      imageIds,
    }
  );
  return response;
};


export const getScheduledQueue = async (data: GetPostsType) => {
  const response = await request.get(
    `/content-posting/scheduled-queue?workspace_id=${data.workspace_id}&page=${data.page}&pageSize=${data.pageSize}`
  );
  return response.data;
};

