"use client";

import { useState } from "react";
import {
  SendHorizontal,
  Copy,
  ThumbsUp,
  Wand2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LinkedInPostPreview } from "@/components/linkedin-post-preview";

export default function AIWriter() {
  const [prompt, setPrompt] = useState("");
  const [generatedPost] =
    useState(`🚀 Just hit a major milestone in my journey as a software engineer!

After 6 months of dedicated learning and building, I'm excited to share that I've successfully launched my first SaaS product that helps businesses automate their workflow.

Key learnings along the way:
• Start small, but think big
• Listen to user feedback religiously
• Done is better than perfect
• Consistency beats intensity

The support from the #techcommunity has been incredible. Special thanks to everyone who provided feedback during the beta phase.

What's next? 
I'm already working on new features based on early user feedback. Stay tuned! 

#softwareengineering #entrepreneurship #saas #buildinpublic #techstartup`);
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement AI generation logic
  };

  const handlePostNow = () => {
    // Implement post now logic
    console.log("Posting now...");
  };

  const handleQueue = () => {
    // Implement queue logic
    console.log("Added to queue");
  };

  const handleSchedule = (date: Date) => {
    // Implement schedule logic
    console.log("Scheduled for:", date);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50/50 relative">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        {/* Scrollable Content Area */}
        <div className="flex-1  px-6 py-6 pb-40">
          {/* LinkedIn Post Preview */}
          <LinkedInPostPreview
            content={generatedPost}
            onPostNow={handlePostNow}
            onQueue={handleQueue}
            onSchedule={handleSchedule}
          />
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="fixed bottom-0 left-64 right-0">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 max-w-4xl mx-auto p-4"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the LinkedIn post you want to create..."
                className="w-full resize-none border-0 focus:ring-0 rounded-t-xl rounded-b-none p-3 text-[13px] leading-relaxed placeholder:text-gray-400 bg-transparent"
                rows={2}
              />
              <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200/50">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] font-medium text-gray-400 uppercase tracking-wide">
                      Tone
                    </span>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="w-[110px] border-0 bg-transparent text-xs focus:ring-0 h-7 py-0">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">
                          Enthusiastic
                        </SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-7 w-px bg-gray-200"></div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] font-medium text-gray-400 uppercase tracking-wide">
                      Length
                    </span>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger className="w-[90px] border-0 bg-transparent text-xs focus:ring-0 h-7 py-0">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-7 px-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm text-[13px]"
                >
                  Generate Post
                  <SendHorizontal className="w-3.5 h-3.5 ml-2" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
