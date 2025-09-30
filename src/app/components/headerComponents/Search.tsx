// "use client";

// // import { icons } from "@/app/assets";
// import { client } from "@/sanity/lib/client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// export default function Search() {
//   const [query, setQuery] = useState<string>("");
//   const [results, setResults] = useState<any[]>([]);
//   const [novels, setNovels] = useState<any[]>([]);
//   const [writers, setWriters] = useState<any[]>([]);
//   const [genres, setGenres] = useState<any[]>([]);

//   const router = useRouter();

//   // Fetch data from APIs
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [novelRes, writerRes, genreRes] = await Promise.all([
//           // fetch("/api/novel"),
//           // fetch("/api/writer"),
//           // fetch("/api/genre"),
//           client.fetch(
//             '*[_type == "novel"]{title, bannerimagemobile, bannerimagedesktop , _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf}'
//           ),
//           client.fetch('*[_type == "writer"]'),
//           client.fetch('*[_type == "genre"]'),
//         ]);

//         setNovels(novelRes);
//         setWriters(writerRes);
//         setGenres(genreRes);
//       } catch (error) {
//         console.error("Error fetching search data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     if (query.length >= 1) {
//       const lowerQuery = query?.toLowerCase();

//       const filteredNovels = novels.filter((n: any) =>
//         n.title?.toLowerCase().includes(lowerQuery)
//       );
//       const filteredWriters = writers.filter((w: any) =>
//         w.writername?.toLowerCase().includes(lowerQuery)
//       );
//       const filteredGenres = genres.filter((g: any) =>
//         g.genrename?.toLowerCase().includes(lowerQuery)
//       );

//       const combinedResults = [
//         ...filteredNovels.map((item) => ({ ...item, type: "novel" })),
//         ...filteredWriters.map((item) => ({ ...item, type: "writer" })),
//         ...filteredGenres.map((item) => ({ ...item, type: "genre" })),
//       ];

//       setResults(combinedResults);
//     } else {
//       setResults([]);
//     }
//     // }, [query, novels, writers, genres]);
//   }, [query]);

//   // Handle result click
//   const handleSelect = (item: any) => {
//     if (!item?._id || !item?.type) return;

//     if (item.type === "novel") {
//       router.push(`/novel/${item._id}`);
//     } else {
//       router.push(`/categories/${item._id}`);
//     }

//     setQuery("");
//     setResults([]);
//   };

//   return (
//     <div className="w-full lg:w-fit flex justify-center relative">
//       <div className="border border-tertiary rounded-full flex justify-between items-center w-[230px] px-2 py-2 gap-2 ">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           // className="px-3 text-tertiary w-[180px] active:border-0 text-sm bg-transparent focus:outline-none"
//           className="px-3 text-tertiary w-[180px] text-sm bg-transparent focus:outline-none"
//         />

//         <Image
//           src={"https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662383/search_a2yhvf.png"}
//           alt="searchButton"
//           width={100}
//           height={100}
//           className="w-6 h-6 cursor-pointer"
//         />
//       </div>

//       {/* dropdown */}
//       {results.length >= 1 && (
//         <ul className="absolute bg-tertiary text-primary border mt-11 mr-8 w-fit shadow-md rounded-md max-h-60 overflow-y-auto z-50">
//           {results.map((item, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelect(item)}
//               className="p-2  text-primary active:text-secondary cursor-pointer text-sm"
//             >
//               {item.title || item.writername || item.genrename} ({item.type})
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

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

export default function Search() {
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
        // Here's the GROQ query to match novel title, writername, or genrename
        const groq = `*[
          (_type == "novel" && title match "${q}*") ||
          (_type == "writer" && writername match "${q}*") ||
          (_type == "genre" && genrename match "${q}*")
        ]{
          _id,
          _type,
          title,
          writername,
          genrename
        }[0..9]`;  // limit to first 10 results

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
    if (!item?._id || !item?._type) return;

    if (item._type === "novel") {
      router.push(`/novel/${item._id}`);
    } else {
      // writer or genre
      router.push(`/categories/${item._id}`);
    }

    setQuery("");
    setResults([]);
  };

  return (
    <div className="w-full lg:w-fit flex justify-center relative">
      <div className="border border-tertiary rounded-full flex justify-between items-center w-[230px] px-2 py-2 gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 text-tertiary w-[180px] text-sm bg-transparent focus:outline-none"
        />
        <Image
          src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662383/search_a2yhvf.png"
          alt="search button"
          width={24}
          height={24}
          className="cursor-pointer"
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
                  {item.title || item.writername || item.genrename} ({item._type})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
