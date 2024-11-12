"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import FullScreenLoading from "../utils-components/loading/Fullscreen.loading.comp";
import useBranding from "@/hooks/useBranding";
import { setBackground, setNewCarousel } from "@/state/slice/carousel.slice";
import { useDispatch } from "react-redux";
import { darkColorPresets, lightColorPresets } from "@/lib/color-presets";
import useLinkedIn from "@/hooks/useLinkedIn";

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  useBranding();
  const dispatch = useDispatch();
  useLinkedIn();
  const chooseColorFromColorPalette = useCallback(() => {
    const lightPreset =
      lightColorPresets[Math.floor(Math.random() * lightColorPresets.length)];
    const darkPreset =
      darkColorPresets[Math.floor(Math.random() * darkColorPresets.length)];
    const randomPreset = Math.random() < 0.5 ? lightPreset : darkPreset;
    dispatch(setBackground(randomPreset));
  }, [dispatch]);
  const router = useRouter();

  useEffect(() => {
    if (pathname) {
      dispatch(setNewCarousel());
      chooseColorFromColorPalette();
    }
  }, [pathname, dispatch, chooseColorFromColorPalette]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for Ctrl+Alt+N (Windows/Linux) or Cmd+Alt+N (Mac)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.altKey &&
        event.key.toLowerCase() === "n"
      ) {
        event.preventDefault(); // Prevent default browser behavior
        router.push("/compose");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [router]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
