import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedInPostImage, Post, LinkedInProfileUI } from "@/types/post";

interface ContentState {
  content: string;
  postDetails: Post | null;
  selectedProfile: LinkedInProfileUI | null;
  isAutoSaving: boolean;
  isLoadingDraft: boolean;
  isCreatingDraft: boolean;
  isPosting: boolean;
  isAddingToQueue: boolean;
  isScheduling: boolean;
  isUploading: boolean;
  images: LinkedInPostImage[];
  isGenerating: boolean;
  isEditorOpen: boolean;
}

const initialState: ContentState = {
  content: "",
  postDetails: null,
  selectedProfile: null,
  isAutoSaving: false,
  isLoadingDraft: false,
  isCreatingDraft: false,
  isPosting: false,
  isAddingToQueue: false,
  isScheduling: false,
  isUploading: false,
  images: [],
  isGenerating: false,
  isEditorOpen: true,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setPostDetails: (state, action: PayloadAction<Post | null>) => {
      state.postDetails = action.payload;
    },
    setSelectedProfile: (
      state,
      action: PayloadAction<LinkedInProfileUI | null>
    ) => {
      state.selectedProfile = action.payload;
    },
    setIsAutoSaving: (state, action: PayloadAction<boolean>) => {
      state.isAutoSaving = action.payload;
    },
    setIsLoadingDraft: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDraft = action.payload;
    },
    setIsCreatingDraft: (state, action: PayloadAction<boolean>) => {
      state.isCreatingDraft = action.payload;
    },
    setIsPosting: (state, action: PayloadAction<boolean>) => {
      state.isPosting = action.payload;
    },
    setIsAddingToQueue: (state, action: PayloadAction<boolean>) => {
      state.isAddingToQueue = action.payload;
    },
    setIsScheduling: (state, action: PayloadAction<boolean>) => {
      state.isScheduling = action.payload;
    },
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    setImages: (state, action: PayloadAction<LinkedInPostImage[]>) => {
      state.images = action.payload;
    },
    addImage: (state, action: PayloadAction<LinkedInPostImage>) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img.id !== action.payload);
    },
    reorderImages: (state, action: PayloadAction<string[]>) => {
      const newImages = action.payload.map(
        (id) => state.images.find((img) => img.id === id)!
      );
      state.images = newImages;
    },
    setIsGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    resetContent: (state) => {
      return initialState;
    },
    setIsEditorOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditorOpen = action.payload;
    },
    toggleEditor: (state) => {
      state.isEditorOpen = !state.isEditorOpen;
    },
  },
});

export const {
  setContent,
  setPostDetails,
  setSelectedProfile,
  setIsAutoSaving,
  setIsLoadingDraft,
  setIsCreatingDraft,
  setIsPosting,
  setIsAddingToQueue,
  setIsScheduling,
  setIsUploading,
  setImages,
  addImage,
  removeImage,
  reorderImages,
  setIsGenerating,
  resetContent,
  setIsEditorOpen,
  toggleEditor,
} = contentSlice.actions;

export default contentSlice.reducer;
