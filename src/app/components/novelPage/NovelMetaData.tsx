import React from "react";

export default function NovelMetaData({
  writer,
  genre,
}: {
  writer: string;
  genre: string;
}) {
  return (
    <div className="px-10 text-secondary text-xs opacity-70 flex gap-5">
      <h1>Written by : {writer || ""}</h1>
      <h1>Genre : {genre || ""}</h1>
    </div>
  );
}
