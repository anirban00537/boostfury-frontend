"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={120} height={40} />
            </Link>
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} BoostFury. All rights reserved.
            </p>
          </div>         

        </div>
      </div>
    </footer>
  );
};
