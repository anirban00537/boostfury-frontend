"use client";
import React from "react";
import {
  Calendar,
  Clock,
  Linkedin,
  Wand2,
  Plus,
  ChevronDown,
  X,
  LogOut,
  User,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

// Define base interface for navigation items
interface BaseNavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  badgeColor?: string;
}

// Then combine the navigation items
const navigationItems: BaseNavigationItem[] = [
  {
    id: "studio",
    name: "Studio",
    icon: Wand2,
    href: "/studio",
    badge: "AI",
    badgeColor: "bg-gradient-to-r from-indigo-500 to-blue-500 text-white",
  },
  {
    id: "my-posts",
    name: "My Posts",
    icon: Calendar,
    href: "/my-posts",
  },
  {
    id: "post-queue",
    name: "Post Queue",
    icon: Clock,
    href: "/post-queue",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
  },
  {
    id: "account",
    name: "Manage Accounts",
    icon: Linkedin,
    href: "/account",
    badge: "LinkedIn",
    badgeColor: "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
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
        isActive
          ? "bg-neutral-100 shadow-sm"
          : "hover:bg-neutral-50"
      )}
    >
      <div className={cn(
        "relative flex items-center justify-center",
        isActive && "after:absolute after:-inset-2 after:bg-primary/10 after:blur-lg after:rounded-full"
      )}>
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

// Main Navigation Component
const Navigation = () => {
  const pathname = usePathname();
  return (
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
  );
};

// Add isOpen to component props and fix the type
interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

// Update the Sidebar component
const Sidebar: React.FC<SidebarProps> = ({ onClose, isOpen }) => {
  const pathname = usePathname();
  const { userinfo, subscription } = useSelector(
    (state: RootState) => state.user
  );
  const { logoutUser } = useAuth();

  // Get word usage from the subscription structure
  const wordUsage = {
    used: subscription.usage.words.used,
    limit: subscription.usage.words.limit,
    percentage:
      (subscription.usage.words.used / subscription.usage.words.limit) * 100 ||
      0,
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return (tokens / 1000000).toFixed(1) + "M";
    } else if (tokens >= 1000) {
      return (tokens / 1000).toFixed(0) + "k";
    } else {
      return tokens.toString();
    }
  };

  const handleCreateNew = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/studio";
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-neutral-200/80 bg-gray-50/50 backdrop-blur-xl transition-transform duration-300 lg:relative lg:z-0 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>

      {/* Header Section */}
      <div className="shrink-0 p-4 space-y-4">
        {/* Logo */}
        <Link
          href="/"
          className="block py-1 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.svg"
            height={24}
            width={100}
            alt="boostfury.com"
            className="w-auto"
          />
        </Link>

        {/* Create Button */}
        <div className="w-full">
          <GradientButton
            variant="primary"
            fullWidth
            onClick={handleCreateNew}
            className="shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-11 rounded-xl"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
                  <Plus className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">Create New</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/20 backdrop-blur-sm">
                <span className="text-[10px] font-medium">⌘</span>
                <span className="text-[10px] font-medium">N</span>
              </div>
            </div>
          </GradientButton>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4 space-y-8">
        {/* Features Section */}
        <div>
          <div className="px-5 mb-3">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Features
            </span>
          </div>
          <Navigation />
        </div>

        {/* Settings Section */}
        <div>
          <div className="px-5 mb-3">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Settings
            </span>
          </div>
          <div className="px-2 space-y-1.5">
            <Link
              href="/billing"
              className="group flex items-center gap-x-3 rounded-xl px-3 py-2.5 hover:bg-neutral-50 transition-all duration-200"
            >
              <div className="relative flex items-center justify-center">
                <CreditCard className="w-[18px] h-[18px] text-neutral-500 group-hover:text-neutral-700 transition-colors duration-200" />
              </div>
              <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-800">
                Billing & Usage
              </span>
            </Link>
            <Link
              href="/settings/ai-style"
              className={cn(
                "group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200",
                pathname === "/settings/ai-style"
                  ? "bg-gradient-to-r from-neutral-100 to-neutral-50 shadow-sm"
                  : "hover:bg-neutral-50"
              )}
            >
              <div className="flex items-center gap-x-3">
                <div className={cn(
                  "relative flex items-center justify-center",
                  pathname === "/settings/ai-style" && "after:absolute after:-inset-2 after:bg-primary/10 after:blur-lg after:rounded-full"
                )}>
                  <Wand2 
                    className={cn(
                      "w-[18px] h-[18px] transition-all duration-200",
                      pathname === "/settings/ai-style"
                        ? "text-primary"
                        : "text-neutral-500 group-hover:text-neutral-700"
                    )}
                  />
                </div>
                <span 
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    pathname === "/settings/ai-style"
                      ? "text-neutral-900"
                      : "text-neutral-600 group-hover:text-neutral-800"
                  )}
                >
                  AI Voice & Style
                </span>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm">
                New
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="shrink-0 border-t border-neutral-200/80">
        {/* AI Usage Section */}
        {subscription.isActive && (
          <div className="px-4 py-3 border-b border-neutral-200/80">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-neutral-900">
                  AI Credits
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 text-neutral-700 border border-neutral-200/60">
                  {formatTokens(wordUsage.used)}
                </span>
                <span className="text-xs text-neutral-400">/</span>
                <span className="text-xs font-medium text-neutral-500">
                  {formatTokens(wordUsage.limit)}
                </span>
              </div>
            </div>
            <div className="relative w-full h-2 bg-gradient-to-r from-neutral-100 to-neutral-50 rounded-lg overflow-hidden border border-neutral-200/60">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 transition-all duration-300 ease-in-out bg-gradient-to-r",
                  wordUsage.percentage > 80
                    ? "from-red-500 to-red-600"
                    : "from-primary to-primary/80"
                )}
                style={{ width: `${wordUsage.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* User Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-neutral-50/80 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-neutral-900 text-sm font-medium shadow-sm">
                {userinfo?.first_name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-neutral-900 truncate">
                  {userinfo?.first_name || "User"}
                </div>
                <div className="text-xs text-neutral-500 truncate">
                  {userinfo?.email || "user@email.com"}
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
                {userinfo?.first_name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-900">
                  {userinfo?.first_name || "User"}
                </span>
                <span className="text-xs text-neutral-500">
                  {userinfo?.email || "user@email.com"}
                </span>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => window.location.href = "/billing"}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Billing management</span>
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
};

export default Sidebar;
