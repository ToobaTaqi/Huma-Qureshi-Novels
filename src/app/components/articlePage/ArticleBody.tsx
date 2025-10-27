import React from "react";

export default function ArticleBody({ text }: { text: string }) {
  return (
    <div className="px-10 lg:px-24 text-tertiary leading-10 whitespace-pre-wrap">
      <p>{text}</p>
    </div>
  );
}
