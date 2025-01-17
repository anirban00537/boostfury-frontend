import { createClient } from "@/utils/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  profile_url?: string;
  avatar_url?: string;
  job_title?: string;
  company?: string;
}

export type UpdateProfileData = Omit<UserProfile, "id" | "email">;

export const userService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    return {
      id: authUser.id,
      email: authUser.email!,
      ...profile,
    };
  },

  async updateProfile(data: UpdateProfileData): Promise<UserProfile | null> {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) return null;

    const { data: profile, error } = await supabase
      .from("profiles")
      .upsert({
        id: authUser.id,
        username: data.username,
        profile_url: data.profile_url,
        avatar_url: data.avatar_url,
        job_title: data.job_title,
        company: data.company,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: authUser.id,
      email: authUser.email!,
      ...profile,
    };
  },

  async signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  },
};
