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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PostPreview } from "@/components/content-create/PostPreview";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientButton } from "@/components/ui/gradient-button";

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
    <div className="min-h-screen ">
      <main className="px-4 py-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Selector Card - Updated with modern design */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200/50 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Publishing To
                    </h3>
                    <p className="text-xs text-gray-500">
                      Select where to publish your content
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      {selectedProfile ? (
                        <>
                          <Image
                            src={selectedProfile.avatarUrl}
                            alt={selectedProfile.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <span className="text-sm">
                            {selectedProfile.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Linkedin className="w-4 h-4" />
                          <span className="text-sm">Select Profile</span>
                        </>
                      )}
                      <ChevronDown className="w-4 h-4 opacity-50" />
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
                        <Link href="/accounts">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 text-sm border-primary/20 text-primary hover:bg-primary/5"
                          >
                            Connect LinkedIn
                          </Button>
                        </Link>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Add ComposeSection here */}
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
              postId={postDetails?.id || ""}
              handleImageUpload={handleImageUpload}
              handleImageDelete={handleImageDelete}
              handleImageReorder={handleImageReorder}
              isUploading={isUploading}
              imageOrder={images.map((img) => img.id)}
              onAddToQueue={handleAddToQueue}
              isAddingToQueue={isAddingToQueue}
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
      </main>
    </div>
  );
};

export default ComposePage;
