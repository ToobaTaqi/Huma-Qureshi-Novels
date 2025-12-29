import React, { useEffect, useRef } from "react";

export default function NovelBody({ novelText }: { novelText: string }) {
  const divRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const element = divRef.current;
  //   if (!element) return;

  //   // Prevent long-press selection & copy
  //   const handleTouchStart = (e: TouchEvent) => e.preventDefault();

  //   // Block copy keyboard shortcuts or context copy
  //   const handleCopy = (e: ClipboardEvent) => e.preventDefault();

  //   element.addEventListener("touchstart", handleTouchStart, {
  //     passive: false,
  //   });
  //   element.addEventListener("copy", handleCopy);

  //   return () => {
  //     element.removeEventListener("touchstart", handleTouchStart);
  //     element.removeEventListener("copy", handleCopy);
  //   };
  // }, []);

  return (
    <div
      ref={divRef}
      className="px-10 lg:px-24 text-right text-tertiary leading-12 whitespace-pre-wrap font-urdu"
      dir="rtl"
      style={{
        userSelect: "none", // Disable selection
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        // touchAction: "none", // Stop touch highlighting
      }}
      onContextMenu={(e) => e.preventDefault()} // Disable right-click / long-press
    >
      <p>{novelText}</p>
    </div>
  );
}
