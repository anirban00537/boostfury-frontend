'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LandingNavbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navigation = [
    { title: "Features", href: "features" },
    { title: "How It Works", href: "how-it-works" },
    { title: "Plans", href: "plans" },
    { title: "FAQ", href: "faq" },
  ];

  return (
    <div className="fixed w-full z-50 flex justify-center top-4">
      <div className="relative">
        {/* Outer glows */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-slate-200/40 to-transparent rounded-full"></div>
        <div className="absolute -inset-[1px] bg-gradient-to-b from-transparent via-slate-200/40 to-transparent rounded-full"></div>
        <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-slate-200/20 to-transparent rounded-full"></div>

        <nav className="relative bg-white/70 backdrop-blur-xl px-8 py-3 rounded-full border border-slate-200/50">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-slate-200/50 to-transparent rounded-lg"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-slate-200/30 to-transparent rounded-lg"></div>
                <div className="relative w-7 h-7 bg-slate-50/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-200/50">
                  <Image
                    src="/single-logo.svg"
                    height={20}
                    width={20}
                    alt="Logo"
                    className="relative"
                  />
                </div>
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              {navigation.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium cursor-pointer"
                >
                  {item.title}
                </button>
              ))}
              
              {/* Login Button */}
              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <Link 
                  href="/login"
                  className="relative px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium 
                           hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow
                           border border-primary/10"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu would go here */}
    </div>
  );
};

export default LandingNavbar;
