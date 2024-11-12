import { UserInfo, UserState, WordUsage, SubscriptionState } from "@/types";
import { LinkedInProfileUI } from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: true,
  carouselDownloading: false,
  currentWorkspace: null,
  wordUsage: {
    usage: {
      used: 0,
      remaining: 0,
      total: 0,
      isActive: false,
      expirationDate: null,
    },
    percentage: {
      used: 0,
      remaining: 0,
    },
  },
  linkedinProfiles: [] as LinkedInProfileUI[],
  subscription: {
    isSubscribed: false,
    plan: null,
    expiresAt: null,
    subscription: null,
    limits: {
      aiWordsPerMonth: 0,
      postsPerMonth: 0,
      imageUploads: 0,
      workspaces: 0,
      linkedInProfiles: 0,
      carousels: 0,
    },
    isTrial: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userinfo = action.payload;
      state.loggedin = true;
    },
    logout: (state) => {
      state.userinfo = null;
      state.loggedin = false;
      state.linkedinProfiles = [];
      state.subscription = initialState.subscription;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCarouselDownloading: (state, action: PayloadAction<boolean>) => {
      state.carouselDownloading = action.payload;
    },
    setCurrentWorkspace: (state, action: PayloadAction<any>) => {
      state.currentWorkspace = action.payload;
    },
    setWordUsage: (state, action: PayloadAction<WordUsage>) => {
      state.wordUsage = action.payload;
    },
    setLinkedInProfiles: (
      state,
      action: PayloadAction<LinkedInProfileUI[]>
    ) => {
      state.linkedinProfiles = action.payload;
    },
    setSubscriptionData: (state, action: PayloadAction<SubscriptionState>) => {
      state.subscription = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setUser,
  logout,
  setLoading,
  setCarouselDownloading,
  setCurrentWorkspace,
  setWordUsage,
  setLinkedInProfiles,
  setSubscriptionData,
} = userSlice.actions;
export default userSlice.reducer;
