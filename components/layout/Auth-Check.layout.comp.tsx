"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import FullScreenLoading from "../utils-components/loading/Fullscreen.loading.comp";
import useBranding from "@/hooks/useBranding";
import { setBackground, setNewCarousel } from "@/state/slice/carousel.slice";
import { useDispatch, useSelector } from "react-redux";
import { darkColorPresets, lightColorPresets } from "@/lib/color-presets";
import useLinkedIn from "@/hooks/useLinkedIn";
import { RootState } from "@/state/store";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/forgot-password"];

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();
  const loggedin = useSelector((state: RootState) => state.user.loggedin);
  const { isActive } = useSelector(
    (state: RootState) => state.user.subscription
  );
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useBranding();
  useLinkedIn();

  const chooseColorFromColorPalette = useCallback(() => {
    const lightPreset =
      lightColorPresets[Math.floor(Math.random() * lightColorPresets.length)];
    const darkPreset =
      darkColorPresets[Math.floor(Math.random() * darkColorPresets.length)];
    const randomPreset = Math.random() < 0.5 ? lightPreset : darkPreset;
    dispatch(setBackground(randomPreset));
  }, [dispatch]);

  useEffect(() => {
    if (pathname) {
      dispatch(setNewCarousel());
      chooseColorFromColorPalette();
    }
  }, [pathname, dispatch, chooseColorFromColorPalette]);

  // Enhanced Auth check effect
  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(pathname || "");
    const isPricingPage = pathname === "/pricing";

    if (!isLoading) {
      if (!loggedin && !isPublicRoute) {
        // Not logged in and trying to access protected route
        router.push(`/login?from=${encodeURIComponent(pathname || "")}`);
      } else if (loggedin && pathname === "/login") {
        // Logged in and trying to access login page
        router.push("/ai-writer");
      } else if (loggedin && !isActive && !isPricingPage) {
        // Show subscription required toast
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
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
                    router.push("/pricing");
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
        
        // Redirect to pricing page
        router.push("/pricing");
      }
    }
  }, [loggedin, isActive, isLoading, pathname, router]);

  // Keyboard shortcut effect
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.altKey &&
        event.key.toLowerCase() === "n"
      ) {
        event.preventDefault();
        router.push("/compose");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router]);

  // Only show loading on initial auth check
  if (isLoading) {
    return <FullScreenLoading />;
  }

  // Enhanced route accessibility check
  const isPublicRoute = publicRoutes.includes(pathname || "");
  const isPricingPage = pathname === "/pricing";
  if ((!loggedin && !isPublicRoute) || (loggedin && !isActive && !isPricingPage)) {
    return null; // Return null instead of loading screen to prevent flash
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
