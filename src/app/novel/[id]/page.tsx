"use client";
import { icons } from "@/app/assets";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";

export default function Page() {
  const params = useParams();
  const id = params.id;
  const [novel, setNovel] = useState<any>({});
  const [bannerImageDesktop, setBannerImageDesktop] = useState<string>("");
  const [bannerImageMobile, setBannerImageMobile] = useState<string>("");
  const [body, setBody] = useState("");
  const [pdf, setPdf] = useState<string>("");

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const query = `*[_type == "novel"]{title, bannerimagemobile, bannerimagedesktop , _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf}`;
        const response = await client.fetch(query);
        // console.log(response, "-----------");
        //
        const Novel = response.find((item: any) => item._id === id);
        console.log(Novel, "---->>>");

        setNovel(Novel);
        setBody(Novel.body);
        setBannerImageDesktop(Novel.bannerimagedesktop);
        console.log(
          Novel.bannerimagedesktop,
          ".....................----------------"
        );
        setBannerImageMobile(Novel.bannerimagemobile);

        let ref = Novel.pdf;
        setPdf(Novel.pdf);
        // console.log(ref,"pdffffffffffffffff")
        // let lnk = ref?.split("-");
        // const Url = ref[1];
        // console.log(Url, "reffffffffffffffffffffff");
        // setPdfId(Url);
        // console.log(lnk[1], "<--Link");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchNovels();
  }, []);
  // console.log(bannerimage)
  // console.log(novel.title);

  // pagination
  const words = body.split(/(\s+)/); // keep spaces + line breaks
  const wordsPerPage = 500;
  const totalPages = Math.ceil(words.length / wordsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedText = useMemo(() => {
    const start = (currentPage - 1) * wordsPerPage;
    const end = start + wordsPerPage;
    return words.slice(start, end).join(""); // preserve formatting
  }, [currentPage, words]);

  return (
    <div className="flex flex-col py-5 gap-6 lg:gap-10">
      {/* banner and title */}
      <div className="relative flex justify-center">
        {/* desktop */}
        <Image
          src={bannerImageDesktop}
          // src={icons.novelbannerdesktop}
          alt=""
          width={100}
          height={100}
          className="w-full h-[300px] lg:h-[400px] lg:object-cover hidden lg:block"
        />
        {/* mob */}
        <Image
          src={bannerImageMobile}
          // src={icons.novelbanner}
          alt=""
          width={100}
          height={100}
          className="w-full h-[300px] object-fill lg:hidden"
        />
        <h1 className="text-2xl lg:text-4xl text-primary font-bold px-3 py-2 lg:py-5 lg:px-5 rounded absolute top-[130px] lg:top-[150px] w-fit bg-tertiary text-center ">
          {novel.title}
        </h1>
      </div>

      {/* novel content */}
      <div className="px-10 lg:px-24 text-right text-tertiary leading-7 whitespace-pre-wrap">
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
      {pdf && (
        <a
          href={pdf}
          target="blank"
          className="px-10 flex gap-1 justify-center flex-wrap border border-primary active:border-tertiary rounded py-2 w-fit self-center"
        >
          <p className="text-tertiary">Download PDF</p>
          <Image
            className="w-6 h-6"
            src={icons.download}
            width={100}
            height={100}
            alt=""
          />
        </a>
      )}

      {/* <a
        href={`https://cdn.sanity.io/files/92mgyrwt/production/${pdfId}.pdf`}
        target="blank"
        className="px-10 flex gap-1 justify-center flex-wrap border border-primary active:border-tertiary rounded py-2 w-fit self-center"
      >
        <p className="text-tertiary">Download PDF</p>
        <Image
          className="w-6 h-6"
          src={icons.download}
          width={100}
          height={100}
          alt=""
        />
      </a> */}

      {/* meta */}
      <div className="px-10 text-secondary text-xs opacity-70 flex gap-5">
        <h1>Written by : {novel.writer?.writername || ""}</h1>
        <h1>Genre : {novel.genre?.genrename}</h1>
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-3 text-xs px-10 font-semibold opacity-70">
        {novel.tags?.map((t: any, index: number) => (
          <p
            key={index}
            className="text-secondary border border-secondary px-2 py-1 self-center"
          >
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}
