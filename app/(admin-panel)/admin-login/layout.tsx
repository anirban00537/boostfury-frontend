"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 w-full">
        <main className="h-screen overflow-y-auto">
          <div className="min-h-screen">{children}</div>
        </main>
      </div>
    </div>
  );
}
