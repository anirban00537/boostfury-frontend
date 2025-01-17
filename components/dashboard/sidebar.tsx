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
          "fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "w-64" : "w-16",
          !isOpen && window.innerWidth < 1024 ? "-translate-x-full" : ""
        )}
      >
        {/* Logo Section */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              !isOpen && "hidden"
            )}
          >
            <img src="/logo.svg" alt="LinkedGenius" className="h-8" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-gray-100/80 transition-colors"
            onClick={onToggle}
          >
            <CollapseIcon
              className={cn(
                "text-gray-400 transition-transform duration-200 w-4 h-4",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto scrollbar-none">
          {navigationItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <h3
                className={cn(
                  "text-[11px] font-semibold text-gray-400 px-3 mb-2 tracking-wider",
                  !isOpen && "hidden"
                )}
              >
                {group.label}
              </h3>
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
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-600"
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
                      {isOpen && isActive && (
                        <>
                          <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping opacity-75" />
                        </>
                      )}
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
      </aside>
    </>
  );
}
