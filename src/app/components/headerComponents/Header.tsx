"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Image from "next/image";
import { icons } from "@/app/assets";

export default function Header() {
  // example categories (gonna make them dynamic)
  const categories = [
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3","Category1", "category2", "c3"
  ];

  const [menu, setMenu] = useState(false);
  const [menuIcon,setMenuIcon]=useState(icons.list)
  const openMenu = () => {
    setMenu(!menu);
    if (menu === false) {
      console.log("closed");
    } else {
      console.log("opened");
    }
  };
  useEffect(()=>{
    if(menu===false){
        setMenuIcon(icons.list)
    }
    else{
        setMenuIcon(icons.close)
    }
  },[menu])

  return (
    <header>
      <div className="flex justify-between">
        <Logo />

        <button onClick={openMenu}>
          <Image
            src={menuIcon}
            alt="Logo"
            width={100}
            height={100}
            className="w-10 h-10"
          />
        </button>
      </div>

      <nav
        className={`${menu ? "flex" : "hidden"} justify-center items-center gap-3 text-secondary flex-col py-3`}
      >
        {categories.map((category, index) => (
          <ul key={index} className="hover:text-tertiary">
            {category}
          </ul>
        ))}
      </nav>
    </header>
  );
}
