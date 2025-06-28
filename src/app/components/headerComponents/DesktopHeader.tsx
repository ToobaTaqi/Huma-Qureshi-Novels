"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Image from "next/image";
import { icons } from "../../assets";
import Link from "next/link";
import Up from "./Up";
import Search from "./Search";
// import Up from "./Up";

export default function DesktopHeader() {
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

      <header className="hidden shadow-2xl px-5 lg:px-20 pt-3 pb-5 lg:flex flex-col justify-center items-center gap-3">
        {/* Logo and searchbar */}
        <div className="flex justify-between items-center w-full">
          <Logo />

         

          <Search />
        </div>
 <nav className="flex  justify-center items-center w-full gap-2 py-5 text-tertiary">
            <Link
              href={`/about`}
              className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
            >
              <button onClick={() => setMenu(false)}>About Me</button>
            </Link>
            <Link
              href={`/categories`}
              className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
            >
              <button onClick={() => setMenu(false)}>All Categories</button>
            </Link>
            <Link
              href={`/novel`}
              className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
            >
              <button onClick={() => setMenu(false)}>All Novels</button>
            </Link>
            <Link
              href={`/#latest`}
              className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
            >
              <button onClick={() => setMenu(false)}>Latest</button>
            </Link>
          </nav>
        <Up />
      </header>
    </>
  );
}
