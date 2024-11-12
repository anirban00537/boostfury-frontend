import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandingState {
  name: string;
  handle: string;
  headshot: string | null;
}

const initialState: BrandingState = {
  name: "BoostFury",
  handle: "@boostfury",
  headshot: "/creator.jpg",
};

const brandingSlice = createSlice({
  name: "branding",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setHandle: (state, action: PayloadAction<string>) => {
      state.handle = action.payload;
    },
    setHeadshot: (state, action: PayloadAction<string | null>) => {
      state.headshot = action.payload;
    },
    setBranding: (
      state,
      action: PayloadAction<{
        name: string;
        handle: string;
        headshot: string | null;
      }>
    ) => {
      state.name = action.payload.name;
      state.handle = action.payload.handle;
      state.headshot = action.payload.headshot;
    },
  },
});

export const { setName, setHandle, setHeadshot, setBranding } =
  brandingSlice.actions;
export default brandingSlice.reducer;
