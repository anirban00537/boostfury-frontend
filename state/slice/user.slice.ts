import { UserInfo, UserState, SubscriptionState } from "@/types";
import { LinkedInProfileUI } from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  userinfo: null,
  loggedin: false,
  loading: true,
  carouselDownloading: false,
  linkedinProfile: null,
  subscription: {
    isActive: true,
    subscription: null,
    usage: {
      words: {
        used: 0,
        limit: 0,
        nextReset: "",
      },
      linkedin: {
        accountsUsed: 0,
        accountsLimit: 0,
        postsUsed: 0,
        postsLimit: 0,
        nextReset: "",
      },
      carousels: {
        used: 0,
        limit: 0,
        nextReset: "",
      },
    },
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
      state.linkedinProfile = null;
      state.subscription = initialState.subscription;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCarouselDownloading: (state, action: PayloadAction<boolean>) => {
      state.carouselDownloading = action.payload;
    },
    setLinkedInProfile: (state, action: PayloadAction<LinkedInProfileUI>) => {
      state.linkedinProfile = action.payload;
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
  setLinkedInProfile,
  setSubscriptionData,
} = userSlice.actions;
export default userSlice.reducer;

