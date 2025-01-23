import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  getLinkedInAuthUrl,
  handleLinkedInCallback,
  getLinkedInProfile,
  disconnectLinkedInProfile,
} from "@/services/linkedin.service";
import { processApiResponse } from "@/lib/functions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLinkedInProfile } from "@/state/slices/user.slice";
import { LinkedInProfileUI } from "@/types/post";

interface LinkedInProfile {
  id: string;
  name: string;
  avatarUrl: string;
  type: "linkedin";
  status: "connected" | "disconnected";
}

interface LinkedInResponse {
  success: boolean;
  message?: string;
  data: {
    profiles?: LinkedInProfile[];
    url?: string;
    state?: string;
  };
}

export const useLinkedInCallback = (
  code: string | null,
  state: string | null,
  error?: string | null,
  errorDescription?: string | null
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      // Handle LinkedIn error response
      if (error) {
        throw new Error(
          decodeURIComponent(
            errorDescription || "LinkedIn authentication failed"
          )
        );
      }

      if (!code || !state) {
        throw new Error("Missing required parameters");
      }

      // Verify state
      const storedState = sessionStorage.getItem("linkedin_state");
      if (state !== storedState) {
        throw new Error("Invalid state parameter");
      }

      return await handleLinkedInCallback(code, state);
    },
    {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("LinkedIn account connected successfully!");
          queryClient.invalidateQueries("linkedinProfiles");
        } else {
          toast.error(response.message || "Failed to connect LinkedIn account");
        }
      },
      onError: (error: Error) => {
        console.error("LinkedIn callback error:", error);
        toast.error(error.message || "Failed to connect LinkedIn account");
      },
      onSettled: () => {
        sessionStorage.removeItem("linkedin_state");
        router.push("/account");
      },
    }
  );
};

const useLinkedIn = () => {
  const dispatch = useDispatch();
  const { loggedin, linkedinProfile } = useSelector(
    (state: RootState) => state.user
  );
  const [isConnecting, setIsConnecting] = useState(false);

  const { isLoading: isLoadingProfiles, refetch: refetchProfiles } = useQuery<
    LinkedInProfile,
    Error
  >(
    ["linkedinProfiles"],
    async () => {
      const response = await getLinkedInProfile();
      processApiResponse(response);
      return response.data.profile;
    },
    {
      enabled: loggedin,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      onSuccess: (profile) => {
        dispatch(setLinkedInProfile(profile as unknown as LinkedInProfileUI));
      },
    }
  );

  const connectLinkedIn = async () => {
    if (!loggedin) {
      toast.error("You must be logged in to connect LinkedIn.");
      return;
    }

    try {
      setIsConnecting(true);
      const response = await getLinkedInAuthUrl();

      if (response.success && response.data.url) {
        sessionStorage.setItem("linkedin_state", response.data.state);
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error("Failed to initiate LinkedIn connection");
      console.error("LinkedIn connection error:", error);
      setIsConnecting(false);
    }
  };

  const { mutate: disconnectProfile } = useMutation<
    LinkedInResponse,
    Error,
    string
  >(
    async (profileId: string) => {
      const response = await disconnectLinkedInProfile(profileId);
      return response;
    },
    {
      onSuccess: (response) => {
        processApiResponse(response);
        if (response.success) {
          refetchProfiles();
          toast.success("LinkedIn account disconnected successfully!");
        }
      },
      onError: (error) => {
        toast.error("Failed to disconnect LinkedIn account");
        console.error("LinkedIn disconnect error:", error);
      },
    }
  );

  return {
    profile: linkedinProfile,
    isLoadingProfiles,
    isConnecting,
    connectLinkedIn,
    disconnectProfile,
    isAuthenticated: loggedin,
  };
};

export default useLinkedIn;
