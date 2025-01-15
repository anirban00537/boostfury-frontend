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
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [editableContent]);

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
        <button className="flex items-center gap-2 p-1.5 bg-gradient-to-br from-blue-600 to-blue-700 text-sm px-3 hover:bg-blue-700 text-white rounded-md">
          Post
        </button>
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:w-[540px] h-full p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-gray-100">
          <SheetTitle>Review & Post</SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* LinkedIn Post Preview Card */}
          <div className="m-4 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-start justify-between p-3 border-b border-gray-100">
              <div className="flex gap-3">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4E03AQGSALKCBLx4wQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1680857805267?e=1742428800&v=beta&t=YpN5D34ajmReumjdL6XvZmnh3EWhbSK6Gt4H_Hh0PKg"
                  alt="LinkedIn Profile"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-gray-900">
                      Eilidh Morone
                    </span>
                    <span className="text-sm text-gray-500">• 1st</span>
                  </div>
                  <span className="text-xs text-gray-500">
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
            <div className="px-3 pt-2 pb-1">
              <textarea
                ref={textareaRef}
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="w-full text-[14px] leading-[1.3333] resize-none border-0 focus:ring-0 focus:outline-none p-0"
                placeholder="Write your post..."
                style={{
                  minHeight: "100%",
                  height: textareaRef.current?.scrollHeight + "px" || "auto",
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0.5 px-2 pt-1 pb-1 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 h-[40px] px-3 text-[13px] font-normal hover:bg-gray-100 hover:text-gray-700"
              >
                <ThumbsUp className="w-[18px] h-[18px] mr-2" />
                Like
              </Button>
              {/* ... other action buttons ... */}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="border-t border-gray-100 bg-white p-4 mt-auto">
          <div className="space-y-3">
            <Button
              onClick={onPostNow}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Post Now
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={onQueue} className="w-full">
                <Clock className="w-4 h-4 mr-2" />
                Add to Queue
              </Button>

              <Button variant="outline" onClick={onSchedule} className="w-full">
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
