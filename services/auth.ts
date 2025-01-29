import request from "@/lib/request";

export interface LinkedInAuthResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    state: string;
  };
}
export interface LinkedInLoginDto {
  code: string;
  state: string;
}


export const googleSignIn = async (idToken: string) => {
  const response = await request.post("/auth/google-login", { idToken });
  return response.data;
};
export const getLinkedInAuthUrl = async (): Promise<LinkedInAuthResponse> => {
  const response = await request.get("/auth/linkedin-auth/auth-url");
  return response.data;
};

export const linkedInSignIn = async (data: LinkedInLoginDto) => {
  const response = await request.post("/auth/linkedin-login", data);
  return response.data;
};

export const profile = async () => {
  const response = await request.get("/user/profile");
  return response.data;
};

export const wordUsage = async () => {
  const response = await request.get("/user/word-usage");
  return response.data;
};

export const signOut = async (refreshToken: string) => {
  const response = await request.post("/auth/logout", { refreshToken });
  return response.data;
};
