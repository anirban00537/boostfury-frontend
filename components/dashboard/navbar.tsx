import { Bell, MessageSquare, Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, isLoading, signOut } = useUser();
  const router = useRouter();

  if (isLoading) {
    return <div className="h-16 bg-white/50 animate-pulse" />;
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <nav className="fixed top-0 right-0 left-64 h-16 bg-transparent px-6 flex items-center justify-between z-50">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[450px] overflow-auto">
              {[1, 2, 3].map((_, i) => (
                <DropdownMenuItem
                  key={i}
                  className="flex flex-col items-start py-2"
                >
                  <p className="text-sm font-medium">New connection request</p>
                  <span className="text-xs text-gray-500">2 minutes ago</span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Messages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[450px] overflow-auto">
              {[1, 2, 3].map((_, i) => (
                <DropdownMenuItem
                  key={i}
                  className="flex flex-col items-start py-2"
                >
                  <p className="text-sm font-medium">John Doe</p>
                  <span className="text-xs text-gray-500">
                    Hey, are you available for...
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name || user.email}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.full_name?.[0].toUpperCase() ||
                      user.email?.[0].toUpperCase()}
                  </span>
                </div>
              )}
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center gap-3 p-4">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name || user.email}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {user.full_name?.[0].toUpperCase() ||
                      user.email?.[0].toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-medium">
                  {user.full_name || "Set your name"}
                </span>
                <span className="text-sm text-gray-500">{user.email}</span>
                {user.job_title && (
                  <span className="text-sm text-gray-600 mt-0.5">
                    {user.job_title} {user.company ? `at ${user.company}` : ""}
                  </span>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="focus:bg-gray-50"
              onClick={() => router.push("/dashboard/profile")}
            >
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-gray-50">
              LinkedIn Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-gray-50">
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={signOut}
              className="text-red-600 focus:text-red-700 focus:bg-red-50"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
