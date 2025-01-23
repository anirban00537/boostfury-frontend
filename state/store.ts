import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import contentReducer from "./slices/contentSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
