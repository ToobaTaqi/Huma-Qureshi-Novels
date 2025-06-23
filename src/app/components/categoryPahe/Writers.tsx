"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "../Cards/CategoryCard";

export default function Writers() {
  const [writers, setWriters] = useState<any>([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await fetch("/api/writer").then((response) =>
          response.json()
        );
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
    <div className="flex flex-wrap gap-5 justify-center">
      <ul className="flex flex-wrap gap-5 justify-center">
        {writers.map((writer: any, index: number) => (
          <li key={index}>
            <CategoryCard href={writer._id} categoryName={writer.writername} />
          </li>
        ))}
      </ul>
      {/* <CategoryCard />
        <CategoryCard />
        <CategoryCard /> */}
    </div>
  );
}
