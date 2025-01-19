import request from "@/lib/request";

interface LinkedInAuthResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    state: string;
  };
}

interface LinkedInCallbackResponse {
  success: boolean;
  message: string;
  data: {
    profile?: {
      id: string;
      name: string;
      profileImage: string;
      type: "linkedin";
      status: "connected";
    };
  };
}

export const getLinkedInAuthUrl = async (): Promise<LinkedInAuthResponse> => {
  const response = await request.get("/linkedin/auth-url");
  return response.data;
};

export const handleLinkedInCallback = async (
  code: string,
  state: string
): Promise<LinkedInCallbackResponse> => {
  const response = await request.get(`/linkedin/callback`, {
    params: {
      code,
      state,
    },
  });
  return response.data;
};

export const getLinkedInProfile = async () => {
  const response = await request.get("/linkedin/profile");
  return response.data;
};

export const disconnectLinkedInProfile = async (profileId: string) => {
  const response = await request.delete(`/linkedin/disconnect/${profileId}`);
  return response.data;
};
