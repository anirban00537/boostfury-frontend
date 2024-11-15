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
import { Pencil, Trash, Calendar, Layout, Plus } from "lucide-react";
import { Workspace } from "@/types";
import moment from "moment";
import { useWorkspaces } from "@/hooks/useWorkspace";
import { setCurrentWorkspace } from "@/state/slice/user.slice";
import WorkspaceForm from "./Workspace-Form.comp";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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
        <DialogContent className="bg-gradient-to-br from-white to-primary/5 
                                rounded-[20px] text-textColor sm:max-w-[700px] p-8 
                                shadow-xl border border-gray-200 overflow-hidden">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 
                            flex items-center justify-center shadow-lg shadow-primary/20">
                <Layout className="h-6 w-6 text-white" />
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
          </DialogHeader>
          
          <div className="flex flex-col min-h-[400px]">
            {isEditing ? (
              <div className="flex-grow">
                <WorkspaceForm
                  onClose={handleWorkspaceFormClose}
                  workspace={editingWorkspace || undefined}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="self-end bg-primary hover:bg-primary/90 text-white
                           transition-all duration-200 rounded-full h-10 px-5"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Workspace
                </Button>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {workspaces?.map((workspace: Workspace, index) => (
                    <motion.div
                      key={workspace.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group p-5 rounded-[16px] transition-all duration-200
                                border ${
                                  currentWorkspace?.id === workspace.id
                                  ? "bg-primary/5 border-primary/20"
                                  : "bg-white hover:bg-gray-50/80 border-gray-100 hover:border-gray-200"
                                } ${
                                  index === workspaces.length - 1 ? "mb-4" : ""
                                }`}
                    >
                      <div className="flex items-start justify-between">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => handleSelectWorkspace(workspace)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-gray-900">
                              {workspace.name}
                            </span>
                            {currentWorkspace?.id === workspace.id && (
                              <span className="text-xs font-medium bg-gradient-to-r from-primary to-primary/80 
                                           text-white px-3 py-1 rounded-full shadow-sm">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2.5 text-sm text-gray-500">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {moment(workspace.createdAt).format("MMM D, YYYY")}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50">
                              <Layout className="w-4 h-4 text-gray-400" />
                              {workspace.description || "No description"}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 
                                      transition-all duration-200 -mr-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 px-4 text-gray-600 hover:text-primary 
                                     hover:bg-primary/5 rounded-full gap-2"
                            onClick={() => handleEditWorkspace(workspace)}
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Button>
                          {workspace.id !== currentWorkspace?.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 px-4 text-gray-600 hover:text-red-600 
                                       hover:bg-red-50 rounded-full gap-2"
                              onClick={() => handleDeleteWorkspace(workspace)}
                            >
                              <Trash className="w-4 h-4" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingWorkspace}
        onOpenChange={() => setDeletingWorkspace(null)}
      >
        <AlertDialogContent className="sm:max-w-[400px] rounded-3xl p-6 bg-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash className="w-5 h-5 text-red-600" />
              </div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                Delete Workspace?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600">
              This will permanently delete "<span className="text-gray-900 font-medium">{deletingWorkspace?.name}</span>" 
              and remove all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0 mt-6">
            <AlertDialogCancel
              className="mt-0 rounded-full border-gray-200 hover:bg-gray-50 
                        hover:text-gray-900 hover:border-gray-300"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-gradient-to-r from-red-500 to-red-600 
                        hover:from-red-600 hover:to-red-700 focus:ring-red-500"
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
