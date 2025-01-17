import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log("LinkedIn User:", user);

        if (user) {
          // Save user profile data
          const { error: profileError } = await supabase.from("profile").upsert(
            {
              id: user.id,
              full_name: user.user_metadata.name,
              avatar_url: user.user_metadata.picture,
              email: user.email,
              username: `${user.user_metadata.name.toLowerCase()}-${user.user_metadata.id}`,
              updated_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );

          if (profileError) {
            console.error("Error saving profile:", profileError);
          }
        }

        return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
      }
      console.error("Auth error:", error);
    }

    return NextResponse.redirect(new URL("/sign-in", requestUrl.origin));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      new URL("/sign-in", new URL(request.url).origin)
    );
  }
}
