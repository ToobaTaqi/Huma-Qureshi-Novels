import React from "react";

export default function NovelDescription({
  descText,
  font,
  dir,
}: {
  descText: string;
  font: string;
  dir: string;
}) {
  return (
    <div
      className={`px-10 lg:px-24 text-justify text-tertiary leading-12 whitespace-pre-wrap ${font}`}
    >
      <p dir={dir}>{descText}</p>
    </div>
  );
}
