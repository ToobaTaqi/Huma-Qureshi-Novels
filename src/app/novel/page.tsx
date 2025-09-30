// "use client";
// import React, { useEffect, useState } from "react";
// import Heading from "../components/Heading";
// import Novel from "../components/Cards/Novel";
// import { client } from "@/sanity/lib/client";
// import Loader from "../components/Loader";

// export default function page() {
//   const [allNovels, setAllNovels] = useState<any>([]);
//   const [loading, setLoading] = useState(true); // loading state

//   useEffect(() => {
//     const fetchWriters = async () => {
//       try {
//         await new Promise((resolve) => {
//           setTimeout(() => {
//             resolve("internal delay");
//           }, 2000);
//         });

//         const query = `*[_type == "novel"]{title, cardbannerurl, _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf{asset{_ref}}}`;
//         const response = await client.fetch(query);
//         setAllNovels(response);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWriters();
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="flex flex-col gap-5 py-5 justify-center">
//       <Heading name="All Novels" />
//       <ul className="flex flex-wrap gap-5 justify-center lg:justify-start">
//         {allNovels.map((novel: any, index: number) => (
//           <Novel
//             href={novel._id}
//             cardBanner={novel.cardbannerurl}
//             novelName={novel.title}
//             writer={novel.writer.writername}
//             genre={novel.genre.genrename}
//             key={index}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Novel from "../components/Cards/Novel";
import { client } from "@/sanity/lib/client";
import Loader from "../components/Loader";

export default function Page() {
  const [allNovels, setAllNovels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // page index
  const [hasMore, setHasMore] = useState(true); // check if more novels exist
  const limit = 2; // how many novels per fetch

  const fetchNovels = async (pageIndex: number) => {
    try {
      setLoading(true);

      // GROQ query with pagination
      const query = `*[_type == "novel"] | order(_createdAt desc) [${
        pageIndex * limit
      }...${(pageIndex + 1) * limit}] {
        title,
        cardbannerurl,
        _id,
        genre->{genrename,_id},
        writer->{writername,_id},
      }`;

      const response = await client.fetch(query);

      if (response.length < limit) {
        setHasMore(false); // no more novels left
      }

      setAllNovels((prev) => [...prev, ...response]);
    } catch (error) {
      console.error("Error fetching novels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovels(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex flex-col gap-5 py-5 justify-center">
      <Heading name="All Novels" />

      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start">
        {allNovels.map((novel, index) => (
          <Novel
            href={novel._id}
            cardBanner={novel.cardbannerurl}
            novelName={novel.title}
            writer={novel.writer?.writername}
            genre={novel.genre?.genrename}
            key={index}
          />
        ))}
      </ul>

      {loading && <Loader />}

      {!loading && hasMore && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-tertiary w-fit px-2 py-1 font-bold text-primary active:bg-secondary active:text-tertiary rounded-sm self-center"
        >
          Load More
        </button>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 py-3">No more novels</p>
      )}
    </div>
  );
}
