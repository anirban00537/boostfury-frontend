"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "@/services/admin";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Package, PackageFormData } from "@/types/packages";
import { PackageForm } from "@/components/admin/packages/PackageForm";
import { PackageTable } from "@/components/admin/packages/PackageTable";
import { PackageHeader } from "@/components/admin/packages/PackageHeader";
import { PackageType, PackageStatus } from "@/types/packages";
import toast from "react-hot-toast";

export default function PackagesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const queryClient = useQueryClient();

  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await getAllPackages();
      return response.map((pkg: any) => ({
        ...pkg,
        type: pkg.type,
        status: pkg.status,
        features: pkg.features?.map(Number) || [],
        _count: { subscriptions: pkg._count?.subscriptions || 0 },
        activeSubscriptions: pkg.activeSubscriptions || 0,
      }));
    },
  });

  const createMutation = useMutation(createPackage, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
        refetchActive: true,
      });
      setIsCreateOpen(false);
      toast.success("Package created successfully", {
        duration: 4000,
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create package", {
        duration: 4000,
        position: "top-right",
      });
    },
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: string; data: any }) => updatePackage(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["packages"],
          refetchActive: true,
        });
        setEditingPackage(null);
        setIsCreateOpen(false);
        toast.success("Package updated successfully", {
          duration: 4000,
          position: "top-right",
        });
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update package", {
          duration: 4000,
          position: "top-right",
        });
      },
    }
  );

  const deleteMutation = useMutation(deletePackage, {
    onMutate: async (packageId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(["packages"]);

      // Snapshot the previous value
      const previousPackages = queryClient.getQueryData(["packages"]);

      // Optimistically remove the package from the UI
      queryClient.setQueryData(["packages"], (old: any) =>
        old?.filter((pkg: Package) => pkg.id !== packageId)
      );

      return { previousPackages };
    },
    onSuccess: () => {
      toast.success("Package deleted successfully", {
        duration: 4000,
        position: "top-right",
      });
    },
    onError: (error: any, _, context: any) => {
      // Rollback to the previous state on error
      queryClient.setQueryData(["packages"], context.previousPackages);
      toast.error(error.message || "Failed to delete package", {
        duration: 4000,
        position: "top-right",
      });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we're in sync
      queryClient.invalidateQueries({
        queryKey: ["packages"],
        refetchActive: true,
      });
    },
  });

  const defaultValues = {
    name: "",
    description: "",
    type: PackageType.MONTHLY,
    status: PackageStatus.ACTIVE,
    price: 0,
    currency: "USD",
    variantId: "",
    productId: "",
    monthlyWordLimit: 0,
    featuresList: [],
    features: [],
    trial_duration_days: undefined,
  };

  const form = useForm<PackageFormData>({
    defaultValues,
  });

  const onSubmit = (data: PackageFormData) => {
    if (editingPackage) {
      // For update, only send changed fields
      const updateData: Partial<PackageFormData> = {};
      const originalData: PackageFormData = {
        name: editingPackage.name,
        description: editingPackage.description,
        type: editingPackage.type,
        status: editingPackage.status,
        price: editingPackage.price,
        currency: editingPackage.currency,
        variantId: editingPackage.variantId,
        productId: editingPackage.productId,
        monthlyWordLimit: editingPackage.monthlyWordLimit,
        featuresList: editingPackage.featuresList,
        features: editingPackage.features,
        trial_duration_days: editingPackage.trial_duration_days,
      };

      // Compare and only include changed fields
      (Object.keys(data) as Array<keyof PackageFormData>).forEach((key) => {
        if (JSON.stringify(data[key]) !== JSON.stringify(originalData[key])) {
          (updateData as any)[key] = data[key];
        }
      });

      updateMutation.mutate({
        id: editingPackage.id,
        data: updateData,
      });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = async (id: string | number) => {
    toast.promise(
      new Promise((resolve, reject) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
          deleteMutation.mutate(id.toString());
          resolve(true);
        } else {
          reject(new Error("Delete cancelled"));
        }
      }),
      {
        loading: "Deleting package...",
        success: "Package deleted successfully",
        error: "Failed to delete package",
      }
    );
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    form.reset({
      name: pkg.name,
      description: pkg.description,
      type: pkg.type,
      status: pkg.status,
      price: pkg.price,
      currency: pkg.currency,
      variantId: pkg.variantId,
      productId: pkg.productId,
      monthlyWordLimit: pkg.monthlyWordLimit,
      featuresList: pkg.featuresList,
      features: pkg.features,
      trial_duration_days: pkg.trial_duration_days,
    });
    setIsCreateOpen(true);
  };

  const handleCreateClick = () => {
    form.reset(defaultValues);
    setIsCreateOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <PackageHeader onAddClick={handleCreateClick} />

      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            setEditingPackage(null);
            form.reset(defaultValues);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <PackageForm
            form={form}
            onSubmit={onSubmit}
            isLoading={createMutation.isLoading || updateMutation.isLoading}
            isEditing={!!editingPackage}
            onCancel={() => {
              setIsCreateOpen(false);
              setEditingPackage(null);
              form.reset(defaultValues);
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="p-6">
        <PackageTable
          packages={packages || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
