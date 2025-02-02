"use client";
import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import DefaultLayout from "@/components/layout/Default.layout.comp";
import AuthCheckLayout from "@/components/layout/Auth-Check.layout.comp";

// Separate client component that uses client hooks
function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DefaultLayout>
        <AuthCheckLayout>{children}</AuthCheckLayout>
      </DefaultLayout>
      <Toaster />
    </Provider>
  );
}

// Main component that wraps everything in Suspense
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Suspense>
  );
}
