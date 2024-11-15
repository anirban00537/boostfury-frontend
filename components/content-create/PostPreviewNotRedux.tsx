import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface LinkedInProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  linkedInProfileUrl?: string | null;
}

interface PostUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  photo: string | null;
}

interface PostLog {
  id: string;
  status: string;
  message: string;
  timestamp: string;
}

export interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

interface PostPreviewNotReduxProps {
  title?: string;
  content: string;
  isGenerating: boolean;
  hideViewModeSelector?: boolean;
  status?: "scheduled" | "draft" | "published" | "failed";
  dropdownItems?: DropdownItem[];
  linkedInProfile: LinkedInProfile;
  user: PostUser;
  postLogs?: PostLog[];
  publishedAt?: string | null;
  scheduledTime?: string | null;
  imageUrls?: string[];
}

export const PostPreviewNotRedux = ({
  content,
  isGenerating,
  hideViewModeSelector = false,
  status,
  dropdownItems,
  linkedInProfile,
  user,
  postLogs,
  publishedAt,
  scheduledTime,
  imageUrls,
}: PostPreviewNotReduxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content needs "show more" button
  useEffect(() => {
    const checkLineCount = () => {
      const element = contentRef.current;
      if (!element) return;

      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const totalHeight = element.scrollHeight;
      const lines = Math.floor(totalHeight / lineHeight);

      setHasMoreContent(lines > 3);
    };

    checkLineCount();
    window.addEventListener("resize", checkLineCount);
    return () => window.removeEventListener("resize", checkLineCount);
  }, [content]);

  const getStatusConfig = (status: string | undefined) => {
    switch (status) {
      case "scheduled":
        return {
          icon: <Calendar className="h-3.5 w-3.5" />,
          text: "Scheduled",
          className: "text-blue-600 bg-blue-50",
        };
      case "draft":
        return {
          icon: <FileText className="h-3.5 w-3.5" />,
          text: "Draft",
          className: "text-gray-600 bg-gray-50",
        };
      case "published":
        return {
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          text: "Published",
          className: "text-green-600 bg-green-50",
        };
      case "failed":
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          text: "Failed",
          className: "text-red-600 bg-red-50",
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig(status);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-gray-200 bg-white p-4 space-y-4 h-full"
      >
        {/* LinkedIn Profile Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <Avatar className="h-8 w-8 rounded-full">
              <img
                src={linkedInProfile?.avatarUrl || "/linkedin-logo.webp"}
                alt={linkedInProfile?.name || ""}
                className="h-full w-full object-cover rounded-full"
              />
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-900">
                  {linkedInProfile?.name || "LinkedIn Profile"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                {publishedAt && <span>{formatDate(publishedAt)}</span>}
                {scheduledTime && (
                  <span>Scheduled for {formatDate(scheduledTime)}</span>
                )}
                <span>•</span>
                <span>
                  <svg
                    className="w-3 h-3 text-[#0A66C2] inline-block"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48A1.56,1.56,0,1,1,8.15,6.92,1.57,1.57,0,0,1,6.59,8.48ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="flex items-start gap-2">
            {/* Status Badge */}

            {dropdownItems && dropdownItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  {dropdownItems.map((item, index) =>
                    item.href ? (
                      <Link key={index} href={item.href} passHref>
                        <DropdownMenuItem
                          className={`flex items-center gap-2 cursor-pointer ${
                            item.className || ""
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      </Link>
                    ) : (
                      <DropdownMenuItem
                        key={index}
                        onClick={item.onClick}
                        className={`flex items-center gap-2 cursor-pointer ${
                          item.className || ""
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="text-sm text-gray-900">
          {isGenerating ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          ) : (
            <div className="relative">
              <div
                ref={contentRef}
                className={`whitespace-pre-wrap break-words relative ${
                  !isExpanded && hasMoreContent ? "line-clamp-3" : ""
                }`}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  lineHeight: "1.5",
                }}
              >
                {content}
              </div>

              {hasMoreContent && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium mt-1"
                >
                  {isExpanded ? "...see less" : "...see more"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Image Grid */}
        {imageUrls && imageUrls.length > 0 && (
          <div className="mt-4">
            <div
              className={`grid gap-1 w-full ${
                imageUrls.length === 1
                  ? 'grid-cols-1'
                  : imageUrls.length === 2
                  ? 'grid-cols-2'
                  : imageUrls.length === 3
                  ? 'grid-cols-2'
                  : imageUrls.length === 4
                  ? 'grid-cols-2'
                  : 'grid-cols-3'
              }`}
            >
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={`relative ${
                    imageUrls.length === 3 && index === 0
                      ? 'row-span-2'
                      : imageUrls.length > 4 && index >= 4
                      ? 'hidden md:block'
                      : ''
                  }`}
                >
                  <div
                    className={`relative ${
                      imageUrls.length === 1 ? 'pt-[52%]' : 'pt-[100%]'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Post image ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover ${
                        imageUrls.length === 1 ? 'rounded-lg' : index === 0 ? 'rounded-tl-lg' :
                        index === 1 && imageUrls.length === 2 ? 'rounded-tr-lg' :
                        index === imageUrls.length - 1 && index % 3 === 0 ? 'rounded-bl-lg' :
                        index === imageUrls.length - 1 ? 'rounded-br-lg' : ''
                      }`}
                    />
                    {/* Overlay for images beyond the 4th one */}
                    {imageUrls.length > 4 && index === 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-br-lg">
                        <span className="text-white text-lg font-medium">
                          +{imageUrls.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Post Logs */}
        <div className="flex items-center gap-2">
          {status && statusConfig && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}
            >
              {statusConfig.icon}
              <span>{statusConfig.text}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
