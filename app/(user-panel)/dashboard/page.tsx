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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-blue-50/30">
      {/* Animated gradient rings */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute w-[1200px] h-[1200px] -left-[400px] -top-[400px] rounded-full bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute w-[1200px] h-[1200px] -right-[400px] -bottom-[400px] rounded-full bg-gradient-to-tl from-blue-100/30 via-purple-100/20 to-transparent blur-3xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-8 mb-16"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm bg-white/70 backdrop-blur-xl px-5 py-2.5 rounded-full text-neutral-600 flex items-center gap-3 shadow-md border border-neutral-100/50 hover:shadow-lg transition-all duration-300"
          >
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ai
            </span>
            <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
            <span className="text-neutral-500">LinkedIn Content Generator</span>
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-neutral-900">
              What would you like to{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  create
                </span>
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute bottom-0 left-0 h-[6px] bg-gradient-to-r from-blue-400/40 via-indigo-400/40 to-purple-400/40 rounded-full blur-sm"
                />
              </span>{" "}
              today?
            </h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Transform your ideas into engaging LinkedIn content with
              AI-powered assistance
            </p>
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
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the LinkedIn post you want to create..."
                className="w-full min-h-[180px] resize-none bg-white/90 backdrop-blur-xl text-neutral-900 placeholder:text-neutral-400 rounded-xl border border-neutral-200/80 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 p-8 text-lg shadow-lg transition-all duration-300"
              />
              <div className="absolute right-4 bottom-4">
                <ShimmerButton
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="h-12 px-8 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                          className="w-4 h-4 border-2 border-white/30 border-t-white/90 rounded-full"
                        />
                        Generating...
                      </>
                    ) : (
                      <>Generate Post</>
                    )}
                  </span>
                </ShimmerButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkedInChatPage;
