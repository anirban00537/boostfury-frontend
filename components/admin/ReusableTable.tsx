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
import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  className?: string;
}

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string | number) => void;
  getRowId: (item: T) => string | number;
  showActions?: boolean;
  customRowClass?: string;
  isLoading?: boolean;
}

export function ReusableTable<T>({
  data,
  columns,
  onEdit,
  onDelete,
  getRowId,
  showActions = true,
  customRowClass = "hover:bg-gray-50 transition-colors",
  isLoading = false,
}: ReusableTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="min-w-full align-middle">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </TableHead>
              ))}
              {showActions && (
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="px-6 py-4 text-center"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                    <span>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={getRowId(item)} className={customRowClass}>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      className={`px-6 py-4 whitespace-nowrap ${
                        column.className || ""
                      }`}
                    >
                      {typeof column.accessor === "function"
                        ? column.accessor(item)
                        : (item[column.accessor] as React.ReactNode)}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        {onEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(item)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(getRowId(item))}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
