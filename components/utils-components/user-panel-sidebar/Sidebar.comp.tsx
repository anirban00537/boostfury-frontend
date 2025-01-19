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
        "group relative flex items-center gap-x-3 rounded-xl p-2",
        "transition-all duration-200",
        isActive
          ? "bg-blue-50/80 text-blue-600"
          : "hover:bg-slate-50 text-slate-600"
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg",
          isActive
            ? "bg-blue-100/80"
            : "bg-slate-100/70 group-hover:bg-blue-50/50"
        )}
      >
        <item.icon
          className={cn(
            "w-[18px] h-[18px] transition-colors duration-200",
            isActive
              ? "text-blue-600"
              : "text-slate-600 group-hover:text-blue-500"
          )}
        />
      </div>

      <div className="flex items-center justify-between flex-1">
        <span
          className={cn(
            "text-sm font-medium",
            isActive
              ? "text-blue-700"
              : "text-slate-700 group-hover:text-blue-600"
          )}
        >
          {item.name}
        </span>

        {item.badge && (
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-medium rounded-full",
              item.badgeColor || "bg-blue-50 text-blue-600"
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
    <div className="relative w-[280px] sm:w-72 h-screen flex flex-col bg-white/80 backdrop-blur-sm border-r border-slate-200/60 shadow-sm">
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/80 transition-colors"
      >
        <X className="h-5 w-5 text-neutral-500" />
      </button>

      {/* Header Section */}
      <div className="shrink-0 border-b border-neutral-200/60 p-6 space-y-4">
        {/* Logo */}
        <Link href="/" className="block transition-opacity hover:opacity-80">
          <Image
            src="/logo.svg"
            height={28}
            width={120}
            alt="boostfury.com"
            className="w-auto"
          />
        </Link>

        {/* Create Button - Updated to use GradientButton */}
        <GradientButton
          variant="primary"
          fullWidth
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create New</span>
            <kbd className="ml-auto text-xs bg-black/20 px-1.5 py-0.5 rounded">
              Ctrl + N
            </kbd>
          </div>
        </GradientButton>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <Navigation />
      </div>

      {/* Footer Section */}
      <div className="shrink-0 border-t border-neutral-200/60">
        {/* AI Usage Section */}
        {subscription.isActive && (
          <div className="px-6 py-4 border-b border-neutral-200/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                  <div
                    className="relative w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl 
                    flex items-center justify-center border border-neutral-200/40"
                  >
                    <Wand2 className="w-5 h-5 text-neutral-900" />
                  </div>
                </div>
                <span className="text-sm font-medium text-neutral-900">
                  AI Credits
                </span>
              </div>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full
                bg-white/50 backdrop-blur-sm border border-neutral-200/60 text-neutral-600"
              >
                {formatTokens(wordUsage.used)} / {formatTokens(wordUsage.limit)}
              </span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300 ease-in-out",
                  wordUsage.percentage > 80 ? "bg-red-500" : "bg-neutral-900"
                )}
                style={{ width: `${wordUsage.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* User Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                  <div
                    className="relative w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl 
                    flex items-center justify-center border border-neutral-200/40 text-neutral-900"
                  >
                    {userinfo?.first_name?.charAt(0) || "U"}
                  </div>
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
              <ChevronDown className="h-4 w-4 text-neutral-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 mr-2.5 mb-2.5"
            align="end"
            alignOffset={-5}
            sideOffset={5}
          >
            <div className="flex items-center gap-3 px-3 py-2 mb-1">
              <div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 
                            flex items-center justify-center text-gray-900 shadow-inner"
              >
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
              className="px-3 py-2.5 cursor-pointer"
              onClick={() => router.push("/billing")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Billing management</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="px-3 py-2.5 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
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
