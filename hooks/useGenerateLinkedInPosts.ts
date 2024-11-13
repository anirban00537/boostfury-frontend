import { useMutation, useQueryClient } from "react-query";
import { generateLinkedInPosts } from "@/services/ai-content";
import { ApiError, GenerateLinkedInPostsDTO } from "@/types";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { processApiResponse } from "@/lib/functions";

export const useGenerateLinkedInPosts = () => {
  const queryClient = useQueryClient();
  const { refetchSubscription } = useAuth();
  const [content, setContent] = useState("");
  const [generatedPost, setGeneratedPost] = useState<string>("");
  const [postTone, setPostTone] = useState("Professional");
  const {
    mutateAsync: generateLinkedinPosts,
    isLoading: isGeneratingLinkedinPosts,
  } = useMutation(
    (dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto),
    {
      onSuccess: async (response) => {
        if (response.success) {
          const post = response.data.post;
          console.log(post, "generated post from useGenerateLinkedInPosts");
          setGeneratedPost(post);
          toast.success("Content generated successfully!");

          // Update both subscription data and refetch
          try {
            await Promise.all([
              queryClient.invalidateQueries(["subscription"]),
              refetchSubscription()
            ]);
          } catch (error) {
            console.error("Error refreshing subscription data:", error);
          }
        } else {
          setGeneratedPost("");
          toast.error(response.message || "Failed to generate content");
        }
      },
      onError: async (error: Error) => {
        try {
          console.log("error in useGenerateLinkedInPosts", error);
          processApiResponse(error);
          await Promise.all([
            queryClient.invalidateQueries(["subscription"]),
            refetchSubscription()
          ]);
        } catch (refreshError) {
          processApiResponse(refreshError as ApiError);
        }
      },
    }
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        if (!isGeneratingLinkedinPosts) {
          handleGenerateLinkedIn();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [content, isGeneratingLinkedinPosts]);

  const handleLinkedInTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
  };

  const handleGenerateLinkedIn = async () => {
    if (!content.trim()) {
      toast.error("Please enter a topic or prompt");
      return;
    }

    if (content.length < 10) {
      toast.error(
        "Please enter a more detailed prompt (minimum 10 characters)"
      );
      return;
    }

    try {
      await generateLinkedinPosts({
        prompt: content.trim(),
        language: "en",
        tone: postTone,
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      // Ensure subscription data is refreshed even on error
      try {
        await Promise.all([
          queryClient.invalidateQueries(["subscription"]),
          refetchSubscription()
        ]);
      } catch (refreshError) {
        console.error("Error refreshing subscription data:", refreshError);
      }
    }
  };

  return {
    content,
    setContent,
    generatedPost,
    isGeneratingLinkedinPosts,
    handleGenerateLinkedIn,
    handleLinkedInTextChange,
    postTone,
    setPostTone,
  };
};
