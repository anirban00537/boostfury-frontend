import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { FileText, Link2, ImageIcon, Trash, File } from "lucide-react";
import { formatFileSize, formatDate } from '@/lib/utils';
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

interface MediaFile {
  id: string;
  url: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

interface MediaGridProps {
  files: MediaFile[];
  onSelect: (url: string) => void;
  onDelete: (id: string) => void;
  columns?: 3 | 4;
  isLoading?: boolean;
  showDate?: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  files,
  onSelect,
  onDelete,
  columns = 4,
  isLoading = false,
  showDate = false,
}) => {
  const [fileToDelete, setFileToDelete] = useState<MediaFile | null>(null);

  const handleSelect = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    onSelect(url);
  };

  const handleDeleteClick = (e: React.MouseEvent, file: MediaFile) => {
    e.stopPropagation();
    setFileToDelete(file);
  };

  const handleDeleteConfirm = () => {
    if (fileToDelete) {
      onDelete(fileToDelete.id);
      setFileToDelete(null);
    }
  };

  const renderMediaItem = (file: MediaFile) => {
    const isPDF = file.mimeType === "application/pdf";
    const fileExtension = isPDF ? 'PDF' : file.mimeType.split('/')[1].toUpperCase();
    const fileSize = formatFileSize(file.size);
    const uploadDate = formatDate(file.createdAt);

    return (
      <div
        key={file.id}
        className="relative group bg-white rounded-xl border border-gray-200 overflow-hidden 
                   hover:border-primary/20 transition-colors duration-200"
      >
        {isPDF ? (
          <div 
            className="aspect-square relative bg-gray-50 flex flex-col items-center justify-center p-4 
                     cursor-pointer hover:bg-primary/5 transition-colors duration-200"
            onClick={(e) => handleSelect(e, file.url)}
          >
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-primary/60" />
            </div>
            <div className="text-center">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                PDF Document
              </span>
              <p className="mt-2 text-sm text-gray-600 truncate max-w-[180px]">
                {file.originalName}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {fileSize}
              </p>
            </div>
          </div>
        ) : (
          // Image Display
          <div 
            className="aspect-square relative cursor-pointer"
            onClick={(e) => handleSelect(e, file.url)}
          >
            <Image
              src={file.url}
              alt={file.originalName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </div>
        )}

        <div className="p-3 border-t border-gray-100">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.originalName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-1.5 py-0.5 bg-primary/5 rounded text-primary/80 text-xs">
                  {fileExtension}
                </span>
                <span className="text-xs text-gray-400">
                  {fileSize}
                </span>
              </div>
              {showDate && (
                <p className="text-xs text-gray-400 mt-1">
                  Uploaded {uploadDate}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-200 z-10">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(e, file.url);
            }}
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white shadow-sm border border-gray-200 
                     hover:bg-primary/5 hover:border-primary/20"
          >
            {isPDF ? (
              <Link2 className="h-4 w-4 text-primary/70" />
            ) : (
              <ImageIcon className="h-4 w-4 text-primary/70" />
            )}
          </Button>
          <Button
            onClick={(e) => handleDeleteClick(e, file)}
            size="sm"
            variant="destructive"
            className="h-8 w-8 p-0 bg-white shadow-sm border border-gray-200 hover:bg-red-50"
          >
            <Trash className="h-4 w-4 text-red-500 hover:text-red-600" />
          </Button>
        </div>

        <div className="absolute top-0 right-0 h-16 w-32 bg-gradient-to-l from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12 bg-primary/5 rounded-xl border border-dashed 
                    border-primary/20 hover:border-primary/30 transition-colors duration-200">
        <File className="mx-auto h-12 w-12 text-primary/40" />
        <h3 className="mt-4 text-sm font-medium text-gray-900">No files</h3>
        <p className="mt-1 text-sm text-primary/60">
          Upload files to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-${columns} gap-4`}>
        {files.map(renderMediaItem)}
      </div>

      <AlertDialog 
        open={!!fileToDelete} 
        onOpenChange={() => setFileToDelete(null)}
      >
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-600 gap-2">
              <Trash className="h-5 w-5" />
              Confirm File Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                Are you sure you want to delete{' '}
                <span className="font-medium text-gray-900">
                  {fileToDelete?.originalName}
                </span>
                ?
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 
                           text-sm text-gray-700">
                <p className="font-medium mb-1">⚠️ Warning:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>This file may be used in existing blog posts</li>
                  <li>It could be part of scheduled posts</li>
                  <li>It might be included in carousels</li>
                  <li>This action cannot be undone</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete File
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MediaGrid;