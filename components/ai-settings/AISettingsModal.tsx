"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Save,
  Plus,
  Tag,
  MessageSquare,
  Lightbulb,
  Sparkles,
  Target,
  Users,
  PenLine,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useWorkspaceById } from "@/hooks/useWorkspace";
import {
  updateWorkspace,
  updateWorkspacePersonalAiVoice,
} from "@/services/workspace.service";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import { setPersonalAiVoice } from "@/state/slice/user.slice";
import { motion } from "framer-motion";
import { processApiResponse } from "@/lib/functions";

interface AISettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const AISettingsModal = ({
  open,
  onClose,
}: AISettingsModalProps) => {
  const [personalAiVoiceState, setPersonalAiVoiceState] = React.useState("");
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onClose : setInternalOpen;
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const { data, isLoading } = useWorkspaceById();
  const dispatch = useDispatch();
  const [characterCount, setCharacterCount] = React.useState(0);
  const minRecommendedChars = 100;

  // Set initial values when data is loaded
  React.useEffect(() => {
    if (data?.data) {
      setPersonalAiVoiceState(data.data.personalAiVoice || "");
    }
  }, [data]);

  const handleSave = useCallback(async () => {
    try {
      if (!currentWorkspace?.id) return;

      const response = await updateWorkspacePersonalAiVoice({
        id: currentWorkspace.id,
        personalAiVoice: personalAiVoiceState,
      });
      if (response.success) {
        dispatch(setPersonalAiVoice(personalAiVoiceState));
        processApiResponse(response);
        setIsOpen && setIsOpen(false);
      }
    } catch (error) {
      toast.error("Failed to save AI settings");
    }
  }, [currentWorkspace, personalAiVoiceState, dispatch]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonalAiVoiceState(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
          >
            <Lightbulb className="h-6 w-6 text-primary" />
          </motion.div>
          <div className="space-y-1">
            <DialogTitle className="text-xl font-semibold">
              Your Content Focus
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Tell AI what topics you're passionate about
            </DialogDescription>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="py-6">
            <LoadingSection />
          </div>
        ) : (
          <>
            <div className="py-4 space-y-4">
              {/* Topic Categories */}
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <Target className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-center text-gray-600">
                    Topics & Expertise
                  </span>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <Users className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-center text-gray-600">
                    Target Audience
                  </span>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <PenLine className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-center text-gray-600">
                    Content Style
                  </span>
                </motion.div>
              </div>

              {/* Textarea with character count */}
              <div className="space-y-2">
                <textarea
                  placeholder="Example: I'm passionate about digital marketing, specifically social media strategy and content creation. I love discussing SEO techniques, email marketing campaigns, and marketing analytics..."
                  className={`w-full min-h-[150px] p-4 text-sm resize-none 
                           bg-gray-50/50 border rounded-xl
                           focus:ring-2 focus:ring-primary/20 focus:outline-none
                           transition-all duration-200
                           ${
                             characterCount < minRecommendedChars
                               ? "border-gray-200"
                               : "border-green-200"
                           }`}
                  value={personalAiVoiceState}
                  onChange={handleTextChange}
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">
                    {characterCount < minRecommendedChars
                      ? `Add ${
                          minRecommendedChars - characterCount
                        } more characters for better results`
                      : "✨ Great detail! This will help generate better content"}
                  </span>
                  <span
                    className={`${
                      characterCount < minRecommendedChars
                        ? "text-gray-400"
                        : "text-green-500"
                    }`}
                  >
                    {characterCount} characters
                  </span>
                </div>
              </div>

              {/* Tips section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-200/50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium text-gray-900">
                    Tips for better results
                  </h4>
                </div>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-primary/60" />
                    <span>
                      Describe your main topics (e.g., "digital marketing, SEO,
                      social media")
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-primary/60" />
                    <span>
                      Mention your audience (e.g., "small business owners,
                      startups")
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 mt-1.5 rounded-full bg-primary/60" />
                    <span>
                      Include your tone preference (e.g., "professional but
                      conversational")
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={characterCount === 0}
                className={`h-9 px-4 rounded-lg transition-all duration-200
                          ${
                            characterCount === 0
                              ? "bg-gray-100 text-gray-400"
                              : "bg-primary hover:bg-primary/90 text-white"
                          }`}
                variant="outline"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
