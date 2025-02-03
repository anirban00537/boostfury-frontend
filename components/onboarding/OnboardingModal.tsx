import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Plus,
  X,
  Loader2,
  Info,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { useAiStyle } from "@/hooks/useAiStyle";
import { UpdateAiStyleDto } from "@/services/ai-content";
import { useQueryClient } from "react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = React.useState(1);
  const { aiStyle, updateStyle, isUpdating } = useAiStyle();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<UpdateAiStyleDto>({
    professionalIdentity: "",
    contentTopics: [],
  });
  const [newTopic, setNewTopic] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  // Update local state when API data is loaded
  useEffect(() => {
    if (aiStyle) {
      setProfile({
        professionalIdentity: aiStyle.professionalIdentity || "",
        contentTopics: aiStyle.contentTopics || [],
      });
      setCharCount(aiStyle.professionalIdentity?.length || 0);
      setNewTopic("");
    }
  }, [aiStyle]);

  const handleIdentityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setProfile((prev) => ({ ...prev, professionalIdentity: text }));
      setCharCount(text.length);
    }
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim()) {
      setProfile((prev) => ({
        ...prev,
        contentTopics: [...(prev.contentTopics || []), newTopic.trim()],
      }));
      setNewTopic("");
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      contentTopics:
        prev.contentTopics?.filter((topic) => topic !== topicToRemove) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStyle(profile);
    onClose();
  };

  const totalSteps = 2;

  const handleNext = () => {
    if (step === 1 && !profile.professionalIdentity?.trim()) {
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return (profile.professionalIdentity ?? "").trim().length > 0;
    }
    if (step === 2) {
      return (profile.contentTopics || []).length > 0;
    }
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50/30">
            <div className="max-w-xl w-full px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  Tell Us About Yourself
                </h2>
                <p className="text-lg text-neutral-600">
                  Share your professional background and expertise to help us
                  understand you better
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-medium text-neutral-900 flex items-center gap-2">
                      Professional Identity
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-neutral-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm max-w-[250px]">
                            Describe your professional background, expertise,
                            and experience
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        charCount > maxChars * 0.9
                          ? charCount === maxChars
                            ? "text-red-500"
                            : "text-yellow-500"
                          : "text-neutral-400"
                      )}
                    >
                      {charCount}/{maxChars}
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      value={profile.professionalIdentity}
                      onChange={handleIdentityChange}
                      placeholder="E.g., I'm a Senior Software Engineer with 8 years of experience..."
                      className={cn(
                        "w-full h-40 px-4 py-3 text-base bg-white rounded-xl border transition-all duration-200",
                        "placeholder:text-neutral-400 text-neutral-900 focus:outline-none resize-none",
                        "border-blue-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30",
                        "shadow-sm",
                        charCount > maxChars * 0.9 &&
                          "border-yellow-300 focus:ring-yellow-200",
                        charCount === maxChars &&
                          "border-red-300 focus:ring-red-200"
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <GradientButton
                    onClick={handleNext}
                    variant="primary"
                    leftIcon={<ArrowRight className="w-4 h-4" />}
                    disabled={!canProceed()}
                    className="h-12 min-w-[120px] rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>Next</span>
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50/30">
            <div className="max-w-xl w-full px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  Content Preferences
                </h2>
                <p className="text-lg text-neutral-600">
                  What topics do you frequently write about?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="Enter a topic (e.g., Cloud Architecture)"
                      className="flex-1 h-12 px-4 text-base bg-white rounded-xl border border-blue-100 
                        placeholder:text-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 
                        focus:ring-blue-500/20 focus:border-blue-500/30 transition-all duration-200 shadow-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTopic(e);
                        }
                      }}
                    />
                    <GradientButton
                      type="button"
                      variant="primary"
                      rightIcon={<Plus className="w-5 h-5" />}
                      onClick={handleAddTopic}
                      disabled={
                        !newTopic.trim() ||
                        profile.contentTopics?.includes(newTopic.trim())
                      }
                      className="h-12 px-4 rounded-xl"
                    >
                      <span>Add Topic</span>
                    </GradientButton>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                    {profile.contentTopics?.map((topic, index) => (
                      <div
                        key={index}
                        className="group/topic flex items-center gap-2 px-3 py-1.5 bg-blue-50 
                          rounded-lg border border-blue-100 hover:bg-blue-100/50 transition-colors"
                      >
                        <span className="text-base text-blue-700">{topic}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTopic(topic)}
                          className="opacity-50 hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-blue-700" />
                        </button>
                      </div>
                    ))}
                    {!profile.contentTopics?.length && (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        Add some topics to get started
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <GradientButton
                    type="button"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                    variant="outline"
                    className="h-12 min-w-[120px] rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>Back</span>
                  </GradientButton>
                  <GradientButton
                    type="submit"
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    disabled={isUpdating || !canProceed()}
                    className="h-12 min-w-[120px] rounded-xl flex items-center justify-center gap-2"
                  >
                    {isUpdating ? (
                      <>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete</span>
                      </>
                    )}
                  </GradientButton>
                </div>
              </form>
            </div>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                step === index + 1
                  ? "w-16 bg-blue-600"
                  : step > index + 1
                  ? "w-16 bg-blue-200"
                  : "w-16 bg-neutral-200"
              )}
            />
          ))}
        </div>
        {renderStep()}
      </div>
    </div>
  );
};
