import React from "react";
import Logo from "./components/Logo";
import Category from "./components/homePageComponents/Category";

export default function page() {
  return (
    <div className="text-tertiary flex flex-col gap-6">
      {/* <Category CategoryName="Latest" flexType="wrap" overflowx="hidden"/>
      <Category CategoryName="Trending" flexType="nowrap" overflowx="auto"/>
      <Category CategoryName="Popular" flexType="" overflowx="auto"/> */}

      <Category CategoryName="Latest" flexType="wrap" />
      <Category CategoryName="Trending" flexType="nowrap"  />
      <Category CategoryName="Popular" flexType=""  />
    </div>
  );
}
