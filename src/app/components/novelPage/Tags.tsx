import React from "react";

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-3 text-xs px-10 font-semibold opacity-70">
      {tags?.map((t: any, index: number) => (
        <p
          key={index}
          className="text-secondary border border-secondary px-2 py-1 self-center"
        >
          {t}
        </p>
      ))}
    </div>
  );
}
