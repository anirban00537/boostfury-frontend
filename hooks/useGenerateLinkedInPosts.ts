import { useMutation, useQueryClient } from "react-query";
import { generateLinkedInPosts } from "@/services/ai-content";
import { GenerateLinkedInPostsDTO } from "@/types";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { processApiResponse } from "@/lib/functions";

interface ContentIdea {
  idea: string;
}

interface UseGenerateLinkedInPostsProps {
  onContentGenerated?: (content: string) => void;
}

export const useGenerateLinkedInPosts = ({
  onContentGenerated,
}: UseGenerateLinkedInPostsProps) => {
  const queryClient = useQueryClient();
  const { refetchSubscription } = useAuth();

  // Core states
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [postLength, setPostLength] = useState<"short" | "medium" | "long">(
    "medium"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate post mutation
  const { mutateAsync: generatePost } = useMutation(
    (dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto),
    {
      onSuccess: async (response) => {
        if (!response.success) {
          toast.error(response.message || "Failed to generate content");
          return;
        }

        console.log("response", response);
        const content = response.data?.post || "";

        if (onContentGenerated) {
          onContentGenerated(content);
        }

        toast.success("Content generated successfully!");

        // Refresh subscription data
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
      },
      onError: async (error: Error) => {
        console.error("Generation error:", error);
        processApiResponse(error);
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
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
      setIsGenerating(true);
      await generatePost({
        prompt: prompt.trim(),
        language: "en",
        tone,
        postLength: postLength,
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      try {
        await Promise.all([
          queryClient.invalidateQueries(["subscription"]),
          refetchSubscription(),
        ]);
      } catch (refreshError) {
        console.error("Error refreshing subscription data:", refreshError);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContent = useCallback(async () => {
    try {
      setIsGenerating(true);
      // TODO: Implement AI content generation
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call
      const generatedContent = "This is a sample AI-generated post content.";
      onContentGenerated?.(generatedContent);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setIsGenerating(false);
    }
  }, [onContentGenerated]);

  return {
    // States
    prompt,
    tone,
    postLength,
    isGenerating,
    // Actions
    setPrompt,
    handlePromptChange,
    handleGenerate,
    setTone,
    setPostLength,
    generateContent,
  };
};
