import Image from "next/image";
import React from "react";

export default function Comment({
  key,
  name,
  createdAt,
  comment,
}: {
  key: number;
  name: string;
  createdAt: string;
  comment: string;
}) {
  return (
    <div
      key={key}
      className="border border-primary rounded-2xl px-2 py-4 flex gap-4 lg:gap-6 h-fit shadow-2xl  items-start"
    >
      {/* user icon */}
      {/* <div className="border border-secondary p-6 rounded-full w-[50px] h-[50px]"> */}
      <Image
        src={
          "https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090658/user_ibf2q1.png"
        }
        className="w-[50px] h-[50px] "
        alt=""
        width={100}
        height={100}
      />
      {/* </div> */}
      {/* username, date, and comment */}
      <div className="flex flex-col gap-3 text-sm lg:gap-6 justify-center">
        <div className="flex items-center flex-wrap text-secondary gap-4">
          {/* username and date */}
          <p className="text-sm">{name}</p>
          {/* <p className="text-xs">{c._createdAt}</p> */}
          <p className="text-xs">{new Date(createdAt).toDateString()}</p>
        </div>
        <p className="text-wrap text-tertiary">{comment}</p>
      </div>
    </div>
  );
}
