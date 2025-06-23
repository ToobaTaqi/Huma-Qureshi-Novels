import React from "react";
import Logo from "../Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-tertiary w-full py-5 flex flex-col items-center mt-10">
      {/* footer */}
      <div className="flex flex-row px-10 pb-5 w-full justify-center items-center gap-10">
        {/* logo */}
        <div className="w-fit  bg-primary px-3 py-2 rounded">
          <Logo />
        </div>
        {/* pages */}
        <div className="text-sm w-fit  flex flex-col">
          <p className="font-semibold">Pages</p>
          <Link href='/' className="active:text-secondary">Home</Link>
          <Link href='/' className="active:text-secondary">About US</Link>
          <Link href='/' className="active:text-secondary">All Categories</Link>
          <Link href='/' className="active:text-secondary">All Novels</Link>
        </div>
        {/* about us */}
        {/* <div className="text-sm"><p>Contact US</p></div> */}
      </div>
      {/* line */}
      <div className="w-[70vw] h-[2px] rounded bg-primary"></div>
      {/* about developers */}
      <div className="flex gap-1 pt-3 items-center text-primary justify-center">
        <p className="text-xs">Proudly Designed and Develped by</p>
        <h1 className="text-sm font-bold">DiDev Solutions</h1>
      </div>
    </div>
  );
}
