import { SendHorizontal, Wand2, Sparkles } from "lucide-react";
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

interface InputAreaProps {
  prompt: string;
  tone: string;
  length: string;
  onPromptChange: (value: string) => void;
  onToneChange: (value: string) => void;
  onLengthChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function InputArea({
  prompt,
  tone,
  length,
  onPromptChange,
  onToneChange,
  onLengthChange,
  onSubmit,
}: InputAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

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
            className={`bg-white rounded-xl border transition-all duration-200 shadow-sm ${
              isFocused
                ? "border-blue-400 shadow-blue-100/50 ring-4 ring-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Describe your LinkedIn post idea... (e.g., 'Write a post about my recent achievement in launching a SaaS product')"
                className="w-full resize-none border-0 bg-transparent focus:ring-0 rounded-t-xl text-[15px] leading-relaxed placeholder:text-gray-400 p-4 min-h-[60px]"
              />

              {/* Character count */}
              <div className="absolute bottom-2 right-4 text-xs text-gray-400">
                {prompt.length}/500
              </div>
            </div>

            <div className="flex items-center justify-between p-1 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                {/* Tone Selection */}
                <div className="space-y-1">
                  <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wide px-0.5">
                    Writing Tone
                  </span>
                  <Select value={tone} onValueChange={onToneChange}>
                    <SelectTrigger className="w-[130px] border border-gray-200 bg-white text-xs h-8 px-3 hover:bg-gray-50/50">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
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
                </div>

                {/* Length Selection */}
                <div className="space-y-1">
                  <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wide px-0.5">
                    Post Length
                  </span>
                  <Select value={length} onValueChange={onLengthChange}>
                    <SelectTrigger className="w-[110px] border border-gray-200 bg-white text-xs h-8 px-3 hover:bg-gray-50/50">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">📝 Short</SelectItem>
                      <SelectItem value="medium">📄 Medium</SelectItem>
                      <SelectItem value="long">📑 Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg h-8 px-4 text-[13px] font-medium shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
              >
                Generate Post
                <SendHorizontal className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
