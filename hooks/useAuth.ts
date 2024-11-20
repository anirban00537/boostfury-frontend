import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  logout,
  setLoading,
  setCurrentWorkspace,
  setSubscriptionData,
} from "@/state/slice/user.slice";
import { useCallback, useEffect } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { googleSignIn, profile } from "@/services/auth";
import { checkSubscription } from "@/services/subscription.service";
import Cookies from "js-cookie";
import { RootState } from "@/state/store";
import { ResponseData, UserInfo } from "@/types";
import { getMyWorkspaces } from "@/services/workspace.service";
import { useWorkspaces } from "./useWorkspace";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  useWorkspaces();
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

  useQuery<ResponseData, Error>(["workspaceAuth"], getMyWorkspaces, {
    enabled: loggedin,
    onSuccess: (data: ResponseData) => {
      if (data.data.length > 0) {
        const defaultWorkspace = data.data.find(
          (workspace: any) => workspace.isDefault
        );
        dispatch(setCurrentWorkspace(defaultWorkspace));
      }
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
          router.push("/dashboard/ai-writer");
        } else {
          toast.error(`Failed to log in: ${result.message}`);
        }
      },
      onError: (error: Error) => {
        toast.error(`Failed to log in with Google: ${error.message}`);
      },
    }
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
  useEffect(() => {
    if (!isUserLoading && !isSubscriptionLoading) dispatch(setLoading(false));
  }, [isUserLoading, isSubscriptionLoading]);
  return {
    user: userinfo,
    isAuthenticated: loggedin,
    isLoading: loading,
    handleGoogleLogin,
    logoutUser,
    subscriptionData,
    isSubscriptionLoading,
    refetchSubscription,
    checkSubscription,
  };
};
