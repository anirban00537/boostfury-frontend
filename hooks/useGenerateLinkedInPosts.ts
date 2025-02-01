import { useMutation, useQueryClient } from "react-query";
import {
  generateLinkedInPosts,
  generatePersonalizedPost,
  rewriteContent,
  RewriteInstructionType,
} from "@/services/ai-content";
import { GenerateLinkedInPostsDTO, GeneratePersonalizedPostDto } from "@/types";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "./useAuth";
import { processApiResponse } from "@/lib/functions";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";

interface ContentIdea {
  idea: string;
}

interface UseGenerateLinkedInPostsProps {
  onContentGenerated: (content: string, category?: string) => void;
  currentPostId?: string;
}

export const useGenerateLinkedInPosts = ({
  onContentGenerated,
  currentPostId,
}: UseGenerateLinkedInPostsProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { refetchSubscription } = useAuth();
  const { linkedinProfile } = useSelector((state: RootState) => state.user);

  // Core states
  const [state, setState] = useState({
    prompt: "",
    tone: "professional",
    selectedCategory: "Business",
    postLength: "medium" as "short" | "medium" | "long",
  });

  const handlePromptChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setState((prev) => ({ ...prev, prompt: e.target.value }));
    },
    []
  );

  const setTone = useCallback((newTone: string) => {
    setState((prev) => ({ ...prev, tone: newTone }));
  }, []);

  const setPostLength = useCallback((length: "short" | "medium" | "long") => {
    setState((prev) => ({ ...prev, postLength: length }));
  }, []);

  const setSelectedCategory = useCallback((category: string) => {
    setState((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  // Generate personalized post mutation
  const {
    mutateAsync: generatePersonalized,
    isLoading: isGeneratingPersonalized,
  } = useMutation(
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
  const { mutateAsync: generatePost, isLoading: isGeneratingPost } =
    useMutation((dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto), {
      onSuccess: async (response) => {
        if (!response.success) {
          toast.error(response.message || "Failed to generate content");
          return;
        }
        const content = response.data?.post || "";
        onContentGenerated?.(content);
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
      },
      onError: async (error: Error) => {
        console.error("Generation error:", error);
        processApiResponse(error);
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
      },
    });

  // Rewrite content mutation
  const { mutateAsync: rewritePost, isLoading: isRewriting } = useMutation(
    (instructionType: RewriteInstructionType) =>
      rewriteContent({
        linkedInPostId: currentPostId!,
        instructionType,
      }),
    {
      onSuccess: async (response) => {
        if (!response.success) {
          toast.error(response.message || "Failed to rewrite content");
          return;
        }

        const content = response.data?.content || "";

        if (onContentGenerated) {
          onContentGenerated(content);
        }

        // Refresh subscription data
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
      },
      onError: async (error: Error) => {
        console.error("Rewrite error:", error);
        processApiResponse(error);
        await queryClient.invalidateQueries(["subscription"]);
        await refetchSubscription().catch(console.error);
      },
    }
  );

  const handleGenerate = useCallback(async () => {
    const { prompt, tone, postLength, selectedCategory } = state;
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
        postLength,
        category: selectedCategory,
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      await Promise.all([
        queryClient.invalidateQueries(["subscription"]),
        refetchSubscription(),
      ]).catch(console.error);
    }
  }, [state, generatePost, queryClient, refetchSubscription]);

  // Keyboard shortcut for generation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        if (!isGeneratingPost) {
          handleGenerate();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleGenerate, isGeneratingPost]);

  const handleGeneratePersonalized = async () => {
    if (!linkedinProfile?.id) {
      toast.error("Please connect your LinkedIn account first");
      return;
    }
    if (
      linkedinProfile.contentTopics.length === 0 ||
      !linkedinProfile.professionalIdentity
    ) {
      toast.error("Please update your AI Voice & Style preferences first");
      router.push("/settings/ai-style");
      return;
    }
    try {
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
    }
  };

  const handleRewriteContent = async (type: RewriteInstructionType) => {
    if (!currentPostId) {
      toast.error("No post selected for rewriting");
      return;
    }

    try {
      await rewritePost(type);
    } catch (error) {
      console.error("Error in handleRewriteContent:", error);
    }
  };

  return {
    ...state,
    isGenerating: isGeneratingPost,
    isGeneratingPersonalized,
    isRewriting,
    handlePromptChange,
    handleGenerate,
    handleGeneratePersonalized,
    handleRewriteContent,
    setTone,
    setSelectedCategory,
    setPostLength,
  };
};
