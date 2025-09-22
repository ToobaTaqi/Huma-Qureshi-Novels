"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../Cards/CategoryCard";
import { client } from "@/sanity/lib/client";

export default function Writers() {
  const [writers, setWriters] = useState<any>([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
         const query = `*[_type == "writer"]{
  _id, writername 
}
  `;
        const response = await client.fetch(query)
        // const responses = response.map((r: any) => r);
        // console.log("responses",responses)
        // setGenres(response.map((r: any) => r));
        // console.log("finalll", genres);
        setWriters(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchWriters();
  }, []);
  console.log("genre outside",writers[0])

  return (
    // <div className="flex flex-wrap gap-5 justify-center">
      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start lg:px-28 lg:gap-10">
        {writers.map((writer: any, index: number) => (
          <li key={index}>
            <CategoryCard href={writer._id} categoryName={writer.writername} />
          </li>
        ))}
      </ul>
     
    // </div>
  );
}
