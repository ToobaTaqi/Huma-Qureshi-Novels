import Link from "next/link";
import React from "react";

export default function Article({
  href,
  articleName,
  writer,
  category,
  cardBanner,
}: {
  href: string;
  articleName: string;
  writer: string;
  category: string;
  cardBanner: string;
}) {
  return (
    <Link
      href={`/article/${href}`}
      className="text-tertiary w-[200px] rounded-xl flex flex-col justify-center items-center py-4 gap-3 shadow-2xl border border-primary active:border-secondary"
    >
      <img
        src={cardBanner}
        className="w-[170px] h-[120px] bg-secondary flex items-center justify-center text-2xl text-wrap text-center object-cover"
      />

      <div className="flex flex-col gap-2">
        <h1 className="justify-center text-xl text-wrap text-center">
          {articleName}
        </h1>
        {writer && (
          <div className="flex gap-2 text-sm justify-start text-start px-5 opacity-75">
            <h2>Writer :</h2>
            <p>{writer}</p>
          </div>
        )}

        <div className="flex gap-2 text-sm justify-start text-start px-5 opacity-75">
          {/* <h2>Category :</h2> */}
          <h2>{category}</h2>
        </div>
        <button className="bg-tertiary w-fit px-2 py-1 font-bold text-primary active:bg-secondary active:text-tertiary rounded-sm self-center">
          Read
        </button>
      </div>
    </Link>
  );
}
