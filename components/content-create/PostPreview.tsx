import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Calendar,
  FileText,
  XCircle,
  Tablet,
  Smartphone,
  Monitor,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkedInProfileUI } from "@/types/post";
import { Viewer, SpecialZoomLevel, Worker } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

export interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  documentUrl?: string;
}

interface PostPreviewProps {
  title: string;
  content: string;
  isGenerating: boolean;
  hideViewModeSelector?: boolean;
  status?: "scheduled" | "draft" | "published" | "failed";
  dropdownItems?: DropdownItem[];
  selectedProfile: LinkedInProfileUI | null;
  imageUrls?: string[];
  documentUrl?: string;
}

type ViewMode = "mobile" | "tablet" | "desktop";

const MIN_CHARS = 10;

export const PostPreview = ({
  title,
  content,
  isGenerating,
  hideViewModeSelector = false,
  status,
  dropdownItems,
  selectedProfile,
  imageUrls = [],
  documentUrl,
}: PostPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // Reset states when documentUrl changes
    setNumPages(0);
    setCurrentPage(0);
    setIsLoading(true);
  }, [documentUrl]);

  const pageNavigationPluginInstance = pageNavigationPlugin({});
  const { jumpToPage } = pageNavigationPluginInstance;

  const handlePrevPage = () => {
    if (currentPage > 0) {
      jumpToPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages - 1) {
      jumpToPage(currentPage + 1);
    }
  };

  // Add viewMode-specific styles
  const getViewportStyles = (mode: ViewMode) => {
    switch (mode) {
      case "mobile":
        return {
          containerClass: "max-w-[375px]",
          previewClass: "scale-[0.85] origin-top",
        };
      case "tablet":
        return {
          containerClass: "max-w-[768px]",
          previewClass: "scale-[0.9] origin-top",
        };
      case "desktop":
        return {
          containerClass: "max-w-3xl",
          previewClass: "scale-100",
        };
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* View Mode Selector */}
      {!hideViewModeSelector && (
        <div className="flex items-center justify-between px-2 md:px-0">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <div className="bg-white/80 p-1 rounded-lg flex gap-1 shadow-sm border border-gray-200/80">
            <button
              onClick={() => setViewMode("mobile")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200",
                viewMode === "mobile"
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
              title="Mobile view"
            >
              <Smartphone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("tablet")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200",
                viewMode === "tablet"
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
              title="Tablet view"
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("desktop")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200",
                viewMode === "desktop"
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
              title="Desktop view"
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="flex justify-center w-full">
        <div
          className={cn(
            "w-full transition-all duration-300",
            getViewportStyles(viewMode).containerClass
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-xl border border-gray-200/80 bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
              "transition-all duration-300",
              getViewportStyles(viewMode).previewClass
            )}
          >
            {selectedProfile ? (
              <>
                {/* Profile Header */}
                <div
                  className={cn(
                    "p-6 border-b border-gray-100",
                    viewMode === "mobile" && "p-4"
                  )}
                >
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

                    {/* Status Badge and Actions */}
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

                {/* Content Area */}
                <div className={cn("p-6", viewMode === "mobile" && "p-4")}>
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

                  {/* Image Grid */}
                  {imageUrls.length > 0 && (
                    <div
                      className={cn("mt-4", viewMode === "mobile" && "mt-3")}
                    >
                      <div
                        className={cn(
                          "grid gap-2",
                          imageUrls.length === 1 && "grid-cols-1",
                          imageUrls.length === 2 && "grid-cols-2",
                          imageUrls.length >= 3 && "grid-cols-2",
                          viewMode === "mobile" && "gap-1"
                        )}
                      >
                        {imageUrls.map((url, index) => (
                          <div
                            key={index}
                            className={cn(
                              "relative rounded-lg overflow-hidden shadow-sm",
                              imageUrls.length === 3 &&
                                index === 0 &&
                                "row-span-2"
                            )}
                          >
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              style={{
                                aspectRatio:
                                  imageUrls.length === 1 ? "16/9" : "1/1",
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
              // No LinkedIn Account State
              <div
                className={cn(
                  "min-h-[400px] flex flex-col items-center justify-center",
                  viewMode === "mobile" ? "p-4" : "p-8"
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
