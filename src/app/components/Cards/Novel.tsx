import React from "react";

export default function Novel() {
  return (
    <div className="w-[200px] rounded-xl flex flex-col justify-center items-center py-4 gap-3 shadow-2xl hover:border hover:border-secondary">
      <h1 className="w-[170px] h-[120px] bg-secondary flex items-center justify-center text-2xl text-wrap text-center">Novel Novel Novel Name</h1>

      <div className="flex flex-col justify-start text-start gap-2">
        <div className="flex gap-2 text-sm">
            <h2>Writer :</h2>
            <p>HQ</p>
        </div>
        <div className="flex gap-2 text-sm">
            <h2>Genre :</h2>
            <p>Horror</p>
        </div>
        <button className="bg-tertiary text-primary hover:bg-secondary hover:text-tertiary rounded-sm">
            Read
        </button>
      </div>
    </div>
  );
}
