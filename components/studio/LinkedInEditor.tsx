import React, { useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  Smile,
  ImageIcon,
  Clock,
  Globe2,
  MoreHorizontal,
  Hash,
  Link2,
} from "lucide-react";
import { LinkedInPostImage } from "@/types/post";
import { motion } from "framer-motion";

interface LinkedInEditorProps {
  content: string;
  linkedinProfile: any;
  postDetails: any;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isScheduling: boolean;
  onContentChange: (content: string) => void;
  onImageUpload: () => void;
  onEmojiPickerToggle: () => void;
  onSchedule: () => void;
  onAddToQueue: () => void;
  onPostNow: () => void;
  onImageDelete: (imageId: string) => void;
}

export const LinkedInEditor: React.FC<LinkedInEditorProps> = ({
  content,
  linkedinProfile,
  postDetails,
  isPosting,
  isAddingToQueue,
  isScheduling,
  onContentChange,
  onImageUpload,
  onEmojiPickerToggle,
  onSchedule,
  onAddToQueue,
  onPostNow,
  onImageDelete,
}) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-white"
    >
      {/* Profile Header */}
      <div className="flex-none p-4 flex items-start justify-between border-b border-[#e0dfdd]">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 rounded-full ring-2 ring-white shadow-sm">
              <img
                src={linkedinProfile?.avatarUrl || "/linkedin-logo.webp"}
                alt={linkedinProfile?.name || ""}
                className="h-full w-full object-cover rounded-full"
              />
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#191919]">
              {linkedinProfile?.name || "LinkedIn Profile"}
            </span>
            <button className="flex items-center gap-1 text-[13px] text-[#666666] mt-0.5 hover:bg-[#f3f2ef] px-2 -ml-2 py-1 rounded-md transition-colors">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Anyone</span>
              <svg
                className="w-3 h-3 ml-0.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 10L4 6h8l-4 4z" />
              </svg>
            </button>
          </div>
        </div>
        <button className="p-2 text-[#666666] hover:bg-[#f3f2ef] rounded-full transition-all">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="relative h-[70vh]">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="What do you want to talk about?"
              className="w-full h-full text-[#333333] text-[15px] leading-[1.6] bg-transparent border-none focus:outline-none resize-none placeholder:text-[#666666] py-2"
            />
            <div className="absolute right-2 bottom-2 text-xs text-[#666666] bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm">
              {content.length} characters
            </div>
          </div>

          {/* Image Grid */}
          {postDetails?.images && postDetails.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-2 mt-4"
            >
              {postDetails.images.map((image: LinkedInPostImage) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-[#e0dfdd]"
                >
                  <img
                    src={image.imageUrl}
                    alt="Post image"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => onImageDelete(image.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white transition-all shadow-lg hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-none border-t border-[#e0dfdd] bg-white">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={onImageUpload}
              className="p-2 text-[#666666] hover:bg-[#f3f2ef] rounded-full transition-all group relative"
              title="Add media"
            >
              <ImageIcon className="w-5 h-5 group-hover:text-[#0a66c2] transition-colors" />
            </button>
            <button
              onClick={onEmojiPickerToggle}
              className="p-2 text-[#666666] hover:bg-[#f3f2ef] rounded-full transition-all group"
              title="Add emoji"
            >
              <Smile className="w-5 h-5 group-hover:text-[#0a66c2] transition-colors" />
            </button>
            <button
              className="p-2 text-[#666666] hover:bg-[#f3f2ef] rounded-full transition-all group"
              title="Add hashtag"
            >
              <Hash className="w-5 h-5 group-hover:text-[#0a66c2] transition-colors" />
            </button>
            <button
              className="p-2 text-[#666666] hover:bg-[#f3f2ef] rounded-full transition-all group"
              title="Add link"
            >
              <Link2 className="w-5 h-5 group-hover:text-[#0a66c2] transition-colors" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSchedule}
              disabled={isScheduling}
              className="h-8 px-3 text-sm font-medium text-[#666666] hover:bg-[#f3f2ef] rounded-full transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>Schedule</span>
            </button>
            <button
              onClick={onAddToQueue}
              disabled={isAddingToQueue}
              className="h-8 px-4 text-sm font-medium text-[#666666] bg-[#f3f2ef] hover:bg-[#e5e5e5] rounded-full transition-all disabled:opacity-50"
            >
              {isAddingToQueue ? "Adding..." : "Add to Queue"}
            </button>
            <motion.button
              onClick={onPostNow}
              disabled={isPosting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-8 px-6 text-sm font-medium text-white bg-[#0a66c2] rounded-full hover:bg-[#004182] transition-all disabled:opacity-50 shadow-sm"
            >
              {isPosting ? "Posting..." : "Post"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
