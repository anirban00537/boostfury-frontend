"use client";

import React from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { getAdminDashboardData } from "@/services/admin";
import { useQuery } from "react-query";
import { Card } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  TrendingUp,
  Mail,
  Chrome,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

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

const AdminDashboard = () => {
  const { data: dashboardData, isLoading } = useQuery(
    "adminDashboard",
    getAdminDashboardData
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50/50 space-y-6">
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

        <Card className="p-6 flex items-start space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Words Generated</p>
            <h3 className="text-2xl font-bold">
              {dashboardData?.wordUsage.total.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Usage</p>
          </div>
        </Card>

        <Card className="p-6 flex items-start space-x-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Subscriptions</p>
            <h3 className="text-2xl font-bold">
              {dashboardData?.subscriptions.active}
            </h3>
            <p className="text-sm text-gray-600">
              Trial: {dashboardData?.subscriptions.trial}
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData?.users.recent.map((user: User) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(user.createdAt), "MMM dd, yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Login Provider Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Login Providers</h2>
          <div className="space-y-4">
            {dashboardData?.users.byLoginProvider.map(
              (provider: LoginProvider) => (
                <div
                  key={provider.login_provider}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    {provider.login_provider === "email" ? (
                      <Mail className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Chrome className="h-5 w-5 text-gray-500" />
                    )}
                    <span className="capitalize">
                      {provider.login_provider}
                    </span>
                  </div>
                  <span className="font-semibold">{provider._count} users</span>
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Conversion Rate</span>
              <span className="font-semibold">
                {dashboardData?.subscriptions.conversionRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Subscription Rate</span>
              <span className="font-semibold">
                {dashboardData?.subscriptions.subscriptionRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Trial Users</span>
              <span className="font-semibold">
                {dashboardData?.subscriptions.trial}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
