"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FullScreenLoading from "../utils-components/loading/Fullscreen.loading.comp";
import useBranding from "@/hooks/useBranding";
import { setBackground, setNewCarousel } from "@/state/slice/carousel.slice";
import { useDispatch } from "react-redux";
import { darkColorPresets, lightColorPresets } from "@/lib/color-presets";
import useLinkedIn from "@/hooks/useLinkedIn";

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/forgot-password'];

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isValidating, setIsValidating] = useState(true);
  
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
    const validateAuth = async () => {
      const isPublicRoute = publicRoutes.includes(pathname || '');
      
      if (!isLoading) {
        if (!isAuthenticated && !isPublicRoute) {
          await router.push(`/login?from=${encodeURIComponent(pathname || '')}`);
        } else if (isAuthenticated && pathname === '/login') {
          await router.push('/ai-writer');
        }
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [isAuthenticated, isLoading, pathname, router]);

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

  // Show loading state while checking auth or validating route
  if (isLoading || isValidating) {
    return <FullScreenLoading />;
  }

  // Only render children if we're done validating and the route is accessible
  const isPublicRoute = publicRoutes.includes(pathname || '');
  if (!isAuthenticated && !isPublicRoute) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
