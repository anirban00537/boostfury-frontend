import request from "@/lib/request";
import { CreateDraftPostType, GetPostsType, SchedulePostType } from "@/types/post";

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

  

export const schedulePost = async (postId: string, scheduleData: SchedulePostType) => {
  const response = await request.post(
    `/content-posting/schedule/${postId}`,
    scheduleData
  );
  return response.data;
};

export const deletePost = async (postId: string) => {
  const response = await request.delete(`/content-posting/delete-post/${postId}`);
  return response.data;
};
