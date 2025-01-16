"use client";

import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 1024);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Wrapper */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Mobile Toggle Button - Shown only on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-4 z-50 lg:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Navbar */}
        <Navbar />
        {/* Page Content */}
        <main className="pt-16 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
