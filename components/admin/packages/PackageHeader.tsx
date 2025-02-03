import React from "react";
import { Package, Plus } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

interface PackageHeaderProps {
  onAddClick: () => void;
}

export function PackageHeader({ onAddClick }: PackageHeaderProps) {
  return (
    <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
              <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
              <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                <Package className="w-5 h-5 text-neutral-900" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                Package Management
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                Manage your subscription packages and pricing
              </p>
            </div>
          </div>

          <GradientButton
            variant="primary"
            onClick={onAddClick}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Package</span>
            </div>
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
