import { Source_Sans_3 } from "next/font/google";
import {
  Copy,
  ThumbsUp,
  Calendar,
  Clock,
  Send,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useState } from "react";
import { ScheduleModal } from "./schedule-modal";
import { PostActionSheet } from "./post-action-sheet";

// Initialize the font
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

interface LinkedInPostPreviewProps {
  content: string;
  onPostNow?: () => void;
  onQueue?: () => void;
  onSchedule?: (date: Date) => void;
  onRewrite?: (type: string) => void;
  onContentChange?: (content: string) => void;
  showActions?: boolean;
  showAIButton?: boolean;
  isEditable?: boolean;
}

export function LinkedInPostPreview({
  content,
  onPostNow,
  onQueue,
  onSchedule,
  onRewrite,
  onContentChange,
  showActions = true,
  showAIButton = true,
  isEditable = false,
}: LinkedInPostPreviewProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editableContent, setEditableContent] = useState(content);

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerText;
    setEditableContent(newContent);
    onContentChange?.(newContent);
  };

  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("•")) {
        return (
          <div key={i} className="flex items-start gap-1.5 mb-0.5 pl-0.5">
            <span className="text-gray-600">•</span>
            <span className={`flex-1 ${sourceSans.className}`}>
              {line.slice(1).trim()}
            </span>
          </div>
        );
      }

      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }

      const words = line.split(" ");
      const formattedWords = words.map((word, j) => {
        if (word.startsWith("#")) {
          return (
            <span
              key={j}
              className={`text-[#0a66c2] hover:underline cursor-pointer ${sourceSans.className}`}
            >
              {word}{" "}
            </span>
          );
        }
        return word + " ";
      });

      return (
        <p
          key={i}
          className={`${line.trim() !== "" ? "mb-2 last:mb-0" : ""} ${sourceSans.className}`}
        >
          {formattedWords}
        </p>
      );
    });
  };

  const handleSchedule = (date: Date) => {
    onSchedule?.(date);
    setIsScheduleModalOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-[540px] mx-auto bg-white rounded-xl shadow-md border border-gray-200/80 overflow-hidden hover:shadow-lg mb-64 transition-shadow duration-200 ${sourceSans.className}`}
      >
        {/* Header */}
        <div className="border-b border-gray-100">
          <div className="flex items-start justify-between p-4">
            <div className="flex gap-3">
              <div className="relative group">
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  src="https://media.licdn.com/dms/image/v2/D4E03AQGSALKCBLx4wQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1680857805267?e=1742428800&v=beta&t=YpN5D34ajmReumjdL6XvZmnh3EWhbSK6Gt4H_Hh0PKg"
                  alt="LinkedIn Profile"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-4 group-hover:ring-blue-50 transition-all duration-200"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-4.5 w-4.5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-bold text-[#0a66c2]">3</span>
                </div>
              </div>
              <div className="flex flex-col pt-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-semibold text-gray-900 hover:text-[#0a66c2] hover:underline cursor-pointer">
                    Eilidh Morone
                  </span>
                  <span className="text-[14px] text-gray-500">• 1st</span>
                  <svg
                    className="w-4 h-4 text-[#0a66c2]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M13.5 3.5a2 2 0 110 4 2 2 0 010-4zM13.5 9.5a2 2 0 110 4 2 2 0 010-4zM6.5 9.5a2 2 0 110 4 2 2 0 010-4zM6.5 3.5a2 2 0 110 4 2 2 0 010-4z" />
                  </svg>
                </div>
                <span className="text-[13px] text-gray-600 font-medium">
                  Software Engineer at BoostFury
                </span>
                <div className="flex items-center gap-1 text-[12px] text-gray-500 mt-0.5">
                  <span>22h</span>
                  <span>•</span>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 15a7 7 0 110-14 7 7 0 010 14zM7 7H4v1h3v3h1V8h3V7H8V4H7v3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showActions && (
                <PostActionSheet
                  content={content}
                  onPostNow={onPostNow}
                  onQueue={onQueue}
                  onSchedule={() => setIsScheduleModalOpen(true)}
                />
              )}

              {showAIButton && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 gap-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 hover:from-blue-600 hover:to-indigo-700 hover:shadow-md transition-all duration-200 rounded-full hover:text-white"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Writing
                      <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl">
                    <DropdownMenuItem
                      onClick={() => onRewrite?.("grammar")}
                      className="gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-sm">Enhance Grammar & Style</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewrite?.("hook")}
                      className="gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-sm">Improve Opening Hook</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewrite?.("shorter")}
                      className="gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-sm">Make More Concise</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRewrite?.("longer")}
                      className="gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-sm">Expand Content</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-3 pb-2">
          <div
            contentEditable={isEditable}
            suppressContentEditableWarning
            onInput={handleContentChange}
            className="text-[14px] text-gray-900 leading-[1.4] text-left outline-none focus:outline-none min-h-[100px] whitespace-pre-wrap"
          >
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100">
          {/* Reactions and Stats */}
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex items-center justify-between text-[12px] text-gray-500">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center shadow-sm">
                    <ThumbsUp className="w-2 h-2 text-white" />
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-red-500 flex items-center justify-center shadow-sm">
                    <svg
                      className="w-2 h-2 text-white"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 15a7 7 0 110-14 7 7 0 010 14zM7 7H4v1h3v3h1V8h3V7H8V4H7v3z" />
                    </svg>
                  </div>
                </div>
                <span className="ml-1">You and 47 others</span>
              </div>
              <div className="flex items-center gap-2">
                <span>22 comments</span>
                <span>•</span>
                <span>8 reposts</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 px-2 py-1.5 bg-white">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 h-8 px-3 text-[13px] font-medium hover:bg-gray-50 hover:text-[#0a66c2] flex-1 transition-colors"
            >
              <ThumbsUp className="w-4 h-4 mr-1.5" />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 h-8 px-3 text-[13px] font-medium hover:bg-gray-50 hover:text-[#0a66c2] flex-1 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Comment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 h-8 px-3 text-[13px] font-medium hover:bg-gray-50 hover:text-[#0a66c2] flex-1 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4v7a4 4 0 004 4h12M4 11l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Repost
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 h-8 px-3 text-[13px] font-medium hover:bg-gray-50 hover:text-[#0a66c2] flex-1 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 10h10a4 4 0 010 8h-4M7 10l-4-4m0 0l4-4m-4 4h11a7 7 0 017 7v0a7 7 0 01-7 7H7" />
              </svg>
              Send
            </Button>
          </div>
        </div>
      </motion.div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleSchedule}
      />
    </>
  );
}
