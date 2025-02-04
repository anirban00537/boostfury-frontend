"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/80 backdrop-blur-lg border-b border-neutral-200/20 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 relative z-50"
          onClick={() => setIsOpen(false)}
        >
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={190} 
            height={70} 
            priority 
            className="w-auto h-7 sm:h-8 md:h-10 transition-all duration-300" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              scrolled
                ? "text-neutral-600"
                : "text-neutral-700"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              scrolled
                ? "text-neutral-600"
                : "text-neutral-700"
            }`}
          >
          <ShimmerButton
            className="h-11 px-6 rounded-xl text-sm font-medium transform hover:scale-[1.02] transition-all duration-300"
            background={
              scrolled
                ? "linear-gradient(110deg, #2563eb, #4f46e5)"
                : "linear-gradient(110deg, #1d4ed8, #4338ca)"
            }
          >
            <Link href="/register">Get Started</Link>
          </ShimmerButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-neutral-900" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-neutral-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 top-[80px] bg-white/95 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 px-6 -mt-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/login"
                    className="text-lg font-medium text-neutral-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ShimmerButton
                    className="h-14 px-12 rounded-xl text-base font-medium"
                    background="linear-gradient(110deg, #2563eb, #4f46e5)"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/register">Get Started</Link>
                  </ShimmerButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
