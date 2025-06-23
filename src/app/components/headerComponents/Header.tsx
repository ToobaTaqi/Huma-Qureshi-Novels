"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Image from "next/image";
import { icons } from "../../assets";
import Link from "next/link";

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
    "c3",
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3",
    "Category1",
    "category2",
    "c3",
  ];

  const [menu, setMenu] = useState(false);
  const [menuIcon, setMenuIcon] = useState(icons.list);
  const openMenu = () => {
    setMenu(!menu);
    if (menu === false) {
      console.log("closed");
    } else {
      console.log("opened");
    }
  };
  useEffect(() => {
    if (menu === false) {
      setMenuIcon(icons.list);
    } else {
      setMenuIcon(icons.close);
    }
  }, [menu]);

  // to prevent background from scrolling when sidebar is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // Clean up in case the component unmounts
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  return (
    <>
      {menu && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-30 z-40"
          onClick={() => setMenu(false)}
        />
      )}

      <header className="shadow-2xl px-5 pt-3 pb-5 flex flex-col gap-3">
        {/* logo and hamburger nav menu */}
        <div className="flex justify-between">
          <Logo />

          <button
            onClick={openMenu}
            // className="transition-transform duration-300 ease-in-out"
          >
            <Image
              src={menuIcon}
              alt="Logo"
              width={100}
              height={100}
              // className="w-10 h-10"
              className={`w-6 h-6 transition-transform duration-300 ease-in-out ${
                menu ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {/* search bar */}
        <div className=" w-full flex justify-center">
          <div className="border border-tertiary rounded-full flex justify-between items-center w-[230px] px-2 py-2 gap-2 ">
            <input
              type="text"
              className="px-2 text-tertiary w-[180px] active:border-0 text-sm"
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

        <nav
          // className={`${menu ? "flex" : "hidden"} justify-center items-center gap-3 text-secondary flex-col py-3`}
          className={`fixed top-24 bg-opacity-10 right-0 h-fit overflow-y-scroll-scroll w-[80%] bg-tertiary shadow-md z-50 transform  transition-transform duration-300 ease-in-out 
          ${menu ? "translate-x-0" : "translate-x-full"}
        flex flex-col items-center justify-center gap-4 text-secondary`}
        >
          <ul className="flex flex-col justify-start items-start">
            <Link href={`/categories`}>
              <button onClick={() => setMenu(false)}>All Categories</button>
            </Link>
            <Link href={`/novel`}>
              <button onClick={() => setMenu(false)}>All Novels</button>
            </Link>
            {/* {categories.map((category, index) => (
              <Link href={"/categories"}>
                <button
                  onClick={() => setMenu(false)}
                  key={index}
                  className="active:text-primary"
                >
                  {category}
                </button>
              </Link>
            ))} */}
          </ul>
        </nav>
      </header>
    </>
  );
}
