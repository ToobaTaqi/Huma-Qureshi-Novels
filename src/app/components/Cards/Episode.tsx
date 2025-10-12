import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Episode({
  episodeTitle,
  teaser,
  href,
}: {
  episodeTitle: string;
  teaser: any;
  href: any;
}) {
  const colors = ["#fae397", "#fec7a9", "#f1d5ec", "#c4e5b6", "#ccf7f0"];

  const bg = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link
      href={href}
      className={`border border-primary active:border-secondary rounded-xl shadow-2xl gap-3 px-4 py-2 text-primary
         w-full lg:w-[30vw] transition hover:scale-[1.01]`}
      style={{ backgroundColor: `${bg}` }}
    >
      {/* <div className="flex justify-between"> */}
      <h1 className="font-bold">{episodeTitle}</h1>
      {/* <Image
        className="w-10 h-10 justify-self-start"
        src={`https://res.cloudinary.com/dx1gryhqc/image/upload/v1760071770/read_gceuo8.png`}
        alt=""
        width={100}
        height={100}
      /> */}
      {/* </div> */}

      <h2 className="font-urdu leading-8 text-xs" dir="rtl">
        {teaser}
        <span>.&nbsp;&nbsp;.&nbsp;&nbsp;.</span>
        <button className=" w-fit px-2 py-1 font-bold text-secondary active:bg-secondary active:text-tertiary rounded-sm self-center">
          Read more
        </button>
      </h2>

      {/* <button className="bg-tertiary w-fit px-2 py-1 font-bold text-primary active:bg-secondary active:text-tertiary rounded-sm self-center"> */}

      {/* </button> */}
    </Link>
  );
}
