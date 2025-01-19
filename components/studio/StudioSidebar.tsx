"use client";
import React, { useState } from "react";
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
  Plus,
  Save,
  Calendar,
  Pencil,
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
import { ScheduleModal } from "@/components/content-create/ScheduleModal";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";

interface StudioSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  linkedinProfile: any;
  onPostNow: () => void;
  onAddToQueue: () => void;
  onSchedule: (date: Date) => void;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isScheduling: boolean;
  content: string;
  isGenerating: boolean;
  status: "scheduled" | "draft" | "published" | "failed";
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    user_name: string;
    photo: string | null;
  };
  imageUrls?: string[];
  publishedAt?: string;
  scheduledTime?: string;
}

const StudioSidebar: React.FC<StudioSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  linkedinProfile,
  onPostNow,
  onAddToQueue,
  onSchedule,
  isPosting,
  isAddingToQueue,
  isScheduling,
  content,
  isGenerating,
  status,
  user,
  imageUrls,
  publishedAt,
  scheduledTime,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <motion.div
      className={cn(
        "fixed top-0 right-0 h-screen border-l border-gray-200/50 bg-white backdrop-blur-xl shadow-lg shadow-gray-100/50 z-40",
        isCollapsed ? "w-0" : "w-[400px]"
      )}
      animate={{ width: isCollapsed ? 0 : 400 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute top-6 -left-3 size-6 bg-white rounded-full border border-gray-200/50 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors",
          isCollapsed && "hidden"
        )}
      >
        <ChevronLeft className="size-4 text-gray-500" />
      </button>

      <div
        className={cn(
          "h-full flex flex-col bg-gray-50/50",
          isCollapsed && "hidden"
        )}
      >
        {/* Post Preview Section */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <PostPreviewNotRedux
            content={content}
            isGenerating={isGenerating}
            status={status}
            linkedInProfile={linkedinProfile}
            user={user}
            imageUrls={imageUrls}
            dropdownItems={[
              {
                label: "Post Now",
                icon: <Pencil className="h-4 w-4" />,
                onClick: onPostNow,
              },
            ]}
            publishedAt={publishedAt}
            scheduledTime={scheduledTime}
          />
        </div>

        {/* Fixed Bottom Section with Publishing Controls */}
        <div className="mt-auto p-4 bg-white border-t border-gray-200/60 space-y-3">
          {/* Publishing Controls */}
          <div className="flex flex-col gap-2">
            <GradientButton
              variant="outline"
              size="sm"
              shadow="soft"
              onClick={() => setIsScheduleModalOpen(true)}
              disabled={isScheduling}
              leftIcon={<Calendar className="size-4" />}
              fullWidth
            >
              {isScheduling ? "Scheduling..." : "Schedule"}
            </GradientButton>

            <GradientButton
              variant="outline"
              size="sm"
              shadow="soft"
              onClick={onAddToQueue}
              disabled={isAddingToQueue}
              leftIcon={<Plus className="size-4" />}
              fullWidth
            >
              {isAddingToQueue ? "Adding to queue..." : "Add to queue"}
            </GradientButton>
          </div>

          {/* Publish Now Button */}
          <GradientButton
            variant="primary"
            size="default"
            shadow="default"
            fullWidth
            onClick={onPostNow}
            disabled={isPosting}
            className="relative h-11 bg-[#0A66C2] hover:bg-[#004182] border-0 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            leftIcon={<Save className="size-4" />}
          >
            {isPosting ? "Publishing..." : "Publish Now"}
          </GradientButton>
        </div>
      </div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
        isScheduling={isScheduling}
      />
    </motion.div>
  );
};

export default StudioSidebar;
