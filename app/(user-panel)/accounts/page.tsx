"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Plus, Trash2, Layout, Users } from "lucide-react";
import Image from "next/image";
import useLinkedIn from "@/hooks/useLinkedIn";
import { GradientButton } from "@/components/ui/gradient-button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const AccountsPage = () => {
  const {
    profiles,
    isLoadingProfiles,
    isConnecting,
    connectLinkedIn,
    disconnectProfile,
  } = useLinkedIn();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative border-b border-neutral-200/60 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <Users className="w-5 h-5 text-neutral-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  Social Accounts
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Connect and manage your LinkedIn accounts to post content
                </p>
              </div>
            </div>

            <GradientButton
              variant="primary"
              onClick={connectLinkedIn}
              disabled={isConnecting}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                {isConnecting ? (
                  <>
                    <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="size-4" />
                    <span>Connect LinkedIn Account</span>
                  </>
                )}
              </div>
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {isLoadingProfiles ? (
          <div className="flex justify-center items-center h-[600px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : !profiles || profiles.length === 0 ? (
          <EmptyState
            icon={Linkedin}
            title="No LinkedIn accounts connected"
            description="Connect your LinkedIn account to start posting content"
            primaryAction={{
              label: isConnecting ? "Connecting..." : "Connect LinkedIn Account",
              href: "#",
              icon: Plus,
              onClick: connectLinkedIn,
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((account) => (
              <div
                key={account.id}
                className="group relative"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative flex items-center justify-between p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200/60">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-full"></div>
                      <Image
                        src={account.avatarUrl || "/default-avatar.png"}
                        alt={account.name}
                        width={40}
                        height={40}
                        className="relative rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900">
                        {account.name}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                        <span className="text-xs text-neutral-500">LinkedIn</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => disconnectProfile(account.id)}
                    className="relative size-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage; 