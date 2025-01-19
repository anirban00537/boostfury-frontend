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
    <div className="bg-gradient-to-br bg-gray-100  rounded-3xl  border border-slate-200 overflow-hidden">
      {/* Prompt Input Section */}
      <div className="flex items-end gap-3">
        <div className="flex-1 min-h-[20px] relative group">
          <textarea
            value={prompt}
            onChange={onPromptChange}
            placeholder="What would you like to write about?"
            className="w-full h-[72px] p-3.5 text-[15px] leading-relaxed bg-gray-100 border-none focus:outline-none hover:bg-transparent placeholder:text-gray-400/80"
          />
        </div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="p-3.5 bg-gradient-to-r from-primary mr-2 to-primary/90 text-white rounded-2xl hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed disabled:hover:shadow-none group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 relative z-10"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>

      {/* Controls Section */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-3 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/40">
        {/* Post Length Select */}
        <div className="relative group">
          <select
            value={postLength}
            onChange={(e) =>
              onPostLengthChange(e.target.value as "short" | "medium" | "long")
            }
            className="h-8 appearance-none bg-gray-100 hover:bg-white/80 backdrop-blur-sm border rounded-xl pl-3 pr-8 text-xs font-medium text-gray-600 hover:border-gray-300/80 focus:border-primary/20 focus:ring-[2px] focus:ring-primary/10 transition-all duration-200 cursor-pointer w-[120px]"
          >
            <option value="short">Short Post</option>
            <option value="medium">Medium Post</option>
            <option value="long">Long Post</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
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
            className="h-8 appearance-none bg-gray-100 hover:bg-white/80 backdrop-blur-sm border  rounded-xl pl-3 pr-8 text-xs font-medium text-gray-600 hover:border-gray-300/80 focus:border-primary/20 focus:ring-[2px] focus:ring-primary/10 transition-all duration-200 cursor-pointer w-[150px]"
          >
            <option value="professional">💼 Professional</option>
            <option value="casual">😊 Casual</option>
            <option value="friendly">🤝 Friendly</option>
            <option value="humorous">😄 Humorous</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
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
