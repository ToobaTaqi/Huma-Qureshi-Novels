"use client";
import React, { useEffect, useState } from "react";
import Latest from "./components/homePageComponents/Latest";
import Trending from "./components/homePageComponents/Trending";
import Popular from "./components/homePageComponents/Popular";

export default function page() {
  console.log("for redeploy")
  return (
    <div className="text-tertiary flex flex-col gap-6 lg:py-10">
      <Latest />
      <Trending />
      <Popular />
    </div>
  );
}
