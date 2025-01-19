"use client";

import { useState, useRef, useEffect } from "react";
import { LinkedInPostPreview } from "@/components/linkedin-post-preview";
import { InputArea } from "@/components/ai-writer/input-area";
import { Button } from "@/components/ui/button";
import { Clock, Send, Calendar, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScheduleModal } from "@/components/schedule-modal";

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
  const [generateImage, setGenerateImage] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

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
    <div className="flex h-[calc(100vh-4rem)] relative">
      {/* Top Action Bar */}
      <div className="fixed top-0 right-0 left-64 h-16 bg-white/50 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">AI Writer</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleQueue}
            variant="ghost"
            className="h-9 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
          >
            <Clock className="w-4 h-4 mr-2" />
            Add to Queue
          </Button>
          <Button
            onClick={() => setIsScheduleModalOpen(true)}
            variant="ghost"
            className="h-9 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="h-9 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-md transition-all duration-200">
                <Send className="w-4 h-4 mr-2" />
                Post Now
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        {/* Scrollable Content Area */}
        <div className="flex-1 px-6 py-6 mt-16 mb-48">
          <LinkedInPostPreview
            content={generatedPost}
            onPostNow={handlePostNow}
            onQueue={handleQueue}
            onSchedule={handleSchedule}
          />
        </div>

        {/* Input Area */}
        <InputArea
          prompt={prompt}
          tone={tone}
          length={length}
          generateImage={generateImage}
          onPromptChange={setPrompt}
          onToneChange={setTone}
          onLengthChange={setLength}
          onGenerateImageChange={setGenerateImage}
          onSubmit={handleSubmit}
        />
      </div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={(date: Date) => {
          handleSchedule(date);
          setIsScheduleModalOpen(false);
        }}
      />
    </div>
  );
}
