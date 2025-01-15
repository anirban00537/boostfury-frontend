import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="ml-64">
        {/* Navbar */}
        <Navbar userEmail={user.email} />
        {/* Page Content */}
        <main className="pt-16">
          {" "}
          {/* Add padding-top equal to navbar height */}
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
