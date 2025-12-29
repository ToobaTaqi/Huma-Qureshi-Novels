import React, { useEffect, useState } from "react";
import LoadMoreButton from "../LoadMoreButton";
import Novel from "../Cards/Novel";
import Heading from "../Heading";
import { client } from "@/sanity/lib/client";
import Loader from "../Loader";
import Loader2 from "../Loader2";

export default function Latest() {
  const [latest, setLatest] = useState<any>([]);
  const [loading, setLoading] = useState(true); // loading state
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState(0); // page index
  const [hasMoreLatests, setHasMoreLatests] = useState(true);
  const limit = 4;

  const fetching = async (pageIndex: number) => {
    try {
      setLoading(true);

      // for latests
      //     const query = `*[
      // _type == "novelparent" && trending == true ] | order(_createdAt desc) `;

      const query = `*[_type == "novelparent" && latest==true && defined(novelreleasedate) && novelreleasedate <= now() ]| order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {title, cardbannerurl , slug, _id, genre->{genrename,_id}, writer->{writername,_id},latest ,popular, trending}`;
      const response = await client.fetch(query);
      // console.log(response, "this is r4essdsdas");
      //
      if (response.length < limit) {
        setHasMoreLatests(false); // no more novels left
      }
      setLatest((prev: any) => [...prev, ...response]);
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
    <>
      {latest.length > 0 && (
        <div className="py-5 flex flex-col gap-6 lg:gap-10" id="latest">
          <Heading name="Latest" />
          <div
            className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}
          >
            {latest?.map((l: any, index: any) => (
              <Novel
                href={l.slug?.current}
                cardBanner={l.cardbannerurl}
                novelName={l.title}
                writer={l.writer.writername}
                genre={l.genre.genrename}
                key={index}
              />
            ))}
          </div>

          {loading && loader}
          {!loading && hasMoreLatests && (
            <LoadMoreButton onclick={() => setPage((prev) => prev + 1)} />
          )}
          {!hasMoreLatests && (
            <p className="text-center text-tertiary opacity-50 py-3">
              No more novels
            </p>
          )}
        </div>
      )}
    </>
  );
}
