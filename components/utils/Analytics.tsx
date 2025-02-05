"use client";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = "G-NS2X9MH57M";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    ReactGA.send({
      hitType: "pageview",
      page: url,
    });
  }, [pathname, searchParams]);

  return null;
}
