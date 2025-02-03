"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Package,
  Users,
  Settings,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

interface NavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/my-admin/dashboard",
    badge: "Admin",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "packages",
    name: "Packages",
    icon: Package,
    href: "/my-admin/packages",
    badge: "New",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: "users",
    name: "Users",
    icon: Users,
    href: "/my-admin/users",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    href: "/my-admin/settings",
  },
];

const NavigationItem: React.FC<{
  item: NavigationItem;
  isActive: boolean;
}> = ({ item, isActive }) => (
  <Link
    href={item.href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
    )}
  >
    <item.icon className="h-5 w-5" />
    <span className="text-sm font-medium">{item.name}</span>
    {item.badge && (
      <span
        className={cn(
          "ml-auto px-2 py-0.5 text-xs font-medium rounded-full",
          item.badgeColor
        )}
      >
        {item.badge}
      </span>
    )}
  </Link>
);

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logoutUser } = useAuth();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-white border-r border-gray-200 transition-transform lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Close button for mobile */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="lg:hidden absolute right-2 top-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Boostfury"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            ADMIN
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      {/* User Menu */}
      <div className="border-t border-gray-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center w-full gap-3 p-2 rounded-lg hover:bg-gray-100">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">A</span>
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-gray-900">
                Admin User
              </div>
              <div className="text-xs text-gray-500">admin@boostfury.com</div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => (window.location.href = "/my-admin/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutUser} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
