import request from "@/lib/request";

export interface UpdateAiStyleDto {
  professionalIdentity?: string;
  contentTopics?: string[];
}

export interface AiStyle {
  id: string;
  professionalIdentity: string | null;
  contentTopics: string[];
}

// Types for personalized post generation
export interface GeneratePersonalizedPostDto {
  linkedInProfileId: string;
  language?: string;
  postLength?: "short" | "medium" | "long";
}

// AI Style Management
export const updateAiStyle = async (
  linkedInProfileId: string,
  data: UpdateAiStyleDto
): Promise<AiStyle> => {
  const response = await request.post(
    `/ai-content/linkedin-profiles/ai-style/${linkedInProfileId}`,
    data
  );
  return response.data.data.aiStyle;
};

export const getAiStyle = async (
  linkedInProfileId: string
): Promise<AiStyle> => {
  const response = await request.get(
    `/ai-content/linkedin-profiles/ai-style/${linkedInProfileId}`
  );
  return response.data.data.aiStyle;
};

// LinkedIn Post Generation
export const generateLinkedInPosts = async (dto: {
  prompt: string;
  language?: string;
  tone?: string;
  postLength?: string;
}) => {
  const response = await request.post(
    "/ai-content/generate-linkedin-posts",
    dto
  );
  return response.data;
};

export const generatePersonalizedPost = async (
  dto: GeneratePersonalizedPostDto
) => {
  const response = await request.post(
    "/ai-content/generate-personalized-post",
    dto
  );
  return response.data;
};

// Carousel Content Generation
export const generateLinkedinPostContentForCarousel = async (topic: string) => {
  const response = await request.post(
    `/ai-content/generate-linkedin-post-content-for-carousel`,
    { topic }
  );
  return response.data;
};

export const generateCarouselContent = async (
  topic: string,
  numSlides: number,
  language: string,
  mood: string,
  theme: string,
  contentStyle: string,
  targetAudience: string,
  themeActive: boolean
) => {
  const response = await request.post("/ai-content/generate-carousel-content", {
    topic,
    numSlides,
    language,
    mood,
    theme,
    contentStyle,
    targetAudience,
    themeActive,
  });
  return response.data;
};

// Content Rewriting
export const contentRewrite = async (dto: {
  content: string;
  instructions: string;
}) => {
  const response = await request.post("/ai-content/rewrite-content", dto);
  return response.data;
};
