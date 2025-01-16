"use client";

import { useState } from "react";
import { LinkedInPostPreview } from "@/components/linkedin-post-preview";
import { InputArea } from "@/components/ai-writer/input-area";

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
    <div className="flex h-[calc(100vh-4rem)] relative">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        {/* Scrollable Content Area */}
        <div className="flex-1 px-6 py-6 pb-40">
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
          onPromptChange={setPrompt}
          onToneChange={setTone}
          onLengthChange={setLength}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
