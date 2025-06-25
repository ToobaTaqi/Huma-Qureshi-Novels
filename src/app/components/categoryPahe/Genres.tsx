"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../Cards/CategoryCard";

export default function Genres() {
  const [genres, setGenres] = useState<any>([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await fetch("/api/genre").then((response) =>
          response.json()
        );
        // const responses = response.map((r: any) => r);
        // console.log("responses",responses)
        // setGenres(response.map((r: any) => r));
        // console.log("finalll", genres);
        setGenres(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchWriters();
  }, []);
  // console.log("genre outside",genres[0]._id)

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
