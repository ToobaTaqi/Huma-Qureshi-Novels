"use client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Novel from "../components/Cards/Novel";
import { client } from "@/sanity/lib/client";
import Loader from "../components/Loader";

export default function page() {
  const [allNovels, setAllNovels] = useState<any>([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("internal delay");
          }, 2000);
        });

        const query = `*[_type == "novel"]{title, cardbannerurl, _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf{asset{_ref}}}`;
        const response = await client.fetch(query);
        setAllNovels(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWriters();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-5 py-5 justify-center">
      <Heading name="All Novels" />
      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start">
        {allNovels.map((novel: any, index: number) => (
          <Novel
            href={novel._id}
            cardBanner={novel.cardbannerurl}
            novelName={novel.title}
            writer={novel.writer.writername}
            genre={novel.genre.genrename}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}
