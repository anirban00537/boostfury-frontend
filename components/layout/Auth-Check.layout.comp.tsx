"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FullScreenLoading from "../utils-components/loading/Fullscreen.loading.comp";
import { useDispatch, useSelector } from "react-redux";
import { darkColorPresets, lightColorPresets } from "@/lib/color-presets";
import { default as useLinkedIn } from "@/hooks/useLinkedIn";
import { RootState } from "@/state/store";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
import { useContentPosting } from "@/hooks/useContent";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { useQueryClient } from "react-query";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/admin-login",
];

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();
  const loggedin = useSelector((state: RootState) => state.user.loggedin);
  const { isActive } = useSelector(
    (state: RootState) => state.user.subscription
  );
  const isAdmin = useSelector(
    (state: RootState) => state.user.userinfo?.is_admin
  );
  const { linkedinProfile } = useSelector((state: RootState) => state.user);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const queryClient = useQueryClient();
  console.log("isAdmin", isAdmin);

  useLinkedIn();

  // Check for LinkedIn profile
  useEffect(() => {
    if (
      loggedin &&
      !isLoading &&
      linkedinProfile && // LinkedIn is connected
      (!linkedinProfile.professionalIdentity?.trim() ||
        !linkedinProfile.contentTopics?.length ||
        linkedinProfile.contentTopics.length === 0) // Check for empty values
    ) {
      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries(["aiStyle", linkedinProfile.id]);
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [loggedin, isLoading, linkedinProfile, queryClient]);

  // Enhanced Auth check effect
  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(pathname || "");
    const isPricingPage = pathname === "/billing";

    if (!isLoading && !isAdmin) {
      if (!loggedin && !isPublicRoute) {
        // Not logged in and trying to access protected route
        router.push(`/login?from=${encodeURIComponent(pathname || "")}`);
      } else if (loggedin && pathname === "/login") {
        // Logged in and trying to access login page
        router.push("/dashboard");
      } else if (loggedin && !isActive && !isPricingPage && !isAdmin) {
        // Show subscription required toast - Skip for admin users
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Subscription Required
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please purchase a package to continue using our services.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    router.push("/billing?tab=plans");
                  }}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                >
                  View Plans
                </button>
              </div>
            </div>
          ),
          {
            duration: 5000,
            position: "top-center",
          }
        );

        // Redirect to pricing page - Skip for admin users
        router.push("/billing?tab=plans");
      }
    }
  }, [loggedin, isActive, isLoading, pathname, router, isAdmin]);

  // Only show loading on initial auth check, except for home page
  if (isLoading && pathname !== "/") {
    return <FullScreenLoading />;
  }

  // Enhanced route accessibility check
  const isPublicRoute = publicRoutes.includes(pathname || "");
  const isPricingPage = pathname === "/billing";
  if (
    (!loggedin && !isPublicRoute) ||
    (loggedin && !isActive && !isPricingPage && !isAdmin)
  ) {
    return null; // Return null instead of loading screen to prevent flash
  }

  return (
    <>
      {children}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </>
  );
};

export default AuthCheckLayout;
