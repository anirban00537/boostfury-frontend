"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  BarChart3,
  Plus,
  ArrowUpRight,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { getAdminDashboardData } from "@/services/admin";
import { useQuery } from "react-query";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: string;
  status: number;
}

interface DashboardData {
  data: {
    users: {
      total: number;
      active: number;
      growthPercentage: string;
      recent: User[];
    };
    subscriptions: {
      active: number;
      subscriptionRate: string;
      trial: number;
      conversionRate: number;
    };
    wordUsage: {
      total: number;
    };
  };
}

const AdminDashboard = () => {
  const { data: dashboardData, isLoading } = useQuery<DashboardData>(
    "adminDashboard",
    getAdminDashboardData
  );

  const stats = [
    {
      title: "Total Users",
      value: dashboardData?.data?.users?.total || 0,
      change: `${dashboardData?.data?.users?.growthPercentage || 0}%`,
      icon: Users,
      color: "bg-blue-500",
      trend: "up",
    },
    {
      title: "Active Subscriptions",
      value: dashboardData?.data?.subscriptions?.active || 0,
      change: `${dashboardData?.data?.subscriptions?.subscriptionRate || 0}%`,
      icon: CreditCard,
      color: "bg-green-500",
      trend: "up",
    },
    {
      title: "Words Generated",
      value: dashboardData?.data?.wordUsage?.total || 0,
      change: "Monthly",
      icon: BarChart3,
      color: "bg-purple-500",
      trend: "neutral",
    },
  ];

  const recentUsers =
    dashboardData?.data?.users?.recent?.map((user) => ({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      status: user.status === 1 ? "Active" : "Inactive",
      date: new Date(user.createdAt).toLocaleDateString(),
    })) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50/50">
        <div className="flex items-center gap-2 text-neutral-600">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
          <span>Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50/50">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, Admin
        </h1>
        <p className="text-neutral-600">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon
                  className={`w-6 h-6 ${stat.color} text-opacity-90`}
                />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                {stat.trend === "up" && (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-neutral-600"
                  }
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-neutral-600">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/60 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Recent Users
                  </h2>
                  <p className="text-sm text-neutral-600">
                    Latest user registrations
                  </p>
                </div>
                <ShimmerButton
                  className="h-9 px-4 rounded-xl text-sm font-medium"
                  background="linear-gradient(110deg, #2563eb, #4f46e5)"
                >
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </div>
                </ShimmerButton>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-neutral-600">
                      <th className="pb-4 font-medium">Name</th>
                      <th className="pb-4 font-medium">Email</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Join Date</th>
                      <th className="pb-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="border-t border-neutral-100 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4">{user.name}</td>
                        <td className="py-4 text-neutral-600">{user.email}</td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 text-neutral-600">{user.date}</td>
                        <td className="py-4">
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/60 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm text-neutral-600">Active Users</p>
                  <p className="text-xl font-semibold text-neutral-900">
                    {dashboardData?.data?.users?.active || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm text-neutral-600">Trial Users</p>
                  <p className="text-xl font-semibold text-neutral-900">
                    {dashboardData?.data?.subscriptions?.trial || 0}
                  </p>
                </div>
                <UserPlus className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm text-neutral-600">Conversion Rate</p>
                  <p className="text-xl font-semibold text-neutral-900">
                    {dashboardData?.data?.subscriptions?.conversionRate || 0}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
