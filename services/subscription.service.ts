import request from "@/lib/request";

export const checkSubscription = async () => {
  const response = await request.get("/subscription/check-subscription");
  return response.data;
};

export const createCheckout = async ({
  variantId,
  redirectUrl,
}: {
  variantId: string;
  redirectUrl: string;
}) => {
  const response = await request.post("/subscription/create-checkout", {
    variantId,
    redirectUrl,
  });
  return response.data;
};

export const cancelSubscription = async () => {
  const response = await request.post("/subscription/cancel-subscription");
  return response.data;
};
export const getPackages = async () => {
  const response = await request.get("/subscription/get-packages");
  return response.data;
};
