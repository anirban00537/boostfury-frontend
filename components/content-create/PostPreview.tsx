import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { MoreHorizontal, Calendar, FileText, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkedInProfileUI } from "@/types/post";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Post } from "@/types/post";

export interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

interface PostPreviewProps {
  title: string;
  content: string;
  isGenerating: boolean;
  status?: "scheduled" | "draft" | "published" | "failed";
  dropdownItems?: DropdownItem[];
  selectedProfile: LinkedInProfileUI | null;
  imageUrls?: string[];
  postDetails?: Post | null;
}

const MIN_CHARS = 10;

export const PostPreview = ({
  title,
  content,
  isGenerating,
  status,
  dropdownItems,
  selectedProfile,
  imageUrls = [],
  postDetails,
}: PostPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[780px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200/80 bg-white shadow-sm rounded-xl"
          >
            {selectedProfile ? (
              <>
                <div className={cn("p-4", "border-b border-gray-100")}>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <Avatar className="h-12 w-12 rounded-full ring-2 ring-white shadow-sm">
                        <img
                          src={selectedProfile.avatarUrl}
                          alt={selectedProfile.name}
                          className="h-full w-full object-cover rounded-full"
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                            {selectedProfile.name}
                          </span>
                          <span className="text-sm text-gray-500">• You</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                          <span>{status || "Draft"}</span>
                          <span>•</span>
                          <svg
                            className="w-3.5 h-3.5 text-[#0A66C2]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48A1.56,1.56,0,1,1,8.15,6.92,1.57,1.57,0,0,1,6.59,8.48ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {status && statusConfig && (
                        <div
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm",
                            statusConfig.className
                          )}
                        >
                          {statusConfig.icon}
                          <span>{statusConfig.text}</span>
                        </div>
                      )}

                      {dropdownItems && dropdownItems.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-50 rounded-full"
                            >
                              <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[180px]"
                          >
                            {dropdownItems.map((item, index) => (
                              <DropdownMenuItem
                                key={index}
                                onClick={item.onClick}
                                className={cn(
                                  "flex items-center gap-2 text-sm",
                                  item.className
                                )}
                              >
                                {item.icon}
                                {item.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4">
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

                  {(imageUrls.length > 0 ||
                    (postDetails?.images && postDetails.images.length > 0)) && (
                    <div className="px-4 pb-4">
                      <div
                        className={cn(
                          "grid gap-1",
                          imageUrls.length +
                            (postDetails?.images?.length || 0) ===
                            1 && "grid-cols-1",
                          imageUrls.length +
                            (postDetails?.images?.length || 0) ===
                            2 && "grid-cols-2",
                          imageUrls.length +
                            (postDetails?.images?.length || 0) >=
                            3 && "grid-cols-2"
                        )}
                      >
                        {postDetails?.images?.map((image, index) => (
                          <div
                            key={image.id}
                            className={cn(
                              "relative rounded-lg overflow-hidden shadow-sm",
                              imageUrls.length +
                                (postDetails?.images?.length || 0) ===
                                3 &&
                                index === 0 &&
                                "row-span-2"
                            )}
                          >
                            <Image
                              src={image.imageUrl}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              width={400}
                              height={400}
                              style={{
                                aspectRatio:
                                  imageUrls.length +
                                    (postDetails?.images?.length || 0) ===
                                  1
                                    ? "16/9"
                                    : "1/1",
                              }}
                            />
                          </div>
                        ))}

                        {imageUrls.map((url, index) => (
                          <div
                            key={`new-${index}`}
                            className={cn(
                              "relative rounded-lg overflow-hidden shadow-sm",
                              imageUrls.length +
                                (postDetails?.images?.length || 0) ===
                                3 &&
                                index + (postDetails?.images?.length || 0) ===
                                  0 &&
                                "row-span-2"
                            )}
                          >
                            <Image
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              width={400}
                              height={400}
                              style={{
                                aspectRatio:
                                  imageUrls.length +
                                    (postDetails?.images?.length || 0) ===
                                  1
                                    ? "16/9"
                                    : "1/1",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className={cn(
                  "min-h-[400px] flex flex-col items-center justify-center",
                  "p-8"
                )}
              >
                <div className="w-full max-w-[280px] flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-8">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48A1.56,1.56,0,1,1,8.15,6.92,1.57,1.57,0,0,1,6.59,8.48ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No LinkedIn Account Connected
                  </h3>
                  <p className="text-sm text-gray-500">
                    Please connect your LinkedIn account to start posting
                    content
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
