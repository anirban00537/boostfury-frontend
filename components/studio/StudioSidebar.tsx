"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  HelpCircle,
  Sparkles,
  Wand2,
  Loader2,
  ChevronLeft,
  MessageSquare,
  Zap,
  Linkedin,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GradientButton } from "@/components/ui/gradient-button";

interface StudioSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  prompt: string;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  tone: string;
  onToneChange: (tone: string) => void;
  postLength?: "short" | "medium" | "long";
  onPostLengthChange?: (length: "short" | "medium" | "long") => void;
  linkedinProfile: any;
}

const StudioSidebar: React.FC<StudioSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  tone,
  onToneChange,
  postLength = "medium",
  onPostLengthChange = () => {},
  linkedinProfile,
}) => {
  return (
    <motion.div
      className={cn(
        "h-screen border-r border-gray-200/50 bg-gradient-to-b from-white via-gray-50/50 to-gray-100/50 relative backdrop-blur-xl transition-all duration-300",
        isCollapsed ? "w-0" : "w-[400px]"
      )}
    >
      <div
        className={cn(
          "flex-1 overflow-hidden h-full flex flex-col",
          isCollapsed && "hidden"
        )}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-none p-6 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm"
        >
          <Link href="/dashboard" className="group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 text-transparent bg-clip-text">
                  AI Content Studio
                </h2>
                <p className="text-xs text-gray-500">Powered by Advanced AI</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* LinkedIn Profile Section */}
        <div className="flex-none p-4">
          {linkedinProfile ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-white via-white/95 to-gray-50 border border-gray-200/60 shadow-sm">
              <div className="relative">
                <Image
                  src={linkedinProfile.avatarUrl}
                  alt={linkedinProfile.name}
                  width={32}
                  height={32}
                  className="rounded-lg ring-2 ring-white"
                />
                <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {linkedinProfile.name}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Linkedin className="size-3 text-[#0A66C2]" />
                  Connected Profile
                </p>
              </div>
            </div>
          ) : (
            <Link href="/account" className="block">
              <div className="p-6 text-center rounded-xl border border-gray-200/60 bg-gradient-to-br from-white via-white/95 to-gray-50 shadow-sm">
                <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 flex items-center justify-center mx-auto mb-3">
                  <Linkedin className="size-6 text-[#0A66C2]" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  No Profile Connected
                </h3>
                <GradientButton
                  variant="outline"
                  size="sm"
                  shadow="soft"
                  leftIcon={<Linkedin className="size-4" />}
                >
                  Connect LinkedIn
                </GradientButton>
              </div>
            </Link>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Writing Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Content Prompt
                </h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <GradientButton
                      variant="outline"
                      size="sm"
                      shadow="soft"
                      className="size-8 p-0"
                      leftIcon={<HelpCircle className="size-4 text-gray-500" />}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Describe what you want to write about</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <textarea
                  value={prompt}
                  onChange={onPromptChange}
                  placeholder="What would you like to write about?"
                  className="w-full h-32 p-3 text-sm bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <GradientButton
                variant="primary"
                size="default"
                shadow="default"
                fullWidth
                onClick={onGenerate}
                disabled={isGenerating}
                className="relative h-12 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#4F46E5] hover:from-[#4338CA] hover:via-[#6D28D9] hover:to-[#4338CA] border-0 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300"
                leftIcon={
                  isGenerating ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Wand2 className="size-5" />
                  )
                }
              >
                {isGenerating ? "Generating..." : "Generate Content"}
              </GradientButton>
            </div>

            {/* Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Zap className="size-4" />
                  Content Settings
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 px-2">
                    Tone of Voice
                  </label>
                  <Select value={tone} onValueChange={onToneChange}>
                    <SelectTrigger className="w-full h-10 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl">
                      <SelectValue
                        defaultValue="professional"
                        placeholder="Professional"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">
                        <div className="flex items-center gap-2">
                          <span>💼</span> Professional
                        </div>
                      </SelectItem>
                      <SelectItem value="casual">
                        <div className="flex items-center gap-2">
                          <span>😊</span> Casual
                        </div>
                      </SelectItem>
                      <SelectItem value="friendly">
                        <div className="flex items-center gap-2">
                          <span>🤝</span> Friendly
                        </div>
                      </SelectItem>
                      <SelectItem value="humorous">
                        <div className="flex items-center gap-2">
                          <span>😄</span> Humorous
                        </div>
                      </SelectItem>
                      <SelectItem value="formal">
                        <div className="flex items-center gap-2">
                          <span>👔</span> Formal
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 px-2">
                    Post Length
                  </label>
                  <Tabs
                    value={postLength}
                    onValueChange={(value: any) => onPostLengthChange(value)}
                    className="w-full"
                  >
                    <TabsList className="w-full h-10 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl p-1">
                      <TabsTrigger
                        value="short"
                        className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-violet-500/10"
                      >
                        Short
                      </TabsTrigger>
                      <TabsTrigger
                        value="medium"
                        className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-violet-500/10"
                      >
                        Medium
                      </TabsTrigger>
                      <TabsTrigger
                        value="long"
                        className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-violet-500/10"
                      >
                        Long
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapse Button */}
      <GradientButton
        variant="outline"
        size="sm"
        shadow="soft"
        className="absolute -right-4 top-6 size-8 p-0 rounded-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
        leftIcon={
          <ChevronLeft
            className={cn("size-4 text-gray-600 transition-transform", {
              "rotate-180": isCollapsed,
            })}
          />
        }
      />
    </motion.div>
  );
};

export default StudioSidebar;
