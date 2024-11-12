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

type ManagementItem = BaseNavigationItem & {
  counter?: number;
};

type SettingsItem = BaseNavigationItem & {
  badgeColor?: string;
};

interface SettingsSection {
  id: string;
  name: string;
  icon: LucideIcon;
  items: SettingsItem[];
}

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
  // Tools/Features
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

// Simplified NavigationItem component with updated styling
const NavigationItem: React.FC<{
  item: NavigationItem;
  isActive: boolean;
  hasSubItems?: boolean;
}> = ({ item, isActive, hasSubItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isSettings = item.id === "settings";
  const showSubItems = isSettings && isExpanded;

  useEffect(() => {
    if (isSettings && pathname.startsWith("/settings")) {
      setIsExpanded(true);
    }
  }, [isSettings, pathname]);

  return (
    <div>
      {isSettings ? (
        // Settings item with expandable content
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-x-3 px-3 py-2 rounded-lg cursor-pointer",
            isActive || (isSettings && pathname.startsWith("/settings"))
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "group"
          )}
        >
          <item.icon
            className={cn(
              "h-4 w-4",
              isActive || (isSettings && pathname.startsWith("/settings"))
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-500"
            )}
          />
          <span className="text-sm font-medium flex-1">{item.name}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isActive || (isSettings && pathname.startsWith("/settings"))
                ? "text-blue-600"
                : "text-gray-400",
              isExpanded && "transform rotate-180"
            )}
          />
        </div>
      ) : (
        // Regular navigation item with Link
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-x-3 px-3 py-2 rounded-lg cursor-pointer",
            isActive
              ? "bg-blue-50 text-blue-600"
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
          {item.shortcut && (
            <span className="text-xs text-gray-400 px-1.5 py-0.5 bg-gray-50 rounded">
              {item.shortcut}
            </span>
          )}
          {item.counter !== undefined && (
            <span className="text-xs text-gray-500">{item.counter}</span>
          )}
        </Link>
      )}

      {/* Settings Sub-items */}
      {showSubItems && item.subItems && (
        <div className="ml-7 space-y-1 mt-1">
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.id}
              href={subItem.href}
              className={cn(
                "flex items-center gap-x-3 px-3 py-2 text-sm rounded-lg",
                pathname === subItem.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <subItem.icon
                className={cn(
                  "h-4 w-4",
                  pathname === subItem.href
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              <span>{subItem.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Settings Navigation Section Component
const SettingsNavigationSection: React.FC<{
  section: SettingsSection;
  isActive: boolean;
}> = ({ section, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (section.items.some((item) => pathname.startsWith(item.href))) {
      setIsExpanded(true);
    }
  }, [pathname, section.items]);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200",
          isActive ? "bg-gray-50" : "hover:bg-gray-50/50",
          "group"
        )}
      >
        <div className="flex items-center gap-3">
          <section.icon className="h-4 w-4 text-gray-400 group-hover:text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {section.name}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="ml-4 pl-4 border-l border-gray-100 space-y-1 py-1">
          {section.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Navigation Component
const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="px-3 py-2">
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
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
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
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        router.push('/compose');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="w-72 h-screen flex flex-col bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="px-6 py-4 border-b border-gray-100">
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            height={28}
            width={120}
            alt="Buildsocialpost.com"
            className="w-auto"
          />
        </Link>
      </div>

      {/* Workspace Selector */}
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
          onClick={() => router.push('/compose')}
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

      {/* Combined Navigation */}
      <Navigation />

      {/* User Section */}
      <div className="mt-auto space-y-1 border-t border-gray-100">
        {/* Usage Stats Group */}
        <div className="space-y-1">
          {/* AI Usage Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  AI Usage
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

          {/* Subscription Info */}
          <div className="border-b border-gray-100">
            <SubscriptionInfo />
          </div>
        </div>

        {/* User Profile */}
        <div className="px-4 py-3 flex items-center justify-between group hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors duration-150">
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
