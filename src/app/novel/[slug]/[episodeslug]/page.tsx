"use client";
import { useParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { addCommentAction } from "@/app/actions/Comments";
import Loader from "@/app/components/Loader";
import NovelBody from "@/app/components/novelPage/NovelBody";
import Tags from "@/app/components/novelPage/Tags";
import CommentForm from "@/app/components/novelPage/CommentForm";
import Comment from "@/app/components/novelPage/Comment";

import Image from "next/image";
import Heading from "@/app/components/Heading";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  // const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  console.log(params.slug, "paramsss");
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  console.log(slug, "episodeslug");
  const episodeslug = Array.isArray(params.episodeslug)
    ? params.episodeslug[0]
    : params.episodeslug || "";
  console.log(episodeslug, "episodeslug");
  const [novel, setNovel] = useState<any>({});
  const [banner, setBanner] = useState<string>("");
  const [body, setBody] = useState("");
  const [comments, setComments] = useState<
    { _id: string; name: string; comment: string; _createdAt: string }[]
  >([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "novel" && episodeslug.current == "${episodeslug}"][0]{name, episodeslug, _id, body, views, novelparent->{title, slug, banner}, genre->{genrename,_id}, writer->{writername,_id}, tags, comment[]->{name,_id,comment,_createdAt}}`;
        const response = await client.fetch(query);

        setNovel(response);
        setBody(response.body);
        setBanner(response.novelparent.banner);
        setComments(response.comment);

        if (response._id && !localStorage.getItem(`viewed_${response._id}`)) {
          console.log(
            "🔥 sending view request to /api/views with:",
            response._id
          );

          fetch("/api/views", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: response._id }),
          });
          localStorage.setItem(`viewed_${response._id}`, "true");
          console.log(response._id, "insode if/e;se");
        }
      } catch (error) {
        console.error("Error fetching views:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

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

  const commentNameHandle = (e: any) => setCommentName(e.target.value);

  const commentTextHandle = (e: any) => setCommentText(e.target.value);

  const handleCommentSubmit = async () => {
    if (!commentName || !commentText) return;
    const newComment = await addCommentAction(
      novel._id,
      commentName,
      commentText
    );

    // optionally UI refresh karna
    setComments((prev) => [
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
      <h1 className="text-2xl text-center lg:text-start lg:text-4xl font-bold px-3 py-2 lg:py-5 lg:px-5 rounded  text-tertiary">
        {`${novel?.novelparent?.title ?? "Loading..."} by ${novel?.writer?.writername ?? "Unknown writer"}`}
      </h1>

      {/* metadata */}
      <div className=" px-10 lg:px-24 text-secondary text-sm flex justify-start items-start  gap-5">
        <h1>Written by : {novel.writer?.writername || ""}</h1>
        <h1>Genre : {novel.genre?.genrename || ""}</h1>
      </div>

      <Image
        src={banner}
        alt=""
        className="w-[1920px] h-auto object-cover"
        width={1920}
        height={1080}
        priority
        quality={100}
      />

      {novel.views > 0 && (
        <p className="px-10 lg:px-24 text-secondary flex gap-2 items-center self-end ">
          {novel.views}
          <Image
            className="w-6 h-6"
            src={`https://res.cloudinary.com/dx1gryhqc/image/upload/v1760120134/view_1_nlipoq.png`}
            alt=""
            width={100}
            height={100}
          />
        </p>
      )}

      <Heading name={`${novel?.name ?? "Unknown Title"}`} />

      {/* </div> */}
      {/* novel content */}
      <NovelBody novelText={paginatedText} />

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
      <Link
        href={`/novel/${novel?.novelparent?.slug?.current}`}
        className="text-[#fae397] text-xl flex justify-center items-center gap-3 border border-primary hover:border-tertiary w-fit self-center px-4 py-2 active:text-secondary active:border-secondary"
      >
        Read full novel{" "}
        <Image
          src={`https://res.cloudinary.com/dx1gryhqc/image/upload/v1763067414/storytelling_1_jlpbki.png`}
          className="w-7 h-7"
          alt=""
          width={100}
          height={100}
        />
      </Link>

      {/* tags */}
      <Tags tags={novel.tags} />

      {/* Comments */}
      <div className="flex flex-col gap-10">
        <Heading name="Comments" />

        <div className="flex flex-col gap-10 lg:mx-10">
          {/* comments form */}
          <CommentForm
            handleCommentSubmit={handleCommentSubmit}
            commentName={commentName}
            commentNameHandle={commentNameHandle}
            commentText={commentText}
            commentTextHandle={commentTextHandle}
          />
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
                <Comment
                  key={index}
                  name={c.name}
                  createdAt={c._createdAt}
                  comment={c.comment}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}
