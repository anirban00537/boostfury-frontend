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
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
  const { refetchSubscription } = useAuth();

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
        refetchSubscription();
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to generate post",
          variant: "destructive",
        });
        console.error("Generation error:", error);
        refetchSubscription();
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
    <div className="min-h-screen bg-slate-50">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-grid-neutral-100/25 [mask-image:radial-gradient(white,transparent)] pointer-events-none" />

      <div
        className={cn(
          "relative transition-all duration-500 min-h-screen",
          generatedContent
            ? "lg:grid lg:grid-cols-[1.5fr,1fr]"
            : "flex justify-center"
        )}
      >
        {/* Left Section - Input */}
        <div
          className={cn(
            "flex-1 relative px-4 sm:px-8 lg:px-16 py-8 lg:py-16",
            generatedContent &&
              "lg:border-r border-neutral-200/50 bg-white/60 backdrop-blur-lg"
          )}
        >
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "mt-6 space-y-4",
                !generatedContent && "text-center"
              )}
            >
              <h1
                className={cn(
                  "font-medium tracking-tight text-neutral-900 whitespace-pre-wrap",
                  generatedContent
                    ? "text-3xl lg:text-4xl"
                    : "text-4xl lg:text-5xl"
                )}
              >
                <span className="text-neutral-800">What would you like to</span>{" "}
                <span className="relative">
                  <span className="relative z-10 text-blue-500 font-semibold">
                    post today?
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100/40 -skew-x-6 rounded-full" />
                </span>
              </h1>
            </motion.div>

            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16"
            >
              <div className="relative">
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[35px] blur-2xl opacity-5 group-hover:opacity-20 transition-all duration-1000 group-hover:duration-200 animate-gradient"></div>
                  <div className="relative p-[1px] rounded-[35px] bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transition-all duration-500">
                    <div className="relative bg-white rounded-[35px] transition-all duration-500">
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
                          className="relative h-12 w-12 rounded-full text-sm font-medium flex items-center justify-center"
                        >
                          <div className="relative flex items-center justify-center">
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              <ArrowRight className="w-5 h-5" />
                            )}
                          </div>
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options Section */}
                <div className="mt-8 grid grid-cols-3 gap-6">
                  {/* Category */}
                  <div className="space-y-2.5 bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-white backdrop-blur-xl p-4 rounded-2xl border-2 border-blue-200/50 hover:border-blue-300/50 group hover:translate-y-[-2px] transition-all duration-300">
                    <label className="text-xs font-medium text-blue-600">
                      Category
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full h-9 text-xs bg-white/70 border border-blue-100/50 text-blue-700">
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
                  <div className="space-y-2.5 bg-gradient-to-br from-purple-50/50 via-purple-50/30 to-white backdrop-blur-xl p-4 rounded-2xl border-2 border-purple-200/50 hover:border-purple-300/50 group hover:translate-y-[-2px] transition-all duration-300">
                    <label className="text-xs font-medium text-purple-600">
                      Tone
                    </label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="w-full h-9 text-xs bg-white/70 border border-purple-100/50 text-purple-700">
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
                  <div className="space-y-2.5 bg-gradient-to-br from-emerald-50/50 via-emerald-50/30 to-white backdrop-blur-xl p-4 rounded-2xl border-2 border-emerald-200/50 hover:border-emerald-300/50 group hover:translate-y-[-2px] transition-all duration-300">
                    <label className="text-xs font-medium text-emerald-600">
                      Length
                    </label>
                    <Select
                      value={postLength}
                      onValueChange={(value: "short" | "medium" | "long") =>
                        setPostLength(value)
                      }
                    >
                      <SelectTrigger className="w-full h-9 text-xs bg-white/70 border border-emerald-100/50 text-emerald-700">
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
            className="relative bg-white/60 backdrop-blur-xl px-4 sm:px-8 lg:px-16 py-8 lg:py-16 overflow-y-auto"
          >
            <div className="max-w-xl mx-auto">
              <div className="sticky top-8 space-y-10">
                {/* Preview Header */}
                <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-neutral-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
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
