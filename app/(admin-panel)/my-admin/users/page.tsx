"use client";

import React, { useState } from "react";
import { useQuery } from "react-query";
import { ReusableTable, Column } from "@/components/admin/ReusableTable";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Globe } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/services/admin";

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  photo: string;
  country: string;
  status: number;
  role: number;
  is_subscribed: number;
  email_verified: number;
  createdAt: string;
  subscription: any;
  branding: any;
  linkedInProfiles: any[];
}

interface PaginationData {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    items: UserData[];
    pagination: PaginationData;
  };
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: response, isLoading } = useQuery(
    ["users", page, pageSize, orderBy, orderDirection, searchTerm],
    () =>
      getUsers({ page, pageSize, orderBy, orderDirection, search: searchTerm }),
    {
      keepPreviousData: true,
    }
  );

  const getStatusBadge = (status: number) => {
    const statusConfig: Record<number, { class: string; text: string }> = {
      1: { class: "bg-green-100 text-green-800", text: "Active" },
      0: { class: "bg-red-100 text-red-800", text: "Inactive" },
    };
    const config = statusConfig[status] || statusConfig[0];
    return (
      <Badge className={`${config.class} capitalize px-2 py-1`}>
        {config.text}
      </Badge>
    );
  };

  const columns: Column<UserData>[] = [
    {
      header: "User",
      accessor: (user) => (
        <div className="flex items-center space-x-3">
          {user.photo ? (
            <Image
              src={user.photo}
              alt={user.first_name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="p-2 bg-gray-100 rounded-full">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          )}
          <div>
            <div className="font-medium">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-sm text-gray-500">@{user.user_name}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: (user) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-1" />
            {user.email}
          </div>
          {user.country && (
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="w-4 h-4 mr-1" />
              {user.country}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (user) => (
        <div className="space-y-1">
          {getStatusBadge(user.status)}
          {user.is_subscribed === 1 && (
            <Badge className="bg-purple-100 text-purple-800 px-2 py-1 block">
              Subscribed
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "Joined",
      accessor: (user) => format(new Date(user.createdAt), "MMM dd, yyyy"),
    },
  ];

  const handleEdit = (user: UserData) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (id: string | number) => {
    console.log("Delete user:", id);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">
            Manage and monitor user accounts
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={orderDirection}
            onValueChange={(value: "asc" | "desc") => setOrderDirection(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <ReusableTable
        data={response?.data.items || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowId={(user) => user.id}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {response?.data.pagination && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={page === response.data.pagination.totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{(page - 1) * pageSize + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    page * pageSize,
                    response.data.pagination.totalCount
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {response.data.pagination.totalCount}
                </span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <Button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  variant="outline"
                  className="rounded-l-md"
                >
                  Previous
                </Button>
                {Array.from(
                  { length: response.data.pagination.totalPages },
                  (_, i) => i + 1
                ).map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    variant={pageNum === page ? "default" : "outline"}
                    className="rounded-none"
                  >
                    {pageNum}
                  </Button>
                ))}
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={page === response.data.pagination.totalPages}
                  variant="outline"
                  className="rounded-r-md"
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
