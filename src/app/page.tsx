"use client";
import React, { useEffect, useState } from "react";
// import Category from "./components/homePageComponents/Category";
import Novel from "./components/Cards/Novel";
import Heading from "./components/Heading";
import { client } from "@/sanity/lib/client";
import Loader from "./components/Loader";

export default function page() {
  // await new Promise((resolve)=>{
  //   setTimeout(() => {
  //     resolve("internal delay")
  //   }, 200);
  // })

  const [latest, setLatest] = useState<any>([]);
  const [trending, setTrending] = useState<any>([]);
  const [popular, setPopular] = useState<any>([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetching = async () => {
      try {
        // delay
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("internal delay");
          }, 2000);
        });
        // const query = `*[_type == "novel"]{title, cardbannerurl _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf{asset{_ref}}}`;
        const query = `*[_type == "novel"]{title,cardbannerurl , _id, genre->{genrename,_id}, writer->{writername,_id},latest ,popular, trending, }`;
        const response = await client.fetch(query);
        // console.log(response)
        // console.log(response, "-----------this is resss");

        // filtering latest
        let Latest = response.filter((l: any) => l.latest);
        // console.log(Latest, "------------==============");

        setLatest(Latest);
        // console.log("inside Latest", Latest);

        // filtering trending
        let Trending = response.filter((t: any) => t.trending);

        setTrending(Trending);
        // console.log("inside Trending", Trending);

        // filtering popular
        let Popular = response.filter((p: any) => p.popular);

        setPopular(Popular);
        console.log("inside Popular", Popular);
      } catch (error) {
        console.error("Error fetching novels", error);
      } finally {
        setLoading(false);
      }
    };

    fetching();
  }, []);

  if (loading) {
    return <Loader/>
  }
  // console.log("outside latest", latest);
  // console.log("outside Trending", trending);
  // console.log("outside Poplular", popular);

  return (
    <div className="text-tertiary flex flex-col gap-6 lg:py-10">
      {/* latest */}
      <div className="py-5 flex flex-col gap-6 lg:gap-10" id="latest">
        <Heading name="Latest" />
        <div
          className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}
        >
          {latest?.map((l: any, index: any) => (
            <Novel
              href={l._id}
              cardBanner={l.cardbannerurl}
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
        <div
          className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}
        >
          {trending?.map((t: any, index: any) => (
            <Novel
              href={t._id}
              cardBanner={t.cardbannerurl}
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
        <div
          className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}
        >
          {popular?.map((p: any, index: any) => (
            <Novel
              href={p._id}
              cardBanner={p.cardbannerurl}
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
