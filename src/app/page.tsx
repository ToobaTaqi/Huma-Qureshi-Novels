"use client";
import React, { useEffect, useState } from "react";
import Category from "./components/homePageComponents/Category";
import Novel from "./components/Cards/Novel";
import Heading from "./components/Heading";
import { client } from "@/sanity/lib/client";

export default function page() {
  const [latest, setLatest] = useState<any>([]);
  const [trending, setTrending] = useState<any>([]);
  const [popular, setPopular] = useState<any>([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const query = `*[_type == "novel"]{title, _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf{asset{_ref}}}`;
        const response = await client.fetch(query)
        // console.log(response)
        console.log(response[0].latest);

        // filtering latest
        let Latest = response.filter((l: any) => l.latest);

        setLatest(Latest);
        console.log("inside Latest", Latest);

        // filtering trending
        let Trending = response.filter((t: any) => t.trending);

        setTrending(Latest);
        console.log("inside Trending", Trending);

        // filtering popular
        let Popular = response.filter((p: any) => p.popular);

        setPopular(Popular);
        console.log("inside Popular", Popular);
      } catch (error) {}
    };

    fetching();
  }, []);

  console.log("outside latest", latest);
  console.log("outside Trending", trending);
  console.log("outside Poplular", popular);

  return (
    <div className="text-tertiary flex flex-col gap-6 lg:py-10">
      {/* latest */}
      <div className="py-5 flex flex-col gap-6 lg:gap-10" id="latest">
        <Heading name="Latest" />
        <div className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}>
          {latest.map((l: any, index: any) => (
            <Novel
              href={l._id}
              novelName={l.title}
              writer={l.writer.writername}
              genre={l.genre.genrename}
              key={index}
            />
          ))}
        </div>
      </div>

      {/* trending */}
      <div className="py-5 flex flex-col gap-6" id="trending">
        <Heading name="Trending" />
        <div className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}>
          {trending.map((t: any, index: any) => (
            <Novel
              href={t._id}
              novelName={t.title}
              writer={t.writer.writername}
              genre={t.genre.genrename}
              key={index}
            />
          ))}
        </div>
      </div>

      {/* popular */}
      <div className="py-5 flex flex-col gap-6" id="popular">
        <Heading name="Popular" />
        <div className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}>
          {popular.map((p: any, index: any) => (
            <Novel
              href={p._id}
              novelName={p.title}
              writer={p.writer.writername}
              genre={p.genre.genrename}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
