import { configureStore } from "@reduxjs/toolkit";
import slidesReducer from "@/state/slice/carousel.slice";
import brandingReducer from "@/state/slice/branding.slice";
import userSlice from "./slice/user.slice";

export const store = configureStore({
  reducer: {
    slides: slidesReducer,
    user: userSlice,
    branding: brandingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
