import request from "@/lib/request";

interface Package {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  variantId: string;
  productId: string;
  monthlyWordLimit: number;
  featuresList: string[];
  features: number[];
  createdAt: string;
  updatedAt: string;
}

interface CreatePackageData {
  name: string;
  description: string;
  type: string;
  price: number;
  currency?: string;
  variantId: string;
  productId: string;
  monthlyWordLimit: number;
  featuresList?: string[];
  viralPostGeneration?: boolean;
  aiStudio?: boolean;
  postIdeaGenerator?: boolean;
}

interface UpdatePackageData {
  name?: string;
  description?: string;
  type?: string;
  price?: number;
  currency?: string;
  variantId?: string;
  productId?: string;
  monthlyWordLimit?: number;
  featuresList?: string[];
  viralPostGeneration?: boolean;
  aiStudio?: boolean;
  postIdeaGenerator?: boolean;
  status?: string;
}

// Package Management
export const createPackage = async (data: CreatePackageData) => {
  const response = await request.post("/admin/packages", data);
  return response.data.data;
};

export const updatePackage = async (
  id: string,
  data: UpdatePackageData
): Promise<Package> => {
  const response = await request.put(`/admin/packages/${id}`, data);
  return response.data.data;
};

export const deletePackage = async (id: string): Promise<void> => {
  const response = await request.delete(`/admin/packages/${id}`);
  return response.data.data;
};

export const getPackageById = async (id: string): Promise<Package> => {
  const response = await request.get(`/admin/packages/${id}`);
  return response.data.data;
};

export const getAllPackages = async (): Promise<Package[]> => {
  const response = await request.get("/admin/packages");
  return response.data.data;
};

// Dashboard Data
export const getAdminDashboardData = async () => {
  const response = await request.get("/admin/dashboard");
  return response.data.data;
};

// Users Management
interface GetUsersParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  search?: string;
}

export const getUsers = async (params: GetUsersParams = {}) => {
  const {
    page = 1,
    pageSize = 10,
    orderBy = "createdAt",
    orderDirection = "desc",
    search = "",
  } = params;
  const response = await request.get("/admin/users", {
    params: { page, pageSize, orderBy, orderDirection, search },
  });
  return response.data;
};
