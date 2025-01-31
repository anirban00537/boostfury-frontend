"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import { generateAndCreateDraft } from "@/services/content-posting";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";

const LinkedInChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { linkedinProfile } = useSelector((state: RootState) => state.user);

  const { mutate, isLoading } = useMutation(
    "generatePost",
    (prompt: string) =>
      generateAndCreateDraft({
        prompt,
        linkedInProfileId: linkedinProfile?.id,
        language: "en",
        tone: "professional",
        postLength: "medium",
        category: "general",
      }),
    {
      onSuccess: (response) => {
        toast({
          title: "Success",
          description:
            "Your LinkedIn post has been generated and saved as a draft.",
        });
        setPrompt("");
        // Redirect to studio page with draft ID
        router.push(`/studio?draft_id=${response.data.post.id}`);
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to generate post",
          variant: "destructive",
        });
      },
    }
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      {/* Animated gradient rings */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute w-[1000px] h-[1000px] -left-[400px] -top-[400px] rounded-full bg-gradient-to-br from-blue-100/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute w-[1000px] h-[1000px] -right-[400px] -bottom-[400px] rounded-full bg-gradient-to-tl from-blue-100/20 to-transparent"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 mb-20"
        >
          <div className="text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-neutral-600 flex items-center gap-3 shadow-sm">
            <span className="font-medium">Boostfury</span>
            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
            <span>LinkedIn Content Generator</span>
          </div>
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-neutral-900">
              What would you like to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                create
              </span>{" "}
              today?
            </h1>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {/* Input Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the LinkedIn post you want to create..."
                className="w-full min-h-[160px] resize-none bg-white/80 backdrop-blur-sm text-neutral-900 placeholder:text-neutral-500 rounded-xl border border-neutral-200/80 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 p-8 text-lg shadow-lg transition-all duration-300"
              />
              <div className="absolute right-4 bottom-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-neutral-100/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-neutral-200/50">
                  <kbd className="text-xs text-neutral-600 font-medium">
                    ESC
                  </kbd>
                </div>
                <ShimmerButton
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="h-11 px-6 rounded-lg text-base font-medium shadow-lg"
                  background="linear-gradient(110deg, #2563eb, #3b82f6, #60a5fa)"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
                    {isLoading ? "Generating..." : "Generate Post"}
                  </span>
                  <span className="ml-2 opacity-70">⌘</span>
                </ShimmerButton>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <div className="flex justify-end">
            <button className="text-sm text-neutral-500 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group">
              <span>Share template</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkedInChatPage;
