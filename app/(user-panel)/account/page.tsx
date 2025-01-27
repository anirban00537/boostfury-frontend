"use client";
import React from "react";
import { Linkedin, Users, Trash2 } from "lucide-react";
import Image from "next/image";
import useLinkedIn from "@/hooks/useLinkedIn";
import { LinkedInConnect } from "@/components/ui/linkedin-connect";
import { getUserTimezone } from "@/lib/functions";

const AccountsPage = () => {
  const {
    profile,
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
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  LinkedIn Account
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Connect your LinkedIn profile to start posting content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {isLoadingProfiles ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : !profile ? (
          <div className="max-w-2xl mx-auto">
            <LinkedInConnect
              onConnect={connectLinkedIn}
              isConnecting={isConnecting}
              variant="default"
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-neutral-200/60">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={profile.avatarUrl || "/default-avatar.png"}
                      alt={profile.name}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-white"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full ring-2 ring-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-neutral-900">
                      {profile.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span className="text-sm text-neutral-500">
                        Connected Account
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => disconnectProfile(profile.id)}
                  className="relative px-3 py-1.5 rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  <Trash2 className="size-4" />
                  <span>Disconnect</span>
                </button>
              </div>
              <div className="p-6 bg-neutral-50/50">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center">
                    <Users className="size-5 text-[#0A66C2]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">
                      Professional Network
                    </h4>
                    <p className="text-sm text-neutral-500">
                      Your posts will be shared with your LinkedIn network
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;
