import { useMutation, useQueryClient } from "react-query";
import {
  generateLinkedInPosts,
  generatePersonalizedPost,
} from "@/services/ai-content";
import { GenerateLinkedInPostsDTO, GeneratePersonalizedPostDto } from "@/types";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { processApiResponse } from "@/lib/functions";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

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
  const { linkedinProfile } = useSelector((state: RootState) => state.user);

  // Core states
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [postLength, setPostLength] = useState<"short" | "medium" | "long">(
    "medium"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate personalized post mutation
  const { mutateAsync: generatePersonalized } = useMutation(
    (dto: GeneratePersonalizedPostDto) => generatePersonalizedPost(dto),
    {
      onSuccess: async (response) => {
        if (!response.success) {
          toast.error(
            response.message || "Failed to generate personalized content"
          );
          return;
        }

        const content = response.data?.post || "";

        if (onContentGenerated) {
          onContentGenerated(content);
        }

        // Refresh subscription data
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
      },
      onError: async (error: Error) => {
        console.error("Personalized generation error:", error);
        processApiResponse(error);
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
      },
    }
  );

  // Generate regular post mutation
  const { mutateAsync: generatePost } = useMutation(
    (dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto),
    {
      onSuccess: async (response) => {
        if (!response.success) {
          toast.error(response.message || "Failed to generate content");
          return;
        }

        const content = response.data?.post || "";

        if (onContentGenerated) {
          onContentGenerated(content);
        }

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
        postLength,
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

  const handleGeneratePersonalized = async () => {
    if (!linkedinProfile?.id) {
      toast.error("Please connect your LinkedIn account first");
      return;
    }

    try {
      setIsGenerating(true);
      await generatePersonalized({
        linkedInProfileId: linkedinProfile.id,
        language: "en",
        postLength: "medium",
      });
    } catch (error) {
      console.error("Error in handleGeneratePersonalized:", error);
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
    handleGeneratePersonalized,
    setTone,
    setPostLength,
  };
};
