"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        cacheTime: 0,
        staleTime: 0,
        retry: false,
      },
    },
  });

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <Provider store={store}>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" reverseOrder={false} />

            {children}
          </QueryClientProvider>
        </TooltipProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default DefaultLayout;
