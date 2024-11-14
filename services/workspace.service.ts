import request from "@/lib/request";

export const getMyWorkspaces = async () => {
  const response = await request.get("/workspace/get-my-workspaces");
  return response.data;
};

export const createWorkspace = async (data: {
  name: string;
  description: string;
}) => {
  const response = await request.post("/workspace/create-workspace", data);
  return response.data;
};
export const updateWorkspace = async (data: {
  name: string;
  description: string;
  id: number;
}) => {
  const response = await request.post("/workspace/update-workspace", data);
  return response.data;
};
// delete-workspace/:id
export const deleteWorkspace = async ({ id }: { id: string }) => {
  const response = await request.delete(`/workspace/delete-workspace/${id}`);
  return response.data;
};
