import React from "react";
import Novel from "../Cards/Novel";

export default function Category({
  CategoryName,
  flexType,
}: {
  CategoryName: string;
  flexType: string;
}) {
  return (
    <div className="py-5 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl">{CategoryName}</h2>
        <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
      </div>

      <div className={`flex gap-5 flex-wrap justify-center`}>
        <Novel />
        <Novel />
        <Novel />
        <Novel />
        <Novel />
      </div>
    </div>
  );
}
