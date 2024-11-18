import { useMutation, useQuery } from "react-query";
import {
  getMyWorkspaces,
  createWorkspace,
  updateWorkspace as updateWorkspaceService,
  deleteWorkspace,
  getMyWorkspaceById,
} from "@/services/workspace.service";
import { ResponseData, Workspace } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setCurrentWorkspace } from "@/state/slice/user.slice";
import { useState } from "react";

export const useWorkspaces = () => {
  const { loggedin } = useSelector((state: RootState) => state.user);
  const [workspaces, setWorkspacesData] = useState<Workspace[]>([]);
  const { refetch: refetchWorkspace, isLoading: isWorkspaceLoading } = useQuery<
    ResponseData,
    Error
  >(["workspace"], getMyWorkspaces, {
    enabled: loggedin,
    onSuccess: (data: ResponseData) => {
      setWorkspacesData(data.data);
    },
  });

  const { mutateAsync: createNewWorkspace } = useMutation<
    ResponseData,
    Error,
    {
      name: string;
      description: string;
    }
  >(createWorkspace, {
    onSuccess: () => {
      refetchWorkspace();
    },
  });

  const { mutateAsync: updateWorkspace } = useMutation<
    ResponseData,
    Error,
    {
      id: string;
      name: string;
      description: string;
      whoAmI: string | null;
      topics: string[];
    }
  >(updateWorkspaceService, {
    onSuccess: () => {
      refetchWorkspace();
    },
  });
  const { mutateAsync: deleteWorkspaceFunction } = useMutation(
    deleteWorkspace,
    {
      onSuccess: () => {
        refetchWorkspace();
      },
    }
  );
  return {
    refetchWorkspace,
    createNewWorkspace,
    updateWorkspace,
    workspaces,
    isWorkspaceLoading,
    deleteWorkspaceFunction,
  };
};

export const useWorkspaceById = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const { data, isLoading } = useQuery<ResponseData, Error>(
    ["workspace", currentWorkspace?.id],
    () => getMyWorkspaceById({ workspaceId: currentWorkspace?.id || "" }),
    {
      enabled: !!currentWorkspace?.id,
    }
  );
  return { data, isLoading };
};
