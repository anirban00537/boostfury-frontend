"use client";
import React from "react";
import {
  Package,
  Users,
  Settings,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  X,
  Crown,
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

interface BaseNavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const navigationItems: BaseNavigationItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/my-admin/dashboard",
    badge: "Admin",
    badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  },
  {
    id: "packages",
    name: "Packages",
    icon: Package,
    href: "/my-admin/packages",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
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
  item: BaseNavigationItem;
  isActive: boolean;
}> = ({ item, isActive }) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-x-3 rounded-xl px-3 py-2.5",
        "transition-all duration-200",
        isActive ? "bg-neutral-100 shadow-sm" : "hover:bg-neutral-50"
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center",
          isActive &&
            "after:absolute after:-inset-2 after:bg-primary/10 after:blur-lg after:rounded-full"
        )}
      >
        <item.icon
          className={cn(
            "w-[18px] h-[18px] transition-all duration-200",
            isActive
              ? "text-primary"
              : "text-neutral-500 group-hover:text-neutral-700"
          )}
        />
      </div>

      <div className="flex items-center justify-between flex-1">
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            isActive
              ? "text-neutral-900"
              : "text-neutral-600 group-hover:text-neutral-800"
          )}
        >
          {item.name}
        </span>

        {item.badge && (
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-medium rounded-full shadow-sm",
              item.badgeColor || "bg-neutral-100 text-neutral-600"
            )}
          >
            {item.badge}
          </span>
        )}
      </div>
    </Link>
  );
};

interface AdminSidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function AdminSidebar({ onClose, isOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logoutUser } = useAuth();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-neutral-200/80 bg-gradient-to-b from-white to-gray-50/90 backdrop-blur-xl transition-transform duration-300 lg:relative lg:z-0 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-gray-50/50 to-transparent pointer-events-none" />

      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>

      {/* Header Section */}
      <div className="shrink-0 p-4">
        {/* Logo */}
        <Link href="/" className="block transition-opacity hover:opacity-80">
          <div className="relative space-y-3">
            <div className="flex items-center justify-between">
              <Image
                src="/logo.svg"
                alt="Boostfury"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-medium text-primary">
                  ADMIN
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl blur-lg" />
              <div className="relative flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-br from-white to-white/80 shadow-sm border border-neutral-200/60">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Crown className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                    Control Panel
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    Full system access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="relative flex-1 overflow-y-auto py-4 space-y-8">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none" />

        {/* Navigation Menu */}
        <nav className="px-2">
          <div className="space-y-1.5">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </nav>

        {/* Admin Info Card */}
        <div className="px-4">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl blur-lg opacity-70" />
            <div className="relative rounded-xl bg-gradient-to-br from-white to-white/90 p-4 shadow-sm border border-neutral-200/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">
                    Admin Access
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Full system control
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-500">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Active session
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative shrink-0 border-t border-neutral-200/60">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-neutral-50/80 transition-all duration-200">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-neutral-900 text-sm font-medium shadow-sm">
                <span>A</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-neutral-900 truncate">
                  Admin User
                </div>
                <div className="text-xs text-neutral-500 truncate">
                  admin@boostfury.com
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-neutral-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 mr-2.5 mb-2.5"
            align="end"
            alignOffset={-5}
            sideOffset={5}
          >
            <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-neutral-900 shadow-sm">
                <span>A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-900">
                  Admin User
                </span>
                <span className="text-xs text-neutral-500">
                  admin@boostfury.com
                </span>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => (window.location.href = "/my-admin/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Admin Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="px-3 py-2.5 cursor-pointer text-red-600 hover:bg-red-50 focus:text-red-600 focus:bg-red-50"
              onClick={logoutUser}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
