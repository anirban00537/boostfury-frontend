"use client";
import React, { useState, useCallback } from "react";
import { ComposeSection } from "@/components/content-create/ComposeSection";
import { useContentPosting } from "@/hooks/useContent";
import { LinkedInProfileUI } from "@/types/post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Linkedin,
  FileText,
  ArrowLeft,
  Settings,
  HelpCircle,
  History,
  Clock,
  Calendar,
  Send,
  Sun,
  PenSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PostPreview } from "@/components/content-create/PostPreview";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ComposePage = () => {
  const {
    content,
    setContent,
    isGenerating,
    setIsGenerating,
    isCreatingDraft,
    isLoadingDraft,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    scheduledDate,
    handleSchedule,
    postDetails,
    isEditing,
    handlePostNow,
    isPosting,
    selectedProfile,
    setSelectedProfile,
    linkedinProfiles,
    isAutoSaving,
    imageUrls,
    handleImageUrlsChange,
    documentUrl,
    handleImageUpload,
    handleImageDelete,
    handleImageReorder,
    isUploading,
    images,
    handleAddToQueue,
    isAddingToQueue,
  } = useContentPosting();

  const [activeView, setActiveView] = useState<"write" | "preview">("write");

  const handleProfileSelect = useCallback(
    (profile: LinkedInProfileUI) => {
      setSelectedProfile(profile);
    },
    [setSelectedProfile]
  );

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <PenSquare className="w-5 h-5 text-neutral-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  Compose Post
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Create and schedule your LinkedIn content
                </p>
              </div>
            </div>

            {/* Profile Selector */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <Linkedin className="size-4 text-primary" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-neutral-900">Publishing To</div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group relative">
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60">
                      {selectedProfile ? (
                        <>
                          <Image
                            src={selectedProfile.avatarUrl}
                            alt={selectedProfile.name}
                            width={18}
                            height={18}
                            className="rounded-full"
                          />
                          <span className="text-sm font-medium text-neutral-900">
                            {selectedProfile.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Linkedin className="size-3.5" />
                          <span className="text-sm">Select Profile</span>
                        </>
                      )}
                      <ChevronDown className="size-3.5 text-neutral-400" />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[280px] p-2">
                  <div className="px-3 py-2 mb-1 border-b border-neutral-100">
                    <h4 className="text-sm font-medium text-neutral-900">
                      LinkedIn Profiles
                    </h4>
                  </div>
                  {linkedinProfiles.length > 0 ? (
                    linkedinProfiles.map((profile) => (
                      <DropdownMenuItem
                        key={profile.id}
                        onClick={() => handleProfileSelect(profile)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer",
                          selectedProfile?.id === profile.id
                            ? "bg-primary/5 text-primary"
                            : "hover:bg-neutral-50"
                        )}
                      >
                        <div className="relative">
                          <Image
                            src={profile.avatarUrl}
                            alt={profile.name}
                            width={28}
                            height={28}
                            className="rounded-full ring-2 ring-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 size-2 bg-green-500 rounded-full ring-2 ring-white" />
                        </div>
                        <span className="text-sm font-medium">
                          {profile.name}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-3">
                        <Linkedin className="size-5 text-primary" />
                      </div>
                      <h3 className="text-sm font-medium text-neutral-900 mb-2">
                        No Profiles Connected
                      </h3>
                      <Link href="/accounts">
                        <button className="group relative">
                          <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                          <div className="relative px-3 py-1.5 text-sm font-medium text-primary rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                            Connect LinkedIn
                          </div>
                        </button>
                      </Link>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ComposeSection
              {...{
                content,
                setContent,
                isGenerating,
                setIsGenerating,
                isScheduleModalOpen,
                setIsScheduleModalOpen,
                scheduledDate,
                onSchedule: handleSchedule,
                isEditing,
                postDetails,
                onPostNow: handlePostNow,
                isPosting,
                selectedLinkedInProfile: selectedProfile,
                onProfileSelect: setSelectedProfile,
                isAutoSaving,
                imageUrls,
                onImageUrlsChange: handleImageUrlsChange,
                postId: postDetails?.id || "",
                handleImageUpload,
                handleImageDelete,
                handleImageReorder,
                isUploading,
                imageOrder: images.map((img) => img.id),
                onAddToQueue: handleAddToQueue,
                isAddingToQueue,
              }}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <PostPreview
              title=""
              content={content}
              isGenerating={isGenerating}
              selectedProfile={selectedProfile}
              imageUrls={imageUrls}
              postDetails={postDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposePage;
