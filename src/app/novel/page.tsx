"use client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Novel from "../components/Cards/Novel";
import { client } from "@/sanity/lib/client";
import Loader from "../components/Loader";
import LoadMoreButton from "../components/LoadMoreButton";
import Loader2 from "../components/Loader2";

export default function Page() {
  const [allNovels, setAllNovels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState(0); // page index
  const [hasMore, setHasMore] = useState(true); // check if more novels exist
  const limit = 4; // how many novels per fetch

  const fetchNovels = async (pageIndex: number) => {
    try {
      setLoading(true);

      // GROQ query with pagination

      const query = `*[_type == "novelparent" && defined(novelreleasedate) && novelreleasedate <= now()] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {
        title,
        cardbannerurl,
        _id, slug,
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
    if (page > 0) setLoader(<Loader2 />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex flex-col gap-5 py-5 justify-center">
      <Heading name="All Novels" />

      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start">
        {allNovels.map((novel, index) => (
          <Novel
            href={novel?.slug?.current ?? ""}
            cardBanner={novel.cardbannerurl}
            novelName={novel.title}
            writer={novel.writer?.writername}
            genre={novel.genre?.genrename}
            key={index}
          />
        ))}
      </ul>

      {loading && loader}

      {!loading && hasMore && (
        <LoadMoreButton onclick={() => setPage((prev) => prev + 1)} />
      )}

      {!hasMore && (
        <p className="text-center text-tertiary opacity-50 py-3">
          No more novels
        </p>
      )}
    </div>
  );
}
