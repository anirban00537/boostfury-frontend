"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-neutral-200/20 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={120} height={40} />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors ${
              scrolled
                ? "text-neutral-600 hover:text-neutral-900"
                : "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            Sign In
          </Link>
          <ShimmerButton
            className="h-10 px-4 rounded-xl text-sm font-medium"
            background={
              scrolled
                ? "linear-gradient(110deg, #2563eb, #4f46e5)"
                : "linear-gradient(110deg, #1d4ed8, #4338ca)"
            }
          >
            <Link href="/register">Get Started</Link>
          </ShimmerButton>
        </div>
      </nav>
    </header>
  );
};
