"use client";

import { icons } from "@/app/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [novels, setNovels] = useState<any[]>([]);
  const [writers, setWriters] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  const router = useRouter();

  // Fetch data from APIs
  useEffect(() => {
    async function fetchData() {
      try {
        const [novelRes, writerRes, genreRes] = await Promise.all([
          fetch("/api/novel"),
          fetch("/api/writer"),
          fetch("/api/genre"),
        ]);

        const novelData = await novelRes.json();
        const writerData = await writerRes.json();
        const genreData = await genreRes.json();

        setNovels(novelData);
        setWriters(writerData);
        setGenres(genreData);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    }

    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    if (query.length >= 1) {
      const lowerQuery = query?.toLowerCase();

      const filteredNovels = novels.filter((n: any) =>
        n.title?.toLowerCase().includes(lowerQuery)
      );
      const filteredWriters = writers.filter((w: any) =>
        w.writername?.toLowerCase().includes(lowerQuery)
      );
      const filteredGenres = genres.filter((g: any) =>
        g.genrename?.toLowerCase().includes(lowerQuery)
      );

      const combinedResults = [
        ...filteredNovels.map((item) => ({ ...item, type: "novel" })),
        ...filteredWriters.map((item) => ({ ...item, type: "writer" })),
        ...filteredGenres.map((item) => ({ ...item, type: "genre" })),
      ];

      setResults(combinedResults);
    } else {
      setResults([]);
    }
  }, [query, novels, writers, genres]);

  // Handle result click
  const handleSelect = (item: any) => {
    if (!item?._id || !item?.type) return;

    if (item.type === "novel") {
      router.push(`/novel/${item._id}`);
    } else {
      router.push(`/categories/${item._id}`);
    }

    setQuery("");
    setResults([]);
  };

  //   const handleSelect = (item: any) => {
  //     console.log(item.type)
  //     router.push(`/${item.type}/${item._id}`);
  //     setQuery("");
  //     setResults([]);
  //   };

  return (
    <div className="w-full lg:w-fit flex justify-center relative">
      <div className="border border-tertiary rounded-full flex justify-between items-center w-[230px] px-2 py-2 gap-2 ">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 text-tertiary w-[180px] active:border-0 text-sm bg-transparent focus:outline-none"
        />

        <Image
          src={icons.search}
          alt="searchButton"
          width={100}
          height={100}
          className="w-6 h-6 cursor-pointer"
        />
      </div>

{/* dropdown */}
      {results.length > 0 && (
        <ul className="absolute bg-tertiary text-primary border mt-11 mr-8 w-fit shadow-md rounded-md max-h-60 overflow-y-auto z-100">
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="p-2  text-primary active:text-secondary cursor-pointer text-sm"
            >
              {item.title || item.writername || item.genrename} ({item.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
