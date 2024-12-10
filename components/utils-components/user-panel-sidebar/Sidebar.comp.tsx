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
import ManageWorkspacesModal from "../../workspace/Manage-Workspaces-Modal.comp";
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
    id: "ai-writer",
    name: "AI Writer",
    icon: Wand2,
    href: "/ai-writer",
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
    id: "accounts",
    name: "Manage Accounts",
    icon: Linkedin,
    href: "/accounts",
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
        "flex items-center gap-x-2.5 px-2 py-1 rounded-xl cursor-pointer",
        "transition-all duration-200 border",
        isActive
          ? "bg-white/60 border-primary/10 shadow-sm"
          : "border-transparent hover:bg-white/40 hover:border-primary/5",
        "group"
      )}
    >
      <div
        className={cn(
          "size-7 rounded-lg flex items-center justify-center",
          "transition-all duration-200",
          isActive
            ? "bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner"
            : "text-gray-500 group-hover:text-primary/80"
        )}
      >
        <item.icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex flex-col gap-0.5 flex-1">
        <span
          className={cn(
            "text-sm font-medium leading-none",
            isActive
              ? "text-gray-900"
              : "text-gray-600 group-hover:text-gray-800"
          )}
        >
          {item.name}
        </span>
        {item.description && (
          <span className="text-xs text-gray-400 group-hover:text-gray-500 leading-tight">
            {item.description}
          </span>
        )}
      </div>
      {item.badge && (
        <span
          className={cn(
            "px-1.5 py-0.5 text-[10px] font-medium rounded-full",
            item.badgeColor || "bg-primary/10 text-primary"
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
};

// Main Navigation Component
const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav>
      <div className="space-y-0.5">
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
  const { userinfo, currentWorkspace, subscription } = useSelector(
    (state: RootState) => state.user
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const { handleCreateDraftFromGenerated } = useContentPosting();
  const { logoutUser } = useAuth();

  const handleCreateNew = async () => {
    try {
      // Create a blank draft
      const draftId = await handleCreateDraftFromGenerated({
        content: "", // Blank content
        postType: "text",
        workspaceId: currentWorkspace?.id,
        linkedInProfileId: null,
        videoUrl: "",
        documentUrl: "",
        hashtags: [],
        mentions: [],
      });

      if (draftId) {
        // Redirect to compose with the new draft ID
        router.push(`/compose?draft_id=${draftId}`);
      }
    } catch (error) {
      console.error("Error creating new draft:", error);
      toast.error("Failed to create new draft");
    }
  };

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
    <div className="w-[280px] sm:w-72 h-screen flex flex-col bg-white border-r border-gray-100 shadow-md relative z-10 flex-shrink-0">
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-50"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>

      {/* Header Section */}
      <div className="shrink-0 border-b border-gray-100 p-6 space-y-4">
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

        {/* Workspace Selector */}
        <Button
          variant="outline"
          onClick={() => setIsManageModalOpen(true)}
          className={cn(
            "w-full justify-between text-gray-700",
            "bg-white border-gray-200 hover:bg-gray-50",
            "transition-all duration-200"
          )}
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">
              {currentWorkspace?.name || "Select workspace..."}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>

        {/* Create Button */}
        <GradientButton
          variant="primary"
          onClick={handleCreateNew}
          fullWidth
          leftIcon={<Plus className="h-4 w-4" />}
          kbd="Ctrl + N"
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          Create New
        </GradientButton>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <Navigation />
      </div>

      {/* Footer Section */}
      <div className="shrink-0 border-t border-gray-100">
        {/* AI Usage Section */}
        {subscription.isActive && (
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 
                              flex items-center justify-center shadow-inner"
                >
                  <Wand2 className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  AI Credits
                </span>
              </div>
              <span className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">
                {formatTokens(wordUsage.used)} / {formatTokens(wordUsage.limit)}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300 ease-in-out",
                  wordUsage.percentage > 80
                    ? "bg-red-500"
                    : "bg-gradient-to-r from-primary to-primary/80"
                )}
                style={{ width: `${wordUsage.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Upgrade Button */}
        {!subscription.isActive && (
          <div className="px-6 py-4 border-b border-gray-100">
            <GradientButton
              variant="primary"
              onClick={() => router.push("/pricing")}
              fullWidth
              leftIcon={<Sparkles className="h-4 w-4" />}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              Upgrade Now
            </GradientButton>
          </div>
        )}

        {/* Subscription Info */}
        {subscription.isActive && (
          <div className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <SubscriptionInfo />
          </div>
        )}

        {/* User Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
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
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
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

      {/* Modals */}
      <ManageWorkspacesModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
