import React from "react";
import CategoryCard from "../components/Cards/CategoryCard";
import Section from "../components/categoryPahe/Section";

export default function page() {
  return (
    <div className="py-5 flex flex-col gap-5">
     <Section name="Genres"/>
     <Section name="Authers"/>
    </div>
  );
}
