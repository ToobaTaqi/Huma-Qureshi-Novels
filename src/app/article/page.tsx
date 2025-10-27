"use client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Novel from "../components/Cards/Novel";
import { client } from "@/sanity/lib/client";
import Loader from "../components/Loader";
import LoadMoreButton from "../components/LoadMoreButton";
import Loader2 from "../components/Loader2";
import Article from "../components/Cards/Article";

export default function Page() {
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState(0); // page index
  const [hasMore, setHasMore] = useState(true); // check if more novels exist
  const limit = 4; // how many novels per fetch

  const fetchNovels = async (pageIndex: number) => {
    try {
      setLoading(true);

      // GROQ query with pagination

      const query = `*[_type == "article" && defined(articlereleasedate) && articlereleasedate <= now()] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {
        title,
        cardbannerurl,
        _id, articleslug, articlecategory->{title},
        writer->{writername,_id},
      }`;

      const response = await client.fetch(query);
      console.log(response)

      if (response.length < limit) {
        setHasMore(false); // no more novels left
      }

      setAllArticles((prev) => [...prev, ...response]);
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
      <Heading name="All Articles" />

      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start">
        {allArticles.map((article, index) => (
          <Article
            href={article?.articleslug?.current ?? ""}
            cardBanner={article.cardbannerurl}
            articleName={article.title}
            writer={article.writer?.writername}
            category={article.articlecategory?.title}
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
          No more articles
        </p>
      )}
    </div>
  );
}
