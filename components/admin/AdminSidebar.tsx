"use client";

import {
  Menu,
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const sidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/my-admin/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/my-admin/users",
  },
  {
    title: "Subscriptions",
    icon: CreditCard,
    href: "/my-admin/subscriptions",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/my-admin/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/my-admin/settings",
  },
];

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function AdminSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logoutUser } = useAuth();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-neutral-200 z-50
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-neutral-200">
          <Link href="/my-admin/dashboard" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={120} height={40} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-neutral-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={logoutUser}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
