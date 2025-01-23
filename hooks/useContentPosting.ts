import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setContent } from "@/state/slices/contentSlice";
import { LinkedInPostImage } from "@/types/post";

interface PostDetails {
  id?: string;
  images?: LinkedInPostImage[];
  publishedAt?: string;
  scheduledTime?: string;
}

export const useContentPosting = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.content.content);
  const [isPosting, setIsPosting] = useState(false);
  const [isAddingToQueue, setIsAddingToQueue] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [postDetails, setPostDetails] = useState<PostDetails>({});

  const handleContentChange = useCallback(
    (newContent: string) => {
      dispatch(setContent(newContent));
    },
    [dispatch]
  );

  const handlePostNow = useCallback(async (profileId: string) => {
    try {
      setIsPosting(true);
      // TODO: Implement post now functionality
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setIsPosting(false);
    } catch (error) {
      console.error("Error posting content:", error);
      setIsPosting(false);
    }
  }, []);

  const handleAddToQueue = useCallback(async (profileId: string) => {
    try {
      setIsAddingToQueue(true);
      // TODO: Implement add to queue functionality
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setIsAddingToQueue(false);
    } catch (error) {
      console.error("Error adding to queue:", error);
      setIsAddingToQueue(false);
    }
  }, []);

  const handleSchedule = useCallback(async (date: Date) => {
    try {
      setIsScheduling(true);
      // TODO: Implement schedule functionality
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setIsScheduling(false);
    } catch (error) {
      console.error("Error scheduling post:", error);
      setIsScheduling(false);
    }
  }, []);

  const handleImageUpload = useCallback(
    async (file: File): Promise<boolean> => {
      try {
        setIsUploading(true);
        // TODO: Implement image upload functionality
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

        // Simulate successful upload with a temporary URL
        const tempUrl = URL.createObjectURL(file);
        setPostDetails((prev) => ({
          ...prev,
          images: [
            ...(prev.images || []),
            { id: Date.now().toString(), imageUrl: tempUrl },
          ],
        }));

        setIsUploading(false);
        return true;
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsUploading(false);
        return false;
      }
    },
    []
  );

  const handleImageDelete = useCallback(async (imageId: string) => {
    try {
      // TODO: Implement image delete functionality
      setPostDetails((prev) => ({
        ...prev,
        images: prev.images?.filter((img) => img.id !== imageId),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }, []);

  return {
    content,
    postDetails,
    isPosting,
    isAddingToQueue,
    isScheduling,
    handlePostNow,
    handleAddToQueue,
    handleSchedule,
    handleContentChange,
    handleImageUpload,
    isUploading,
    handleImageDelete,
  };
};
