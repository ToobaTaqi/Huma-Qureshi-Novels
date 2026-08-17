"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdFormat = "banner" | "rectangle" | "horizontal";

export default function Ads({ format = "rectangle" }: { format?: AdFormat }) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  const styleMap: Record<AdFormat, React.CSSProperties> = {
    banner: { display: "block", width: "100%", maxWidth: "728px", height: "90px", margin: "0 auto" },
    rectangle: { display: "block", width: "100%", maxWidth: "336px", height: "280px", margin: "0 auto" },
    horizontal: { display: "block", width: "100%", maxWidth: "728px", height: "90px", margin: "0 auto" },
  };

  return (
    <div className="flex justify-center py-4">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={styleMap[format]}
        data-ad-client="ca-pub-9826860279589874"
        data-ad-slot="auto"
        data-ad-format={format === "rectangle" ? "auto" : "horizontal"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
