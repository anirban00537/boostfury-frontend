import request from "@/lib/request";

export const generateLinkedInPosts = async (dto: {
  prompt: string;
  language?: string;
  tone?: string;
}) => {
  const response = await request.post(
    "/ai-content/generate-linkedin-posts",
    dto
  );
  return response.data;
};
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
// generate-content-ideas-for-workspace
export const generateContentIdeasForWorkspace = async (workspaceId: string) => {
  const response = await request.post(
    "/ai-content/generate-content-ideas-for-workspace",
    { workspaceId }
  );
  return response.data;
};

export const contentRewrite = async (dto: {
  content: string;
  mode?: string;
}) => {
  const response = await request.post("/ai-content/rewrite-content", dto);
  return response.data;
};
