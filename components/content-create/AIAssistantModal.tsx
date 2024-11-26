import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import { contentRewrite } from "@/services/ai-content";
import { REWRITE_MODE } from "@/lib/core-constants";
import { toast } from "react-hot-toast";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onContentUpdate: (newContent: string) => void;
}

export const AIAssistantModal = ({
  isOpen,
  onClose,
  selectedText,
  onContentUpdate,
}: AIAssistantModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [rewrittenContent, setRewrittenContent] = useState<string>("");

  const handleRewrite = async (mode: string) => {
    if (!selectedText) return;

    setIsProcessing(true);
    try {
      const response = await contentRewrite({
        content: selectedText,
        mode,
      });

      if (response.success) {
        setRewrittenContent(response.data.content);
        toast.success("Content rewritten successfully!");
      } else {
        toast.error(response.message || "Failed to rewrite content");
      }
    } catch (error) {
      console.error("Error rewriting content:", error);
      toast.error("Failed to rewrite content");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInsert = () => {
    onContentUpdate(rewrittenContent);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <DialogTitle>AI Assistant</DialogTitle>
            </div>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Original Text</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
              {selectedText || "No text selected"}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">AI Actions</label>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleRewrite(REWRITE_MODE.IMPROVE)}
                disabled={!selectedText || isProcessing}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isProcessing ? "Improving..." : "Improve Writing"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleRewrite(REWRITE_MODE.SHORTER)}
                disabled={!selectedText || isProcessing}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isProcessing ? "Shortening..." : "Make Shorter"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleRewrite(REWRITE_MODE.LONGER)}
                disabled={!selectedText || isProcessing}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isProcessing ? "Expanding..." : "Make Longer"}
              </Button>
            </div>
          </div>

          {rewrittenContent && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rewritten Content</label>
              <div className="p-3 bg-white rounded-lg border border-primary/20 text-sm">
                {rewrittenContent}
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={handleInsert}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Insert
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 