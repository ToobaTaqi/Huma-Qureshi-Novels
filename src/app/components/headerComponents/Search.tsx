"use client"
import { icons } from "@/app/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Search() {

  

  return (
    <div className=" w-full flex justify-center">
      <div className="border border-tertiary rounded-full flex justify-between items-center w-[230px] px-2 py-2 gap-2 ">
        <input
          type="text" placeholder="Search..."
          className="px-3 text-tertiary w-[180px] active:border-0 text-sm" 
        />

        <Image
          src={icons.search}
          alt="searchButton"
          width={100}
          height={100}
          className="w-6 h-6"
        />
      </div>
      
    </div>
  );
}
