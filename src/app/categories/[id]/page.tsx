"use client";
import Novel from "@/app/components/Cards/Novel";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();
  const id = params.id;
  return (
    <div className="py-5 flex flex-col gap-5">
      categpry id page {id}
      <div className="flex items-center gap-3">
        <h2 className="text-3xl text-tertiary">Category name</h2>
        <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
      </div>
      {/* related novels */}
      <div className="flex flex-wrap gap-5 justify-center items-center">
        <Novel/>
        <Novel/>
        <Novel/>
        <Novel/>
      </div>
    </div>
  );
}
