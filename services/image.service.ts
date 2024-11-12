import request from "@/lib/request";
import fRequest from "@/lib/f-request";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fRequest.post("/files/upload", formData);
  return response;
};

export const getFiles = async ({ page, pageSize }: PaginationParams = {}) => {
  const response = await request.get("/files/files", {
    params: {
      page: page || 1,
      pageSize: pageSize || 10
    },
  });
  return response.data;
};

export const getFile = async (id: string) => {
  const response = await request.get(`/files/file/${id}`);
  return response.data;
};

export const deleteFile = async (id: string) => {
  const response = await request.delete(`/files/${id}`);
  return response.data;
};

export const getFileUsage = async () => {
  const response = await request.get("/files/usages");
  return response.data;
};
