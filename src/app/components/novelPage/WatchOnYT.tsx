import Image from "next/image";
import React from "react";

export default function WatchOnYT({ YTurl }: { YTurl: string }) {
  return (
    <a
      href={YTurl}
      target="blank"
      className="px-10 flex gap-1 justify-center flex-wrap border border-primary active:border-tertiary rounded py-2 w-fit self-center"
    >
      <p className="text-tertiary">Watch on Youtube</p>
      <Image
        className="w-6 h-6"
        src={
          "https://res.cloudinary.com/dx1gryhqc/image/upload/v1760053180/youtube_play_pyhd8d.png"
        }
        width={100}
        height={100}
        alt=""
      />
    </a>
  );
}
