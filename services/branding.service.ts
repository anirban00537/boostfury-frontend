import fRequest from "@/lib/f-request";
import request from "@/lib/request";

export const getBrandingData = async () => {
  const response = await request.get("/branding/get-branding");
  return response.data;
};

export const createOrUpdateBranding = async (brandingData: any) => {
  const response = await fRequest.post(
    "/branding/create-update-branding",
    brandingData
  );
  return response;
};
