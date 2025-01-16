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
  label: string;
  items: NavigationItem[];
}

const navigationItems: NavigationGroup[] = [
  {
    label: "Content Creation",
    items: [
      { icon: Sparkles, label: "AI Writer", href: "/dashboard/ai-writer" },
      { icon: ListTodo, label: "Schedule", href: "/dashboard/schedule" },
      { icon: FileText, label: "Saved Posts", href: "/dashboard/saved-posts" },
    ],
  },
  {
    label: "Settings",
    items: [
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
          "fixed left-0 top-0 bottom-0 bg-gray-50 border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "w-64" : "w-20",
          !isOpen && window.innerWidth < 1024 ? "-translate-x-full" : ""
        )}
      >
        {/* Logo Section */}
        <div className="h-16 px-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className={cn("transition-all duration-300", !isOpen && "hidden")}
          >
            <img src="/logo.svg" alt="LinkedGenius" className="h-10" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-gray-100"
            onClick={onToggle}
          >
            <CollapseIcon
              className={cn(
                "text-gray-900 transition-transform duration-200 w-6 h-6",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-2 px-3 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
          {navigationItems.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h3
                className={cn(
                  "text-xs font-semibold text-gray-500 uppercase tracking-wider px-3",
                  !isOpen && "hidden"
                )}
              >
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-md transition-colors ${
                            isActive
                              ? "bg-gradient-to-r from-blue-100 to-indigo-100"
                              : "bg-gray-100 group-hover:bg-gray-200"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>
                        {isOpen && <span>{item.label}</span>}
                      </div>
                      {isOpen && (
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive
                              ? "rotate-90 text-blue-600"
                              : "text-gray-400"
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Features Card */}
        <div
          className={cn("p-4 border-t border-gray-200", !isOpen && "hidden")}
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 p-4 text-white">
            <div className="relative z-10">
              <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
              <p className="text-xs text-blue-100 mb-3">
                Unlock unlimited AI post generation
              </p>
              <button className="w-full bg-white text-blue-600 text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors">
                Upgrade Now
              </button>
            </div>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
              <div className="absolute inset-0 rotate-45 opacity-10">
                <div className="w-full h-full bg-white rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
