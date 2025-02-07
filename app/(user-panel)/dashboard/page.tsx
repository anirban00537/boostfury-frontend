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
import { LinkedInPostPreview } from "@/components/content-create/LinkedInPostPreview";
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
import { Sparkles } from "lucide-react";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";

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
  const [isLoading, setIsLoading] = useState(false);

  const surprisePrompts = [
    "Share an unexpected lesson from a recent project that changed your perspective on leadership",
    "Discuss a technology trend that you believe will reshape our industry in the next 5 years",
    "Tell us about a failure that ultimately led to your biggest professional breakthrough",
    "Share your thoughts on work-life integration in today's digital age",
    "Reflect on a mentor who changed your career trajectory and the key lessons they taught you",
    "Discuss an unconventional approach that helped your team solve a complex problem",
    "Share a personal story about adapting to change in your professional journey",
    "What's a common industry practice that you think needs to be reimagined?",
    "Share a moment when stepping outside your comfort zone led to unexpected growth",
    "Discuss a skill you initially undervalued that became crucial to your success"
  ];

  const { handleGeneratePersonalized, isGeneratingPersonalized } =
    useGenerateLinkedInPosts({
      onContentGenerated: (content) => {
        setGeneratedContent(content);
        toast({
          title: "Success",
          description: "Your personalized LinkedIn post has been generated.",
        });
      }
    });

  const handleSurpriseMe = () => {
    handleGeneratePersonalized();
  };

  const { mutateAsync: generatePost, isLoading: isGenerating } = useMutation(
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
    <div className="relative">
      <div className="min-h-screen flex">
        <div className={cn(
          "flex-1 relative transition-all duration-700 ease-in-out min-h-screen bg-gradient-to-br from-slate-50 to-white",
          generatedContent && "lg:max-w-[66.67%]"
        )}>
          {/* Enhanced Background Pattern */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid-neutral-100/25 [mask-image:radial-gradient(white,transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
          </div>

          {/* Left Section - Enhanced Input */}
          <div className="relative px-4 sm:px-8 lg:px-16 py-8 lg:py-16 z-20">
            <div className="max-w-3xl mx-auto relative">
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
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleSurpriseMe}
                      disabled={isGeneratingPersonalized}
                      className="h-10 px-4 rounded-xl text-sm font-medium flex items-center gap-2 bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingPersonalized ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-neutral-400/30 border-t-neutral-400 rounded-full"
                        />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      <span>Surprise Me</span>
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-[35px] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200 animate-gradient"></div>
                    <div className="relative p-[1px] rounded-[35px] bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 transition-all duration-500 group-hover:from-blue-200 group-hover:via-indigo-200 group-hover:to-purple-200">
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-[35px] transition-all duration-500 group-hover:shadow-lg">
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
                            disabled={isGenerating}
                            variant="primary"
                            className="relative h-14 w-14 rounded-full text-sm font-medium flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            {isGenerating ? (
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
                          </GradientButton>
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
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Section - Enhanced Preview */}
        {generatedContent && (
          <div className="hidden lg:block w-[33.33%]">
            <LinkedInPostPreview
              generatedContent={generatedContent}
              isGenerating={isGenerating}
              isEditLoading={isEditLoading}
              isQueueLoading={isQueueLoading}
              linkedinProfile={linkedinProfile}
              userinfo={userinfo}
              onEditInEditor={handleEditInEditor}
              onAddToQueue={handleAddToQueueClick}
            />
          </div>
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
