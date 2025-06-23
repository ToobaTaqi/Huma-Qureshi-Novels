"use client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Novel from "../components/Cards/Novel";

export default function page() {
  const [allNovels, setAllNovels] = useState<any>([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await fetch("/api/novel").then((response) =>
          response.json()
        );
        setAllNovels(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchWriters();
  }, []);

  return (
    <div className="flex flex-col gap-5 py-5 justify-center">
      <Heading name="All Novels" />
      <ul className="flex flex-wrap gap-5 justify-center">
        {allNovels.map((novel: any, index: number) => (
          <Novel href={novel._id}
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
