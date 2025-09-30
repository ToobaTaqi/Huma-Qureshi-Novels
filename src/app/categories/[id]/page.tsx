"use client";
import Novel from "@/app/components/Cards/Novel";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Loader from "@/app/components/Loader";

export default function page() {
  const params = useParams();
  const id = params.id;
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        // delay for loader
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("internal delay");
          }, 1000);
        });

        const query = `*[_type == "novel" && (genre._ref == "${id}" || writer._ref == "${id}") ]{title, cardbannerurl,
  _id, body, genre->{genrename,_id}, writer->{writername,_id}}`;
       
        const response = await client.fetch(query);
        console.log(response, "newwwwww-----------");


        if(id==response[0].genre._id){
          setCategoryName(response[0].genre.genrename)
        } else if (id==response[0].writer._id){
          setCategoryName(response[0].writer.writername)
        }
        setCategory(response)

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
    <div className="py-5 flex flex-col gap-6 lg:gap-10">
      {/* categpry id page {id} */}
      <div className="flex items-center gap-3">
        <h2 className="text-3xl text-tertiary">{categoryName}</h2>
        <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
      </div>
      {/* related novels */}
      <div className="flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10">
        { category.length !==0 && 
        category?.map((novel: any, index: number) => (
          <Novel
            href={novel._id}
            cardBanner={novel.cardbannerurl}
            novelName={novel.title}
            writer={novel.writer.writername}
            genre={novel.genre.genrename}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
