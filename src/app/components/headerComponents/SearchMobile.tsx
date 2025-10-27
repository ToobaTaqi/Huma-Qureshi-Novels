"use client";

import React, { useState, useEffect, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}

export default function SearchMobile({ onResultSelect }: { onResultSelect?: () => void }) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce<string>(query, 400);

  const router = useRouter();

  // Fetch matching items when debouncedQuery changes
  useEffect(() => {
    const fetchResults = async () => {
      const q = debouncedQuery.trim();
      if (q.length < 1) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const groq = `*[
        (_type == "novelparent" && title match "${q}*") ||
        (_type == "novel" && (
    name match "${q}*" ||
    novelparent->title match "${q}*"
  ))
][0..9]{_id,
  _type,
  title,
  slug, name,
  episodeslug,
  novelparent->{
    title,
    slug
  }
}`;

        const res = await client.fetch(groq);
        setResults(res);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (item: any) => {
    if (item._type === "novelparent" && !item.slug?.current) return;
    if (
      item._type === "novel" &&
      (!item.episodeslug?.current || !item.novelparent?.slug?.current)
    )
      return;

    if (item._type === "novelparent") {
      router.push(`/novel/${item.slug.current}`);
    } else if (item._type === "novel") {
      router.push(
        `/novel/${item.novelparent?.slug?.current}/${item.episodeslug?.current}`
      );
    }

    setQuery("");
    setResults([]);

    if (onResultSelect) onResultSelect();
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="border border-secondary rounded-full flex justify-between items-center w-[230px] px-2 py-2 gap-2 overflow-hidden" >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 text-tertiary text-sm bg-transparent focus:outline-none w-full"
        />
         <Image
          src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1761269973/search_pdbcj3.png"
          alt="search button"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </div>

      {debouncedQuery && (
        <div className="absolute bg-tertiary text-primary border mt-11 mr-8 w-fit shadow-md rounded-md max-h-60 overflow-y-auto z-50">
          {loading && <p className="p-2 text-gray-500">Searching...</p>}
          {!loading && results.length === 0 && (
            <p className="p-2 text-gray-500">No results found</p>
          )}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((item, idx) => (
                <li
                  key={`${item._type}-${item._id}-${idx}`}
                  onClick={() => handleSelect(item)}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item._type === "novelparent"
                    ? item.title
                    : `${item.novelparent?.title} ${item.name}`}
                  {/* {item.title || item.name } */}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
