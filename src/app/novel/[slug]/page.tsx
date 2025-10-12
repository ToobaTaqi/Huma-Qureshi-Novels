"use client";
import { useParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { addCommentAction } from "@/app/actions/Comments";
import Loader from "@/app/components/Loader";
import NovelHeader from "@/app/components/novelPage/NovelHeader";
import DownloadPDFButton from "@/app/components/novelPage/DownloadPDFButton";
import NovelMetaData from "@/app/components/novelPage/NovelMetaData";
import Tags from "@/app/components/novelPage/Tags";
import CommentsHeader from "@/app/components/novelPage/CommentsHeader";
import CommentForm from "@/app/components/novelPage/CommentForm";
import Comment from "@/app/components/novelPage/Comment";
import WatchOnYT from "@/app/components/novelPage/WatchOnYT";
import Episode from "@/app/components/Cards/Episode";
import NovelDescription from "@/app/components/novelPage/NovelDescription";
import Loader2 from "@/app/components/Loader2";
import LoadMoreButton from "@/app/components/LoadMoreButton";

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  // const id = params.id;
  const [novel, setNovel] = useState<any>({});
  const [descriptionLang, setDescriptionLang] = useState<boolean>();
  const [bannerImageDesktop, setBannerImageDesktop] = useState<string>("");
  const [bannerImageMobile, setBannerImageMobile] = useState<string>("");
  // const [body, setBody] = useState("");
  const [pdf, setPdf] = useState<string>("");
  const [yt, setYT] = useState<string>("");
  const [episodes, setEpisodes] = useState<
    { name: string; episodeteaser: any; episodeslug: any }[]
  >([]);
  // const [episodeTitle,setEpisodeTitle]=useState<string>("")
  // const [episodeTeaser]
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false);
  const [commentsEnabledIcon, setCommentsEnabledIcon] = useState(
    "https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090313/opentertiary_xsoypy.png"
  );
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

  // useEffect(() => {
  const fetchNovels = async (pageIndex: number, reset = false) => {
    try {
      setLoading(true);
      const query = `*[_type == "novelparent" && slug.current == "${slug}"][0]{title, slug, noveldescription, descriptionlanguage, writer->{writername,_id}, genre->{genrename,_id}, latest ,popular, trending,  bannerimagemobile, bannerimagedesktop , _id, tags, pdfurl, youtubeurl, comment[]->{name,_id,comment, _createdAt} }`;
      const response = await client.fetch(query);
      console.log(response, "---->>>");
      // fetching episodes
      const episodeQuery = `*[_type == "novel" && references("${response._id}") && defined(episodereleasedate) && episodereleasedate <= now() ] | order(_createdAt asc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {name, episodeslug, _id, episodeteaser, "novelTitle": novelparent->title, writer->{writername,_id}
}`;
      const episodes = await client.fetch(episodeQuery);
      console.log(episodes, "episodsdsdssads");
      // console.log(response.descriptionlanguage);
      setDescriptionLang(response.descriptionlanguage);
      setNovel(response);
      // setEpisodes(episodes);
      setEpisodes((prev: any) => (reset ? episodes : [...prev, ...episodes]));
      if (page >= 0) {
        setLoader(<Loader2 />);
      }
      if (episodes.length < limit) setHasMore(false);
      // setBody(response.body);
      setBannerImageDesktop(response.bannerimagedesktop);
      setBannerImageMobile(response.bannerimagemobile);
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
  // }, []);

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
      <NovelHeader
        bannerImageDesktop={bannerImageDesktop}
        bannerImageMobile={bannerImageMobile}
        // novelTitle={novel.title}
        novelTitle={`${novel?.title ?? "Loading..."} by ${novel?.writer?.writername ?? "Unknown writer"}`}
      />

      {/* download and Youtube link buttons */}
      <div className="flex flex-wrap justify-center">
        {pdf && <DownloadPDFButton pdf={pdf} />}
        {yt && <WatchOnYT YTurl={yt} />}
      </div>

      {/* novel description */}
      {novel.noveldescription && (
        <NovelDescription
          descText={novel.noveldescription}
          font={descriptionLang ? "font-urdu" : ""}
          dir={descriptionLang ? "rtl" : "ltr"}
        />
      )}

      {/* all episodes */}
      <div className="flex flex-wrap gap-5 justify-center ">
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

        {loading && loader}
        {!loading && hasMore && (
          <LoadMoreButton onclick={() => setPage((prev) => prev + 1)} />
        )}
        {!hasMore && !loading && episodes.length > 0 && (
          <p className="text-center text-tertiary opacity-50 py-3">
            No more episodes
          </p>
        )}
      </div>

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
