"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Trash,
  Calendar,
  Upload,
  Plus,
  Search,
  AlertTriangle,
  FileText,
  Link2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFileUpload } from "@/hooks/useFileUpload";
import toast from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import Image from "next/image";
import FileUploadModal from "@/components/editor/file_upload_modal/file-Upload-Modal.comp";
import MediaGrid from "@/components/common/MediaGrid";
import { useDropzone } from "react-dropzone";
import { processApiResponse } from "@/lib/functions";

const MediaPage = () => {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const {
    loggedin,
    uploadedImages,
    currentPage,
    isLoading,
    totalUsage,
    currentImages,
    totalPages,
    handleDeleteImage,
    handlePageChange,
    MAX_STORAGE_MB,
    uploadFile,
    uploadLoading,
    refetchImages,
  } = useFileUpload(true);
  const [currentUpload, setCurrentUpload] = React.useState<{
    file: File;
    progress: number;
  } | null>(null);

  const handleImageSelect = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard");
  };

  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      try {
        setCurrentUpload({ file, progress: 0 });
        await uploadFile(file);
        await refetchImages();
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setCurrentUpload(null);
      }
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (uploadLoading || currentUpload) {
        toast.error("Please wait for the current upload to finish");
        return;
      }

      const validFiles = acceptedFiles.filter(
        (file) =>
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "application/pdf" // Add PDF support
      );

      if (validFiles.length !== acceptedFiles.length) {
        toast.error("Only JPG, PNG, and PDF files are allowed.");
      }

      if (validFiles.length > 0) {
        handleUpload([validFiles[0]]); // Only upload the first file
        if (validFiles.length > 1) {
          toast.error("Only one file can be uploaded at a time");
        }
      }
    },
    [uploadLoading, currentUpload, handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"], // Add PDF support
    },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Media Library
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your images and media files
              </p>
            </div>
          </div>

          {/* Storage Usage Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-600">Storage Usage</p>
              <p className="text-sm font-semibold text-gray-700">
                {totalUsage.toFixed(2)} MB / {MAX_STORAGE_MB} MB
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(totalUsage / MAX_STORAGE_MB) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-8 py-6">
        {!loggedin ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 min-h-[600px] flex flex-col items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Login Required
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Please log in to manage your media files
            </p>
          </div>
        ) : (
          <>
            {/* Compact Upload Area */}
            <div className="mb-6">
              <div
                {...getRootProps()}
                className={`
                  relative border-2 border-dashed rounded-xl p-4 transition-all duration-200
                  ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  ${uploadLoading || currentUpload ? "pointer-events-none" : ""}
                `}
              >
                <input
                  {...getInputProps()}
                  disabled={uploadLoading || !!currentUpload}
                />
                {currentUpload ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        Uploading {currentUpload.file.name}...
                      </h3>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${currentUpload.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Please wait while your file is being uploaded
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {isDragActive
                          ? "Drop file here"
                          : "Drag & drop a file here, or click to select"}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload one file at a time • JPG, PNG, PDF (up to 5MB) •{" "}
                        {(MAX_STORAGE_MB - totalUsage).toFixed(2)} MB remaining
                      </p>
                    </div>
                  </div>
                )}
                {(uploadLoading || currentUpload) && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
                )}
              </div>
            </div>

            {/* Media Grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Media Files
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">
                    {uploadedImages.length} items
                  </p>
                </div>
              </div>

              <MediaGrid
                files={currentImages}
                onSelect={handleImageSelect}
                onDelete={(id) => handleDeleteImage(id)}
                columns={4}
                isLoading={isLoading}
                showDate={true}
              />

              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={uploadedImages.length}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default MediaPage;
