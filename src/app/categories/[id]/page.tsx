"use client";
import Novel from "@/app/components/Cards/Novel";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const params = useParams();
  const id = params.id;
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  // const [categoryType,setCategoryType]=useState("") //writtenby or genre(you searched by writer or genre wali line- optional)

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await fetch("/api/novel").then((response) =>
          response.json()
        );
        console.log(response, "-----------");
        //
        const Category = response.filter(
          (item: any) => item.genre._id === id || item.writer._id === id
        );

        if (Category.length > 0) {
          const match = Category[0];
          if (match.genre._id === id) {
            setCategoryName(match.genre.genrename);
          } else if (match.writer._id === id) {
            setCategoryName(match.writer.writername);
          }
        }

        console.log("find novel", Category);
        // setSelectedNovel(novel);
        setCategory(Category);

        // console.log("inside Category", Category);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchWriters();
  }, []);

  return (
    <div className="py-5 flex flex-col gap-5">
      categpry id page {id}
      <div className="flex items-center gap-3">
        <h2 className="text-3xl text-tertiary">{categoryName}</h2>
        <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
      </div>
      {/* related novels */}
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {category.map((novel:any, index:number) => (
          <Novel href={novel._id}
            novelName={novel.title}
            writer={novel.writer.writername}
            genre={novel.genre.genrename}
            key={index}
          />
        ))}
        {/* <Novel/>
        <Novel/>
        <Novel/>
        <Novel/> */}
      </div>
    </div>
  );
}
