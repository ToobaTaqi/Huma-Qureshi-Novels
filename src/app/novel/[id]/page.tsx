"use client";
import { useParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { addCommentAction } from "@/app/actions/Comments";
import Loader from "@/app/components/Loader";
import NovelHeader from "@/app/components/novelPage/NovelHeader";
import NovelBody from "@/app/components/novelPage/NovelBody";
import DownloadPDFButton from "@/app/components/novelPage/DownloadPDFButton";
import NovelMetaData from "@/app/components/novelPage/NovelMetaData";
import Tags from "@/app/components/novelPage/Tags";
import CommentsHeader from "@/app/components/novelPage/CommentsHeader";
import CommentForm from "@/app/components/novelPage/CommentForm";
import Comment from "@/app/components/novelPage/Comment";

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

        const query = `*[_type == "novel" && _id == "${id}"][0]{title, bannerimagemobile, bannerimagedesktop , _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags, pdf, comment[]->{name,_id,comment, _createdAt} }`;
        const response = await client.fetch(query);
        // console.log(response, "---->>>");

        setNovel(response);
        setBody(response.body);
        setBannerImageDesktop(response.bannerimagedesktop);
        setBannerImageMobile(response.bannerimagemobile);
        setPdf(response.pdf);
        setComments(response.comment);
      } catch (error) {
        console.error("Error fetching products:", error);
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
      setCommentsEnabledIcon(
        "https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090353/closetertiary_xkhdd1.png"
      );
    } else {
      setCommentsEnabledIcon(
        "https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090313/opentertiary_xsoypy.png"
      );
    }
  }, [commentsEnabled]);

  const commentNameHandle = (e: any) => setCommentName(e.target.value);

  const commentTextHandle = (e: any) => setCommentText(e.target.value);

  const handleCommentSubmit = async () => {
    if (!commentName || !commentText) return;
    const newComment = await addCommentAction(id, commentName, commentText);

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
      <NovelHeader
        bannerImageDesktop={bannerImageDesktop}
        bannerImageMobile={bannerImageMobile}
        novelTitle={novel.title}
      />

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
      {pdf && <DownloadPDFButton pdf={pdf} />}

      {/* metadata */}
      <NovelMetaData
        writer={novel.writer?.writername}
        genre={novel.genre?.genrename}
      />

      {/* tags */}
      <Tags tags={novel.tags} />

      {/* Comments */}
      <div className="flex flex-col gap-10">
        <CommentsHeader
          enabling={OpeCcommentsEnabled}
          icon={commentsEnabledIcon}
        />
        {/* comments body */}
        {commentsEnabled && (
          <div className="flex flex-col gap-10 lg:mx-10">
            {/* comments- filhal for a single comment but make it dynamic later*/}
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

            {/* comments form */}
            <CommentForm
              handleCommentSubmit={handleCommentSubmit}
              commentName={commentName}
              commentNameHandle={commentNameHandle}
              commentText={commentText}
              commentTextHandle={commentTextHandle}
            />
          </div>
        )}
      </div>
    </div>
  );
}
