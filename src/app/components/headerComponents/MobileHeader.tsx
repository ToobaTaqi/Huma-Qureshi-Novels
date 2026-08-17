"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Link from "next/link";
import Search from "./Search";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "../ThemeToggle";

export default function MobileHeader() {
  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);

  const openMenu = () => {
    setMenu(!menu);
  };

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

  // logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {menu && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-30 z-40"
          onClick={() => setMenu(false)}
        />
      )}

      <header className="lg:hidden flex flex-col gap-3 sticky top-0 z-50 bg-primary/85 backdrop-blur-md border-b border-secondary/15 shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-5 pt-3 pb-4 overflow-hidden">
        {/* logo and hamburger nav menu */}
        <div className="flex justify-between items-center">
          <Logo />

          <div className="flex gap-4 items-center">
            {/* Theme Toggle - Shows when logged in */}
            <div className={status === "authenticated" ? "block" : "hidden"}>
              <ThemeToggle />
            </div>

            {/* hamburger menu */}
            <button onClick={openMenu} className="w-8 h-8 flex items-center justify-center">
              <div className={`flex flex-col gap-1.5 transition-all duration-300 ease-in-out ${menu ? "rotate-45" : "rotate-0"}`}>
                <span className={`block w-6 h-0.5 bg-[#111111] rounded-full transition-all duration-300 ease-in-out ${menu ? "translate-y-2" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-[#111111] rounded-full transition-all duration-300 ease-in-out ${menu ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}></span>
                <span className={`block w-6 h-0.5 bg-[#111111] rounded-full transition-all duration-300 ease-in-out ${menu ? "-translate-y-2" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1E5D50]/30 to-transparent" />

        {/* search bar */}
        <Search />
      </header>

        {/* the open and close section - sidebar */}
        <nav
          className={`fixed top-28 right-0 w-full h-[calc(100vh-7rem)] bg-primary shadow-md z-50 transform transition-all duration-300 ease-in-out 
          ${menu ? "translate-x-0 visible" : "translate-x-full invisible"}
        flex flex-col items-center justify-start gap-4 text-secondary overflow-y-auto`}
        >
          <div className="flex flex-col gap-3 justify-start items-center w-full px-10 pt-4 pb-8">
            <Link
              href={`/dashboard`}
              className={`px-6 py-2 rounded-full border border-secondary text-primary bg-secondary hover:bg-secondary/80 transition ${status == "unauthenticated" ? "hidden" : "block"}`}
            >
              <button onClick={() => setMenu(false)}>Dashboard</button>
            </Link>

            <Link
              href={`/`}
              className="px-6 py-2 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
            >
              <button onClick={() => setMenu(false)}>Home</button>
            </Link>
            <Link
              href={`/novel`}
              className="px-6 py-2 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
            >
              <button onClick={() => setMenu(false)}>All Novels</button>
            </Link>
            <Link
              href={`/pdf`}
              className="px-6 py-2 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
            >
              <button onClick={() => setMenu(false)}>PDF Library</button>
            </Link>

            <Link
              href={`/about`}
              className="px-6 py-2 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
            >
              <button onClick={() => setMenu(false)}>About Us</button>
            </Link>
            <Link
              href={`/contact`}
              className="px-6 py-2 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
            >
              <button onClick={() => setMenu(false)}>Contact</button>
            </Link>
            <Link
              href={`/getyourwebsite`}
              className="px-6 py-2 rounded-full border border-secondary/50 text-secondary hover:bg-secondary hover:text-primary transition"
            >
              <button onClick={() => setMenu(false)}>For Writers</button>
            </Link>
            <Link
              href={`/privacypolicy`}
              className="px-6 py-2 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
            >
              <button onClick={() => setMenu(false)}>Privacy Policy</button>
            </Link>
            <Link
              href={`/terms`}
              className="px-6 py-2 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
            >
              <button onClick={() => setMenu(false)}>Terms & Conditions</button>
            </Link>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`px-6 py-2 rounded-full border border-secondary/40 text-tertiary opacity-75 hover:opacity-100 hover:border-tertiary transition text-sm
                ${status == "unauthenticated" ? "hidden" : "block"}`}
            >
              Logout
            </button>
          </div>
        </nav>
    </>
  );
}
