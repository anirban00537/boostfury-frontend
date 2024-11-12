import { useMutation, useQuery } from "react-query";
import {
  getMyWorkspaces,
  createWorkspace,
  updateWorkspace as updateWorkspaceService,
  deleteWorkspace,
} from "@/services/workspace";
import { ResponseData, Workspace } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setCurrentWorkspace } from "@/state/slice/user.slice";
import { useState } from "react";

export const useWorkspaces = () => {
  const { loggedin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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
      id: number;
      name: string;
      description: string;
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
