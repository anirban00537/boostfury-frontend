import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Upload,
} from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import MediaGrid from "@/components/common/MediaGrid";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (url: string) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onImageSelect,
}) => {
  const {
    loggedin,
    uploadedImages,
    currentPage,
    jumpToPage,
    isLoading,
    totalUsage,
    uploadLoading,
    currentImages,
    totalPages,
    getRootProps,
    getInputProps,
    handleDeleteImage,
    handlePageChange,
    handleJumpToPage,
    setJumpToPage,
    MAX_STORAGE_MB,
    uploadFile,
  } = useFileUpload(isOpen);

  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteImageId) {
      handleDeleteImage(deleteImageId);
      setDeleteImageId(null);
    }
  };

  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      await uploadFile(file);
    }
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );

      if (validFiles.length !== acceptedFiles.length) {
        toast.error("Only JPG and PNG images are allowed.");
      }

      if (validFiles.length > 0) {
        handleUpload(validFiles);
      }
    },
    [handleUpload]
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          size="sm"
          variant={i === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="mx-1 transition-all duration-200"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[900px] h-[90vh] p-0 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="flex-shrink-0 flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Image Gallery</h2>
        </header>

        <div className="flex-grow overflow-y-auto">
          <div className="p-6">
            {!loggedin ? (
              <div className="flex flex-col items-center justify-center h-full">
                <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Login Required
                </p>
                <p className="text-gray-500 text-center">
                  Please log in to upload and manage images.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600">
                      Storage Usage
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {totalUsage.toFixed(2)} MB / {MAX_STORAGE_MB} MB
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${(totalUsage / MAX_STORAGE_MB) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed border-gray-300 
                    rounded-lg p-8 text-center cursor-pointer 
                    transition-all duration-300 ease-in-out mb-6
                    ${
                      uploadLoading
                        ? "bg-gray-100"
                        : "hover:border-blue-500 hover:bg-blue-50"
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  {uploadLoading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-600">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Drag & drop images here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">
                        JPG and PNG only, max 100 MB per file
                      </p>
                    </>
                  )}
                </div>

                <MediaGrid
                  files={currentImages}
                  onSelect={onImageSelect}
                  onDelete={(id) => setDeleteImageId(id)}
                  columns={3}
                  isLoading={isLoading}
                />

                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="mr-2"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    {renderPageNumbers()}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="ml-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <footer className="flex-shrink-0 p-4 border-t border-gray-200">
          <Button
            variant="default"
            onClick={onClose}
            className="w-full transition-all duration-200"
          >
            Close
          </Button>
        </footer>

        <AlertDialog
          open={!!deleteImageId}
          onOpenChange={() => setDeleteImageId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Confirm Image Deletion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this image? This action cannot
                be undone.
                <br />
                <br />
                <strong>Warning:</strong> This image may be in use elsewhere in
                the application. Deleting it could potentially break layouts or
                cause missing images in your projects.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete Image
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
