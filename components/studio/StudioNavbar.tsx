"use client";
import React, { useState } from "react";
import { Menu, Plus, Save, Calendar, ArrowLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { ScheduleModal } from "@/components/content-create/ScheduleModal";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";

interface StudioNavbarProps {
  onMenuClick: () => void;
  onPostNow: () => void;
  onAddToQueue: () => void;
  onSchedule: (date: Date) => void;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isAutoSaving: boolean;
  isScheduling: boolean;
}

const StudioNavbar: React.FC<StudioNavbarProps> = ({
  onMenuClick,
  onPostNow,
  onAddToQueue,
  onSchedule,
  isPosting,
  isAddingToQueue,
  isAutoSaving,
  isScheduling,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 border-b border-gray-200/50 bg-white backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20"
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <GradientButton
            variant="outline"
            size="sm"
            shadow="soft"
            className="lg:hidden"
            onClick={onMenuClick}
            leftIcon={<Menu className="size-5" />}
          />

          <Link href="/dashboard" className="group flex items-center gap-2">
            <GradientButton
              variant="outline"
              size="sm"
              shadow="soft"
              className="size-9 rounded-xl"
              leftIcon={<ArrowLeft className="size-5" />}
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                Back to Dashboard
              </p>
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden sm:block">
                <GradientButton
                  variant="outline"
                  size="sm"
                  shadow="soft"
                  onClick={() => setIsScheduleModalOpen(true)}
                  disabled={isScheduling}
                  leftIcon={<Calendar className="size-4" />}
                >
                  {isScheduling ? "Scheduling..." : "Schedule"}
                </GradientButton>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Schedule your post</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden sm:block">
                <GradientButton
                  variant="outline"
                  size="sm"
                  shadow="soft"
                  onClick={onAddToQueue}
                  disabled={isAddingToQueue}
                  leftIcon={<Plus className="size-4" />}
                >
                  {isAddingToQueue ? "Adding to queue..." : "Add to queue"}
                </GradientButton>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add content to your queue</p>
            </TooltipContent>
          </Tooltip>

          <GradientButton
            variant="primary"
            size="sm"
            shadow="default"
            onClick={onPostNow}
            disabled={isPosting}
            leftIcon={<Save className="size-4" />}
          >
            {isPosting ? "Publishing..." : "Publish Now"}
          </GradientButton>
        </div>
      </motion.div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
        isScheduling={isScheduling}
      />
    </>
  );
};

export default StudioNavbar;
