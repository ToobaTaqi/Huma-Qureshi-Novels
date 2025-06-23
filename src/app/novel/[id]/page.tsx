"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

export default function Page() {
  const params = useParams();
  const id = params.id;
  const [novel, setNovel] = useState<any>({});
  const [body, setBody] = useState("");
  const [pdfId, setPdfId] = useState("");

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await fetch("/api/novel").then((response) =>
          response.json()
        );
        console.log(response, "-----------");
        //
        const Novel = response.find((item: any) => item._id === id);
        // console.log(Novel.pdf.asset._ref, "---->>>");

        setNovel(Novel);
        setBody(Novel.body);
        let ref = Novel.pdf.asset._ref.split("-");
        // let lnk = ref?.split("-");
        const Url=ref[1]
        console.log(Url,'reffffffffffffffffffffff');
        setPdfId(Url)
        // console.log(lnk[1], "<--Link");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchNovels();
  }, []);

  // console.log(novel.title);

  // pagination
  const words = body.trim().split(/\s+/);
  const wordsPerPage = 300;
  const totalPages = Math.ceil(words.length / wordsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedText = useMemo(() => {
    const start = (currentPage - 1) * wordsPerPage;
    const end = start + wordsPerPage;
    return words.slice(start, end).join(" ");
  }, [currentPage, words]);


  return (
    <div className="flex flex-col py-5 gap-5">
      {/* banner and title */}
      <div className="relative flex justify-center">
        <img
          src={`https://t4.ftcdn.net/jpg/07/64/23/43/360_F_764234350_QUDgtPXyvJsCuJr2bZpSNfCKtYYtlrVj.jpg`}
          alt=""
          width={100}
          height={100}
          className="w-full h-[300px] object-cover"
        />
        <h1 className="text-2xl text-primary font-bold px-3 py-2 rounded absolute top-[130px] w-fit bg-tertiary text-center ">
          {novel.title}
        </h1>
      </div>

      {/* novel content */}
      <div className="px-10 text-right text-tertiary leading-7 whitespace-pre-wrap">
        <p dir="rtl">{paginatedText}</p>
      </div>

      {/* pagination buttons */}
      <div className="px-10 flex gap-2 justify-center flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border text-sm ${
              currentPage === page
                ? "bg-secondary text-white"
                : "bg-primary text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* download button */}
      <div className="px-10 flex gap-2 justify-center flex-wrap">
        <a
          href={`https://cdn.sanity.io/files/92mgyrwt/production/${pdfId}.pdf`}
          target="blank"
          className="text-tertiary active:text-secondary"
        >
          Download PDF
        </a>
      </div>

      {/* meta */}
      <div className="px-10 text-secondary text-xs opacity-70 flex gap-5">
        <h1>Written by : {novel.writer?.writername || ""}</h1>
        <h1>Genre : {novel.genre?.genrename}</h1>
      </div>

      {/* tags */}
      <div className="flex gap-3 text-xs px-10 font-semibold opacity-70">
        {novel.tags?.map((t: any, index: number) => (
          <p
            key={index}
            className="text-secondary border border-secondary px-2 py-1"
          >
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}
