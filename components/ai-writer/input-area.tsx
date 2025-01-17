import { SendHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface InputAreaProps {
  prompt: string;
  tone: string;
  length: string;
  generateImage: boolean;
  onPromptChange: (value: string) => void;
  onToneChange: (value: string) => void;
  onLengthChange: (value: string) => void;
  onGenerateImageChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function InputArea({
  prompt,
  tone,
  length,
  generateImage,
  onPromptChange,
  onToneChange,
  onLengthChange,
  onGenerateImageChange,
  onSubmit,
}: InputAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed bottom-0 left-64 right-0">
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <motion.form
          onSubmit={onSubmit}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative"
        >
          <div
            className={`bg-gray-50 rounded-3xl border transition-all duration-200 shadow-sm ${
              isFocused
                ? "border-blue-400 shadow-blue-100/50 ring-4 ring-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="absolute -top-8 right-0 flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 border"
                      onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                      <ChevronDown
                        className={` h-12 w-12 text-gray-500 transition-transform duration-200 ${
                          isCollapsed ? "rotate-180" : ""
                          }`}
                        size={42}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {isCollapsed ? "Expand editor" : "Collapse editor"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <motion.div
              animate={{ height: isCollapsed ? 0 : "auto" }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Textarea
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Describe your LinkedIn post idea... (e.g., 'Write a post about my recent achievement in launching a SaaS product')"
                className="w-full resize-none border-0 bg-transparent focus:ring-0 rounded-t-xl text-[15px] leading-relaxed placeholder:text-gray-400 p-4 min-h-[60px]"
              />

              <div className="flex items-center gap-4 p-3 rounded-b-xl">
                <div className="flex items-center gap-3 flex-1">
                  {/* Character count */}
                  <div className="text-xs text-gray-400">
                    {prompt.length}/500
                  </div>

                  {/* Tone Selection */}
                  <TooltipProvider>
                    <Tooltip>
                      <Select value={tone} onValueChange={onToneChange}>
                        <TooltipTrigger asChild>
                          <SelectTrigger className="w-[130px] border bg-gray-50 border-gray-200 text-xs h-8 px-3 hover:bg-gray-50/50">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                        </TooltipTrigger>
                        <SelectContent>
                          <SelectItem value="professional">
                            👔 Professional
                          </SelectItem>
                          <SelectItem value="casual">😊 Casual</SelectItem>
                          <SelectItem value="enthusiastic">
                            🚀 Enthusiastic
                          </SelectItem>
                          <SelectItem value="informative">
                            📚 Informative
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <TooltipContent>
                        <p className="text-xs">
                          Choose the writing style for your post
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Length Selection */}
                  <TooltipProvider>
                    <Tooltip>
                      <Select value={length} onValueChange={onLengthChange}>
                        <TooltipTrigger asChild>
                          <SelectTrigger className="w-[110px] border bg-gray-50 border-gray-200 text-xs h-8 px-3 hover:bg-gray-50/50">
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                        </TooltipTrigger>
                        <SelectContent>
                          <SelectItem value="short">📝 Short</SelectItem>
                          <SelectItem value="medium">📄 Medium</SelectItem>
                          <SelectItem value="long">📑 Long</SelectItem>
                        </SelectContent>
                      </Select>
                      <TooltipContent>
                        <p className="text-xs">
                          Set the desired length of your post
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Image Generation Checkbox */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="generateImage"
                            checked={generateImage}
                            onCheckedChange={onGenerateImageChange}
                            className="h-4 w-4 border-gray-200 bg-gray-50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <label
                            htmlFor="generateImage"
                            className="text-xs text-gray-600 cursor-pointer select-none"
                          >
                            Generate Image
                          </label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Generate an AI image to accompany your post
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg h-8 px-4 text-[13px] font-medium shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
                >
                  Generate Post
                  <SendHorizontal className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
