import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadIcon, User } from "lucide-react";
import useBranding from "@/hooks/useBranding";

const BrandingSection: React.FC = () => {
  const {
    name,
    handle,
    headshot,
    loading,
    handleNameChange,
    handleHandleChange,
    handleImageUpload,
    handleSubmit,
    previewImage,
    isAuthenticated,
  } = useBranding();

  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleImageUpload(e);
    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Brand Identity
        </h2>
      </div>

      <form className="flex flex-col h-full" onSubmit={handleSubmit}>
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative group w-32 h-32">
                <Image
                  src={previewImage || headshot || "/creator.jpg"}
                  alt="Headshot"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full ring-4 ring-gray-100 group-hover:ring-blue-100 transition-all duration-200"
                />
                <label
                  htmlFor="headshot"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transform translate-x-1/4 translate-y-1/4 transition-all duration-200"
                >
                  <UploadIcon size={16} />
                </label>
                <input
                  id="headshot"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={onImageUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-10 h-9 text-sm rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="handle"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  @
                </span>
                <Input
                  id="handle"
                  placeholder="Choose a username"
                  className="pl-8 h-9 text-sm rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  value={handle}
                  onChange={handleHandleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-gray-200">
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            className="w-full h-10 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !isAuthenticated}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating Brand...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BrandingSection;
