"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Save, Plus, Tag, MessageSquare, Lightbulb } from "lucide-react";
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
import { updateWorkspace } from "@/services/workspace.service";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import { setPersonalAiVoice } from "@/state/slice/user.slice";

interface AISettingsModalProps {
  trigger: React.ReactNode;
}

export const AISettingsModal = ({ trigger }: AISettingsModalProps) => {
  const [personalAiVoiceState, setPersonalAiVoiceState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const { data, isLoading } = useWorkspaceById();
  const dispatch = useDispatch();
  // Set initial values when data is loaded
  React.useEffect(() => {
    if (data?.data) {
      setPersonalAiVoiceState(data.data.personalAiVoice || "");
    }
  }, [data]);

  const handleSave = useCallback(async () => {
    try {
      if (!currentWorkspace?.id) return;

      const response = await updateWorkspace({
        id: currentWorkspace.id,
        name: currentWorkspace.name,
        description: currentWorkspace.description || "",
      });
      console.log(response, "response");
      if (response.success) {
        dispatch(setPersonalAiVoice(personalAiVoiceState));
        toast.success("AI settings saved successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to save AI settings");
    }
  }, [currentWorkspace, personalAiVoiceState, dispatch]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Personalize Your Content Experience
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Help our AI understand you better to create more personalized
            content
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8">
            <LoadingSection />
          </div>
        ) : (
          <>
            <div className="grid gap-8 py-6">
              {/* Professional Profile Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Tell Us About Yourself
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pl-10">
                    Describe your professional background, role, and expertise.
                    This helps our AI understand your perspective and create
                    content that matches your professional voice.
                  </p>
                </div>
                <textarea
                  placeholder="Example: I am a digital marketing consultant with 5 years of experience in social media strategy and content creation. I help small businesses grow their online presence and specialize in B2B marketing..."
                  className="w-full min-h-[150px] p-4 text-sm resize-none 
                           border border-gray-200 rounded-xl
                           focus:ring-2 focus:ring-primary/20 focus:border-primary
                           placeholder:text-gray-400
                           transition-all duration-200
                           outline-none"
                  value={personalAiVoiceState}
                  onChange={(e) => setPersonalAiVoiceState(e.target.value)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSave}
                className="h-10 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white 
                        transition-all duration-200 shadow-sm hover:shadow-md"
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
