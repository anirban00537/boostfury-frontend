import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  CreditCard,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Star,
  Crown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserMenu: React.FC = () => {
  const { userinfo } = useSelector((state: RootState) => state.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex items-center gap-2 p-1 rounded-lg 
                        hover:bg-primary/5 transition-all duration-200"
        >
          <div
            className="relative h-8 w-8 rounded-full overflow-hidden 
                       ring-2 ring-white group-hover:ring-primary/20 
                       transition-all duration-200"
          >
            <Image
              src={userinfo?.photo || "/creator.jpg"}
              alt={
                userinfo?.first_name + " " + userinfo?.last_name ||
                "User avatar"
              }
              layout="fill"
              objectFit="cover"
              className="transform group-hover:scale-105 transition-transform duration-200"
            />
            <div
              className="absolute bottom-0 right-0 w-2.5 h-2.5 
                         bg-green-500 rounded-full border-2 border-white"
            />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span
              className="text-sm font-medium text-gray-700 
                         group-hover:text-primary transition-colors"
            >
              {userinfo?.first_name + " " + userinfo?.last_name || "Guest User"}
            </span>
            <span className="text-xs text-gray-500">
              {userinfo?.email || "guest@example.com"}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-2" align="end">
        {/* User Info Section */}
        <div
          className="px-2 py-3 mb-2 bg-gradient-to-r from-primary/5 to-primary/10 
                     rounded-md border border-primary/5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="relative h-10 w-10 rounded-full overflow-hidden 
                         ring-2 ring-white"
            >
              <Image
                src={userinfo?.photo || "/creator.jpg"}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {userinfo?.first_name + " " + userinfo?.last_name}
              </span>
              <span className="text-xs text-gray-500">{userinfo?.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Crown className="w-3 h-3 mr-1" />
              Pro Member
            </Badge>
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-700 hover:bg-amber-200"
            >
              5 Workspaces
            </Badge>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <DropdownMenuItem
            className="flex items-center gap-2 px-2 py-2 
                                   cursor-pointer hover:bg-primary/5 
                                   hover:text-primary transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Billing management</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 px-2 py-2 
                                   cursor-pointer hover:bg-primary/5 
                                   hover:text-primary transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
            <Badge className="ml-auto bg-red-100 text-red-700 hover:bg-red-200">
              3
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 px-2 py-2 
                                   cursor-pointer hover:bg-primary/5 
                                   hover:text-primary transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>Billing & Plans</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 px-2 py-2 
                                   cursor-pointer hover:bg-primary/5 
                                   hover:text-primary transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Team Management</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center gap-2 px-2 py-2 
                                   cursor-pointer bg-primary/5 text-primary 
                                   hover:bg-primary/10"
          >
            <Star className="w-4 h-4" />
            <span>Upgrade to Pro</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 px-2 py-2 
                                   cursor-pointer hover:bg-primary/5 
                                   hover:text-primary transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center gap-2 px-2 py-2 
                                   cursor-pointer text-red-600 hover:bg-red-50 
                                   hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
