import React, { FC, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Calendar, Layout, Plus, X } from "lucide-react";
import { Workspace } from "@/types";
import moment from "moment";
import { useWorkspaces } from "@/hooks/useWorkspace";
import { setCurrentWorkspace } from "@/state/slice/user.slice";
import WorkspaceForm from "./Workspace-Form.comp";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ManageWorkspacesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageWorkspacesModal: FC<ManageWorkspacesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const {
    refetchWorkspace,
    workspaces,
    isWorkspaceLoading,
    deleteWorkspaceFunction,
  } = useWorkspaces();
  const [isEditing, setIsEditing] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null
  );
  const [deletingWorkspace, setDeletingWorkspace] = useState<Workspace | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      refetchWorkspace();
    }
  }, [isOpen, refetchWorkspace]);

  useEffect(() => {
    if (!isWorkspaceLoading && workspaces.length > 0 && !currentWorkspace) {
      const defaultWorkspace =
        workspaces.find((w) => w.isDefault) || workspaces[0];
      dispatch(setCurrentWorkspace(defaultWorkspace));
    }
  }, [isWorkspaceLoading, workspaces, currentWorkspace, dispatch]);

  const handleEditWorkspace = useCallback((workspace: Workspace) => {
    setEditingWorkspace(workspace);
    setIsEditing(true);
  }, []);

  const handleDeleteWorkspace = useCallback((workspace: Workspace) => {
    setDeletingWorkspace(workspace);
  }, []);

  const confirmDeleteWorkspace = useCallback(async () => {
    if (deletingWorkspace) {
      try {
        await deleteWorkspaceFunction({ id: deletingWorkspace.id.toString() });
        toast.success("Workspace deleted successfully");
        setDeletingWorkspace(null);
        refetchWorkspace();
      } catch (error) {
        toast.error("Failed to delete workspace");
      }
    }
  }, [deletingWorkspace, deleteWorkspaceFunction, refetchWorkspace]);

  const handleSelectWorkspace = useCallback(
    (workspace: Workspace) => {
      dispatch(setCurrentWorkspace(workspace));
      onClose();
    },
    [dispatch, onClose]
  );

  const handleWorkspaceFormClose = useCallback(() => {
    setIsEditing(false);
    setEditingWorkspace(null);
    refetchWorkspace();
  }, [refetchWorkspace]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[800px] p-0 flex flex-col overflow-hidden bg-white">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-primary/0 rounded-xl blur-sm" />
                  <div className="relative size-12 rounded-xl bg-primary/5 flex items-center justify-center">
                    <Layout className="size-6 text-primary" />
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-semibold text-gray-900">
                    Manage Workspaces
                  </DialogTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Select a workspace to manage your content and settings
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="size-9 rounded-xl flex items-center justify-center text-gray-500 
                          hover:bg-gray-50 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="h-full flex">
              <div className="w-full p-8 overflow-y-auto">
                {isEditing ? (
                  <WorkspaceForm
                    onClose={handleWorkspaceFormClose}
                    workspace={editingWorkspace || undefined}
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {workspaces?.length || 0} Workspace{workspaces?.length !== 1 ? 's' : ''}
                      </div>
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="h-10 pl-4 pr-5 rounded-xl bg-primary text-white hover:bg-primary/90 
                                 transition-colors shadow-sm hover:shadow"
                      >
                        <Plus className="size-4 mr-2" />
                        New Workspace
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {workspaces?.map((workspace: Workspace) => (
                        <motion.div
                          key={workspace.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "group relative",
                            "before:absolute before:inset-0 before:rounded-xl before:border before:border-transparent",
                            "hover:before:border-primary/20 before:transition-colors"
                          )}
                        >
                          <div className={cn(
                            "relative p-5 rounded-xl border transition-all duration-200",
                            currentWorkspace?.id === workspace.id
                              ? "bg-primary/5 border-primary/20 shadow-sm"
                              : "bg-white hover:bg-gray-50/80 border-gray-200"
                          )}>
                            <div className="flex items-start justify-between">
                              <div 
                                className="flex-1 cursor-pointer"
                                onClick={() => handleSelectWorkspace(workspace)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="size-10 rounded-lg bg-gray-100/80 flex items-center justify-center">
                                    <Layout className="size-5 text-gray-500" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-base font-medium text-gray-900">
                                        {workspace.name}
                                      </span>
                                      {currentWorkspace?.id === workspace.id && (
                                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full 
                                                     bg-primary/10 text-primary">
                                          Active
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                      {workspace.description || "No description"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="text-xs text-gray-500 px-3 py-1.5 rounded-lg bg-gray-50">
                                  Created {moment(workspace.createdAt).format("MMM D, YYYY")}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => handleEditWorkspace(workspace)}
                                    className="size-8 rounded-lg flex items-center justify-center 
                                             text-gray-500 hover:bg-gray-100 transition-colors"
                                  >
                                    <Pencil className="size-4" />
                                  </button>
                                  {workspace.id !== currentWorkspace?.id && (
                                    <button
                                      onClick={() => handleDeleteWorkspace(workspace)}
                                      className="size-8 rounded-lg flex items-center justify-center 
                                               text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                      <Trash className="size-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingWorkspace}
        onOpenChange={() => setDeletingWorkspace(null)}
      >
        <AlertDialogContent className="max-w-[400px] p-6 bg-white rounded-xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-red-500/20 rounded-xl blur-sm" />
                <div className="relative size-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Trash className="size-5 text-red-500" />
                </div>
              </div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                Delete Workspace?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600">
              This will permanently delete "<span className="text-gray-900 font-medium">
                {deletingWorkspace?.name}
              </span>" and remove all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="h-10 px-5 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-10 px-5 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-sm"
              onClick={confirmDeleteWorkspace}
            >
              Delete Workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageWorkspacesModal;
