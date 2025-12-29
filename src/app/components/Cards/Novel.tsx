import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Novel({
  href,
  novelName,
  writer,
  genre,
  cardBanner,
}: {
  href: string;
  novelName: string;
  writer: string;
  genre: string;
  cardBanner: string;
}) {
  return (
    <Link
      // href={`${href}`}
      href={`/novel/${href}`}
      className="text-tertiary w-[200px] rounded-xl flex flex-col justify-start items-center py-4 gap-3 shadow-2xl border border-primary active:border-secondary"
    >
      <Image
        alt=""
        width={320}
        height={180}
        src={cardBanner}
        // src={`https://cdn.pixabay.com/photo/2018/07/11/16/53/book-3531412_1280.jpg`}
        className="w-[170px] h-[96px] self-center text-2xl text-center object-fit"
      />

      <div className="flex flex-col gap-2">
        <h1 className="justify-center text-xl text-wrap text-center">
          {novelName}
        </h1>
        <div className="flex gap-2 text-sm justify-start text-start px-5 opacity-75">
          <h2>Writer :</h2>
          <p>{writer}</p>
        </div>
        <div className="flex gap-2 text-sm justify-start text-start px-5 opacity-75">
          <h2>Genre :</h2>
          <p>{genre}</p>
        </div>
        <button className="bg-tertiary w-fit px-2 py-1 font-bold text-primary active:bg-secondary active:text-tertiary rounded-sm self-center">
          Read
        </button>
      </div>
    </Link>
  );
}
