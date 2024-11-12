import Sidebar from "@/components/utils-components/user-panel-sidebar/Sidebar.comp";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>
      <div className="flex-1 ml-72">
        <main className="">
          <div className="px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
