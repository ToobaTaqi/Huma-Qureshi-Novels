import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Huma Qureshi",
  description: "Learn about Huma Qureshi — a passionate Urdu novelist, story writer, and ghost writer from Pakistan. Read about her writing journey, published works, and creative vision.",
  alternates: { canonical: "https://humaqureshinovels.com/about" },
};

export default function page() {
  return (
    <div className="flex flex-col gap-6 py-5">
      {/* Hero Banner */}
      <section className="relative mx-4 lg:mx-0 rounded-3xl overflow-hidden bg-[#1E5D50] shadow-2xl">
        <div aria-hidden="true" className="absolute inset-0 -z-0">
          <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-[#2F7565]/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[200px] rounded-full bg-[#C9A96E]/15 blur-3xl"></div>
        </div>
        <div className="relative text-center px-6 py-12 lg:py-16 flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-base lg:text-lg leading-8 text-white/80">
            A passionate storyteller, novelist, and ghost writer from Pakistan.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="flex flex-col gap-6 max-w-4xl mx-auto px-3 sm:px-4">
        {/* Intro */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <p className="text-lg leading-8 font-medium">
            Hi, I&apos;m <span className="font-bold text-[#1E5D50]">Huma Qureshi</span>, a passionate storyteller and novelist, and ghost writer.
          </p>
          <p className="leading-8">
            Writing for me is not just talent, it is an emotion, a voice, and a lifelong craft that allows me to explore the many shades of human relationships, love, betrayal, sacrifice, and resilience.
          </p>
          <p className="leading-8">
            Although I occasionally use my real name Aiman Qureshi, I write primarily under my pen name Huma Qureshi, inspired by my mother&apos;s name. A tribute to the woman who shaped my love for literature.
          </p>
        </div>

        {/* Writing Journey */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">My Writing Journey</h2>
          <p className="leading-8">
            I began writing five years ago, publishing my earliest work on social platforms. From there, my stories spread across different mediums and platforms — not through marketing, but through readers who kept sharing, recommending, and reposting them. I have also published work on Amazon Kindle, including collaborative and ghost-written projects.
          </p>
        </div>

        {/* What I've Written */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">Till Now, I Have Written</h2>
          <ul className="list-disc ps-6 flex flex-col gap-2 font-medium">
            <li>10 full-length Urdu novels</li>
            <li>10 short novels &amp; afsanas</li>
            <li>Multiple short fiction pieces</li>
            <li>Low-content books (Amazon)</li>
            <li>Several commissioned projects as a Ghost Writer (Urdu &amp; English)</li>
          </ul>
        </div>

        {/* Genres */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">My Stories Often Explore</h2>
          <ul className="list-disc ps-6 flex flex-col gap-2 font-medium">
            <li>Romance &amp; Emotional Fiction</li>
            <li>Women-Centric Narratives</li>
            <li>Social Drama</li>
            <li>Mystery &amp; Suspense (Occasionally)</li>
            <li>Realistic &amp; Thought-Provoking Themes</li>
          </ul>
        </div>

        {/* Published On */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">Published &amp; Available On</h2>
          <p className="leading-8">
            I strongly believe literature is a mirror. It reflects society as it is, and as it could be.
          </p>
          <ul className="list-disc ps-6 flex flex-col gap-2 font-medium">
            <li>Amazon Kindle</li>
            <li>Google Play Books</li>
            <li>Various online reading websites</li>
            <li>YouTube channels</li>
            <li>Digital storytelling platforms</li>
          </ul>
          <p className="leading-8">
            Some of my stories are widely circulated online, shared by readers and platforms across the web.
          </p>
        </div>

        {/* Why I Write */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">Why I Write</h2>
          <ul className="list-disc ps-6 flex flex-col gap-2 font-medium">
            <li>Because stories matter.</li>
            <li>Because women deserve narratives where they fight, fall, break, rise, and win.</li>
            <li>Because fiction should entertain — but also question, challenge, and reveal.</li>
          </ul>
        </div>

        {/* Connect */}
        <div className="bg-[#1E5D50] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden text-center">
          <h2 className="text-2xl font-extrabold text-white">Let&apos;s Connect</h2>
          <p className="leading-8 text-white/80">
            For collaborations, ghost writing requests, rights inquiries, or general messages, please visit the{" "}
            <Link href="/contact" className="font-bold text-[#C9A96E] underline underline-offset-4">
              Contact page
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
