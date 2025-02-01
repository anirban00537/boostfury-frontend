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
import { GradientButton } from "@/components/ui/gradient-button";

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
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isQueueLoading, setIsQueueLoading] = useState(false);

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
      setIsEditLoading(true);
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
    } finally {
      setIsEditLoading(false);
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
      setIsQueueLoading(true);
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
    } finally {
      setIsQueueLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-grid-neutral-100/25 [mask-image:radial-gradient(white,transparent)] pointer-events-none" />

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
              "lg:border-r border-neutral-200/50 bg-white/50 backdrop-blur-sm"
          )}
        >
          <div className="max-w-2xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-100/50 text-blue-600 text-sm font-medium shadow-sm backdrop-blur-sm"
            >
              <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
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
                <span className="relative">
                  <span className="relative z-10 text-blue-600">
                    LinkedIn posts
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100/50 -skew-x-6" />
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
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-neutral-200/50 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      Ready to generate
                    </div>
                    <div className="h-4 w-[1px] bg-neutral-200"></div>
                    <div className="text-sm text-neutral-500">
                      AI will help optimize your content
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[30px] blur-xl opacity-10 group-hover:opacity-30 transition-all duration-1000 group-hover:duration-200 animate-gradient"></div>
                  <div className="relative bg-white rounded-[30px] shadow-xl hover:shadow-2xl transition-all duration-500">
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="What would you like to post about? Describe your topic or message..."
                      className="w-full min-h-[90px] resize-none bg-transparent text-neutral-900 placeholder:text-neutral-400 rounded-[30px] border-0 focus:ring-2 focus:ring-blue-500/30 p-6 pr-[140px] text-sm transition-all duration-300"
                    />
                    <div className="absolute right-4 inset-y-0 flex items-center">
                      <GradientButton
                        onClick={handleGenerate}
                        disabled={isLoading}
                        variant="primary"
                        className="relative h-12 px-8 rounded-[20px] text-sm font-medium whitespace-nowrap"
                      >
                        <div className="relative flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              <span className="font-medium">Generating...</span>
                            </>
                          ) : (
                            <span className="font-medium">Generate</span>
                          )}
                        </div>
                      </GradientButton>
                    </div>
                  </div>
                </div>

                {/* Options Section */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {/* Category */}
                  <div className="space-y-2 bg-gradient-to-br from-blue-50 via-blue-50/80 to-white backdrop-blur-sm p-3 rounded-xl border border-blue-100/50 shadow-[0_2px_10px_-2px_rgba(59,130,246,0.1)] hover:shadow-[0_8px_20px_-4px_rgba(59,130,246,0.15)] group hover:translate-y-[-2px] transition-all duration-300">
                    <label className="text-xs font-medium text-blue-600">
                      Category
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full h-9 text-xs bg-white/70 border-0 shadow-sm text-blue-700">
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
                  <div className="space-y-2 bg-gradient-to-br from-purple-50 via-purple-50/80 to-white backdrop-blur-sm p-3 rounded-xl border border-purple-100/50 shadow-[0_2px_10px_-2px_rgba(147,51,234,0.1)] hover:shadow-[0_8px_20px_-4px_rgba(147,51,234,0.15)] group hover:translate-y-[-2px] transition-all duration-300">
                    <label className="text-xs font-medium text-purple-600">
                      Tone
                    </label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="w-full h-9 text-xs bg-white/70 border-0 shadow-sm text-purple-700">
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
                  <div className="space-y-2 bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-white backdrop-blur-sm p-3 rounded-xl border border-emerald-100/50 shadow-[0_2px_10px_-2px_rgba(16,185,129,0.1)] hover:shadow-[0_8px_20px_-4px_rgba(16,185,129,0.15)] group hover:translate-y-[-2px] transition-all duration-300">
                    <label className="text-xs font-medium text-emerald-600">
                      Length
                    </label>
                    <Select
                      value={postLength}
                      onValueChange={(value: "short" | "medium" | "long") =>
                        setPostLength(value)
                      }
                    >
                      <SelectTrigger className="w-full h-9 text-xs bg-white/70 border-0 shadow-sm text-emerald-700">
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
            </motion.div>
          </div>
        </div>

        {/* Right Section - Preview */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white/50 backdrop-blur-sm px-6 lg:px-12 py-8 lg:py-12 overflow-y-auto"
          >
            <div className="max-w-lg mx-auto">
              <div className="sticky top-8 space-y-8">
                {/* Preview Header */}
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-neutral-200/50 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h2 className="text-lg font-semibold text-neutral-900">
                        Post Preview
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-500">
                      Here's how your post will appear on LinkedIn
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <GradientButton
                      variant="outline"
                      size="sm"
                      onClick={handleEditInEditor}
                      disabled={isEditLoading}
                      className="h-9 px-4 rounded-xl text-sm font-medium whitespace-nowrap bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 border border-neutral-200/50"
                    >
                      {isEditLoading ? (
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-3.5 h-3.5 border-2 border-neutral-400/30 border-t-neutral-400 rounded-full"
                          />
                          <span>Opening Editor...</span>
                        </div>
                      ) : (
                        "Edit in Editor"
                      )}
                    </GradientButton>
                    <GradientButton
                      variant="primary"
                      size="sm"
                      onClick={handleAddToQueueClick}
                      disabled={isQueueLoading}
                      className="h-9 px-4 rounded-xl text-sm font-medium whitespace-nowrap"
                    >
                      {isQueueLoading ? (
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Adding to Queue...</span>
                        </div>
                      ) : (
                        "Add to Queue"
                      )}
                    </GradientButton>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="bg-white rounded-xl border border-neutral-200/50 shadow-lg transition-all duration-300 hover:shadow-xl">
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

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LinkedInChatPage;
