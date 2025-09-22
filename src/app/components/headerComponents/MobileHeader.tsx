"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Image from "next/image";
import { icons } from "../../assets";
import Link from "next/link";
import Up from "./Up";
import Search from "./Search";
// import Up from "./Up";

export default function MobileHeader() {
  const [menu, setMenu] = useState(false);
  const [menuIcon, setMenuIcon] = useState(icons.list);
  const [writers, setWriters] = useState([]);

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

  // fetching categories
  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await fetch("/api/genre").then((response) =>
          response.json()
        );
        console.log("navbar======", response);
        setWriters(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchWriters();
  }, []);

  return (
    <>
      {menu && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-30 z-40"
          onClick={() => setMenu(false)}
        />
      )}

      <header className="lg:hidden shadow-2xl px-5 lg:px-20 pt-3 pb-5 flex flex-col gap-3">
        {/* logo and hamburger nav menu */}
        <div className="flex justify-between items-center">
          <Logo />

          {/* hamburger menu */}
          <div className="flex gap-3">
            {/* <Link href={"/login"}>
              <button className="px-5 py-1 rounded border border-secondary text-secondary active:border-tertiary active:text-tertiary">
                Login
              </button>
            </Link> */}
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
        </div>

        {/* search bar */}
        <Search />

        {/* Up */}
        <Up />

        {/* the open and close section - sidebar */}
        <nav
          className={`fixed top-24 bg-opacity-10 right-0 h-fit overflow-y-scroll-scroll w-[80%] bg-tertiary shadow-md z-50 transform  transition-transform duration-300 ease-in-out 
          ${menu ? "translate-x-0" : "translate-x-full"}
        flex flex-col items-center justify-center gap-4 text-secondary`}
        >
          <div className="flex flex-col gap-2 justify-center items-center w-full px-20 py-5">
            <Link
              href={`/categories`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>All Categories</button>
            </Link>
            <Link
              href={`/novel`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>All Novels</button>
            </Link>

            <div className="w-full border "></div>
            <Link
              href={`/#latest`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>Latest</button>
            </Link>
            <Link
              href={`/#trending`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>Trending</button>
            </Link>

            <Link
              href={`/#popular`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>Popular</button>
            </Link>

            <div className="w-full border "></div>
            <Link
              href={`/about`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>About Me</button>
            </Link>
            <Link
              href={`/contact`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>Contact</button>
            </Link>
            <Link
              href={`/privacypolicy`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>Privacy Policy</button>
            </Link>
            <Link
              href={`/terms`}
              className="px-5 py-1 active:rounded border border-tertiary active:border-primary active:text-primary"
            >
              <button onClick={() => setMenu(false)}>Terms</button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
