import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import { useMutation, useQueryClient, useQuery } from "react-query";
import toast from "react-hot-toast";
import {
  uploadFile as uploadFileService,
  getFiles,
  deleteFile,
  getFileUsage,
} from "@/services/image.service";
import { processApiResponse } from "@/lib/functions";
import { ApiResponse } from "@/types";

interface FileInfo {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse {
  success: boolean;
  message: string;
  data: {
    items: FileInfo[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
}

interface UsageResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    totalSize: number;
  };
}

const MAX_STORAGE_MB = 500;
const MB_TO_BYTES = 1024 * 1024;

export const useFileUpload = (isOpen: boolean) => {
  const { userinfo, subscription, loggedin, currentWorkspace } = useSelector(
    (state: RootState) => state.user
  );
  const isSubscribed = subscription.isActive;
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const imagesPerPage = 9;
  const queryClient = useQueryClient();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch images
  const {
    data: imagesData,
    isLoading,
    refetch: refetchImages,
  } = useQuery<PaginatedResponse>(
    ["images", currentPage, imagesPerPage],
    async () => {
      const response = await getFiles({
        page: currentPage,
        pageSize: imagesPerPage,
      });
      console.log("Files response:", response);
      return response;
    },
    {
      enabled: isOpen && loggedin,
    }
  );

  // Fetch total usage
  const { data: usageData, refetch: refetchUsage } = useQuery<UsageResponse>(
    "fileUsage",
    getFileUsage,
    {
      enabled: isOpen && loggedin,
    }
  );

  const totalUsage = usageData?.data.totalSize
    ? usageData.data.totalSize / MB_TO_BYTES
    : 0;
  const totalCount = usageData?.data.totalCount || 0;

  // Upload images mutation
  const uploadMutation = useMutation<ApiResponse, Error, File>(
    (file) => uploadFileService(file),
    {
      onSuccess: (response: ApiResponse) => {
        processApiResponse(response);
        refetchUsage();
        refetchImages();
      },
      onError: (error: Error) => {
        console.log(error, "errorresponseresponseresponseresponse");
        processApiResponse(error);
      },
    }
  );

  const uploadFile = async (file: File) => {
    try {
      setUploadLoading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      try {
        const response = await uploadFileService(file);

        // Clear interval and set to 100%
        clearInterval(interval);
        setUploadProgress(100);

        // Small delay to show 100% completion
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Refetch both images and usage data
        await Promise.all([refetchImages(), refetchUsage()]);

        return response;
      } catch (error: any) {
        clearInterval(interval);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Failed to upload file");
        }
        throw error;
      }
    } finally {
      setUploadLoading(false);
      setUploadProgress(0);
    }
  };

  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      if (!userinfo) {
        toast.error("Please log in to upload images.");
        return;
      }

      if (loggedin) {
        for (const file of acceptedFiles) {
          try {
            await uploadFile(file);
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            }
            console.error("Error in onDrop:", error);
          }
        }
      }

      if (fileRejections.length > 0) {
        fileRejections.forEach((rejection) => {
          toast.error(
            `File ${rejection.file.name} was rejected: ${rejection.errors[0].message}`
          );
        });
      }
    },
    [loggedin, userinfo, totalUsage, uploadFile]
  );

  const deleteMutation = useMutation<void, Error, string>(
    (fileId) => deleteFile(fileId),
    {
      onSuccess: () => {
        refetchUsage();
        refetchImages();
      },
      onError: (error) => {
        console.error("Error deleting file: ", error);
        toast.error("Failed to delete file.");
      },
    }
  );

  const handleDeleteImage = async (fileId: string) => {
    try {
      await deleteMutation.mutateAsync(fileId);
    } catch (error) {
      console.error("Error in handleDeleteImage:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_STORAGE_MB * MB_TO_BYTES,
    disabled: uploadMutation.isLoading,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (imagesData?.data.pagination.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(jumpToPage, 10);
    if (
      pageNumber >= 1 &&
      pageNumber <= (imagesData?.data.pagination.totalPages || 1)
    ) {
      setCurrentPage(pageNumber);
      setJumpToPage("");
    } else {
      toast.error(
        `Please enter a valid page number between 1 and ${
          imagesData?.data.pagination.totalPages || 1
        }`
      );
    }
  };

  return {
    uploadedImages: imagesData?.data?.items || [],
    currentPage,
    jumpToPage,
    isLoading,
    totalUsage,
    totalCount,
    uploadLoading,
    currentImages: imagesData?.data?.items || [],
    totalPages: imagesData?.data?.pagination?.totalPages || 1,
    getRootProps,
    getInputProps,
    handleDeleteImage,
    handlePageChange,
    handleJumpToPage,
    setJumpToPage,
    MAX_STORAGE_MB,
    onDrop,
    isSubscribed,
    userinfo,
    refetchImages,
    loggedin,
    uploadFile,
    uploadProgress,
  };
};
