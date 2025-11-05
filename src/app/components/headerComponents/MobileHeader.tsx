"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Image from "next/image";
// import { icons } from "../../assets";
import Link from "next/link";
import Up from "./Up";
import Search from "./Search";
import SearchMobile from "./SearchMobile";
import LanguageToggle from "./LanguageToggle";
// import Up from "./Up";

export default function MobileHeader() {
  const [menu, setMenu] = useState(false);
  const [menuIcon, setMenuIcon] = useState(
    "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/list_nnpk5k.png"
  );

  const openMenu = () => {
    setMenu(!menu);
    // if (menu === false) {
    //   console.log("closed");
    // } else {
    //   console.log("opened");
    // }
  };
  useEffect(() => {
    if (menu === false) {
      setMenuIcon(
        "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/list_nnpk5k.png"
      );
    } else {
      setMenuIcon(
        "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/close_iwzjrg.png"
      );
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

      <header className="lg:hidden shadow-2xl px-5 lg:px-20 pt-3 pb-5 flex flex-col gap-3">
        {/* logo and hamburger nav menu */}
        <div className="flex justify-between items-center">
          <Logo />

          {/* hamburger menu */}
          <div className="flex gap-4">
            {/* <LanguageToggle /> */}

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
        {/* <Search /> */}

        {/* Up */}
        <Up />

        {/* the open and close section - sidebar */}
        <nav
          className={`fixed top-30 bg-opacity-10 right-0 overflow-y-scroll-scroll w-full h-full bg-primary shadow-md z-50 transform transition-transform duration-300 ease-in-out 
          ${menu ? "translate-x-0" : "translate-x-full"}
        flex flex-col items-center justify-start gap-4 text-secondary overflow-y-visible`}
        >
          <div className="flex flex-col gap-4 justify-center items-center w-full px-20 py-5">
            <SearchMobile onResultSelect={() => setMenu(false)} />
            <Link
              href={`/`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>Home</button>
            </Link>
            <Link
              href={`/novel`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>All Novels</button>
            </Link>
            {/* <Link
              href={`/article`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>Articles</button>
            </Link> */}
            {/* <Link
              href={`/ebooks`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>Ebooks</button>
            </Link> */}

            <Link
              href={`/about`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>About Us</button>
            </Link>
            <Link
              href={`/contact`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>Contact</button>
            </Link>
            <Link
              href={`/privacypolicy`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>Privacy Policy</button>
            </Link>
            <Link
              href={`/terms`}
              className="px-5 py-1 active:rounded border border-primary active:border-tertiary active:text-tertiary"
            >
              <button onClick={() => setMenu(false)}>Terms</button>
            </Link>
            {/* </div> */}
          </div>
        </nav>
      </header>
    </>
  );
}
