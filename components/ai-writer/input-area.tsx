import {
  SendHorizontal,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50/50">
      {/* Header */}
      <div className="p-6 border-b border-gray-100/80">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center ring-[2px] ring-white">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              AI Writing Assistant
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Your creative companion for engaging content
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div
            className={`bg-white rounded-2xl border transition-all duration-200 h-full ${
              isFocused
                ? "border-blue-400 shadow-xl shadow-blue-100/50 ring-4 ring-blue-50"
                : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
            }`}
          >
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your LinkedIn post idea... (e.g., 'Write a post about my recent achievement in launching a SaaS product')"
              className="w-full h-full resize-none border-0 bg-transparent focus:ring-0 text-[15px] leading-relaxed placeholder:text-gray-400 p-5"
            />
          </div>
        </div>

        {/* Settings Panel */}
        <div className="border-t border-gray-100 bg-white p-6 space-y-5 rounded-b-xl shadow-[0_-1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col gap-4">
            {/* Tone Selection */}
            <div className="space-y-2.5">
              <label className="text-sm font-medium bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Writing Tone
              </label>
              <Select value={tone} onValueChange={onToneChange}>
                <SelectTrigger className="w-full border bg-white border-gray-200 text-sm h-11 hover:bg-gray-50/50 transition-colors">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">
                    👔 Professional & Polished
                  </SelectItem>
                  <SelectItem value="casual">😊 Casual & Friendly</SelectItem>
                  <SelectItem value="enthusiastic">
                    🚀 Enthusiastic & Energetic
                  </SelectItem>
                  <SelectItem value="informative">
                    📚 Informative & Educational
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Length Selection */}
            <div className="space-y-2.5">
              <label className="text-sm font-medium bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Post Length
              </label>
              <Select value={length} onValueChange={onLengthChange}>
                <SelectTrigger className="w-full border bg-white border-gray-200 text-sm h-11 hover:bg-gray-50/50 transition-colors">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">
                    📝 Short (1-2 paragraphs)
                  </SelectItem>
                  <SelectItem value="medium">
                    📄 Medium (2-3 paragraphs)
                  </SelectItem>
                  <SelectItem value="long">📑 Long (3+ paragraphs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image Generation */}
            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="generateImage"
                checked={generateImage}
                onCheckedChange={onGenerateImageChange}
                className="h-5 w-5 border-gray-200 bg-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 mt-0.5"
              />
              <div className="space-y-1">
                <label
                  htmlFor="generateImage"
                  className="text-sm font-medium bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent cursor-pointer select-none"
                >
                  Generate AI Image
                </label>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Let AI create a stunning visual that matches your post content
                  and style
                </p>
              </div>
            </div>
          </div>

          {/* Character Count and Generate Button */}
          <div className="flex items-center justify-between pt-3">
            <div className="text-sm text-gray-500 font-medium">
              {prompt.length}/500 characters
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0"
            >
              Generate Post
              <SendHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
