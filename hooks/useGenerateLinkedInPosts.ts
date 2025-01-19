import { useMutation, useQueryClient } from "react-query";
import { generateLinkedInPosts } from "@/services/ai-content";
import { ApiError, GenerateLinkedInPostsDTO } from "@/types";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { processApiResponse } from "@/lib/functions";

interface ContentIdea {
  idea: string;
}

interface ContentIdeasResponse {
  ideas: ContentIdea[];
  tokenUsage: {
    wordCount: number;
    remainingTokens: number;
    totalTokens: number;
  };
}

export const useGenerateLinkedInPosts = () => {
  const queryClient = useQueryClient();
  const { refetchSubscription } = useAuth();

  // States with clear naming
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [tone, setTone] = useState("professional");

  const { mutateAsync: generatePost, isLoading: isGenerating } = useMutation(
    (dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto),
    {
      onSuccess: async (response) => {
        if (response.success) {
          const post = response.data.post;
          setGeneratedContent(post);
          toast.success("Content generated successfully!");

          // Refresh subscription data
          try {
            await Promise.all([
              queryClient.invalidateQueries(["subscription"]),
              refetchSubscription(),
            ]);
          } catch (error) {
            console.error("Error refreshing subscription data:", error);
          }
        } else {
          setGeneratedContent("");
          toast.error(response.message || "Failed to generate content");
        }
      },
      onError: async (error: Error) => {
        try {
          console.error("Generation error:", error);
          processApiResponse(error);
          await Promise.all([
            queryClient.invalidateQueries(["subscription"]),
            refetchSubscription(),
          ]);
        } catch (refreshError) {
          processApiResponse(refreshError as ApiError);
        }
      },
    }
  );

  // Keyboard shortcut for generation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        if (!isGenerating) {
          handleGenerate();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [prompt, isGenerating]);

  // Handler functions with clear purposes
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a topic or prompt");
      return;
    }

    if (prompt.length < 10) {
      toast.error(
        "Please enter a more detailed prompt (minimum 10 characters)"
      );
      return;
    }

    try {
      await generatePost({
        prompt: prompt.trim(),
        language: "en",
        tone,
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      // Refresh subscription on error
      try {
        await Promise.all([
          queryClient.invalidateQueries(["subscription"]),
          refetchSubscription(),
        ]);
      } catch (refreshError) {
        console.error("Error refreshing subscription data:", refreshError);
      }
    }
  };

  return {
    // States
    prompt,
    generatedContent,
    tone,
    isGenerating,
    // Actions
    setPrompt,
    handlePromptChange,
    handleGenerate,
    setTone,
  };
};

export const useGenerateContentIdeas = () => {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdeasResponse | null>(null);
  const queryClient = useQueryClient();

  return {
    loading,
    ideas: ideas?.ideas || [],
  };
};
