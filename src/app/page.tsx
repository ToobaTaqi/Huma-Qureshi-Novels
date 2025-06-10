import React from "react";
import Logo from "./components/Logo";
import Category from "./components/homePageComponents/Category";

export default function page() {
  return (
    <div className="text-tertiary">
      <Category CategoryName="Latest"/>
    </div>
  );
}
