import React from "react";

export default function NovelBody({ novelText }: { novelText: string }) {
  return (
    <div
      className="px-5 lg:px-24 text-right text-tertiary text-[19px] leading-9 whitespace-pre-wrap font-urdu break-words overflow-hidden"
      dir="rtl"
    >
      <p>{novelText}</p>
    </div>
  );
}
