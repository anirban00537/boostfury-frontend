import React from "react";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserDropdownProps {
  user: any;
  handleLogout: () => Promise<void>;
}

const getInitials = (email: string): string =>
  email ? email.charAt(0).toUpperCase() : "U";

const getColorFromEmail = (email: string): string => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
};

const UserDropdown: React.FC<UserDropdownProps> = ({ user, handleLogout }) => {
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [user]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0 overflow-hidden">
          {user.image && !imageError ? (
            <Image
              src={user.image}
              alt="User avatar"
              className="h-8 w-8 rounded-full"
              onError={handleImageError}
              width={32}
              height={32}
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: getColorFromEmail(user.email) }}
            >
              {getInitials(user.email)}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
