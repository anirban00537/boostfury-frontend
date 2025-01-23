"use client";
import React, { useState } from "react";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Pencil, Sparkles } from "lucide-react";
import PromptBox from "@/components/studio/PromptBox";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { useContentPosting } from "@/hooks/useContent";
import { cn } from "@/lib/utils";

const ContentCreationTools: React.FC = () => {
  const isEditorOpen = useSelector(
    (state: RootState) => state.content.isEditorOpen
  );
  const [postLength, setPostLength] = useState<"short" | "medium" | "long">(
    "medium"
  );

  const { content, handleContentChange } = useContentPosting();

  const {
    prompt,
    tone,
    handlePromptChange,
    handleGenerate,
    setTone,
    isGenerating,
  } = useGenerateLinkedInPosts({
    onContentGenerated: handleContentChange,
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div
        className={cn(
          "flex-1 relative transition-all duration-300",
          !isEditorOpen ? "mr-0" : "lg:mr-[400px]"
        )}
      >
        <main className="h-screen overflow-y-auto hide-scrollbar">
          <div className="flex items-center justify-center min-h-screen p-6">
            <div
              className={cn(
                "max-w-[750px] w-full space-y-10 transition-all duration-300",
                !isEditorOpen && "translate-x-0"
              )}
            >
              {/* Title Section */}
              <div className="relative space-y-6">
                {/* Main Title */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-indigo-500/10 to-purple-500/5 blur-3xl rounded-full opacity-80" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/20 to-purple-500/10 blur-2xl rounded-full opacity-50 animate-pulse" />
                  <h1 className="relative text-[38px] font-bold text-center leading-tight tracking-tight">
                    <span className="inline-block bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      Create your viral{" "}
                      <span className="inline-block bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative group">
                        Linkedin post
                        <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </span>{" "}
                      with AI
                    </span>
                  </h1>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse delay-150" />
              </div>

              {/* PromptBox */}
              <div className="relative">
                <div className="absolute inset-0 -m-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-[32px] blur-2xl" />
                <div className="relative">
                  <PromptBox
                    prompt={prompt}
                    tone={tone}
                    postLength={postLength}
                    isGenerating={isGenerating}
                    onPromptChange={handlePromptChange}
                    onToneChange={setTone}
                    onPostLengthChange={setPostLength}
                    onGenerate={handleGenerate}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentCreationTools;
