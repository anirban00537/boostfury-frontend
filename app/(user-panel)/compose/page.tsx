"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ComposeSection } from "@/components/content-create/ComposeSection";
import { useContentPosting } from "@/hooks/useContent";
import { LinkedInProfileUI } from "@/types/post";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PostPreview } from "@/components/content-create/PostPreview";
import Link from "next/link";

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

  const handleProfileSelect = useCallback(
    (profile: LinkedInProfileUI) => {
      setSelectedProfile(profile);
    },
    [setSelectedProfile]
  );

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-gray-50/50">
      {/* Header - Removed fixed positioning */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {isEditing ? "Edit Content" : "Create Content"}
                </h1>
                <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-xs font-medium text-primary">
                    {isEditing ? "Draft" : "New Post"}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEditing
                  ? "Refine your draft and prepare it for your LinkedIn audience."
                  : "Create engaging LinkedIn content with AI-powered assistance."}
              </p>
            </div>

            {/* Profile Selector - Adjusted for better alignment */}
            <div className="flex items-center gap-3 sm:ml-auto">
              <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Profile</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className={`
                      h-10 px-4 gap-2.5 transition-all duration-200 shadow-sm
                      ${
                        !selectedProfile
                          ? "text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                          : "border-primary/20 hover:border-primary/30 hover:bg-primary/5"
                      }
                    `}
                  >
                    {selectedProfile ? (
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <Image
                            src={selectedProfile.avatarUrl}
                            alt={selectedProfile.name}
                            width={24}
                            height={24}
                            className="rounded-full ring-2 ring-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                        </div>
                        <span className="text-sm font-medium truncate max-w-[150px]">
                          {selectedProfile.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <Linkedin className="h-4 w-4 text-current" />
                        <span className="text-sm font-medium">
                          Select Profile
                        </span>
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[280px] p-2">
                  <div className="px-3 py-2 mb-1 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900">
                      LinkedIn Profiles
                    </h4>
                  </div>
                  {linkedinProfiles.length > 0 ? (
                    linkedinProfiles.map((profile) => (
                      <DropdownMenuItem
                        key={profile.id}
                        onClick={() => handleProfileSelect(profile)}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
                          ${
                            selectedProfile?.id === profile.id
                              ? "bg-primary/5 text-primary"
                              : "hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="relative">
                          <Image
                            src={profile.avatarUrl}
                            alt={profile.name}
                            width={32}
                            height={32}
                            className="rounded-full ring-2 ring-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                        </div>
                        <span className="text-sm font-medium">
                          {profile.name}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-3">
                        <Linkedin className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        No Profiles Connected
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 text-sm border-primary/20 text-primary hover:bg-primary/5"
                        onClick={() => {
                          /* Add your LinkedIn connect logic */
                        }}
                      >
                        Connect LinkedIn
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Updated for better scrolling */}
      <div className="flex-1">
        {!linkedinProfiles.length ? (
          // No LinkedIn Profile Error State (Centered in scrollable area)
          <div className="h-full flex items-center justify-center p-4 sm:p-6">
            <div className="rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-red-100 p-12 max-w-2xl">
              <div className="max-w-md mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/linkedin-logo.webp"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="h-8 w-8 text-red-500"
                  />
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  LinkedIn Profile Required
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Please connect your LinkedIn profile to start creating and
                  managing content. This allows us to post directly to your
                  LinkedIn account.
                </p>

                <div className="flex flex-col items-center gap-4">
                  <Link href="/accounts">
                    <Button
                      variant="default"
                      size="lg"
                      className="h-11 px-6 gap-2 bg-gradient-to-r from-primary to-primary/80 
                               hover:from-primary/90 hover:to-primary/70 text-white shadow-md"
                    >
                      <Image
                        src="/linkedin-logo.webp"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        className="h-5 w-5"
                      />
                      Connect LinkedIn Profile
                    </Button>
                  </Link>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span>
                      Your data is secure and we never post without your permission
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 2xl:max-w-[2000px] 2xl:mx-auto">
            {/* Left Column - Updated scroll handling */}
            <div className="flex flex-col h-full lg:border-r border-gray-100">
              <div className="px-4 sm:px-6 lg:px-8 py-6">
                {isLoadingDraft ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
                        <FileText className="w-8 h-8 text-primary opacity-50" />
                      </div>
                      <div className="space-y-2 text-center">
                        <p className="text-base font-medium text-gray-900">
                          Loading Draft
                        </p>
                        <p className="text-sm text-gray-500">
                          Please wait while we fetch your content
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ComposeSection
                    content={content}
                    setContent={setContent}
                    isGenerating={isGenerating}
                    setIsGenerating={setIsGenerating}
                    isScheduleModalOpen={isScheduleModalOpen}
                    setIsScheduleModalOpen={setIsScheduleModalOpen}
                    scheduledDate={scheduledDate}
                    onSchedule={handleSchedule}
                    isEditing={isEditing}
                    postDetails={postDetails}
                    onPostNow={handlePostNow}
                    isPosting={isPosting}
                    selectedLinkedInProfile={selectedProfile}
                    onProfileSelect={setSelectedProfile}
                    isAutoSaving={isAutoSaving}
                    imageUrls={imageUrls}
                    onImageUrlsChange={handleImageUrlsChange}
                    postId={postDetails?.id || ''}
                    handleImageUpload={handleImageUpload}
                    handleImageDelete={handleImageDelete}
                    handleImageReorder={handleImageReorder}
                    isUploading={isUploading}
                    imageOrder={images.map((img) => img.id)}
                    onAddToQueue={handleAddToQueue}
                    isAddingToQueue={isAddingToQueue}
                  />
                )}
              </div>
            </div>

            {/* Right Column - Updated scroll handling */}
            <div className="flex flex-col h-full bg-gray-50/80">
              <div className="px-4 sm:px-6 lg:px-8 py-6">
                <PostPreview
                  title="Content Preview"
                  content={content}
                  isGenerating={isGenerating}
                  hideViewModeSelector={false}
                  selectedProfile={selectedProfile}
                  imageUrls={imageUrls}
                  // documentUrl={documentUrl}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComposePage;
