import request from "@/lib/request";

export const getAdminDashboardData = async () => {
  const response = await request.get("/user/admin/dashboard");
  console.log("Admin Dashboard Response:", response.data);
  return response.data;
};
