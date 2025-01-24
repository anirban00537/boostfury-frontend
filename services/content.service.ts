import request from "@/lib/request";

// Basic content generation
export const generateContent = async (contentData: any) => {
  const response = await request.post("/content/generate-content", contentData);
  return response.data;
};

export interface UpdateAiStyleDto {
  professionalIdentity?: string;
  contentTopics?: string[];
}

export interface AiStyle {
  id: string;
  professionalIdentity: string | null;
  contentTopics: string[];
}

export const updateAiStyle = async (
  linkedInProfileId: string,
  data: UpdateAiStyleDto
): Promise<AiStyle> => {
  const response = await request.post(
    `/content-posting/linkedin-profiles/ai-style/${linkedInProfileId}`,
    data
  );
  return response.data.data.aiStyle;
};

export const getAiStyle = async (
  linkedInProfileId: string
): Promise<AiStyle> => {
  const response = await request.get(
    `/content-posting/linkedin-profiles/ai-style/${linkedInProfileId}`
  );
  return response.data.data.aiStyle;
};
