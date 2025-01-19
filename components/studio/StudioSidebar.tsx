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
        "h-screen border-r border-gray-200/50 bg-white relative backdrop-blur-xl transition-all duration-300 shadow-lg shadow-gray-100/50 z-50",
        isCollapsed ? "w-0" : "w-[350px]"
      )}
      animate={{ width: isCollapsed ? 0 : 350 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "flex-1 overflow-hidden h-full flex flex-col bg-gray-50/50",
          isCollapsed && "hidden"
        )}
      >
        {/* Header Section */}
        <Link href="/dashboard">
          <div className="flex-none px-6 pt-6 pb-4 bg-white">
            <div className="flex items-start gap-2">
              <Image
              src="/single-logo.svg"
              alt="BoostFury Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-gray-900">BoostFury</h1>
              <p className="text-[10px] font-medium text-gray-500">AI Studio</p>
              </div>
            </div>
          </div>
        </Link>

        {/* LinkedIn Profile Section */}
        <div className="flex-none px-4 py-3">
          {linkedinProfile ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="relative">
                <Image
                  src={linkedinProfile.avatarUrl}
                  alt={linkedinProfile.name}
                  width={36}
                  height={36}
                  className="rounded-lg ring-2 ring-white shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full ring-2 ring-white shadow-sm" />
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
              <div className="p-4 text-center rounded-xl bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="size-10 rounded-xl bg-gradient-to-br from-[#92C8FF]/5 to-[#0A66C2]/5 flex items-center justify-center mx-auto mb-2">
                  <Linkedin className="size-5 text-[#0A66C2]" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  No Profile Connected
                </h3>
                <GradientButton
                  variant="outline"
                  size="sm"
                  shadow="soft"
                  leftIcon={<Linkedin className="size-4" />}
                  className="bg-white"
                >
                  Connect LinkedIn
                </GradientButton>
              </div>
            </Link>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
          <div className="px-4 py-3 space-y-4">
            {/* Settings Section */}
            <div className="space-y-4">
              {/* Post Length */}
              <div className="space-y-2.5 bg-white p-4 rounded-xl border border-gray-200/60">
                <label className="text-sm font-medium text-gray-700">
                  Post Length
                </label>
                <Tabs
                  value={postLength}
                  onValueChange={(value: any) => onPostLengthChange(value)}
                  className="w-full"
                >
                  <TabsList className="w-full h-10 bg-gray-100/80 border border-gray-200/60 rounded-lg p-1">
                    <TabsTrigger
                      value="short"
                      className="flex-1 rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors"
                    >
                      Short
                    </TabsTrigger>
                    <TabsTrigger
                      value="medium"
                      className="flex-1 rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors"
                    >
                      Medium
                    </TabsTrigger>
                    <TabsTrigger
                      value="long"
                      className="flex-1 rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors"
                    >
                      Long
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Tone of Voice */}
              <div className="space-y-2.5 bg-white p-4 rounded-xl border border-gray-200/60">
                <label className="text-sm font-medium text-gray-700">
                  Tone of Voice
                </label>
                <Select value={tone} onValueChange={onToneChange}>
                  <SelectTrigger className="w-full h-10 bg-gray-100/80 border border-gray-200/60 rounded-lg hover:border-gray-300/80 transition-colors">
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

              {/* Writing Section */}
              <div className="space-y-2.5 bg-white p-4 rounded-xl border border-gray-200/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    Content Prompt
                  </h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <HelpCircle className="size-4 text-gray-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Describe what you want to write about</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="relative group">
                  <textarea
                    value={prompt}
                    onChange={onPromptChange}
                    placeholder="What would you like to write about?"
                    className="w-full h-32 p-3 text-sm bg-gray-100/80 border border-gray-200/60 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Generate Button */}
        <div className="flex-none p-4 bg-white border-t border-gray-200/60">
          <GradientButton
            variant="primary"
            size="default"
            shadow="default"
            fullWidth
            onClick={onGenerate}
            disabled={isGenerating}
            className="relative h-11 bg-[#7C3AED] hover:bg-[#6D28D9] border-0 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300"
            leftIcon={
              isGenerating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Wand2 className="size-4" />
              )
            }
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </GradientButton>
        </div>
      </div>
    </motion.div>
  );
};

export default StudioSidebar;
