import request from "@/lib/request";

export const generateContent = async (contentData: any) => {
  const response = await request.post("/content/generate-content", contentData);
  return response.data;
};
