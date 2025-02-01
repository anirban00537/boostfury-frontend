"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "react-query";
import { superGenerate, createDraft } from "@/services/content-posting";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useContentPosting } from "@/hooks/useContent";

const postLengthOptions = [
  {
    value: "short",
    label: "Short",
    tooltip: "Best for quick updates and engagement posts",
  },
  {
    value: "medium",
    label: "Medium",
    tooltip: "Ideal for sharing insights and experiences",
  },
  {
    value: "long",
    label: "Long",
    tooltip: "Perfect for in-depth analysis and thought leadership",
  },
] as const;

const categoryOptions = [
  {
    value: "thought_leadership",
    label: "Thought Leadership",
    description: "Share industry insights and expert opinions",
  },
  {
    value: "industry_insight",
    label: "Industry Insight",
    description: "Analysis and trends in your industry",
  },
  {
    value: "career_milestone",
    label: "Career Milestone",
    description: "Professional achievements and career updates",
  },
  {
    value: "educational_content",
    label: "Educational Content",
    description: "Share knowledge and learning resources",
  },
  {
    value: "personal_story",
    label: "Personal Story",
    description: "Share personal experiences and lessons",
  },
] as const;

const toneOptions = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal and business-oriented tone",
  },
  {
    value: "casual",
    label: "Casual",
    description: "Relaxed and conversational style",
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm and approachable tone",
  },
  {
    value: "humorous",
    label: "Humorous",
    description: "Light and entertaining style",
  },
  {
    value: "inspirational",
    label: "Inspirational",
    description: "Motivational and uplifting content",
  },
] as const;

