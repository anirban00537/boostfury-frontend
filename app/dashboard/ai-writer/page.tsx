"use client";

import { useState } from "react";
import { LinkedInPostPreview } from "@/components/linkedin-post-preview";
import { InputArea } from "@/components/ai-writer/input-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AIWriter() {
  const [prompt, setPrompt] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [postContent, setPostContent] =
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
  const [postImage, setPostImage] = useState<string>();
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [generateImage, setGenerateImage] = useState(false);

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

  const handleContentChange = (content: string) => {
    setPostContent(content);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      setPostImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageRemove = () => {
    if (postImage) {
      URL.revokeObjectURL(postImage);
      setPostImage(undefined);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] relative bg-gray-50">
      {/* Toggle Button for Mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 right-4 z-50 bg-white shadow-sm border hover:bg-gray-50"
        onClick={() => setIsInputVisible(!isInputVisible)}
      >
        {isInputVisible ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {/* Left Panel - Input Area */}
      <div
        className={cn(
          "w-full lg:w-[400px] fixed lg:relative inset-0 bg-white border-r border-gray-200 z-40 transition-transform duration-300 lg:translate-x-0",
          isInputVisible ? "translate-x-0" : "-translate-x-full"
        )}
      >
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

      {/* Right Panel - Preview */}
      <div
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          isInputVisible ? "lg:ml-0" : "ml-0"
        )}
      >
        <div className="max-w-2xl mx-auto px-4 lg:px-6 py-6">
          <LinkedInPostPreview
            content={postContent}
            onPostNow={handlePostNow}
            onQueue={handleQueue}
            onSchedule={handleSchedule}
            isEditable={true}
            onContentChange={handleContentChange}
            image={postImage}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />
        </div>
      </div>
    </div>
  );
}
