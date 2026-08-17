import React from "react";

export default function Loader() {
  return (
    // <div className=" flex flex-wrap items-center justify-center w-full min-h-screen">
    //   <div className="loader text-5xl lg:text-8xl text-wrap"></div>
    // </div>
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary text-tertiary">
      <div className="loader text-5xl lg:text-8xl"></div>
    </div>
  );
}
