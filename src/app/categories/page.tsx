import React from "react";
import CategoryCard from "../components/Cards/CategoryCard";
// import Section from "../components/categoryPahe/Section";
import Heading from "../components/Heading";
import Genres from "../components/categoryPahe/Genres";
import Writers from "../components/categoryPahe/Writers";

export default async function page() {
   await new Promise((resolve) => {
          setTimeout(() => {
            resolve("internal delay");
          }, 2000);
        });
  return (
    <div className="py-5 flex flex-col gap-6 lg:py-10">
      <div className="flex flex-col gap-6 lg:gap-10 justify-center ">
        <Heading name="Genres" />
        <Genres />
      </div>
      <div className="flex flex-col gap-6 lg:gap-10 justify-center">
        <Heading name="Writers" />
        <Writers />
      </div>
    </div>
  );
}
