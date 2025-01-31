"use client";
import React from "react";
import {
  Linkedin,
  Users,
  Trash2,
  Wand2,
  Sparkles,
  Save,
  Plus,
  X,
  AlertCircle,
  Brain,
} from "lucide-react";
import Image from "next/image";
import useLinkedIn from "@/hooks/useLinkedIn";
import { LinkedInConnect } from "@/components/ui/linkedin-connect";
import { getUserTimezone } from "@/lib/functions";
import { useAiStyle } from "@/hooks/useAiStyle";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const AccountsPage = () => {
  const {
    profile,
    isLoadingProfiles,
    isConnecting,
    connectLinkedIn,
    disconnectProfile,
  } = useLinkedIn();

  const {
    aiStyle,
    isLoading: isLoadingAiStyle,
    updateStyle,
    isUpdating,
  } = useAiStyle();
  const [aiProfile, setAiProfile] = React.useState({
    identity: "",
    topics: [] as string[],
  });
  const [newTopic, setNewTopic] = React.useState("");
  const [charCount, setCharCount] = React.useState(0);
  const maxChars = 500;

  // Update local state when API data is loaded
  React.useEffect(() => {
    if (aiStyle) {
      setAiProfile({
        identity: aiStyle.professionalIdentity || "",
        topics: aiStyle.contentTopics || [],
      });
      setCharCount(aiStyle.professionalIdentity?.length || 0);
    }
  }, [aiStyle]);

  const handleIdentityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setAiProfile((prev) => ({ ...prev, identity: text }));
      setCharCount(text.length);
    }
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim() && !aiProfile.topics.includes(newTopic.trim())) {
      setAiProfile((prev) => ({
        ...prev,
        topics: [...prev.topics, newTopic.trim()],
      }));
      setNewTopic("");
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setAiProfile((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic) => topic !== topicToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStyle({
      professionalIdentity: aiProfile.identity,
      contentTopics: aiProfile.topics,
    });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  AI Writing Style
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Customize how AI generates content based on your preferences
                </p>
              </div>
            </div>

            {/* LinkedIn Connection in Header */}
            <div className="flex items-center gap-3">
              {profile ? (
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={profile.avatarUrl || "/default-avatar.png"}
                        alt={profile.name}
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-white"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                        <span className="text-sm font-medium text-neutral-900">
                          {profile.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <LinkedInConnect
                  onConnect={connectLinkedIn}
                  isConnecting={isConnecting}
                  variant="default"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 rounded-xl bg-white border border-neutral-200/60 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Identity Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 rounded-xl bg-gradient-to-tr from-blue-500/10 via-blue-400/10 to-blue-300/10 flex items-center justify-center shrink-0">
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
                    value={aiProfile.identity}
                    onChange={handleIdentityChange}
                    placeholder="E.g., I'm a Senior Software Engineer with 8 years of experience in cloud computing and distributed systems. I lead technical teams and mentor junior developers..."
                    className={cn(
                      "w-full h-32 px-4 py-3 text-[15px] leading-relaxed bg-white rounded-xl border transition-all duration-200",
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

              {/* Topics Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 rounded-xl bg-gradient-to-tr from-blue-500/10 via-blue-400/10 to-blue-300/10 flex items-center justify-center shrink-0">
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
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="Enter a topic (e.g., Cloud Architecture)"
                      className="w-full px-4 h-11 text-[15px] bg-white rounded-xl border border-neutral-200/60 
                        placeholder:text-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                        focus:border-blue-500/30 transition-all duration-200"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTopic(e);
                        }
                      }}
                    />
                    {aiProfile.topics.includes(newTopic.trim()) && (
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
                      !newTopic.trim() ||
                      aiProfile.topics.includes(newTopic.trim())
                    }
                    className="shrink-0 h-11"
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </div>
                  </GradientButton>
                </div>

                {/* Topics Display */}
                <div className="flex flex-wrap gap-2 min-h-[44px] p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/60">
                  {aiProfile.topics.map((topic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-blue-100/80 transition-colors"
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

              {/* Save Button */}
              <div className="pt-4">
                <GradientButton
                  variant="primary"
                  type="submit"
                  disabled={isUpdating}
                  className="w-full h-11"
                >
                  <div className="flex items-center gap-2 justify-center">
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>
                      {isUpdating ? "Saving Changes..." : "Save Changes"}
                    </span>
                  </div>
                </GradientButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
