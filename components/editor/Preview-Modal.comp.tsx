import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText, Calendar, Sparkles, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import toast from 'react-hot-toast';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
  onDownloadPdf: () => void;
  onSchedule: () => void;
  carouselId?: string;
  previewImages: string[];
  isConverting: boolean;
  linkedinText: string;
  setLinkedinText: (text: string) => void;
  generateAIContent: (topic: string) => Promise<string>;
  isGeneratingContent: boolean;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  onDownloadZip,
  onDownloadPdf,
  onSchedule,
  carouselId,
  previewImages,
  isConverting,
  linkedinText,
  setLinkedinText,
  generateAIContent,
  isGeneratingContent
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [topic, setTopic] = useState('');

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSchedule = async () => {
    if (!carouselId || previewImages.length === 0) return;
    
    setIsScheduling(true);
    try {
      onSchedule();
    } catch (error) {
      console.error("Schedule error:", error);
    } finally {
      setIsScheduling(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic first');
      return;
    }

    try {
      await generateAIContent(topic);
      toast.success('Content generated successfully!');
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkedinText);
    toast.success('Copied to clipboard!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] flex flex-col p-0 gap-0 bg-gray-100">
        {/* Header */}
        <div className="p-4 bg-white border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Preview & Schedule Post</h2>
            <span className="text-sm text-gray-500">
              {previewImages.length} slides
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-auto">
          {/* Left Side - LinkedIn Content */}
          <div className="w-full lg:w-[400px] flex flex-col bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">LinkedIn Post Content</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={copyToClipboard}
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-500">
                    Generate AI content for your post
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Enter topic for AI generation..."
                      className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 whitespace-nowrap shrink-0"
                      onClick={handleGenerateContent}
                      disabled={isGeneratingContent || !topic}
                      title={!topic ? "Please enter a topic first" : ""}
                    >
                      {isGeneratingContent ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-1" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4 min-h-[200px] overflow-hidden">
              <Textarea
                value={linkedinText}
                onChange={(e) => setLinkedinText(e.target.value)}
                placeholder="Write your LinkedIn post content here..."
                className="h-full min-h-[300px] resize-none"
              />
            </div>
          </div>

          {/* Right Side - Carousel Preview */}
          <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-900">Carousel Preview</h3>
            </div>
            
            <div className="flex-1 relative overflow-auto">
              {isConverting ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                  <p className="text-gray-600">Converting slides to images...</p>
                </div>
              ) : previewImages.length > 0 ? (
                <div className="h-full flex items-center justify-center p-6">
                  <div 
                    ref={scrollContainerRef}
                    className="relative flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                  >
                    {previewImages.map((img, index) => (
                      <div 
                        key={index}
                        className="flex-none snap-center first:pl-[20%] last:pr-[20%]"
                      >
                        <div className="relative group">
                          <img
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="h-[500px] w-auto object-contain rounded-lg shadow-lg"
                          />
                          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                            {index + 1}/{previewImages.length}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Controls */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleScroll('left')}
                      className="pointer-events-auto shadow-lg bg-white/90 hover:bg-white transition-all"
                    >
                      ←
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleScroll('right')}
                      className="pointer-events-auto shadow-lg bg-white/90 hover:bg-white transition-all"
                    >
                      →
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">No slides to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t mt-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                onClick={onDownloadZip}
                variant="outline"
                className="bg-white flex gap-2"
                disabled={isConverting || previewImages.length === 0}
              >
                <Download className="w-4 h-4" />
                Download ZIP
              </Button>
              <Button
                onClick={onDownloadPdf}
                variant="outline"
                className="bg-white flex gap-2"
                disabled={isConverting || previewImages.length === 0}
              >
                <FileText className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-white"
              >
                Close
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={!carouselId || isConverting || isScheduling || previewImages.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2"
              >
                {isScheduling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    Schedule Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal; 