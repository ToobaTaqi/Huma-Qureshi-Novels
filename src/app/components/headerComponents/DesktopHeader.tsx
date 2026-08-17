"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import ThemeToggle from "../ThemeToggle";
import { client } from "@/sanity/lib/client";
import { signOut, useSession } from "next-auth/react";

export default function DesktopHeader() {
  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);
  const [writers, setWriters] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  // fetching categories
  useEffect(() => {
    async function fetchData() {
      try {
        const [writerRes, genreRes] = await Promise.all([
          client.fetch('*[_type == "writer"]'),
          client.fetch('*[_type == "genre"]'),
        ]);

        setWriters(writerRes);
        setGenres(genreRes);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    }

    fetchData();
  }, []);

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

      <header className="hidden lg:flex flex-col justify-center items-center gap-2 sticky top-0 z-50 bg-primary/85 backdrop-blur-md border-b border-secondary/15 shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-5 lg:px-20 pt-3 pb-4">
        {/* Logo and searchbar */}
        <div className="flex justify-between items-center w-full">
          <Logo />

          <div className="flex items-center gap-4 lg:gap-6">
            {/* Theme Toggle - Premium Feature */}
            <div className={status === "authenticated" ? "block" : "hidden"}>
              <ThemeToggle />
            </div>

            {/* dashboard if logged in */}
            <Link
              href={`/dashboard`}
              className={`px-5 py-1.5 rounded-full border border-secondary text-primary bg-secondary hover:bg-secondary/80 transition ${status == "unauthenticated" ? "hidden" : "block"}`}
            >
              <button onClick={() => setMenu(false)}>Dashboard</button>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`px-4 py-1.5 rounded-full border border-secondary/40 text-tertiary opacity-75 hover:opacity-100 hover:border-tertiary transition text-sm
                ${status == "unauthenticated" ? "hidden" : "block"}`}
            >
              Logout
            </button>
            <Search />
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1E5D50]/30 to-transparent" />
        <nav className="flex justify-center items-center w-full gap-1.5 py-3 text-tertiary flex-wrap">
          <Link
            href={`/`}
            className="px-5 py-1.5 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
          >
            <button onClick={() => setMenu(false)}>Home</button>
          </Link>
          <Link
            href={`/novel`}
            className="px-5 py-1.5 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
          >
            <button onClick={() => setMenu(false)}>All Novels</button>
          </Link>
          <Link
            href={`/pdf`}
            className="px-5 py-1.5 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
          >
            <button onClick={() => setMenu(false)}>PDF Library</button>
          </Link>
          <Link
            href={`/about`}
            className="px-5 py-1.5 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
          >
            <button onClick={() => setMenu(false)}>About Us</button>
          </Link>
          <Link
            href={`/contact`}
            className="px-5 py-1.5 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
          >
            <button onClick={() => setMenu(false)}>Contact us</button>
          </Link>
          <Link
            href={`/privacypolicy`}
            className="px-5 py-1.5 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
          >
            <button onClick={() => setMenu(false)}>Privacy Policy</button>
          </Link>
          <Link
            href={`/terms`}
            className="px-5 py-1.5 rounded-full border border-transparent text-[#111111] font-bold hover:text-secondary hover:bg-secondary/10 hover:border-secondary/40 transition"
          >
            <button onClick={() => setMenu(false)}>Terms & Conditions</button>
          </Link>
          <Link
            href={`/getyourwebsite`}
            className="px-5 py-1.5 rounded-full border border-secondary/50 text-secondary hover:bg-secondary hover:text-primary transition"
          >
            <button onClick={() => setMenu(false)}>For Writers</button>
          </Link>
        </nav>
      </header>
    </>
  );
}
