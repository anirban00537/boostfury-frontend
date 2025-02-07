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
  CheckCircle2,
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
import { motion, AnimatePresence } from "framer-motion";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50/30"
          >
            <div className="max-w-xl w-full px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  Tell Us About Yourself
                </h2>
                <p className="text-lg text-neutral-600">
                  Share your professional background and expertise to help us
                  understand you better
                </p>
              </motion.div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-medium text-neutral-900 flex items-center gap-2">
                      Professional Identity
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-neutral-400 hover:text-blue-500 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p className="text-sm">
                            Describe your professional background, expertise,
                            and experience to help us tailor content to your profile
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors",
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
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                    <textarea
                      value={profile.professionalIdentity}
                      onChange={handleIdentityChange}
                      placeholder="E.g., I'm a Senior Software Engineer with 8 years of experience..."
                      className={cn(
                        "w-full h-40 px-4 py-3 text-base bg-white/80 backdrop-blur-sm rounded-xl border transition-all duration-200",
                        "placeholder:text-neutral-400 text-neutral-900 focus:outline-none resize-none",
                        "border-blue-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30",
                        "shadow-sm group-hover:shadow-md",
                        charCount > maxChars * 0.9 &&
                          "border-yellow-300 focus:ring-yellow-200",
                        charCount === maxChars &&
                          "border-red-300 focus:ring-red-200"
                      )}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end gap-4 mt-8"
                >
                  <GradientButton
                    onClick={handleNext}
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    disabled={!canProceed()}
                    className={cn(
                      "h-12 min-w-[120px] rounded-xl flex items-center justify-center gap-2",
                      "transform transition-all duration-200",
                      canProceed() && "hover:scale-105"
                    )}
                  >
                    <span>Next</span>
                  </GradientButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50/30"
          >
            <div className="max-w-xl w-full px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  Content Preferences
                </h2>
                <p className="text-lg text-neutral-600">
                  What topics do you frequently write about?
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex gap-3">
                    <div className="relative group flex-1">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                      <input
                        type="text"
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        placeholder="Enter a topic (e.g., Cloud Architecture)"
                        className="w-full h-12 px-4 text-base bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 
                          placeholder:text-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 
                          focus:ring-blue-500/20 focus:border-blue-500/30 transition-all duration-200 
                          shadow-sm group-hover:shadow-md relative z-10"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTopic(e);
                          }
                        }}
                      />
                    </div>
                    <GradientButton
                      type="button"
                      variant="primary"
                      rightIcon={<Plus className="w-5 h-5" />}
                      onClick={handleAddTopic}
                      disabled={
                        !newTopic.trim() ||
                        profile.contentTopics?.includes(newTopic.trim())
                      }
                      className="h-12 px-4 rounded-xl transform transition-all duration-200 hover:scale-105"
                    >
                      <span>Add Topic</span>
                    </GradientButton>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                    <div className="relative flex flex-wrap gap-2 min-h-[100px] p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm group-hover:shadow-md transition-all duration-200">
                      <AnimatePresence>
                        {profile.contentTopics?.map((topic, index) => (
                          <motion.div
                            key={topic}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="group/topic flex items-center gap-2 px-3 py-1.5 bg-blue-50/80 
                              backdrop-blur-sm rounded-lg border border-blue-100 hover:bg-blue-100/50 
                              hover:border-blue-200 transition-all duration-200 hover:shadow-sm"
                          >
                            <span className="text-base text-blue-700">{topic}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTopic(topic)}
                              className="opacity-50 hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4 text-blue-700" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {!profile.contentTopics?.length && (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                          Add some topics to get started
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between gap-4"
                >
                  <GradientButton
                    type="button"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                    variant="outline"
                    className="h-12 min-w-[120px] rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50/50 transition-colors"
                  >
                    <span>Back</span>
                  </GradientButton>
                  <GradientButton
                    type="submit"
                    variant="primary"
                    rightIcon={isUpdating ? undefined : <CheckCircle2 className="w-4 h-4" />}
                    disabled={isUpdating || !canProceed()}
                    className={cn(
                      "h-12 min-w-[120px] rounded-xl flex items-center justify-center gap-2",
                      "transform transition-all duration-200",
                      !isUpdating && canProceed() && "hover:scale-105"
                    )}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Complete</span>
                    )}
                  </GradientButton>
                </motion.div>
              </form>
            </div>
          </motion.div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50"></div>
      <div className="relative">
        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
        >
          {Array.from({ length: totalSteps }).map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                step === index + 1
                  ? "w-16 bg-gradient-to-r from-blue-500 to-indigo-500"
                  : step > index + 1
                  ? "w-16 bg-blue-200"
                  : "w-16 bg-neutral-200"
              )}
              initial={false}
              animate={{
                width: step === index + 1 ? 64 : 64,
                backgroundColor:
                  step === index + 1
                    ? "#3B82F6"
                    : step > index + 1
                    ? "#BFDBFE"
                    : "#E5E7EB",
              }}
            />
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};
