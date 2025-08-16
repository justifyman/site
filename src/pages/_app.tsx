import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  const [secondLoading, setSecondLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for resources to load
    const firstTimer = setTimeout(() => {
      setLoading(false);

      // Add delay for second loading screen
      const secondTimer = setTimeout(() => {
        setSecondLoading(false);
      }, 500); // 0.5 second delay after first screen slides up

      return () => clearTimeout(secondTimer);
    }, 1000); // 1 second delay, adjust as needed

    return () => clearTimeout(firstTimer);
  }, []);

  return (
    <div lang={"en"} className={dmSans.className}>
      {/* Custom Cursor - Placed at the end to ensure it's on top of everything */}

      {/* First Preloader - Black */}
      <div
        className={`fixed inset-0 z-[51] bg-black transition-transform duration-500 ease-in-out ${loading ? "translate-y-0" : "-translate-y-full"}`}
      />
      {/* Second Preloader - Different Color */}
      <div
        className={`fixed inset-0 z-50 bg-[#121220] transition-transform duration-500 ease-in-out ${secondLoading ? "translate-y-0" : "-translate-y-full"}`}
      />
      <Component {...pageProps} />

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
};

export default MyApp;
