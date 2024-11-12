import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CarouselState,
  Slide,
  TextSettings,
  BackgroundColors,
  LayoutSettings,
} from "@/types";
import { initialSlides, initialCarousel } from "@/lib/data";
import { sharedElements } from "@/lib/core-constants";

const initialState: CarouselState = initialCarousel;

type UpdatePayload = {
  key: keyof CarouselState;
  value: any;
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setAllData: (state, action: PayloadAction<CarouselState>) => {
      return action.payload;
    },
    insertSlide: (state, action: PayloadAction<number>) => {
      const newSlide: Slide = {
        title: "New Slide",
        tagline: "New Tagline",
        description: "New Description",
        type: "slide",
        showImage: false,
        showTagline: true,
        showTitle: true,
        showDescription: true,
      };
      state.slides.splice(action.payload, 0, newSlide);
    },
    copySlide: (state, action: PayloadAction<number>) => {
      const copiedSlide = { ...state.slides[action.payload] };
      state.slides.splice(action.payload + 1, 0, copiedSlide);
    },
    deleteSlide: (state, action: PayloadAction<number>) => {
      state.slides.splice(action.payload, 1);
    },
    updateSlide: (
      state,
      action: PayloadAction<{ index: number; updatedSlide: Partial<Slide> }>
    ) => {
      const { index, updatedSlide } = action.payload;
      state.slides[index] = { ...state.slides[index], ...updatedSlide };
    },
    removeBackgroundImage: (state, action: PayloadAction<number>) => {
      state.slides[action.payload].backgroundImage = null;
    },
    addAllSlides: (state, action: PayloadAction<Partial<Slide>[]>) => {
      state.slides = action.payload.map((slide) => ({
        title: "",
        description: "",
        type: "slide",
        showImage: slide.imageUrl ? true : false,
        showTagline: true,
        showTitle: true,
        showDescription: true,
        ...slide,
      }));
    },
    setTitleTextSettings: (state, action: PayloadAction<TextSettings>) => {
      state.titleTextSettings = action.payload;
    },
    setDescriptionTextSettings: (
      state,
      action: PayloadAction<TextSettings>
    ) => {
      state.descriptionTextSettings = action.payload;
    },
    setTaglineTextSettings: (state, action: PayloadAction<TextSettings>) => {
      state.taglineTextSettings = action.payload;
    },
    setLayoutHeightAndWidth: (
      state,
      action: PayloadAction<{ height: number; width: number }>
    ) => {
      state.layout.height = action.payload.height;
      state.layout.width = action.payload.width;
    },
    setBackground: (state, action: PayloadAction<BackgroundColors>) => {
      state.background = action.payload;
    },
    setPattern: (state, action: PayloadAction<number>) => {
      state.layout.pattern = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setProperty: (state, action: PayloadAction<UpdatePayload>) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
    moveSlideLeft: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.slides[index];
        state.slides[index] = state.slides[index - 1];
        state.slides[index - 1] = temp;
      }
    },
    moveSlideRight: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.slides.length - 1) {
        const temp = state.slides[index];
        state.slides[index] = state.slides[index + 1];
        state.slides[index + 1] = temp;
      }
    },
    setSharedSelectedElementId: (state, action: PayloadAction<number>) => {
      state.sharedSelectedElement.id = action.payload;
    },
    setSharedSelectedElementOpacity: (state, action: PayloadAction<number>) => {
      state.sharedSelectedElement.opacity = action.payload;
    },
    setBackgroundOpacity: (state, action: PayloadAction<number>) => {
      state.layout.backgroundOpacity = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setGradient: (state, action: PayloadAction<boolean>) => {
      state.layout.gradient = action.payload;
    },
    setBackgroundImageToAllSlides: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.globalBackground = action.payload;
    },
    setNewCarousel: (state) => {
      return initialCarousel;
    },
  },
});

export const {
  insertSlide,
  copySlide,
  deleteSlide,
  updateSlide,
  addAllSlides,
  setTitleTextSettings,
  setDescriptionTextSettings,
  setTaglineTextSettings,
  setLayoutHeightAndWidth,
  setBackground,
  setPattern,
  setName,
  setProperty,
  moveSlideLeft,
  moveSlideRight,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
  setBackgroundOpacity,
  setFontFamily,
  setNewCarousel,
  removeBackgroundImage,
  setGradient,
  setBackgroundImageToAllSlides,
  setAllData,
} = carouselSlice.actions;

export default carouselSlice.reducer;
