"use client";
// import { icons } from "@/app/assets";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Heading from "@/app/components/Heading";
import Heading2 from "@/app/components/Heading2";
import { createClient } from "next-sanity";
import { addCommentAction } from "@/app/actions/Comments";
import Loader from "@/app/components/Loader";

// export const clientc = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: "2025-06-12", // ya latest date
//   token: process.env.SANITY_COMMENTS_TOKEN, // ⚡ write permission wala token
//   useCdn: false,
// });

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || "";
  // const id = params.id;
  const [novel, setNovel] = useState<any>({});
  const [bannerImageDesktop, setBannerImageDesktop] = useState<string>("");
  const [bannerImageMobile, setBannerImageMobile] = useState<string>("");
  const [body, setBody] = useState("");
  const [pdf, setPdf] = useState<string>("");
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false);
  const [commentsEnabledIcon, setCommentsEnabledIcon] = useState(
    "https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090313/opentertiary_xsoypy.png"
  );
  const [comments, setComments] = useState<
    { _id: string; name: string; comment: string; _createdAt: string }[]
  >([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        // delay for loader
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("internal delay");
          }, 2000);
        });

        const query = `*[_type == "novel"]{title, bannerimagemobile, bannerimagedesktop , _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf, comment[]->{name,_id,comment, _createdAt} }`;
        const response = await client.fetch(query);
        const Novel = response.find((item: any) => item._id === id);
        console.log(Novel, "---->>>");

        setNovel(Novel);
        setBody(Novel.body);
        setBannerImageDesktop(Novel.bannerimagedesktop);
        setBannerImageMobile(Novel.bannerimagemobile);
        setPdf(Novel.pdf);
        // console.log(Novel.comment)
        setComments(Novel.comment);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  // console.log(comments[0].name,"bahr")

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

  const OpeCcommentsEnabled = () => {
    setCommentsEnabled(!commentsEnabled);
    if (commentsEnabled === false) {
      console.log("closed");
    } else {
      console.log("opened");
    }
  };
  useEffect(() => {
    if (commentsEnabled === false) {
      setCommentsEnabledIcon("https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090353/closetertiary_xkhdd1.png");
    } else {
      setCommentsEnabledIcon("https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090313/opentertiary_xsoypy.png");
    }
  }, [commentsEnabled]);
  // iief
  async function addComment(
    novelId: string,
    name: string,
    commentText: string
  ) {
    try {
      // 1. naya comment doc create karna
      const newComment = await client.create({
        _type: "comment",
        name: commentName,
        comment: commentText,
      });

      // 2. novel ke comments[] me reference push karna
      await client
        .patch(novelId)
        .setIfMissing({ comment: [] }) // agar array empty ho to initialize
        .append("comment", [
          {
            _type: "reference",
            _ref: newComment._id,
          },
        ])
        .commit();

      console.log("✅ Comment added successfully!");
    } catch (error) {
      console.error("❌ Error adding comment:", error);
    }
  }
  const handleCommentSubmit = async () => {
    if (!commentName || !commentText) return;

    // await addComment(id, commentName, commentText);
    const newComment = await addCommentAction(id, commentName, commentText);

    // optionally UI refresh karna
    setComments((prev) => [
      // ...prev,
      ...(prev || []),
      {
        _id: newComment._id,
        name: commentName,
        comment: commentText,
        _createdAt: newComment._createdAt,
      },
    ]);
    setCommentName("");
    setCommentText("");
    alert("Comment posted Successfully");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col py-5 gap-6 lg:gap-10">
      {/* banner and title */}
      <div className="relative flex justify-center">
        {/* desktop */}
        <Image
          src={
            bannerImageDesktop ||
            "https://res.cloudinary.com/dx1gryhqc/image/upload/v1726319996/Resume_Builder_-_Google_Chrome_9_14_2024_6_12_43_PM_qpfxtc.png"
          }
          // src={icons.novelbannerdesktop}
          alt=""
          width={100}
          height={100}
          className="w-full h-[300px] lg:h-[400px] lg:object-cover hidden lg:block"
        />
        {/* mob */}
        <Image
          src={
            bannerImageMobile ||
            "https://res.cloudinary.com/dx1gryhqc/image/upload/v1726319996/Resume_Builder_-_Google_Chrome_9_14_2024_6_12_43_PM_qpfxtc.png"
          }
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
      <div className="px-10 lg:px-24 text-right text-tertiary leading-12 whitespace-pre-wrap font-urdu">
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
            src={"https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/download_tt1crr.png"}
            width={100}
            height={100}
            alt=""
          />
        </a>
      )}

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

      {/* Comments */}
      <div className="flex flex-col gap-10">
        {/* comments header */}
        <div className="flex flex-wrap gap-10">
          <div className="hidden lg:block">
            <Heading name="Comments" />
          </div>
          <div className="block lg:hidden">
            <Heading2 heading2="Comments" />
          </div>

          <button onClick={OpeCcommentsEnabled}>
            <Image
              src={commentsEnabledIcon}
              width={100}
              height={100}
              className={`w-6 h-6 cursor-pointer`}
              alt=""
            />
          </button>
        </div>

        {/* comments body - isko baad meyn dynamic krna h */}
        {commentsEnabled && (
          <div className="flex flex-col gap-10 lg:mx-10">
            {/* comments- filhal for a single comment but make it dynamic later*/}
            {/* ------------------ */}
            {comments &&
              comments.map(
                (
                  c: {
                    _id: string;
                    name: string;
                    comment: string;
                    _createdAt: string;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="border border-primary rounded-2xl px-2 py-4 flex gap-4 lg:gap-6 h-fit shadow-2xl  items-start"
                  >
                    {/* user icon */}
                    {/* <div className="border border-secondary p-6 rounded-full w-[50px] h-[50px]"> */}
                      <Image src={'https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090658/user_ibf2q1.png'} className="w-[50px] h-[50px] " alt="" width={100} height={100}/>
                    {/* </div> */}
                    {/* username, date, and comment */}
                    <div className="flex flex-col gap-3 text-sm lg:gap-6 justify-center">
                      <div className="flex items-center flex-wrap text-secondary gap-4">
                        {/* username and date */}
                        <p className="text-sm">{c.name}</p>
                        {/* <p className="text-xs">{c._createdAt}</p> */}
                        <p className="text-xs">{new Date(c._createdAt).toDateString()}</p>
                      </div>
                      <p className="text-wrap text-tertiary">{c.comment}</p>
                    </div>
                  </div>
                )
              )}

            {/* ----------------- */}
            {/* comments form */}
            <div className="border border-tertiary px-6 py-3  flex flex-col gap-3 text-tertiary lg:w-[40vw]">
              <Heading2 heading2="Leave a comment" />
              <input
                type="text"
                placeholder="Name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className=" border text-tertiary rounded px-2 py-1"
              />
              <textarea
                placeholder="Comment"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className=" border rounded px-2 py-1"
              />
              <button
                onClick={handleCommentSubmit}
                className="self-start border border-primary hover:border-secondary hover:text-secondary hover:bg-tertiary px-4 py-2 bg-secondary rounded text-xs"
              >
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
