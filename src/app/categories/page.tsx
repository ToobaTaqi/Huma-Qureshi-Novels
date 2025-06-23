import React from "react";
import CategoryCard from "../components/Cards/CategoryCard";
// import Section from "../components/categoryPahe/Section";
import Heading from "../components/Heading";
import Genres from "../components/categoryPahe/Genres";
import Writers from "../components/categoryPahe/Writers";

export default function page() {
  return (
    <div className="py-5 flex flex-col gap-5">
      <div className="flex flex-col gap-5 justify-center">
        <Heading name="Genres" />
        <Genres />
      </div>
      <div className="flex flex-wrap flex-col gap-5 justify-center">
        <Heading name="Writers" />
        <Writers />
      </div>
    </div>
  );
}
