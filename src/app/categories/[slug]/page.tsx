// "use client";
// import Novel from "@/app/components/Cards/Novel";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { client } from "@/sanity/lib/client";
// import Loader from "@/app/components/Loader";

// export default function page() {
//   const params = useParams();
//   const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
//   // const slug = params.slug || "romance";
//   //   console.log(params, "params value");

//   const [category, setCategory] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [loading, setLoading] = useState(true); // loading state

//   const [page, setPage] = useState(0); // page index
//   const [hasMore, setHasMore] = useState(true); // check if more novels exist
//   const limit = 2; // how many novels per fetch

//   // useEffect(() => {
//   const fetchCategoryData = async (pageIndex: number) => {
//     try {
//       // delay for loader
//       // await new Promise((resolve) => {
//       //   setTimeout(() => {
//       //     resolve("internal delay");
//       //   }, 1000);
//       // });

//       const query = `*[_type == "novelparent" && (genre->genreslug.current == "${slug}" || writer->writerslug.current == "${slug}")]| order(_createdAt desc) [${
//         pageIndex * limit
//       }...${(pageIndex + 1) * limit}]{title, cardbannerurl, slug,
//           _id, genre->{genrename,_id,genreslug}, writer->{writername,_id,writerslug}}`;

//       const response = await client.fetch(query);
//       console.log(response, "newwwwww-----------");

//       if (slug == response[0].genre.genreslug.current) {
//         setCategoryName(response[0].genre.genrename);
//       } else if (slug == response[0].writer.writerslug.current) {
//         setCategoryName(response[0].writer.writername);
//       }
//       setCategory(response);

//        if (response.length < limit) {
//         setHasMore(false); // no more novels left
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategoryData(page);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   // }, []);

//   console.log(categoryName, "cat");

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="py-5 flex flex-col gap-6 lg:gap-10">
//       {/* categpry id page {id} */}
//       <div className="flex items-center gap-3">
//         <h2 className="text-3xl text-tertiary">{categoryName}</h2>
//         <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
//       </div>

//       {/* related novels */}
//       <div className="flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10">
//         {category.length !== 0 &&
//           category?.map((novel: any, index: number) => (
//             <Novel
//               href={novel.slug?.current}
//               cardBanner={novel.cardbannerurl}
//               novelName={novel.title}
//               writer={novel.writer.writername}
//               genre={novel.genre.genrename}
//               key={index}
//             />
//           ))}
//       </div>

//       {/* load more categories */}
//       {/* {loading && <Loader />} */}

//       {!loading && hasMore && (
//         <button
//           onClick={() => setPage((prev) => prev + 1)}
//           className="bg-tertiary w-fit px-2 py-1 font-bold text-primary active:bg-secondary active:text-tertiary rounded-sm self-center"
//         >
//           Load More
//         </button>
//       )}

//       {!hasMore && (
//         <p className="text-center text-tertiary opacity-50 py-3">
//           No more novels
//         </p>
//       )}
//     </div>
//   );
// }

"use client";
import Novel from "@/app/components/Cards/Novel";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Loader from "@/app/components/Loader";
import Loader2 from "@/app/components/Loader2";
import LoadMoreButton from "@/app/components/LoadMoreButton";

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";

  const [category, setCategory] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const fetchCategoryData = async (pageIndex: number, reset = false) => {
    try {
      setLoading(true);
      const query = `*[_type == "novelparent" && defined(novelreleasedate) && novelreleasedate <= now() && (genre->genreslug.current == "${slug}" || writer->writerslug.current == "${slug}") ] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {
        title, cardbannerurl, slug,
        _id, genre->{genrename,_id,genreslug}, writer->{writername,_id,writerslug}
      }`;

      const response = await client.fetch(query);
      console.log(response)

      // set category name safely
      if (response.length > 0) {
        const first = response[0];
        if (response[0].genre?.genreslug?.current === slug) {
          setCategoryName(response[0].genre.genrename);
        } else if (response[0].writer?.writerslug?.current === slug) {
          setCategoryName(response[0].writer.writername);
        }
      }else {
        // fallback agar response empty ho
        setCategoryName(slug);
      }

      // Append new data
      setCategory((prev) => (reset ? response : [...prev, ...response]));

      // Pagination end check
      if (response.length < limit) setHasMore(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCategory([]); // reset previous data
    setPage(0);
    setHasMore(true);
    fetchCategoryData(0, true);
  }, [slug]);

  useEffect(() => {
    if (page > 0) {
      fetchCategoryData(page);
      setLoader(<Loader2 />);
    }
  }, [page]);

  if (loading && category.length === 0) {
    return loader;
  }

  return (
    <div className="py-5 flex flex-col gap-6 lg:gap-10">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl text-tertiary">{categoryName}</h2>
        <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
      </div>

      <div className="flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10">
        {category.map((novel, index) => (
          <Novel
            href={novel.slug?.current}
            cardBanner={novel.cardbannerurl}
            novelName={novel.title}
            writer={novel.writer?.writername}
            genre={novel.genre?.genrename}
            key={index}
          />
        ))}
      </div>

      {loading && loader}

      {!loading && hasMore && (
        // <button
        //   onClick={() => setPage((prev) => prev + 1)}
        //   className="bg-tertiary w-fit px-2 py-1 font-bold text-primary active:bg-secondary active:text-tertiary rounded-sm self-center"
        // >
        //   Load More
        // </button>
        <LoadMoreButton onclick={() => setPage((prev) => prev + 1)} />
      )}

      {!hasMore && !loading && (
        <p className="text-center text-tertiary opacity-50 py-3">
          No more novels
        </p>
      )}
    </div>
  );
}
