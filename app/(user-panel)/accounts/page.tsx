"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Plus, Trash2, Layout } from "lucide-react";
import Image from "next/image";
import useLinkedIn from "@/hooks/useLinkedIn";

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
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Social Accounts
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Connect and manage your LinkedIn accounts to post content
              </p>
            </div>
            <Button
              onClick={connectLinkedIn}
              disabled={isConnecting}
              className="h-10 px-4 rounded-xl bg-primary hover:bg-[#004182] text-white shadow-sm"
            >
              {isConnecting ? (
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect LinkedIn Account
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-8 py-6">
        {isLoadingProfiles ? (
          <div className="flex justify-center items-center h-[600px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : !profiles || profiles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 min-h-[600px] flex flex-col items-center justify-center">
            <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Linkedin className="w-12 h-12 text-[#0A66C2]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No LinkedIn accounts connected
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Connect your LinkedIn account to start posting content
            </p>
            <Button
              onClick={connectLinkedIn}
              disabled={isConnecting}
              className="mt-4 h-10 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white shadow-sm"
            >
              {isConnecting ? (
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect LinkedIn Account
                </div>
              )}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 rounded-xl border bg-white border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Image
                    src={account.avatarUrl || "/default-avatar.png"}
                    alt={account.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {account.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span className="text-xs text-gray-500">LinkedIn</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => disconnectProfile(account.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage; 