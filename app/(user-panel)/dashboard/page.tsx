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

  const { mutateAsync: generatePost, isLoading } = useMutation(
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

    generatePost(prompt.trim());
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-grid-neutral-100/25 [mask-image:radial-gradient(white,transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
      </div>

      <div
        className={cn(
          "relative transition-all duration-700 ease-in-out min-h-screen",
          generatedContent
            ? "lg:grid lg:grid-cols-[1.5fr,1fr] gap-6"
            : "flex justify-center"
        )}
      >
        {/* Left Section - Enhanced Input */}
        <div
          className={cn(
            "flex-1 relative px-4 sm:px-8 lg:px-16 py-8 lg:py-16",
            generatedContent &&
              "lg:border-r border-neutral-200/50 bg-white/60 backdrop-blur-lg shadow-[1px_0_0_rgba(0,0,0,0.02)]"
          )}
        >
          <div className="max-w-3xl mx-auto">
            {/* Enhanced Header Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={cn("mt-6 space-y-6", !generatedContent && "text-center")}
            >
              <h1
                className={cn(
                  "font-medium tracking-tight text-neutral-900 whitespace-pre-wrap leading-tight",
                  generatedContent
                    ? "text-3xl lg:text-4xl"
                    : "text-4xl lg:text-5xl"
                )}
              >
                <span className="text-neutral-800">What would you like to </span>
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                    Post Today?
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100/40 -skew-x-6 rounded-full blur-sm" />
                </span>
              </h1>
              <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                Craft engaging content that resonates with your professional network
              </p>
            </motion.div>

            {/* Enhanced Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-16"
            >
              <div className="relative">
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-[35px] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200 animate-gradient"></div>
                  <div className="relative p-[1px] rounded-[35px] bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 transition-all duration-500 group-hover:from-blue-200 group-hover:via-indigo-200 group-hover:to-purple-200">
                    <div className="relative bg-white rounded-[35px] transition-all duration-500 group-hover:shadow-lg">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="What would you like to share with your network today? Describe your topic or message..."
                        className="w-full min-h-[120px] resize-none bg-transparent text-neutral-700 placeholder:text-neutral-400 rounded-[30px] border-0 focus:outline-none focus:ring-0 p-7 pr-[140px] text-base transition-all duration-500 selection:bg-blue-50 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                        style={{
                          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.02)",
                        }}
                      />
                      <div className="absolute right-4 inset-y-0 flex items-center">
                        <GradientButton
                          onClick={handleGenerate}
                          disabled={isLoading}
                          variant="primary"
                          className="relative h-14 w-14 rounded-full text-sm font-medium flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              <ArrowRight className="w-6 h-6 text-white" />
                            )}
                          </div>
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Options Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-10 grid grid-cols-3 gap-6"
                >
                  {[
                    {
                      label: "Category",
                      value: category,
                      onChange: setCategory,
                      options: categoryOptions,
                      icon: "📚",
                    },
                    {
                      label: "Tone",
                      value: tone,
                      onChange: setTone,
                      options: toneOptions,
                      icon: "🎭",
                    },
                    {
                      label: "Length",
                      value: postLength,
                      onChange: (value: "short" | "medium" | "long") =>
                        setPostLength(value),
                      options: postLengthOptions,
                      icon: "📏",
                    },
                  ].map((setting, index) => (
                    <div
                      key={setting.label}
                      className="group relative"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="space-y-2.5 bg-white rounded-2xl p-5 border border-neutral-200/50 hover:border-blue-200/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <label className="text-sm font-medium text-neutral-600 flex items-center gap-2">
                          <span>{setting.icon}</span>
                          {setting.label}
                        </label>
                        <Select
                          value={setting.value}
                          onValueChange={setting.onChange}
                        >
                          <SelectTrigger className="w-full h-10 text-sm bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50/50 transition-colors rounded-xl">
                            <SelectValue placeholder={`Select ${setting.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {setting.options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-sm"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Enhanced Preview */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative backdrop-blur-xl px-4 sm:px-8 lg:px-16 py-8 lg:py-16 overflow-y-auto bg-white/30"
          >
            <div className="max-w-xl mx-auto">
              <div className="sticky top-8 space-y-8">
                {/* Enhanced Preview Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-200/50"
                >
                  {/* Title Section */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h2 className="text-lg font-semibold text-neutral-900">
                        Preview
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-500 ml-5">
                      Preview how your post will appear on LinkedIn
                    </p>
                  </div>

                  {/* Enhanced Buttons Section */}
                  <div className="flex items-center gap-3 p-4 border-t border-neutral-100 bg-neutral-50/50">
                    <GradientButton
                      variant="outline"
                      onClick={handleEditInEditor}
                      disabled={isEditLoading}
                      className="h-10 flex-1 px-4 rounded-xl text-sm font-medium bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-blue-200 transition-all duration-300"
                    >
                      {isEditLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-neutral-400/30 border-t-neutral-400 rounded-full"
                          />
                          <span>Opening Editor...</span>
                        </div>
                      ) : (
                        <span>Edit in Editor</span>
                      )}
                    </GradientButton>
                    <GradientButton
                      variant="primary"
                      onClick={handleAddToQueueClick}
                      disabled={isQueueLoading}
                      className="h-10 flex-1 px-4 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transform hover:scale-[1.02] transition-all duration-300"
                    >
                      {isQueueLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Adding to Queue...</span>
                        </div>
                      ) : (
                        <span>Add to Queue</span>
                      )}
                    </GradientButton>
                  </div>
                </motion.div>

                {/* Enhanced Preview Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden"
                >
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
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
