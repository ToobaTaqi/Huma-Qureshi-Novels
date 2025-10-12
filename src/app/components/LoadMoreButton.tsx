import Image from "next/image";
import React from "react";

export default function LoadMoreButton({onclick}:{onclick:() => void } ) {
  return (
    <button onClick={onclick} className="self-center active:bg-secondary p-2 rounded-full ">
      <Image className=" h-6 w-6"
        src={`https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090353/closetertiary_xkhdd1.png`}
        alt=""
        width={100}
        height={100}
      />
    </button>
  );
}
