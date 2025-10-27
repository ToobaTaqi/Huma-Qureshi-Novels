"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Image from "next/image";
// import { icons } from "../../assets";
import Link from "next/link";
import Up from "./Up";
import Search from "./Search";
import { client } from "@/sanity/lib/client";
import LanguageToggle from "./LanguageToggle";
// import Up from "./Up";

export default function DesktopHeader() {
  const [menu, setMenu] = useState(false);
  const [writers, setWriters] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  // fetching categories
  useEffect(() => {
    async function fetchData() {
      try {
        const [writerRes, genreRes] = await Promise.all([
          // fetch("/api/novel"),
          // fetch("/api/writer"),
          // fetch("/api/genre"),
          // client.fetch(
          //   '*[_type == "novel"]{title, bannerimagemobile, bannerimagedesktop , _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf}'
          // ),
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

          <div className="flex items-center gap-10">
            {/* <Link href={"/login"}>
              <button className="px-5 py-1 rounded border border-secondary text-secondary active:border-tertiary active:text-tertiary">
                Subscribe
              </button>
            </Link> */}
            <Search />
            {/* <LanguageToggle /> */}
          </div>
        </div>
        <nav className="flex  justify-center items-center w-full gap-2 py-5 text-tertiary">
          <Link
            href={`/`}
            className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
          >
            <button onClick={() => setMenu(false)}>Home</button>
          </Link>
          <Link
            href={`/about`}
            className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
          >
            <button onClick={() => setMenu(false)}>About Us</button>
          </Link>
          
          <Link
            href={`/novel`}
            className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
          >
            <button onClick={() => setMenu(false)}>Novels</button>
          </Link>
          <Link
            href={`/article`}
            className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
          >
            <button onClick={() => setMenu(false)}>Articles</button>
          </Link>
          <Link
            href={`/articles`}
            className="px-5 py-1 active:rounded border border-primary hover:border-tertiary active:text-secondary active:border-secondary"
          >
            <button onClick={() => setMenu(false)}>Ebooks</button>
          </Link>
        </nav>
        <Up />
      </header>
    </>
  );
}
