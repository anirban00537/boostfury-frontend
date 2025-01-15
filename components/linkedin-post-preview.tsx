import { Copy, ThumbsUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LinkedInPostPreviewProps {
  content: string;
}

export function LinkedInPostPreview({ content }: LinkedInPostPreviewProps) {
  // Function to format content with hashtags and line breaks
  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Handle bullet points
      if (line.startsWith("•")) {
        return (
          <div key={i} className="flex items-start gap-2 mb-1 pl-0.5">
            <span className="text-gray-700">•</span>
            <span className="flex-1">{line.slice(1).trim()}</span>
          </div>
        );
      }

      // Handle empty lines
      if (line.trim() === "") {
        return <div key={i} className="h-3" />;
      }

      // Handle hashtags
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
    >
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
            <span className="text-xs text-gray-500">Software Engineer</span>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <span>22h</span>
              <span>•</span>
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 15a7 7 0 110-14 7 7 0 010 14zM7 7H4v1h3v3h1V8h3V7H8V4H7v3z" />
              </svg>
            </div>
          </div>
        </div>
        <button className="p-1.5 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="px-3 pt-2 pb-1">
        <div className="text-[14px] text-gray-900 leading-[1.3333] text-left">
          {formatContent(content)}
        </div>
        <div className="mt-2 text-[14px] text-gray-500">
          <span>1 repost</span>
        </div>
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
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 h-8 text-xs font-normal"
        >
          <svg
            className="w-4 h-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Comment
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 h-8 text-xs font-normal"
        >
          <svg
            className="w-4 h-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4v7a4 4 0 004 4h12M4 11l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Repost
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 h-8 text-xs font-normal"
        >
          <svg
            className="w-4 h-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 10h10a4 4 0 010 8h-4M7 10l-4-4m0 0l4-4m-4 4h11a7 7 0 017 7v0a7 7 0 01-7 7H7" />
          </svg>
          Send
        </Button>
      </div>
    </motion.div>
  );
}
