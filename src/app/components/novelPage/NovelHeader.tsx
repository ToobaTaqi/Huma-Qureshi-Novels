import Image from "next/image";
import React from "react";

export default function NovelHeader({
  bannerImageDesktop,
  bannerImageMobile,
  novelTitle,
}: {
  bannerImageDesktop: string;
  bannerImageMobile: string;
  novelTitle: string;
}) {
  return (
    <div className="relative flex justify-center">
      {/* desktop */}
      <Image
        src={bannerImageDesktop}
        alt=""
        width={100}
        height={100}
        className="w-full lg:h-[400px] lg:object-cover hidden lg:block"
      />
      {/* mob */}
      <Image
        src={bannerImageMobile}
        // src={icons.novelbanner}
        alt=""
        width={100}
        height={100}
        className="w-[1080px] h-[300px] object-fill lg:hidden"
      />
      <h1 className="text-2xl lg:text-4xl text-primary font-bold px-3 py-2 lg:py-5 lg:px-5 rounded absolute top-[130px] lg:top-[150px] w-fit bg-tertiary text-center ">
        {/* {novel.title} */}
        {novelTitle}
      </h1>
    </div>
  );
}
