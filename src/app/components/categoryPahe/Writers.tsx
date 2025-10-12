"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../Cards/CategoryCard";
import { client } from "@/sanity/lib/client";
import Loader from "../Loader";
import Loader2 from "../Loader2";
import LoadMoreButton from "../LoadMoreButton";

export default function Writers() {
  const [writers, setWriters] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const fetchWriters = async (pageIndex: number, reset = false) => {
    try {
      setLoading(true);
      const query = `*[_type == "writer"] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {
         _id,
         writername,
         writercardimageurl,
         "writerslug": writerslug.current
       }`;

      const response = await client.fetch(query);

      setWriters((prev: any) => (reset ? response : [...prev, ...response]));

      if (page > 0) {
        setLoader(<Loader2 />);
      }

      if (response.length < limit) setHasMore(false);
    } catch (error) {
      console.error("Error fetching writers:", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log("writers outside", writers[0]);

  // ✅ first load
  useEffect(() => {
    fetchWriters(0, true);
  }, []);

  // ✅ load next pages
  useEffect(() => {
    if (page > 0) fetchWriters(page);
  }, [page]);

  return (
    <div className="flex flex-col gap-3 items-center">
      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start lg:px-28 lg:gap-10">
        {writers.map((writer: any, index: number) => (
          <li key={index}>
            <CategoryCard
              href={writer.writerslug}
              categoryName={writer.writername}
              imgUrl={writer.writercardimageurl}
            />
          </li>
        ))}
      </ul>

      {loading && loader  }

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
      {!hasMore && !loading && writers.length > 0 && (
        <p className="text-center text-tertiary opacity-50 py-3">
          No more writers
        </p>
      )}
    </div>
  );
}