const LinkedInChatPage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [category, setCategory] = useState<string>("thought_leadership");
  const [tone, setTone] = useState<string>("professional");
  const [postLength, setPostLength] = useState<"short" | "medium" | "long">(
    "medium"
  );
  const { toast } = useToast();
  const { linkedinProfile, userinfo } = useSelector(
    (state: RootState) => state.user
  );
  const { handleContentChange, postDetails, handleAddToQueue } =
    useContentPosting();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    "generatePost",
    (prompt: string) =>
      superGenerate({
        prompt,
        linkedInProfileId: linkedinProfile?.id,
        language: "en",
        tone,
        postLength,
        category,
      }),
    {
      onSuccess: (response) => {
        toast({
          title: "Success",
          description: "Your LinkedIn post has been generated.",
        });
        setGeneratedContent(response.data.post);
        console.log("Generated content:", response.data.post);
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to generate post",
          variant: "destructive",
        });
        console.error("Generation error:", error);
      },
    }
  );

  const { mutateAsync: saveDraft } = useMutation(createDraft);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!linkedinProfile?.id) {
      toast({
        title: "Error",
        description: "Please connect your LinkedIn profile first",
        variant: "destructive",
      });
      return;
    }

    mutate(prompt.trim());
  };

  const handleEditInEditor = async () => {
    if (!linkedinProfile?.id || !generatedContent) {
      toast({
        title: "Error",
        description: "Please generate content first",
        variant: "destructive",
      });
      return;
    }

    try {
      const draftResponse = await saveDraft({
        content: generatedContent,
        linkedInProfileId: linkedinProfile.id,
        postType: "text",
      });

      if (draftResponse.success && draftResponse.data.post.id) {
        router.push(`/studio?draft_id=${draftResponse.data.post.id}`);
      } else {
        toast({
          title: "Error",
          description: "Failed to create draft",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create draft",
        variant: "destructive",
      });
    }
  };

  const handleAddToQueueClick = async () => {
    if (!linkedinProfile?.id || !generatedContent) {
      toast({
        title: "Error",
        description: "Please generate content first",
        variant: "destructive",
      });
      return;
    }

    try {
      const draftResponse = await saveDraft({
        content: generatedContent,
        linkedInProfileId: linkedinProfile.id,
        postType: "text",
      });

      if (draftResponse.success && draftResponse.data.post.id) {
        await handleAddToQueue(draftResponse.data.post.id);
        router.push("/post-queue");
      } else {
        toast({
          title: "Error",
          description: "Failed to create draft",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD]">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] -left-[200px] -top-[200px] rounded-full bg-gradient-to-br from-blue-50 via-indigo-50/50 to-transparent opacity-60 blur-3xl" />
        <div className="absolute w-[1000px] h-[1000px] -right-[200px] bottom-[0px] rounded-full bg-gradient-to-tl from-purple-50 via-blue-50/50 to-transparent opacity-60 blur-3xl" />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "relative transition-all duration-500 min-h-screen",
          generatedContent
            ? "lg:grid lg:grid-cols-[1.2fr,1fr]"
            : "flex justify-center"
        )}
      >
        {/* Left Section - Input */}
        <div
          className={cn(
            "flex-1 relative px-6 lg:px-12 py-8 lg:py-12",
            generatedContent &&
              "lg:border-r border-neutral-200/70 bg-gradient-to-br from-white via-white to-blue-50/20"
          )}
        >
          <div className="max-w-2xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100/50 text-blue-700 text-sm font-medium shadow-sm"
            >
              <span className="size-2 rounded-full bg-blue-600"></span>
              AI Content Generator
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn(
                "mt-8 space-y-4",
                !generatedContent && "text-center"
              )}
            >
              <h1
                className={cn(
                  "font-bold tracking-tight text-neutral-900 whitespace-nowrap",
                  generatedContent
                    ? "text-3xl lg:text-4xl"
                    : "text-4xl lg:text-6xl"
                )}
              >
                <span>Create</span> <span>viral</span>{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#4361EE] to-[#7209B7] bg-clip-text text-transparent">
                    LinkedIn posts
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[0.4em] bg-gradient-to-r from-[#4361EE]/20 to-[#7209B7]/20 blur-sm" />
                </span>
              </h1>
            </motion.div>

            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-10 blur transition duration-1000 group-hover:opacity-20" />
                <div className="relative">
                  <div className="relative">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                          <div className="size-1.5 rounded-full bg-emerald-500"></div>
                          Ready to generate
                        </div>
                        <div className="h-4 w-[1px] bg-neutral-200"></div>
                        <div className="text-sm text-neutral-500">
                          AI will help optimize your content
                        </div>
                      </div>
                    </div>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="What would you like to post about? Describe your topic or message..."
                      className="w-full min-h-[100px] resize-none bg-white/80 backdrop-blur-sm text-neutral-900 placeholder:text-neutral-400 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 p-5 pr-[120px] text-sm shadow-lg transition-all duration-300"
                    />
                    <div className="absolute right-3 inset-y-0 flex items-center">
                      <ShimmerButton
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="h-10 px-6 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-1px]"
                        background="linear-gradient(110deg, #2563eb, #4f46e5, #7c3aed)"
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white flex items-center gap-2">
                          {isLoading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-3.5 h-3.5 border-2 border-white/30 border-t-white/90 rounded-full"
                              />
                              <span className="text-sm">Generating...</span>
                            </>
                          ) : (
                            <span className="text-sm">Generate</span>
                          )}
                        </span>
                      </ShimmerButton>
                    </div>
                  </div>

                  {/* Options Section */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-600">
                        Category
                      </label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full h-9 text-xs bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-xs"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-600">
                        Tone
                      </label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="w-full h-9 text-xs bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {toneOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-xs"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Post Length */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-600">
                        Length
                      </label>
                      <Select
                        value={postLength}
                        onValueChange={(value: "short" | "medium" | "long") =>
                          setPostLength(value)
                        }
                      >
                        <SelectTrigger className="w-full h-9 text-xs bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          {postLengthOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-xs"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Preview */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white px-6 lg:px-12 py-8 lg:py-12 overflow-y-auto border-t lg:border-t-0 border-neutral-200/70"
          >
            <div className="max-w-lg mx-auto">
              <div className="sticky top-8 space-y-8">
                {/* Preview Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-emerald-500"></div>
                      <h2 className="text-lg font-semibold text-neutral-900">
                        Post Preview
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-500">
                      Here's how your post will appear on LinkedIn
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShimmerButton
                      onClick={handleEditInEditor}
                      className="h-9 px-4 rounded-xl text-sm font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all duration-300"
                      background="linear-gradient(to right, #f5f5f5, #e5e5e5)"
                    >
                      Edit in Editor
                    </ShimmerButton>
                    <ShimmerButton
                      onClick={handleAddToQueueClick}
                      className="h-9 px-4 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
                      background="linear-gradient(110deg, #2563eb, #4f46e5, #7c3aed)"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
                        Add to Queue
                      </span>
                    </ShimmerButton>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="bg-white rounded-2xl shadow-[0_0_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_0_1px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)]">
                  <PostPreviewNotRedux
                    content={generatedContent}
                    isGenerating={isLoading}
                    linkedInProfile={linkedinProfile}
                    user={{
                      id: userinfo?.id?.toString() || "",
                      email: userinfo?.email || "",
                      first_name: userinfo?.first_name || "",
                      last_name: userinfo?.last_name || "",
                      user_name: userinfo?.user_name || "",
                      photo: userinfo?.photo || null,
                    }}
                    status="draft"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LinkedInChatPage;
