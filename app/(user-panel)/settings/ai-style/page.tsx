"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wand2, Sparkles, Save, Plus, X, AlertCircle } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { useAiStyle } from "@/hooks/useAiStyle";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIStylePage() {
  const { aiStyle, isLoading, updateStyle, isUpdating } = useAiStyle();
  const [profile, setProfile] = useState({
    identity: "",
    topics: [] as string[],
  });
  const [newTopic, setNewTopic] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  // Update local state when API data is loaded
  useEffect(() => {
    if (aiStyle) {
      setProfile({
        identity: aiStyle.professionalIdentity || "",
        topics: aiStyle.contentTopics || [],
      });
      setCharCount(aiStyle.professionalIdentity?.length || 0);
    }
  }, [aiStyle]);

  const handleIdentityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setProfile((prev) => ({ ...prev, identity: text }));
      setCharCount(text.length);
    }
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim() && !profile.topics.includes(newTopic.trim())) {
      setProfile((prev) => ({
        ...prev,
        topics: [...prev.topics, newTopic.trim()],
      }));
      setNewTopic("");
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic) => topic !== topicToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStyle({
      professionalIdentity: profile.identity,
      contentTopics: profile.topics,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 text-neutral-600"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-500 opacity-20 blur-lg rounded-full" />
            <Loader2 className="w-8 h-8 animate-spin relative" />
          </div>
          <span className="text-sm font-medium">
            Loading your AI preferences...
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <Wand2 className="w-5 h-5 text-neutral-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  AI Voice & Style
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Customize how AI generates content based on your LinkedIn
                  presence
                </p>
              </div>
            </div>

            <GradientButton
              variant="primary"
              onClick={handleSubmit}
              disabled={isUpdating}
              className={cn(
                "shadow-sm transition-all duration-300",
                !isUpdating && "hover:shadow-md hover:-translate-y-0.5",
                isUpdating && "opacity-90"
              )}
            >
              <div className="flex items-center gap-2">
                {isUpdating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
              </div>
            </GradientButton>
          </div>
        </div>
      </motion.div>

      {/* Form Content */}
      <div className="px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-[800px] mx-auto space-y-6"
        >
          {/* Identity Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
            <div className="relative p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative size-10 rounded-xl bg-blue-500/5 flex items-center justify-center shrink-0">
                  <Sparkles className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-900">
                    Professional Identity
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Describe your professional identity, role, and expertise
                  </p>
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={profile.identity}
                  onChange={handleIdentityChange}
                  placeholder="E.g., I'm a Senior Software Engineer with 8 years of experience in cloud computing and distributed systems. I lead technical teams and mentor junior developers..."
                  className={cn(
                    "w-full h-32 px-4 py-3 text-[15px] leading-relaxed bg-neutral-50/80 rounded-xl border transition-all duration-200",
                    "placeholder:text-neutral-400 text-neutral-900 focus:outline-none resize-none",
                    "border-neutral-200/60 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30",
                    charCount > maxChars * 0.9 &&
                      "border-yellow-300 focus:ring-yellow-200",
                    charCount === maxChars &&
                      "border-red-300 focus:ring-red-200"
                  )}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {charCount > maxChars * 0.9 && (
                    <AlertCircle
                      className={cn(
                        "w-4 h-4",
                        charCount === maxChars
                          ? "text-red-500"
                          : "text-yellow-500"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      charCount > maxChars * 0.9
                        ? charCount === maxChars
                          ? "text-red-500"
                          : "text-yellow-500"
                        : "text-neutral-400"
                    )}
                  >
                    {charCount}/{maxChars}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Topics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
            <div className="relative p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative size-10 rounded-xl bg-blue-500/5 flex items-center justify-center shrink-0">
                  <Wand2 className="size-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-900">
                    Content Topics
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Add topics you frequently post about
                  </p>
                </div>
              </div>

              {/* Topic Input */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Enter a topic (e.g., Cloud Architecture)"
                    className="w-full px-4 h-10 text-[15px] bg-neutral-50/80 rounded-xl border border-neutral-200/60 
                      placeholder:text-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                      focus:border-blue-500/30 transition-all duration-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTopic(e);
                      }
                    }}
                  />
                  {profile.topics.includes(newTopic.trim()) && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="text-xs font-medium text-yellow-600">
                        Topic already exists
                      </span>
                    </div>
                  )}
                </div>
                <GradientButton
                  variant="primary"
                  onClick={handleAddTopic}
                  disabled={
                    !newTopic.trim() || profile.topics.includes(newTopic.trim())
                  }
                  className={cn(
                    "shrink-0 shadow-sm transition-all duration-300 h-10",
                    !(
                      !newTopic.trim() ||
                      profile.topics.includes(newTopic.trim())
                    ) && "hover:shadow-md hover:-translate-y-0.5"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </div>
                </GradientButton>
              </div>

              {/* Topics Display */}
              <div className="flex flex-wrap gap-2">
                {profile.topics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group/topic flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/80 rounded-lg border border-blue-100/80 hover:bg-blue-100/50 transition-colors"
                  >
                    <span className="text-sm text-blue-700">{topic}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(topic)}
                      className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5 text-blue-700" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
