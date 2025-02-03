import React from "react";
import { Package } from "@/types/packages";
import { Tag, Users, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ReusableTable, Column } from "@/components/admin/ReusableTable";

interface PackageTableProps {
  packages: Package[];
  onEdit: (pkg: Package) => void;
  onDelete: (id: string) => void;
}

export function PackageTable({
  packages,
  onEdit,
  onDelete,
}: PackageTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "deprecated":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "monthly":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "yearly":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "lifetime":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: Column<Package>[] = [
    {
      header: "Package Details",
      accessor: (pkg) => (
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Tag className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
            <div className="text-sm text-gray-500 max-w-md truncate">
              {pkg.description}
            </div>
            <div className="text-xs text-gray-400 mt-1">ID: {pkg.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Type & Status",
      accessor: (pkg) => (
        <div className="space-y-1">
          <Badge className={`${getTypeColor(pkg.type)} capitalize px-2 py-1`}>
            {pkg.type}
          </Badge>
          <Badge
            className={`${getStatusColor(
              pkg.status
            )} capitalize px-2 py-1 block`}
          >
            {pkg.status}
          </Badge>
          {pkg.is_trial_package && (
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-1">
              Trial Package
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "Pricing",
      accessor: (pkg) => (
        <div>
          <div className="text-sm text-gray-900 font-medium">${pkg.price}</div>
          <div className="text-sm text-gray-500">{pkg.currency}</div>
        </div>
      ),
    },
    {
      header: "Usage",
      accessor: (pkg) => (
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {pkg._count.subscriptions} subscriptions
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {format(new Date(pkg.createdAt), "MMM d, yyyy")}
          </div>
        </div>
      ),
    },
  ];

  return (
    <ReusableTable
      data={packages}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      getRowId={(pkg) => pkg.id}
    />
  );
}
