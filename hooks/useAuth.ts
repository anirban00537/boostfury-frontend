import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  logout,
  setLoading,
  setSubscriptionData,
} from "@/state/slices/user.slice";
import { useCallback, useEffect } from "react";
import { CredentialResponse } from "@react-oauth/google";
import {
  googleSignIn,
  linkedInSignIn,
  profile,
  adminLogin,
} from "@/services/auth";
import { checkSubscription } from "@/services/subscription.service";
import Cookies from "js-cookie";
import { RootState } from "@/state/store";
import { ResponseData, UserInfo } from "@/types";
import { LinkedInLoginDto } from "@/services/auth";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { userinfo, loggedin, loading } = useSelector(
    (state: RootState) => state.user
  );
  const token = Cookies.get("token");
  const pathname = usePathname();

  const { data: userData, isLoading: isUserLoading } = useQuery<
    ResponseData,
    Error
  >(["user"], profile, {
    enabled: !!token,
    onSuccess: (data: ResponseData) => {
      dispatch(setUser(data.data as UserInfo));
      refetchSubscription();
    },
  });

  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    refetch: refetchSubscription,
  } = useQuery<ResponseData, Error>(["subscription"], checkSubscription, {
    enabled: loggedin,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    onSuccess: (data: ResponseData) => {
      try {
        if (data?.data) {
          dispatch(
            setSubscriptionData({
              isActive: data.data.isActive,
              subscription: data.data.subscription,
              usage: data.data.usage,
            })
          );
        }
      } catch (error) {
        console.error("Error processing subscription data:", error);
        toast.error("Error processing subscription data");
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to fetch subscription: ${error.message}`);
    },
  });

  const loginMutation = useMutation(
    (idToken: string) => googleSignIn(idToken),
    {
      onSuccess: (result) => {
        if (result.success) {
          const { accessToken, refreshToken, user, isAdmin } = result.data;
          dispatch(setUser(user as UserInfo));

          Cookies.set("token", accessToken, { expires: 7 });
          Cookies.set("refreshToken", refreshToken, { expires: 30 });
          Cookies.set("user", JSON.stringify(user), { expires: 7 });

          toast.success("Logged in successfully");
          router.push("/dashboard");
        } else {
          toast.error(`Failed to log in: ${result.message}`);
        }
      },
      onError: (error: Error) => {
        toast.error(`Failed to log in with Google: ${error.message}`);
      },
    }
  );

  const linkedInLoginMutation = useMutation(
    async ({ code, state }: { code: string; state: string }) => {
      const response = await linkedInSignIn({ code, state });
      if (!response.success || !response.data) {
        throw new Error(response.message || "Login failed");
      }

      const { accessToken, refreshToken, user } = response.data;

      // Set user in Redux
      dispatch(setUser(user));

      // Set cookies
      Cookies.set("token", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 30 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      // Navigate to studio
      router.push("/dashboard");

      return response;
    }
  );

  const handleLinkedInLogin = useCallback(
    (code: string, state: string) =>
      linkedInLoginMutation.mutateAsync({ code, state }),
    [linkedInLoginMutation]
  );

  const logoutMutation = useMutation(
    () => {
      // Implement your logout logic here
      return Promise.resolve();
    },
    {
      onSuccess: () => {
        dispatch(logout());
        queryClient.clear();

        // Remove cookies
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("user");

        toast.success("Logged out successfully");
        router.push("/");
      },
      onError: (error: Error) => {
        toast.error(`Failed to log out: ${error.message}`);
      },
    }
  );

  const handleGoogleLogin = useCallback(
    async (credentialResponse: CredentialResponse) => {
      try {
        if (credentialResponse.credential) {
          await loginMutation.mutateAsync(credentialResponse.credential);
        } else {
          console.error("No credential received from Google");
        }
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    },
    [loginMutation]
  );

  const logoutUser = () => {
    logoutMutation.mutate();
  };

  // Admin login mutation
  const adminLoginMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      // First, perform admin login
      const response = await adminLogin(email, password);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Admin login failed");
      }

      const { accessToken, refreshToken, user } = response.data;

      // Set initial tokens
      Cookies.set("token", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 30 });

      // Fetch complete user profile
      const userProfileResponse = await profile();
      if (!userProfileResponse.success || !userProfileResponse.data) {
        throw new Error("Failed to fetch user profile");
      }

      // Combine user data with admin flag
      const adminUser = {
        ...userProfileResponse.data,
        isAdmin: true,
      };

      // Update Redux state and cookies with complete user data
      dispatch(setUser(adminUser));
      Cookies.set("user", JSON.stringify(adminUser), { expires: 7 });

      // Invalidate user queries to ensure fresh data
      queryClient.invalidateQueries(["user"]);

      // Navigate to admin dashboard
      router.push("/my-admin/dashboard");

      return response;
    }
  );

  const handleAdminLogin = useCallback(
    async (email: string, password: string) => {
      try {
        return await adminLoginMutation.mutateAsync({ email, password });
      } catch (error) {
        console.error("Error during admin login:", error);
        throw error;
      }
    },
    [adminLoginMutation]
  );

  useEffect(() => {
    if (!isUserLoading && !isSubscriptionLoading) dispatch(setLoading(false));
  }, [isUserLoading, isSubscriptionLoading]);
  return {
    user: userinfo,
    isAuthenticated: loggedin,
    isLoading: loading,
    handleGoogleLogin,
    handleLinkedInLogin,
    handleAdminLogin,
    logoutUser,
    subscriptionData,
    isSubscriptionLoading,
    refetchSubscription,
    checkSubscription,
  };
};
