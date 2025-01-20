"use client";
import React, { ChangeEvent } from "react";
import { MessageSquare, HelpCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PromptBoxProps {
  prompt: string;
  tone: string;
  postLength: "short" | "medium" | "long";
  isGenerating: boolean;
  onPromptChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onToneChange: (tone: string) => void;
  onPostLengthChange: (length: "short" | "medium" | "long") => void;
  onGenerate: () => void;
}

const PromptBox: React.FC<PromptBoxProps> = ({
  prompt,
  tone,
  postLength,
  isGenerating,
  onPromptChange,
  onToneChange,
  onPostLengthChange,
  onGenerate,
}) => {
  return (
    <div className="bg-gradient-to-br from-white/80 to-white/50 rounded-3xl border border-neutral-200/60 overflow-hidden shadow-sm">
      {/* Prompt Input Section */}
      <div className="flex items-end gap-3">
        <div className="flex-1 min-h-[20px] relative group">
          <textarea
            value={prompt}
            onChange={onPromptChange}
            placeholder="What would you like to write about?"
            className="w-full h-[52px] p-4 text-[15px] leading-relaxed bg-transparent border-none focus:outline-none resize-none placeholder:text-neutral-400/80 text-neutral-600 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          />
          <style jsx global>{`
            textarea::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-500/[0.01] to-neutral-500/[0.02] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
        </div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="p-3.5 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-white rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-90 disabled:hover:translate-y-0 disabled:cursor-not-allowed disabled:hover:shadow-none group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          {isGenerating ? (
            <div className="w-5 h-5 relative">
              <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 relative z-10"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Controls Section */}
      <div className="px-5 py-3 flex items-center gap-3 bg-gradient-to-b from-transparent via-neutral-50/30 to-neutral-100/40">
        {/* Post Length Select */}
        <div className="relative group">
          <select
            value={postLength}
            onChange={(e) =>
              onPostLengthChange(e.target.value as "short" | "medium" | "long")
            }
            className="h-8 appearance-none bg-white/50 backdrop-blur-sm border border-neutral-200/60 rounded-xl pl-3 pr-8 text-xs font-medium text-neutral-600 hover:bg-white/80 hover:border-neutral-300/80 focus:outline-none transition-all duration-200 cursor-pointer w-[120px]"
          >
            <option value="short">Short Post</option>
            <option value="medium">Medium Post</option>
            <option value="long">Long Post</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Tone Select */}
        <div className="relative group">
          <select
            value={tone}
            onChange={(e) => onToneChange(e.target.value)}
            className="h-8 appearance-none bg-white/50 backdrop-blur-sm border border-neutral-200/60 rounded-xl pl-3 pr-8 text-xs font-medium text-neutral-600 hover:bg-white/80 hover:border-neutral-300/80 focus:outline-none transition-all duration-200 cursor-pointer w-[150px]"
          >
            <option value="professional">💼 Professional</option>
            <option value="casual">😊 Casual</option>
            <option value="friendly">🤝 Friendly</option>
            <option value="humorous">😄 Humorous</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
