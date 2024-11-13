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
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import ManageWorkspacesModal from "../../workspace/Manage-Workspaces-Modal.comp";
import { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

// Define specific types for each section
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
    id: "ai-writer",
    name: "AI Writer",
    icon: Wand2,
    href: "/ai-writer",
    badge: "AI",
    badgeColor: "bg-gradient-to-r from-indigo-500 to-blue-500 text-white",
  },
  {
    id: "carousel-editor",
    name: "Carousel Editor",
    icon: Layers,
    href: "/carousel-editor",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
  },
  // Management items
  {
    id: "carousels",
    name: "My Carousels",
    icon: LayoutTemplate,
    href: "/carousels",
  },
  {
    id: "my-posts",
    name: "My Posts",
    icon: Calendar,
    href: "/my-posts",
  },
  {
    id: "accounts",
    name: "Manage Accounts",
    icon: Linkedin,
    href: "/accounts",
    badge: "LinkedIn",
    badgeColor: "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
  },
  {
    id: "media",
    name: "Media Manager",
    icon: ImageIcon,
    href: "/media",
  },
];

const NavigationItem: React.FC<{
  item: NavigationItem;
  isActive: boolean;
  hasSubItems?: boolean;
}> = ({ item, isActive, hasSubItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isSettings = item.id === "settings";

  return (
    <div>
      {isSettings ? (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-x-3 px-3 py-2 rounded-lg cursor-pointer",
            isActive || (isSettings && pathname.startsWith("/settings"))
              ? "bg-[#EEF4FF] text-blue-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "group"
          )}
        >
          <item.icon
            className={cn(
              "h-4 w-4",
              isActive
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            )}
          />
          <span className="text-sm font-medium flex-1">{item.name}</span>
        </div>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-x-3 px-3 py-2 rounded-lg cursor-pointer",
            isActive
              ? "bg-white/80 text-blue-600"
              : "text-gray-600 hover:bg-white/60 hover:text-gray-900",
            "group"
          )}
        >
          <item.icon
            className={cn(
              "h-4 w-4",
              isActive
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            )}
          />
          <span className="text-sm font-medium flex-1">{item.name}</span>
          {item.badge && (
            <span
              className={cn(
                "px-2 py-0.5 text-xs font-medium rounded-full",
                item.badgeColor || "bg-blue-100 text-blue-600"
              )}
            >
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </div>
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

const Sidebar = () => {
  const router = useRouter();
  const { userinfo, currentWorkspace, wordUsage, subscription } = useSelector(
    (state: RootState) => state.user
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const aiUsage = {
    used: wordUsage?.usage?.used || 0,
    remaining: wordUsage?.usage?.remaining || 0,
    total: wordUsage?.usage?.total || 0,
    percentage: wordUsage?.percentage?.used || 0,
    isActive: wordUsage?.usage?.isActive || false,
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
    <div className="w-72 h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-50 to-white border-r border-gray-200">
      {/* Fixed Top Section */}
      <div className="shrink-0">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-100">
          <Link href="/" className="block">
            <Image
              src="/logo.svg"
              height={28}
              width={120}
              alt="boostfury.com"
              className="w-auto"
            />
          </Link>
        </div>

        <div className="p-3">
          <Button
            variant="outline"
            onClick={() => setIsManageModalOpen(true)}
            className="w-full h-9 justify-between text-gray-600 bg-gray-50/50 border border-gray-200 hover:bg-gray-100/50"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                {currentWorkspace?.name || "Select workspace..."}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        {/* Create Button */}
        <div className="px-3 pb-2">
          <button
            onClick={() => router.push("/compose")}
            className="w-full inline-flex items-center justify-between h-9 px-4 py-2 
                     bg-primary hover:bg-primary/90 text-white rounded-md
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-primary/20 focus:ring-offset-1"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create New</span>
            </div>
            <kbd className="text-xs bg-white/10 px-1.5 py-0.5 rounded">
              Ctrl + N
            </kbd>
          </button>
        </div>
      </div>

      {/* Navigation Section - Adjusted padding */}
      <div className="h-auto flex-1 overflow-y-auto px-3 pb-0">
        <Navigation />
      </div>

      {/* Fixed Bottom Section - Removed extra padding/spacing */}
      <div className="shrink-0 border-t border-gray-100">
        {/* AI Usage Section - Tightened padding */}
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                AI Credits
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500">
              {formatTokens(aiUsage.used)} / {formatTokens(aiUsage.total)}
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300 ease-in-out",
                aiUsage.percentage > 80 ? "bg-red-500" : "bg-primary"
              )}
              style={{
                width: `${aiUsage.percentage}%`,
              }}
            />
          </div>
        </div>

        {/* Subscription Info - No additional padding needed */}
        <div className="border-b border-gray-100">
          <SubscriptionInfo />
        </div>

        {/* User Profile - Reduced padding */}
        <div className="px-4 py-2.5 flex items-center justify-between group hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors duration-150">
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
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-colors duration-150" />
        </div>
      </div>

      {/* Modals */}
      <ManageWorkspacesModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
