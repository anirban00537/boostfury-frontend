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

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/forgot-password'];

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();
  const loggedin = useSelector((state: RootState) => state.user.loggedin);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  
  useBranding();
  useLinkedIn();

  const chooseColorFromColorPalette = useCallback(() => {
    const lightPreset = lightColorPresets[Math.floor(Math.random() * lightColorPresets.length)];
    const darkPreset = darkColorPresets[Math.floor(Math.random() * darkColorPresets.length)];
    const randomPreset = Math.random() < 0.5 ? lightPreset : darkPreset;
    dispatch(setBackground(randomPreset));
  }, [dispatch]);

  useEffect(() => {
    if (pathname) {
      dispatch(setNewCarousel());
      chooseColorFromColorPalette();
    }
  }, [pathname, dispatch, chooseColorFromColorPalette]);

  // Auth check effect
  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(pathname || '');
    
    if (!isLoading) {
      if (!loggedin && !isPublicRoute) {
        router.push(`/login?from=${encodeURIComponent(pathname || '')}`);
      } else if (loggedin && pathname === '/login') {
        router.push('/ai-writer');
      }
    }
  }, [loggedin, isLoading, pathname, router]);

  // Keyboard shortcut effect
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.altKey && event.key.toLowerCase() === "n") {
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

  // Check if current route is accessible
  const isPublicRoute = publicRoutes.includes(pathname || '');
  if (!loggedin && !isPublicRoute) {
    return null; // Return null instead of loading screen to prevent flash
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
