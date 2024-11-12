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
      id: number;
      name: string;
      profileImage: string;
      type: 'linkedin';
      status: 'connected';
    };
  };
}

export const getLinkedInAuthUrl = async (): Promise<LinkedInAuthResponse> => {
  const response = await request.get("/linkedin/auth-url");
  return response.data;
};

export const handleLinkedInCallback = async (code: string, state: string): Promise<LinkedInCallbackResponse> => {
  const response = await request.get(`/linkedin/callback`, {
    params: { 
      code,
      state,
    }
  });
  return response.data;
};

export const getLinkedInProfiles = async () => {
  const response = await request.get("/linkedin/profiles");
  return response.data;
};

export const disconnectLinkedInProfile = async (profileId: number) => {
  const response = await request.delete(`/linkedin/disconnect/${profileId}`);
  return response.data;
}; 