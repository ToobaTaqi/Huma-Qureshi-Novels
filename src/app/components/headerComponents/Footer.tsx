import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import Image from "next/image";
// import { icons } from "@/app/assets";

export default function Footer() {
  return (
    <div className="bg-tertiary w-full py-5 flex flex-col items-center  mt-10">
      {/* footer */}
      <footer className="flex flex-col px-10 pb-5 w-full justify-center lg:flex-row lg:flex-wrap lg:gap-20 items-start gap-10">
        {/* logo */}
        <div className="w-fit  bg-primary px-3 py-2 rounded">
          <Logo />
        </div>
        {/* pages */}
        <div className="flex w-full gap-[15vw] flex-wrap justify-center lg:w-fit  lg:gap-20 ">
          <div className="text-sm w-fit flex flex-col gap-1">
            <p className="font-bold">Useful Pages</p>
            <Link href="/" className="active:text-secondary">
              Home
            </Link>
            <Link href="/about" className="active:text-secondary">
              About US
            </Link>
            <Link href="/privacypolicy" className="active:text-secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="active:text-secondary">
              Terms
            </Link>
            <Link href="/contact" className="active:text-secondary">
              Contact Us
            </Link>
          </div>
          <div className="text-sm w-fit flex flex-col gap-1">
            <p className="font-bold">Quick Links</p>
            <Link href="/categories" className="active:text-secondary">
              Categories
            </Link>
            <Link href="/novel" className="active:text-secondary">
              All Novels
            </Link>
            <Link href="/#latest" className="active:text-secondary">
              Latest
            </Link>
            <Link href="/#trending" className="active:text-secondary">
              Trending
            </Link>
            <Link href="/#popular" className="active:text-secondary">
              Popular
            </Link>
          </div>
          <div className="text-sm w-fit flex flex-col">
            <p className="font-bold">Connect Us on</p>
           <div className="flex justify-center items-center">
            {/* fb link */}
             <Link href="https://www.facebook.com/share/1B79V4mZsR/" target="blank" className="hover:bg-primary w-fit p-2 active:bg-primary" >
              <Image src={'https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/facebook_vgnanl.png'} alt="" width={100} height={100} className="w-6 h-6"/>
            </Link>
            {/* yt link */}
            <Link href="https://youtube.com/@humaqureshinovels?si=zxalQ_5j_yCrX4W8"  target="blank" className="hover:bg-primary w-fit p-2 active:bg-primary">
              <Image src={"https://res.cloudinary.com/dx1gryhqc/image/upload/v1758664074/youtube_dpg3g8.png"} alt="" width={100} height={100} className="w-6 h-6"/>
            </Link>
            {/* instagram link */}
            <Link href="https://www.instagram.com/humaqureshinovels?igsh=amp6Y3B5OXJvb3lh"  target="blank" className="hover:bg-primary w-fit p-2 active:bg-primary">
              <Image src={"https://res.cloudinary.com/dx1gryhqc/image/upload/v1758663992/instagram_mxjgaa.png"} alt="" width={100} height={100} className="w-6 h-6"/>
            </Link>
           </div>
           
          </div>
        </div>
        {/* about us */}
        {/* <div className="text-sm"><p>Contact US</p></div> */}
      </footer>

      {/* line */}
      <div className="w-[70vw] h-[2px] rounded bg-primary"></div>
      {/* about developers */}
      <div className="flex gap-1 pt-3 items-center text-primary justify-center flex-wrap">
        <p className="text-xs">Proudly Designed and Develped by</p>
        <h1 className="text-sm font-bold">DiDev Solutions</h1>
      </div>
    </div>
  );
}
