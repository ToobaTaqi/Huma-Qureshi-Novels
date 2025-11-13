// import React from "react";

// export default function NovelDescription({
//   descText,
//   font,
//   dir,
// }: {
//   descText: string;
//   font: string;
//   dir: string;
// }) {
//   return (
//     <div
//       className={`px-10 lg:px-24 text-justify text-tertiary leading-12 whitespace-pre-wrap ${font}`}
//       style={{
//         userSelect: "none", // Prevent selection
//         WebkitUserSelect: "none", // Chrome/Safari
//         MozUserSelect: "none", // Firefox
//         msUserSelect: "none", // IE/Edge
//       }}
//       onContextMenu={(e) => e.preventDefault()} // Disable right-click
//     >
//       <p dir={dir}>{descText}</p>
//     </div>
//   );
// }
import React, { useEffect, useRef } from "react";

export default function NovelDescription({
  descText,
  font,
  dir,
}: {
  descText: string;
  font: string;
  dir: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = divRef.current;

    if (!element) return;

    // Disable long-press menu on mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
    };

    // Disable copy/paste keyboard shortcuts (optional extra layer)
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("copy", handleCopy);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className={`px-10 lg:px-24 text-justify text-tertiary leading-12 whitespace-pre-wrap ${font}`}
      dir={dir}
      style={{
        userSelect: "none",       // Prevent selection
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        touchAction: "none",      // Prevent gestures
      }}
      onContextMenu={(e) => e.preventDefault()} // Disable right-click / long-press menu
    >
      <p>{descText}</p>
    </div>
  );
}
