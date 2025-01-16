import { Calendar, Clock, Pencil, Send, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";

interface PostActionSheetProps {
  content: string;
  onPostNow?: () => void;
  onQueue?: () => void;
  onSchedule?: () => void;
}

export function PostActionSheet({
  content,
  onPostNow,
  onQueue,
  onSchedule,
}: PostActionSheetProps) {
  const [editableContent, setEditableContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height before calculating new height
      textareaRef.current.style.height = "auto";
      // Add extra padding to ensure all content is visible
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 4}px`;
    }
  }, [editableContent]);

  // Trigger resize on initial render
  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("•")) {
        return (
          <div key={i} className="flex items-start gap-2 mb-1 pl-0.5">
            <span className="text-gray-700">•</span>
            <span className="flex-1">{line.slice(1).trim()}</span>
          </div>
        );
      }

      if (line.trim() === "") {
        return <div key={i} className="h-3" />;
      }

      const words = line.split(" ");
      const formattedWords = words.map((word, j) => {
        if (word.startsWith("#")) {
          return (
            <span
              key={j}
              className="text-[#0a66c2] hover:underline cursor-pointer"
            >
              {word}{" "}
            </span>
          );
        }
        return word + " ";
      });

      return (
        <p key={i} className={line.trim() !== "" ? "mb-3 last:mb-0" : ""}>
          {formattedWords}
        </p>
      );
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 text-sm px-4 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg">
          Post
        </button>
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:w-[540px] h-full p-0 flex flex-col bg-gray-50/80 backdrop-blur-sm">
        <SheetHeader className="p-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
          <SheetTitle className="text-xl font-semibold text-gray-800">
            Review & Post
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* LinkedIn Post Preview Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between p-4 border-b border-gray-50">
              <div className="flex gap-3">
                <div className="relative">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4E03AQGSALKCBLx4wQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1680857805267?e=1742428800&v=beta&t=YpN5D34ajmReumjdL6XvZmnh3EWhbSK6Gt4H_Hh0PKg"
                    alt="LinkedIn Profile"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                      Eilidh Morone
                    </span>
                    <span className="text-sm text-gray-500">• 1st</span>
                  </div>
                  <span className="text-xs text-gray-600">
                    Software Engineer
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <span>Now</span>
                    <span>•</span>
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 15a7 7 0 110-14 7 7 0 010 14zM7 7H4v1h3v3h1V8h3V7H8V4H7v3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pt-3 pb-2">
              <div className="relative min-h-[200px] max-h-[400px]">
                <textarea
                  ref={textareaRef}
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  className="w-full h-full min-h-[200px] max-h-[400px] text-[15px] leading-relaxed resize-none border-0 focus:ring-0 focus:outline-none p-0 overflow-y-auto bg-transparent placeholder:text-gray-400 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300"
                  placeholder="Write your post..."
                  rows={10}
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 px-2 pt-2 pb-2 border-t border-gray-50 bg-gray-50/50">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 h-[38px] px-4 text-[13px] font-medium hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors"
              >
                <ThumbsUp className="w-[16px] h-[16px] mr-2" />
                Like
              </Button>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm p-5 mt-auto">
          <div className="space-y-3">
            <Button
              onClick={onPostNow}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full h-11 font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Send className="w-4 h-4 mr-2" />
              Post Now
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onQueue}
                className="w-full rounded-full h-11 font-medium border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <Clock className="w-4 h-4 mr-2" />
                Add to Queue
              </Button>

              <Button
                variant="outline"
                onClick={onSchedule}
                className="w-full rounded-full h-11 font-medium border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
