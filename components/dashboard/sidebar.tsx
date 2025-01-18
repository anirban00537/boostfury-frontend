"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CollapseIcon } from "@/components/icons/collapse-icon";

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

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40" />
      )}

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-4 z-50 lg:hidden hover:bg-white/80"
        onClick={onToggle}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed left-0 top-0 bottom-0 bg-white/80 backdrop-blur-md border-r border-gray-100 flex flex-col z-40 transition-all duration-300 ease-in-out lg:translate-x-0 shadow-sm",
          isOpen ? "w-72" : "w-20",
          !isOpen && window.innerWidth < 1024 ? "-translate-x-full" : ""
        )}
      >
        {/* Logo Section */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-50/80 bg-white/50">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2 transition-all duration-300 hover:opacity-80",
              !isOpen && "hidden"
            )}
          >
            <img src="/logo.svg" alt="boostfury" className="h-9" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-100/80 transition-all duration-200 hover:scale-105"
            onClick={onToggle}
          >
            <ChevronRight
              className={cn(
                "text-gray-500 transition-transform duration-300 w-4 h-4",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Create New Button */}
        <div className="p-4">
          <Link href="/dashboard/ai-writer" className="block">
            <Button
              className={cn(
                "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5",
                !isOpen ? "p-0 w-12 h-12 rounded-xl" : "rounded-xl py-6",
                "relative overflow-hidden group"
              )}
            >
              <div className="absolute inset-0 bg-white/20 rotate-45 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <PlusCircle className={cn("h-5 w-5", isOpen && "mr-2")} />
              {isOpen && (
                <span className="font-medium tracking-wide">Create New</span>
              )}
            </Button>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto scrollbar-none">
          {navigationItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="space-y-1">
                {group.items.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-[3px] border-blue-600 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50/80"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-r from-blue-100/90 to-indigo-100/90 text-blue-600 shadow-sm"
                              : "bg-gray-100/50 text-gray-500 group-hover:bg-white group-hover:text-gray-600 group-hover:shadow-sm"
                          )}
                        >
                          <item.icon className="w-[18px] h-[18px]" />
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

        {/* Credits Card */}
        <div className={cn("p-4", !isOpen && "hidden")}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20">
              <svg
                className="w-full h-full transform rotate-12 scale-150"
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
              {/* Credits Display */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-blue-100">
                    AI CREDITS
                  </h3>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-bold text-white">1,234</span>
                    <span className="text-sm text-blue-200 font-medium">
                      remaining
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-blue-100">Monthly Usage</span>
                    <span className="text-blue-200">766/2000</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-200 to-blue-100 rounded-full transition-all duration-300"
                      style={{ width: "38%" }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-blue-100">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-blue-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Renews in 18 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
