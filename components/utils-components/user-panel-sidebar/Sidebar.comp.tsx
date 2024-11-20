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
  // {
  //   id: "carousel-editor",
  //   name: "Carousel Editor",
  //   icon: Layers,
  //   href: "/carousel-editor",
  //   badge: "New",
  //   badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
  // },
  // Management items
  // {
  //   id: "carousels",
  //   name: "My Carousels",
  //   icon: LayoutTemplate,
  //   href: "/carousels",
  // },
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
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-x-3 px-3 py-2 rounded-lg cursor-pointer",
        isActive
          ? "bg-blue-100/80 text-gray-800"
          : "text-gray-600 hover:bg-blue-50/80 hover:text-gray-800",
        "group transition-all duration-200"
      )}
    >
      <item.icon
        className={cn(
          "h-4 w-4",
          isActive ? "text-gray-700" : "text-gray-500 group-hover:text-gray-600"
        )}
      />
      <span className="text-sm font-medium flex-1">{item.name}</span>
      {item.badge && (
        <span
          className={cn(
            "px-2 py-0.5 text-xs font-medium rounded-full",
            item.badgeColor || "bg-blue-100 text-gray-700"
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
        imageUrls: [],
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
    <div
      className="w-[280px] sm:w-72 h-screen flex flex-col 
                bg-gradient-to-b from-[#F1F5FF] via-[#F8FAFF] to-[#E8EFFF] 
                border-r border-blue-100/60
                shadow-[4px_0_24px_-2px_rgba(0,0,0,0.05)]
                relative z-10"
    >
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>

      {/* Header Section */}
      <div
        className="shrink-0 border-b border-blue-100/60 
                      bg-white/80 backdrop-blur-sm 
                      shadow-[0_1px_3px_-1px_rgba(0,0,0,0.02)]"
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b border-blue-100/60 flex items-center justify-between">
          <Link href="/" className="block transition-opacity hover:opacity-80">
            <Image
              src="/logo.svg"
              height={28}
              width={120}
              alt="boostfury.com"
              className="w-auto"
            />
          </Link>
        </div>

        {/* Workspace Selector */}
        <div className="p-3">
          <Button
            variant="outline"
            onClick={() => setIsManageModalOpen(true)}
            className="w-full h-9 justify-between text-gray-700 
                     bg-gradient-to-b from-white to-blue-50/80
                     border border-blue-200/60
                     shadow-[0_1px_2px_rgba(59,130,246,0.05)]
                     hover:bg-gradient-to-b hover:from-blue-50 hover:to-blue-100/50
                     hover:border-blue-300/60
                     transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">
                {currentWorkspace?.name || "Select workspace..."}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        {/* Create Button */}
        <div className="px-3 pb-3">
          <GradientButton
            variant="primary"
            onClick={handleCreateNew}
            fullWidth
            leftIcon={<Plus className="h-4 w-4" />}
            kbd="Ctrl + N"
            className="shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20"
          >
            Create New
          </GradientButton>
        </div>
      </div>

      {/* Navigation Section */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 
                      bg-gradient-to-br from-white/50 via-blue-50/30 to-white/50
                      scrollbar-thin scrollbar-track-blue-50 scrollbar-thumb-blue-200/50"
      >
        <Navigation />
      </div>

      {/* Footer Section */}
      <div
        className="shrink-0 border-t border-blue-100/60 
                      bg-white/80 backdrop-blur-sm
                      shadow-[0_-1px_3px_-1px_rgba(0,0,0,0.02)]"
      >
        {/* AI Usage Section */}
        {subscription.isActive && (
          <div className="px-4 py-3 border-b border-blue-100/60">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-50 to-blue-100/80 
                              border border-blue-200/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]
                              flex items-center justify-center"
                >
                  <Wand2 className="h-3.5 w-3.5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  AI Credits
                </span>
              </div>
              <span className="text-xs font-medium text-gray-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {formatTokens(wordUsage.used)} / {formatTokens(wordUsage.limit)}
              </span>
            </div>
            <div
              className="w-full h-2 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-full overflow-hidden 
                           border border-blue-200/20 shadow-[inset_0_1px_2px_rgba(59,130,246,0.1)]"
            >
              <div
                className={cn(
                  "h-full transition-all duration-300 ease-in-out bg-gradient-to-r",
                  wordUsage.percentage > 80
                    ? "from-red-500 to-red-600"
                    : "from-blue-400 to-blue-500"
                )}
                style={{ width: `${wordUsage.percentage}%` }}
              />
            </div>
          </div>
        )}
        {/* Upgrade Button - Restored and improved */}
        {!subscription.isActive && (
          <div className="px-4 py-3 border-b border-blue-100/60">
            <Button
              variant="default"
              onClick={() => router.push("/pricing")}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                       h-9 font-medium
                       shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] 
                       hover:shadow-[0_6px_16px_-2px_rgba(59,130,246,0.4)]
                       transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Upgrade Now</span>
                <motion.span
                  className="ml-1"
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.span>
              </div>
            </Button>
          </div>
        )}
        {/* Subscription Info */}
        {subscription.isActive && (
          <div className="border-b border-blue-100/60 hover:bg-blue-50/30 transition-colors">
            <SubscriptionInfo />
          </div>
        )}
        {/* Update User Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="px-4 py-3 flex items-center justify-between 
                group hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-blue-100/60 
                transition-all duration-200 cursor-pointer
                rounded-b-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full 
                    bg-gradient-to-br from-blue-50 to-blue-100
                    border border-blue-200/40 
                    shadow-[0_2px_4px_-1px_rgba(0,0,0,0.03)]
                    flex items-center justify-center text-gray-700 
                    group-hover:shadow-[0_3px_6px_-2px_rgba(0,0,0,0.05)]
                    transition-all duration-200"
                >
                  {userinfo?.first_name?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    {userinfo?.first_name || "User"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {userinfo?.email || "user@email.com"}
                  </span>
                </div>
              </div>
              <ChevronDown
                className="h-4 w-4 text-gray-400 group-hover:text-gray-600 
                  transition-colors duration-200"
              />
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
                className="w-9 h-9 rounded-full 
                  bg-gradient-to-br from-blue-50 to-blue-100
                  border border-blue-200/40 
                  flex items-center justify-center text-gray-700"
              >
                {userinfo?.first_name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
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
              onClick={() => router.push("/settings/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
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
