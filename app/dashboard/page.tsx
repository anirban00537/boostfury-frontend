import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userEmail={user.email} />
      <Sidebar />

      {/* Main Content */}
      <main className="pt-16 pl-64">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back, manage your LinkedIn automation
            </p>
          </div>

          {/* Add your dashboard content here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example cards - replace with your actual dashboard content */}
            {[
              { title: "Total Connections", value: "2,543", change: "+12%" },
              { title: "Pending Requests", value: "145", change: "-5%" },
              { title: "Message Rate", value: "85%", change: "+3%" },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {card.title}
                </h3>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-semibold text-gray-900">
                    {card.value}
                  </span>
                  <span
                    className={`text-sm ${
                      card.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {card.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
