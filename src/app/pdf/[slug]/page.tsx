"use client";
import { useParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { addCommentAction } from "@/app/actions/Comments";
import Loader from "@/app/components/Loader";
import DownloadPDFButton from "@/app/components/novelPage/DownloadPDFButton";
import Tags from "@/app/components/novelPage/Tags";
import CommentForm from "@/app/components/novelPage/CommentForm";
import Comment from "@/app/components/novelPage/Comment";
import WatchOnYT from "@/app/components/novelPage/WatchOnYT";
import Episode from "@/app/components/Cards/Episode";
import NovelDescription from "@/app/components/novelPage/NovelDescription";
import Loader2 from "@/app/components/Loader2";
import LoadMoreButton from "@/app/components/LoadMoreButton";
import Image from "next/image";
import Heading from "@/app/components/Heading";

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  const [novel, setNovel] = useState<any>({});
  const [descriptionLang, setDescriptionLang] = useState<boolean>();
  const [banner, setBanner] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");
  const [yt, setYT] = useState<string>("");
  const [episodes, setEpisodes] = useState<
    { name: string; episodeteaser: any; episodeslug: any }[]
  >([]);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState<
    { _id: string; name: string; comment: string; _createdAt: string }[]
  >([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  // for episode loading
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const fetchNovels = async (pageIndex: number, reset = false) => {
    try {
      setLoading(true);
      const query = `*[_type == "pdf" && slug.current == "${slug}"][0]{title, slug, pdfdescription, descriptionlanguage, views, writer->{writername,_id}, genre->{genrename,_id}, latest ,popular, trending,  banner , _id, tags, pdfurl, youtubeurl, comment[]->{name,_id,comment, _createdAt} }`;
      const response = await client.fetch(query);

      setDescriptionLang(response.descriptionlanguage);
      setNovel(response);

    //   setEpisodes((prev: any) => (reset ? episodes : [...prev, ...episodes]));
    //   if (page >= 0) {
    //     setLoader(<Loader2 />);
    //   }
    //   if (episodes.length < limit) setHasMore(false);

    //   const viewsquery = `*[_type == "novel" && references("${response._id}") && defined(episodereleasedate) && episodereleasedate <= now() ]{views}`;
    //   const viewsresponse = await client.fetch(viewsquery);

    //   const epviews = viewsresponse.map((ep: any, i: number) => ep.views);
    //   const views = epviews.reduce(
    //     (total: number, curr: number) => total + curr,
    //     0
    //   );
      setViews(response.views);

      setBanner(response.banner);
      setPdf(response.pdfurl);
      setYT(response.youtubeurl);
      setComments(response.comment);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // fetchNovels();
  // ✅ first load
  useEffect(() => {
    fetchNovels(0, true);
  }, []);

  // ✅ load next pages
  useEffect(() => {
    if (page > 0) fetchNovels(page);
  }, [page]);

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

  return (
    <div className="flex flex-col py-5 gap-6 lg:gap-10">
      {/* banner and title */}
      <h1 className="text-2xl text-center lg:text-start lg:text-4xl font-bold px-3 py-2 lg:py-5 lg:px-5 rounded  text-tertiary">
        {`${novel?.title ?? "Loading..."} by ${novel?.writer?.writername ?? "Unknown writer"}`}
      </h1>

      {/* metadata */}
      <div className=" px-10 lg:px-24 text-secondary text-sm flex justify-start items-start  gap-5">
        <h1>Written by : {novel.writer?.writername || ""}</h1>
        <h1>Genre : {novel.genre?.genrename || ""}</h1>
      </div>

      {/* </div> */}

      <Image
        src={banner}
        alt=""
        // width={100}
        // height={100}
        className="w-[1920px] h-auto object-cover"
        width={1920}
        height={1080}
        priority
        quality={100}
      />

     
        <p className="text-secondary px-10 lg:px-24 flex gap-2 items-center self-end ">
          {views || 0} Downloads
          {/* <Image
            className="w-6 h-6"
            src={`https://res.cloudinary.com/dx1gryhqc/image/upload/v1760120134/view_1_nlipoq.png`}
            alt=""
            width={100}
            height={100}
          /> */}
        </p>
     

      {/* novel description */}
      {novel.pdfdescription && (
        <NovelDescription
          descText={novel.pdfdescription}
          font={descriptionLang ? "font-urdu" : ""}
          dir={descriptionLang ? "rtl" : "ltr"}
        />
      )}

      {/* all episodes */}
      {/* <div className="flex flex-wrap gap-5 justify-center ">
        <div
          className={`flex gap-5 flex-wrap justify-center lg:justify-start lg:px-28 lg:gap-10`}
        >
          {episodes.length > 0 ? (
            episodes.map((episode, index) => (
              <Episode
                key={index}
                href={`/novel/${slug}/${episode.episodeslug?.current}`}
                episodeTitle={episode?.name}
                teaser={episode.episodeteaser}
              />
            ))
          ) : (
            <p className="text-tertiary opacity-50 px-10">no episodes yet</p>
          )}
        </div>

        {loading && loader}
        {!loading && hasMore && (
          <LoadMoreButton onclick={() => setPage((prev) => prev + 1)} />
        )}
        {!hasMore && !loading && episodes.length > 0 && (
          <p className="text-center text-tertiary opacity-50 py-3">
            No more episodes
          </p>
        )}
      </div> */}

      {/* download and Youtube link buttons */}
      <div className="flex flex-wrap justify-center">
        {pdf && <DownloadPDFButton pdf={pdf} />}
       
        {yt && <WatchOnYT YTurl={yt} />}
      </div>

      {/* tags */}
      <Tags tags={novel.tags} />

      {/* Comments */}
      <div className="flex flex-col gap-10">
        <Heading name="Comments" />
        {/* comments body */}

        <div className="flex flex-col gap-10 lg:mx-10">
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
