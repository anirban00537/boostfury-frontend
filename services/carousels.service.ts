import fRequest from "@/lib/f-request";
import request from "@/lib/request";

export const getCarousels = async (
  page: number,
  pageSize: number,
  workspaceId: number
) => {
  const response = await request.get("/my-carousels/get", {
    params: { page, pageSize, workspaceId },
  });
  return response.data;
};

export const createCarousel = async (carouselData: any) => {
  const response = await request.post("/my-carousels/create", carouselData);
  return response.data;
};

export const updateCarousel = async (carouselData: any) => {
  const response = await request.put("/my-carousels/update", carouselData);
  return response.data;
};

export const scheduleCarouselPdf = async (formData: any) => {
  const response = await fRequest.post(
    `/my-carousels/schedule-carousel`,
    formData
  );
  return response;
};

export const deleteCarousel = async (id: string) => {
  const response = await request.delete(`/my-carousels/delete/${id}`);
  return response.data;
};

export const getCarouselDetails = async (id: string, workspaceId: number) => {
  const response = await request.get("/my-carousels/get-details", {
    params: { id, workspaceId },
  });
  return response.data;
};
