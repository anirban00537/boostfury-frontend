import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  userService,
  UserProfile,
  UpdateProfileData,
} from "@/services/user.service";
import { useRouter } from "next/navigation";

export function useUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<UserProfile | null>({
    queryKey: ["user-profile"],
    queryFn: () => userService.getCurrentUser(),
  });

  const updateProfile = async (data: UpdateProfileData) => {
    const updatedUser = await userService.updateProfile(data);
    if (updatedUser) {
      queryClient.setQueryData(["user-profile"], updatedUser);
    }
    return updatedUser;
  };

  const signOut = async () => {
    await userService.signOut();
    router.push("/sign-in");
  };

  return {
    user,
    isLoading,
    signOut,
    updateProfile,
  };
}
