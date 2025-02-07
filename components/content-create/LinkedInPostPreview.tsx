import React from "react";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import { LinkedInProfile, UserInfo } from "@/types";

interface LinkedInPostPreviewProps {
  generatedContent: string;
  isGenerating: boolean;
  isEditLoading: boolean;
  isQueueLoading: boolean;
  linkedinProfile: any;
  userinfo: UserInfo | null;
  onEditInEditor: () => void;
  onAddToQueue: () => void;
}

// Adapter type to match PostPreviewNotRedux expectations
interface PostPreviewLinkedInProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export const LinkedInPostPreview: React.FC<LinkedInPostPreviewProps> = ({
  generatedContent,
  isGenerating,
  isEditLoading,
  isQueueLoading,
  linkedinProfile,
  userinfo,
  onEditInEditor,
  onAddToQueue,
}) => {
  if (!generatedContent || !linkedinProfile) return null;

  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-neutral-50/80 backdrop-blur-sm border-l border-neutral-200/50">
      <div className="px-3 py-3 lg:py-7">
        <div className="max-w-xl mx-auto">
          <div className="space-y-8">
            {/* Preview Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title Section */}
              <div className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Preview
                  </h2>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex items-center gap-3 border-t border-neutral-100 bg-white/50 rounded-xl p-2">
                <GradientButton
                  variant="outline"
                  onClick={onEditInEditor}
                  disabled={isEditLoading}
                  className="h-10 flex-1 px-4 rounded-xl text-sm font-medium bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-blue-200 transition-all duration-300"
                >
                  {isEditLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-neutral-400/30 border-t-neutral-400 rounded-full"
                      />
                      <span>Opening Editor...</span>
                    </div>
                  ) : (
                    <span>Edit in Editor</span>
                  )}
                </GradientButton>
                <GradientButton
                  variant="primary"
                  onClick={onAddToQueue}
                  disabled={isQueueLoading}
                  className="h-10 flex-1 px-4 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transform hover:scale-[1.02] transition-all duration-300"
                >
                  {isQueueLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Adding to Queue...</span>
                    </div>
                  ) : (
                    <span>Add to Queue</span>
                  )}
                </GradientButton>
              </div>
            </motion.div>

            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden"
            >
              <PostPreviewNotRedux
                content={generatedContent}
                isGenerating={isGenerating}
                linkedInProfile={linkedinProfile}
                user={{
                  id: userinfo?.id?.toString() || "",
                  email: userinfo?.email || "",
                  first_name: userinfo?.first_name || "",
                  last_name: userinfo?.last_name || "",
                  user_name: userinfo?.user_name || "",
                  photo: userinfo?.photo || null,
                }}
                status="draft"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
