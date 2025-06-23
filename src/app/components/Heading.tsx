import React from "react";

export default function Heading({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-3xl text-tertiary">{name}</h2>
      <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
    </div>
  );
}
