"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Card } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  Mail,
  Chrome,
  Loader2,
  Search,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getAdminDashboardData } from "@/services/admin";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: string;
  status: number;
}

interface LoginProvider {
  _count: number;
  login_provider: string;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: dashboardData, isLoading } = useQuery(
    "adminDashboard",
    getAdminDashboardData
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // Filter users based on search term
  const filteredUsers = dashboardData?.users.recent.filter((user: User) => {
    const searchString =
      `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen p-8 bg-slate-50/50 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">{dashboardData?.users.total}</h3>
            <p className="text-sm text-green-600">
              {dashboardData?.users.growthPercentage}% Growth
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-start space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Users</p>
            <h3 className="text-2xl font-bold">
              {dashboardData?.users.active}
            </h3>
            <p className="text-sm text-gray-600">
              Active/Total:{" "}
              {(
                (dashboardData?.users.active / dashboardData?.users.total) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </Card>

        {dashboardData?.users.byLoginProvider.map((provider: LoginProvider) => (
          <Card
            key={provider.login_provider}
            className="p-6 flex items-start space-x-4"
          >
            <div className="p-3 bg-purple-100 rounded-lg">
              {provider.login_provider === "email" ? (
                <Mail className="h-6 w-6 text-purple-600" />
              ) : (
                <Chrome className="h-6 w-6 text-purple-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 capitalize">
                {provider.login_provider} Users
              </p>
              <h3 className="text-2xl font-bold">{provider._count}</h3>
              <p className="text-sm text-gray-600">
                {((provider._count / dashboardData?.users.total) * 100).toFixed(
                  1
                )}
                % of total
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Users Table Section */}
      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Users Management</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-medium">
                            {user.first_name} {user.last_name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 1
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
