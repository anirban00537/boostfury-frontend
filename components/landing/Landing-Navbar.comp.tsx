import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const LandingNavbar = () => {
  const navigation = [
    { title: "Features", path: "#features" },
    { title: "How It Works", path: "#how-it-works" },
    { title: "Plans", path: "#plans" },
    { title: "Testimonials", path: "#testimonials" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-xl border-b border-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            <Image
              src="/logo.svg"
              height={200}
              width={200}
              alt="boostfury.com"
              className="relative"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow items-center justify-center">
            <div className="flex items-center space-x-1">
              {navigation.map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  className="relative px-4 py-2 text-sm font-medium text-textColor/80 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5 group"
                >
                  {item.title}
                  <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium">
                Sign in
              </Button>
            </Link>
            <Link href="/carousel-editor">
              <Button className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />
                <span className="relative">Get Started Free</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="relative inline-flex items-center justify-center p-2 rounded-xl text-textColor hover:text-primary hover:bg-primary/5 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="relative md:hidden">
          <div className="px-4 pt-3 pb-6 space-y-2 bg-background/50 backdrop-blur-xl border-b border-white/10">
            {navigation.map((item, idx) => (
              <a
                key={idx}
                href={item.path}
                className="block px-4 py-3 text-base font-medium text-textColor/80 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
            <div className="grid gap-2 pt-4">
              <Link href="/login">
                <Button variant="ghost" className="w-full justify-center font-medium">
                  Sign in
                </Button>
              </Link>
              <Link href="/carousel-editor">
                <Button className="w-full justify-center relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />
                  <span className="relative">Get Started Free</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
