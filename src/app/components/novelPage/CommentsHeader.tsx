import Image from "next/image";
import React from "react";
import Heading2 from "../Heading2";
import Heading from "../Heading";

export default function CommentsHeader({
  icon,
  enabling,
}: {
  icon: string;
  enabling: any;
}) {
  return (
    <div className="flex flex-wrap gap-10">
      <div className="hidden lg:block">
        <Heading name="Comments" />
      </div>
      <div className="block lg:hidden">
        <Heading2 heading2="Comments" />
      </div>

      <button onClick={enabling}>
        <Image
          src={icon}
          width={100}
          height={100}
          className={`w-6 h-6 cursor-pointer`}
          alt=""
        />
      </button>
    </div>
  );
}
