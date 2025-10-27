import React, { useEffect, useState } from "react";
import LoadMoreButton from "../LoadMoreButton";
import Novel from "../Cards/Novel";
import Heading from "../Heading";
import { client } from "@/sanity/lib/client";
import Loader from "../Loader";
import Loader2 from "../Loader2";
import Article from "../Cards/Article";

export default function FeaturedArticles() {
  const [trending, setTrending] = useState<any>([]);
  const [loading, setLoading] = useState(true); // loading state
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState(0); // page index
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const fetching = async (pageIndex: number) => {
    try {
      setLoading(true);

      // for latests
      const query = `*[_type == "article" && defined(articlereleasedate) && articlereleasedate <= now()]| order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {title, cardbannerurl , articleslug, _id, articlecategory->{articlecategory, _id}, writer->{writername,_id}, }`;
      const response = await client.fetch(query);
      // console.log(response)
      //
      if (response.length < limit) {
        setHasMore(false); // no more novels left
      }
      setTrending((prev: any) => [...prev, ...response]);
    } catch (error) {
      console.error("Error fetching novels", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetching(page);
    if (page > 0) setLoader(<Loader2 />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="py-5 flex flex-col gap-6 lg:gap-10" >
      <Heading name="Latest Articles" />
      <div
        className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}
      >
        {trending?.map((t: any, index: any) => (
          <Article
            href={t.articleslug?.current}
            cardBanner={t.cardbannerurl}
            articleName={t.title}
            writer={t.writer?.writername}
            category={t?.category?.title}
            key={index}
          />
        ))}
      </div>

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
