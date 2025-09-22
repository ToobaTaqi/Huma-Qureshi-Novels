"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../Cards/CategoryCard";
import { client } from "@/sanity/lib/client";

export default function Genres() {
  const [genres, setGenres] = useState<any>([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const query = `*[_type == "genre"]{
  _id, genrename 
}`;
        const response = await client
          .fetch(query)
        // const responses = response.map((r: any) => r);
        // console.log("responses",responses)
        // setGenres(response.map((r: any) => r));
        // console.log("finalll", response);
        setGenres(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchWriters();
  }, []);
  // console.log("genre outside",genres)

  return (
    // <div className="flex flex-wrap gap-5 justify-center ">
    <ul className="flex flex-wrap gap-5 justify-center lg:justify-start lg:px-28 lg:gap-10">
      {genres.map((genre: any, index: number) => (
        <li key={index}>
          <CategoryCard href={genre._id} categoryName={genre.genrename} />
        </li>
      ))}
    </ul>

    // </div>
  );
}
