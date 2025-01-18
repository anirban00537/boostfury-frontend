"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ListTodo,
  FileText,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  PlusCircle,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CollapseIcon } from "@/components/icons/collapse-icon";
import { useUser } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface NavigationGroup {
  items: NavigationItem[];
}

const navigationItems: NavigationGroup[] = [
  {
    items: [
      { icon: FileText, label: "Drafts", href: "/dashboard/drafts" },
      { icon: ListTodo, label: "Schedule", href: "/dashboard/schedule" },
      { icon: FileText, label: "Saved Posts", href: "/dashboard/saved-posts" },
      {
        icon: MessageSquare,
        label: "Topics & Instructions",
        href: "/dashboard/tone-voice",
      },
    ],
  },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, signOut } = useUser();

  // Close sidebar on small screens when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  if (isLoading) {
    return <div className="w-20 lg:w-72 h-screen bg-white/80 animate-pulse" />;
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40" />
      )}

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-4 z-50 lg:hidden"
        onClick={onToggle}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed left-0 top-0 bottom-0 bg-zinc-50 border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "w-64" : "w-16",
          !isOpen && window.innerWidth < 1024 ? "-translate-x-full" : ""
        )}
      >
        {/* Logo Section */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-50">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              !isOpen && "hidden"
            )}
          >
            <img src="/logo.svg" alt="boostfury" className="h-9" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-gray-100/80 transition-colors"
            onClick={onToggle}
          >
            <ChevronRight
              className={cn(
                "text-gray-500 transition-transform duration-200 w-4 h-4",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>
        {/* Create New Button */}
        <div className="p-4">
          <Link href="/dashboard/ai-writer">
            <Button
              className={cn(
                "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200",
                !isOpen && "p-0 w-12 h-12"
              )}
            >
              <PlusCircle className={cn("h-5 w-5", isOpen && "mr-2")} />
              {isOpen && "Create New"}
            </Button>
          </Link>
        </div>
        {/* Main Navigation */}
        <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto scrollbar-none">
          {navigationItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="space-y-0.5">
                {group.items.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-blue-500/10 border-l-4 border-blue-600/50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50/80"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-r from-blue-100/90 to-indigo-100/90 text-blue-600 shadow-sm"
                              : "bg-gray-100/50 text-gray-500 group-hover:bg-gray-100 group-hover:text-gray-600"
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>
                        {isOpen && (
                          <span
                            className={cn(
                              "transition-all duration-200",
                              isActive ? "font-semibold" : "font-medium"
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Features Card */}
        <div className={cn("p-3", !isOpen && "hidden")}>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop
                      offset="0%"
                      style={{ stopColor: "white", stopOpacity: 0.5 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "white", stopOpacity: 0 }}
                    />
                  </linearGradient>
                </defs>
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad)" />
                <path d="M100,0 L0,100 Z" stroke="white" strokeWidth="1" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-blue-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.745 1.475-2.65-1.097-.406-2.378L12 1l-1.199 1.399-.406 2.378-2.65 1.097L6 4.001 4 6l1.475 1.745-1.097 2.65L2 11.594 2 12.406l2.378.406 1.097 2.65L4 17l2 2 1.745-1.475 2.65 1.097.406 2.378L12 23l1.199-1.399.406-2.378 2.65-1.097L18 19.999l2-2-1.475-1.745 1.097-2.65L22 12.406v-.812l-2.378-.406z" />
                </svg>
                <span className="font-semibold text-white text-sm">
                  Upgrade to Pro
                </span>
              </div>
              <p className="text-sm text-blue-100 mb-3 leading-snug">
                Get unlimited AI posts and premium features
              </p>
              <button className="w-full bg-white/10 text-white backdrop-blur-sm text-sm font-medium py-2 px-3 rounded-lg hover:bg-white/20 transition-colors border border-white/25 shadow-sm">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>

        {/* User Actions Section */}
        <div className="mt-auto border-t border-gray-100">
          <div
            className={cn(
              "p-4 flex items-center",
              isOpen ? "gap-2" : "flex-col gap-4"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 p-1.5 h-auto justify-start hover:bg-gray-100 rounded-lg transition-colors",
                    isOpen ? "w-full" : "w-12"
                  )}
                >
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.full_name || user.email}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user.full_name?.[0].toUpperCase() ||
                          user.email?.[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  {isOpen && (
                    <>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">
                          {user.full_name || "Set your name"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isOpen ? "end" : "start"}
                className="w-80"
              >
                <div className="flex items-center gap-3 p-4">
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.full_name || user.email}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <span className="text-lg font-medium text-white">
                        {user.full_name?.[0].toUpperCase() ||
                          user.email?.[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {user.full_name || "Set your name"}
                    </span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                    {user.job_title && (
                      <span className="text-sm text-gray-600 mt-0.5">
                        {user.job_title}{" "}
                        {user.company ? `at ${user.company}` : ""}
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="focus:bg-gray-50"
                  onClick={() => router.push("/dashboard/profile")}
                >
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-50">
                  LinkedIn Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-50">
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="text-red-600 focus:text-red-700 focus:bg-red-50"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
}
