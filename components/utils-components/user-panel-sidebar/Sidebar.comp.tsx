"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  Layers,
  Calendar,
  LayoutTemplate,
  Zap,
  Plus,
  Users,
  ChevronDown,
  ImageIcon,
  Linkedin,
  Pen,
  Wand2,
  Settings,
  User,
  BarChart2,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Key,
  Sparkles,
  X,
  LogOut,
  Clock,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import { LucideIcon } from "lucide-react";

import { GradientButton } from "@/components/ui/gradient-button";
import { motion } from "framer-motion";
import { useContentPosting } from "@/hooks/useContent";
import { toast } from "react-hot-toast";
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
  counter?: number;
  shortcut?: string;
  description?: string;
}

type ToolItem = BaseNavigationItem & {
  shortcut: string;
};

type FeatureItem = BaseNavigationItem & {
  badge?: string;
  badgeColor?: string;
};

type SettingsItem = BaseNavigationItem & {
  badgeColor?: string;
};

// First, combine the interfaces
type NavigationItem = BaseNavigationItem & {
  shortcut?: string;
  badge?: string;
  badgeColor?: string;
  counter?: number;
  subItems?: SettingsItem[];
};

// Then combine the navigation items
const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: Wand2,
    href: "/dashboard",
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
  item: NavigationItem;
  isActive: boolean;
  hasSubItems?: boolean;
}> = ({ item, isActive, hasSubItems }) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-x-2.5 rounded-md px-2 py-1.5",
        "transition-all duration-150",
        isActive
          ? "bg-gray-900/5 text-gray-900"
          : "hover:bg-gray-900/[0.03] text-gray-700"
      )}
    >
      <item.icon
        className={cn(
          "w-[18px] h-[18px] transition-colors duration-150",
          isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-800"
        )}
      />

      <div className="flex items-center justify-between flex-1">
        <span
          className={cn(
            "text-sm font-medium",
            isActive
              ? "text-gray-900"
              : "text-gray-700 group-hover:text-gray-800"
          )}
        >
          {item.name}
        </span>

        {item.badge && (
          <span
            className={cn(
              "px-1.5 py-0.5 text-[10px] font-medium rounded",
              item.badgeColor || "bg-gray-100 text-gray-600"
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
    <nav>
      <div className="space-y-1">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            isActive={pathname === item.href}
            hasSubItems={item.id === "settings"}
          />
        ))}
      </div>
    </nav>
  );
};

// Add onClose prop to the interface
interface SidebarProps {
  onClose?: () => void;
}

// Update the Sidebar component
const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const router = useRouter();
  const { userinfo, subscription } = useSelector(
    (state: RootState) => state.user
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const { logoutUser } = useAuth();
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  // Get word usage from the new subscription structure
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        router.push("/compose");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="relative w-[240px] h-screen flex flex-col bg-gradient-to-b from-white via-gray-50/20 to-white border-r border-gray-200/80">
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>

      {/* Header Section */}
      <div className="shrink-0 p-3 space-y-3">
        {/* Logo */}
        <Link
          href="/"
          className="block px-2 py-1.5 transition-opacity hover:opacity-80"
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
          <Link href="/studio">
            <GradientButton
              variant="primary"
              fullWidth
              className="shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Create New</span>
                </div>
                <kbd className="text-xs bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  ⌘N
                </kbd>
              </div>
            </GradientButton>
          </Link>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {/* Features Section */}
        <div>
          <div className="px-2 mb-2">
            <span className="text-xs font-medium text-gray-500/90">
              Features
            </span>
          </div>
          <Navigation />
        </div>

        {/* Settings Section */}
        <div>
          <div className="px-2 mb-2">
            <span className="text-xs font-medium text-gray-500/90">
              Settings
            </span>
          </div>
          <div className="space-y-1">
            <Link
              href="/billing"
              className="group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 hover:bg-gray-900/[0.03] text-gray-700 transition-colors"
            >
              <CreditCard className="w-[18px] h-[18px] text-gray-600 group-hover:text-gray-800" />
              <span className="text-sm font-medium">Billing & Usage</span>
            </Link>
            <Link
              href="/settings/ai-style"
              className="group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 hover:bg-gray-900/[0.03] text-gray-700 transition-colors"
            >
              <Wand2 className="w-[18px] h-[18px] text-gray-600 group-hover:text-gray-800" />
              <span className="text-sm font-medium">AI Voice & Style</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="shrink-0 border-t border-gray-200/80">
        {/* AI Usage Section */}
        {subscription.isActive && (
          <div className="px-3 py-3 border-b border-gray-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  AI Credits
                </span>
              </div>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded-md bg-gradient-to-br from-gray-100 to-gray-50 text-gray-700 border border-gray-200/60">
                {formatTokens(wordUsage.used)} / {formatTokens(wordUsage.limit)}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full overflow-hidden border border-gray-200/60">
              <div
                className={cn(
                  "h-full transition-all duration-300 ease-in-out bg-gradient-to-r",
                  wordUsage.percentage > 80
                    ? "from-red-500 to-red-600"
                    : "from-primary to-primary-dark"
                )}
                style={{ width: `${wordUsage.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* User Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full px-3 py-2.5 flex items-center gap-2.5 hover:bg-gray-50/80 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-gray-900 text-sm font-medium shadow-inner">
                {userinfo?.first_name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {userinfo?.first_name || "User"}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {userinfo?.email || "user@email.com"}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 mr-2.5 mb-2.5"
            align="end"
            alignOffset={-5}
            sideOffset={5}
          >
            <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-gray-900 shadow-inner">
                {userinfo?.first_name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {userinfo?.first_name || "User"}
                </span>
                <span className="text-xs text-gray-500">
                  {userinfo?.email || "user@email.com"}
                </span>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/billing")}
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
    </div>
  );
};

export default Sidebar;
