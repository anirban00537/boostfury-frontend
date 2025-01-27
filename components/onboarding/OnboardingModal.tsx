import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LinkedInConnect } from "@/components/ui/linkedin-connect";
import { default as useLinkedIn } from "@/hooks/useLinkedIn";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  Wand2,
  Sparkles,
  AlertCircle,
  Plus,
  X,
  Loader2,
  Info,
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
  const { isConnecting, connectLinkedIn } = useLinkedIn();
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const { aiStyle, updateStyle, isUpdating } = useAiStyle();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<UpdateAiStyleDto>({
    professionalIdentity: "",
    contentTopics: [],
  });
  const [newTopic, setNewTopic] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  // Refetch data when modal opens
  useEffect(() => {
    if (isOpen && linkedinProfile?.id) {
      // Force refetch data when modal opens
      queryClient.invalidateQueries(["aiStyle", linkedinProfile.id]);
      queryClient.refetchQueries(["aiStyle", linkedinProfile.id]);
    }
  }, [isOpen, linkedinProfile?.id, queryClient]);

  // Update local state when API data is loaded
  useEffect(() => {
    if (aiStyle) {
      // Reset state with latest data
      setProfile({
        professionalIdentity: aiStyle.professionalIdentity || "",
        contentTopics: aiStyle.contentTopics || [],
      });
      setCharCount(aiStyle.professionalIdentity?.length || 0);
      setNewTopic(""); // Reset new topic input
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
    if (newTopic.trim() && !profile.contentTopics?.includes(newTopic.trim())) {
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

  // Move to next step when LinkedIn is connected
  React.useEffect(() => {
    if (linkedinProfile && step === 1) {
      setStep(2);
    }
  }, [linkedinProfile, step]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent mb-2">
                Connect Your LinkedIn
              </h3>
              <p className="text-sm text-neutral-500">
                Link your LinkedIn account to start generating personalized
                content
              </p>
            </div>
            <LinkedInConnect
              variant="default"
              onConnect={connectLinkedIn}
              isConnecting={isConnecting}
              className="w-full"
            />
            <div className="flex items-center gap-2 mt-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    step === index + 1
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 w-8"
                      : "bg-neutral-200"
                  )}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent mb-2">
                AI Voice & Style
              </h3>
              <p className="text-sm text-neutral-500">
                Help AI understand your professional identity and content
                preferences
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identity Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-2">
                  Professional Identity
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-neutral-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[200px]">
                        Describe your professional background, expertise, and
                        experience
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </label>
                <div className="relative">
                  <textarea
                    value={profile.professionalIdentity}
                    onChange={handleIdentityChange}
                    placeholder="E.g., I'm a Senior Software Engineer with 8 years of experience..."
                    className={cn(
                      "w-full h-24 px-3 py-2 text-sm bg-blue-50/50 rounded-xl border transition-all duration-200",
                      "placeholder:text-neutral-400 text-neutral-900 focus:outline-none resize-none",
                      "border-blue-100/60 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30",
                      charCount > maxChars * 0.9 &&
                        "border-yellow-300 focus:ring-yellow-200",
                      charCount === maxChars &&
                        "border-red-300 focus:ring-red-200"
                    )}
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    {charCount > maxChars * 0.9 && (
                      <AlertCircle
                        className={cn(
                          "w-4 h-4",
                          charCount === maxChars
                            ? "text-red-500"
                            : "text-yellow-500"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "text-xs font-medium",
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
                </div>
              </div>

              {/* Topics Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-2">
                  Content Topics
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-neutral-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[200px]">
                        Add topics you frequently post about on LinkedIn
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Enter a topic (e.g., Cloud Architecture)"
                    className="flex-1 h-9 px-3 text-sm bg-blue-50/50 rounded-xl border border-blue-100/60 
                      placeholder:text-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/20 focus:border-blue-500/30 transition-all duration-200"
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
                    onClick={handleAddTopic}
                    disabled={
                      !newTopic.trim() ||
                      profile.contentTopics?.includes(newTopic.trim())
                    }
                    className="h-9 px-3 rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </GradientButton>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.contentTopics?.map((topic, index) => (
                    <div
                      key={index}
                      className="group/topic flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/80 
                        rounded-lg border border-blue-100/80 hover:bg-blue-100/50 transition-colors"
                    >
                      <span className="text-sm text-blue-700">{topic}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTopic(topic)}
                        className="opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5 text-blue-700" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <GradientButton
                  type="submit"
                  variant="primary"
                  disabled={isUpdating}
                  className="flex-1"
                >
                  <div className="flex items-center justify-center gap-2">
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Complete Setup</span>
                    )}
                  </div>
                </GradientButton>
              </div>
            </form>

            <div className="flex items-center gap-2 mt-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    step === index + 1
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 w-8"
                      : "bg-neutral-200"
                  )}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleClose = () => {
    // Only allow closing if LinkedIn is connected and both AI style requirements are filled
    if (
      linkedinProfile &&
      profile.professionalIdentity?.trim() &&
      (profile.contentTopics || []).length > 0
    ) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <div className="p-8">
          {renderStep()}
          {step === 2 &&
            (!profile.professionalIdentity?.trim() ||
              !(profile.contentTopics || []).length) && (
              <div className="mt-4 text-sm text-red-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>
                  Please fill in both your Professional Identity and at least
                  one Content Topic
                </span>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
