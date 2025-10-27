import React from 'react'

export default function ArticleMedadata({
  writer,
  category,
}: {
  writer: string;
  category: string;
}) {
  return (
    <div className="px-10 text-secondary text-xs opacity-70 flex gap-5">
      {writer && <h1>Written by : {writer || ""}</h1>}
      <h1>Category : {category || ""}</h1>
    </div>
  )
}
