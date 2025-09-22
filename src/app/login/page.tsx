import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center py-10 text-tertiary">
      <h1 className=" font-bold text-5xl">Login</h1>
      <div className="py-6">
        <h2 className="text-center text-sm opacity-80">
          Welcome Back! please enter your details
        </h2>
        <div className="py-6 flex flex-col gap-4 lg:w-[30vw]">
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-xl">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="border rounded text-sm px-2 py-1"
            />
          </div>
          <div className="flex gap-2 flex-col ">
            <label htmlFor="" className="text-xl">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="border rounded text-sm px-2 py-1"
            />
          </div>
          <div className="flex gap-2 flex-col ">
            <label htmlFor="" className="text-xl">
              Key
            </label>
            <input
              type="text"
              placeholder="Enter your Key"
              className="border rounded text-sm px-2 py-1"
            />
          </div>
          <button className="border w-fit px-4 rounded self-center hover:text-secondary hover:border-secondary py-2">
            Login
          </button>
          <p className="text-xs opacity-80 text-center">Have'nt signedup yet? <Link href={"/signup"}><span className="hover:text-secondary">Sign Up Here</span></Link></p>
        </div>
      </div>
    </div>
  );
}
