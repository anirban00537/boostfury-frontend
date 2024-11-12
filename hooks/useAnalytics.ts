import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // if (analytics) {
    //   logEvent(analytics, "page_view", {
    //     page_path: pathname,
    //   });
    // }
  }, [pathname]);
};

export default useAnalytics;
