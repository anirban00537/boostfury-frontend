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
  FileText,
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
  onContentChange?: (content: string) => void;
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
  onContentChange,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <motion.div
      className={cn(
        "fixed top-0 right-0 h-screen border-l border-neutral-200/50 bg-white backdrop-blur-xl shadow-lg shadow-neutral-100/50 z-40",
        isCollapsed ? "w-0" : "w-[400px]"
      )}
      animate={{ width: isCollapsed ? 0 : 400 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute top-6 -left-3 size-6 bg-white rounded-full border border-neutral-200/50 shadow-sm flex items-center justify-center hover:bg-neutral-50 transition-colors z-50",
          isCollapsed ? "-left-10 shadow-md" : "-left-3"
        )}
      >
        <ChevronLeft
          className={cn(
            "size-4 text-neutral-500 transition-transform",
            isCollapsed && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "h-full flex flex-col bg-gray-50/50",
          isCollapsed && "hidden"
        )}
      >
        {/* Post Preview Section */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {content ? (
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
              onContentChange={onContentChange}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
              <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center mb-4 border border-gray-200/60">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                No Content Yet
              </h3>
              <p className="text-xs text-gray-500 max-w-[200px]">
                Start by typing your prompt above and generate your first
                LinkedIn post
              </p>
            </div>
          )}
        </div>

        {/* Fixed Bottom Section with Publishing Controls */}
        <div className="mt-auto p-4 bg-white border-t border-gray-200/60">
          {/* Publishing Controls */}
          <div className="flex items-center gap-2">
            <GradientButton
              variant="outline"
              size="sm"
              shadow="soft"
              onClick={() => setIsScheduleModalOpen(true)}
              disabled={isScheduling}
              leftIcon={<Calendar className="size-4" />}
              className="flex-1"
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
              className="flex-1"
            >
              {isAddingToQueue ? "Adding..." : "Queue"}
            </GradientButton>

            <GradientButton
              variant="primary"
              size="sm"
              shadow="default"
              onClick={onPostNow}
              disabled={isPosting}
              className="flex-1 relative h-9 bg-[#0A66C2] hover:bg-[#004182] border-0 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              leftIcon={<Save className="size-4" />}
            >
              {isPosting ? "Publishing..." : "Publish"}
            </GradientButton>
          </div>
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
