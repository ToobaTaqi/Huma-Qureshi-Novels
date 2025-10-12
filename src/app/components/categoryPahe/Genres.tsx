// "use client";
// import React, { useEffect, useState } from "react";
// import CategoryCard from "../Cards/CategoryCard";
// import { client } from "@/sanity/lib/client";
// import Loader from "../Loader";

// export default function Genres() {
//   const [genres, setGenres] = useState<any>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 2;

//   // useEffect(() => {
//   const fetchWriters = async (pageIndex: number, reset = false) => {
//     try {
//       const query = `*[_type == "genre"] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] { _id, genreslug, genrename, genrecardimageurl }`;
//       const response = await client.fetch(query);

//       // setGenres(response);

//       setGenres((prev: any) => (reset ? response : [...prev, ...response]));

//       // Pagination end check
//       if (response.length < limit) setHasMore(false);

//       console.log(response, "->resssssss");
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     if (page > 0) fetchWriters(page);
//   }, [page]);
//   // }, []);

//   if (loading && genres.length === 0) {
//     return <Loader />;
//   }

//   return (
//     <ul className="flex flex-wrap gap-5 justify-center lg:justify-start lg:px-28 lg:gap-10">
//       {genres.map((genre: any, index: number) => (
//         <li key={index}>
//           <CategoryCard
//             href={genre.genreslug?.current}
//             categoryName={genre.genrename}
//             imgUrl={genre.genrecardimageurl}
//           />
//         </li>
//       ))}
//       {loading && <Loader />}

//       {!loading && hasMore && (
//         <button
//           onClick={() => setPage((prev) => prev + 1)}
//           className="bg-tertiary w-fit px-2 py-1 font-bold text-primary active:bg-secondary active:text-tertiary rounded-sm self-center"
//         >
//           Load More
//         </button>
//       )}

//       {!hasMore && !loading && (
//         <p className="text-center text-tertiary opacity-50 py-3">
//           No more novels
//         </p>
//       )}
//     </ul>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../Cards/CategoryCard";
import { client } from "@/sanity/lib/client";
import Loader from "../Loader";
import Loader2 from "../Loader2";
import LoadMoreButton from "../LoadMoreButton";

export default function Genres() {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const fetchWriters = async (pageIndex: number, reset = false) => {
    try {
      setLoading(true);
      const query = `*[_type == "genre"] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {
        _id,
        genrename,
        genrecardimageurl,
        "genreslug": genreslug.current
      }`;

      const response = await client.fetch(query);

      setGenres((prev: any) => (reset ? response : [...prev, ...response]));

      if (page > 0) {
        setLoader(<Loader2 />);
      }

      if (response.length < limit) setHasMore(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ first load
  useEffect(() => {
    fetchWriters(0, true);
  }, []);

  // ✅ load next pages
  useEffect(() => {
    if (page > 0) fetchWriters(page);
  }, [page]);
  console.log(genres, "genresss");

  return (
    <div className="flex flex-col gap-3 items-center">
      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start lg:px-28 lg:gap-10">
        {genres.map((genre: any, index: number) => (
          <li key={index}>
            <CategoryCard
              href={genre.genreslug}
              categoryName={genre.genrename}
              imgUrl={genre.genrecardimageurl}
            />
          </li>
        ))}
      </ul>

      {/* Loader below cards */}

      {/* {loading && <Loader2 />} */}
      {loading && loader}

      {/* Load More button */}
      {!loading && hasMore && (
        // <button
        //   onClick={() => setPage((prev) => prev + 1)}
        //   className="bg-tertiary mt-6 px-4 py-2 font-bold text-primary rounded-sm hover:bg-secondary hover:text-tertiary transition"
        // >
        //   Load More
        // </button>
        <LoadMoreButton onclick={() => setPage((prev) => prev + 1)} />
      )}

      {/* No more message */}
      {!hasMore && !loading && genres.length > 0 && (
        <p className="text-center text-tertiary opacity-50 py-3">
          No more genres
        </p>
      )}
    </div>
  );
}
