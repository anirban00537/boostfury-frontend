import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package } from "@/types/packages";
import { cn } from "@/lib/utils";
import { Check, FileText, Pencil, Trash2, Users } from "lucide-react";

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
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 backdrop-blur-sm border-b border-gray-200/60">
              <TableHead className="font-medium text-gray-900">Name</TableHead>
              <TableHead className="font-medium text-gray-900">Type</TableHead>
              <TableHead className="font-medium text-gray-900">Price</TableHead>
              <TableHead className="font-medium text-gray-900">
                Word Limit
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                Features
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                Active Users
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                Status
              </TableHead>
              <TableHead className="text-right font-medium text-gray-900">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages?.map((pkg) => (
              <TableRow
                key={pkg.id}
                className="hover:bg-gray-50/50 backdrop-blur-sm transition-colors"
              >
                <TableCell className="font-medium">
                  <div>
                    <div className="text-gray-900 font-medium">{pkg.name}</div>
                    <div className="text-sm text-gray-500">
                      {pkg.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="capitalize text-gray-700">
                  {pkg.type}
                </TableCell>
                <TableCell>
                  {pkg.price === 0 ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      Free
                    </span>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: pkg.currency,
                      }).format(pkg.price)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-gray-700">
                    <FileText className="w-4 h-4 text-gray-400" />
                    {pkg.monthlyWordLimit.toLocaleString()} words/month
                  </span>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    {pkg.featuresList.length > 0 ? (
                      <div className="text-sm text-gray-600">
                        {pkg.featuresList
                          .slice(0, 2)
                          .map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-1">
                              <Check className="w-3 h-3 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        {pkg.featuresList.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{pkg.featuresList.length - 2} more features
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No features</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {pkg.activeSubscriptions}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      pkg.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    )}
                  >
                    {pkg.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(pkg)}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(pkg.id)}
                      className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
