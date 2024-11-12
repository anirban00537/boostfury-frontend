import React from "react";
import { Download, FileText, Archive } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface DownloadDropdownProps {
  onDownloadPDF: () => void;
  onDownloadZip: () => void;
  pdfLoading: boolean;
  zipLoading: boolean;
  className?: string;
  isAuthenticated: boolean;
  onLoginRequired: () => void;
}

const DownloadDropdown: React.FC<DownloadDropdownProps> = React.memo(
  ({
    onDownloadPDF,
    onDownloadZip,
    pdfLoading,
    zipLoading,
    className,
    isAuthenticated,
    onLoginRequired,
  }) => {
    const isDownloading = pdfLoading || zipLoading;
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`h-10 px-4 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white 
              hover:from-blue-600 hover:via-blue-700 hover:to-blue-900 shadow-sm
              flex items-center gap-2 justify-center transition-all duration-200 ${className}`}
            variant="outline"
          >
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">
              {isDownloading ? "Downloading..." : "Download"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px] p-2">
          <DropdownMenuItem
            onClick={() => onDownloadPDF()}
            disabled={pdfLoading}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-50"
          >
            <FileText className="h-4 w-4 text-gray-500" />
            <div className="flex-1">
              {pdfLoading ? "Downloading PDF..." : "Download PDF"}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDownloadZip()}
            disabled={zipLoading}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-50"
          >
            <Archive className="h-4 w-4 text-gray-500" />
            <div className="flex-1">
              {zipLoading ? "Downloading Zip..." : "Download Zip"}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export default DownloadDropdown;
