"use client";
import React from "react";

export default function CommentForm({
  handleCommentSubmit,
  commentName,
  commentNameHandle,
  commentText,
  commentTextHandle,
}: {
  handleCommentSubmit: any;
  commentName: string;
  commentNameHandle: any;
  commentText: string;
  commentTextHandle: any;
}) {
  return (
    <div className="flex flex-col gap-4 text-tertiary w-full lg:max-w-[40vw] rounded-2xl border border-secondary/25 bg-secondary/5 p-6 shadow-xl">
      <h3 className="heading-stylish text-xl font-bold text-[#C9A96E]">
        Leave a Comment
      </h3>
      <input
        type="text"
        placeholder="Your name"
        value={commentName}
        onChange={commentNameHandle}
        className="rounded-lg border border-secondary/30 bg-transparent px-4 py-2.5 text-sm text-tertiary placeholder:text-tertiary/40 focus:outline-none focus:border-secondary transition"
      />
      <textarea
        placeholder="Share your thoughts..."
        rows={3}
        value={commentText}
        onChange={commentTextHandle}
        className="rounded-lg border border-secondary/30 bg-transparent px-4 py-2.5 text-sm text-tertiary placeholder:text-tertiary/40 focus:outline-none focus:border-secondary resize-none transition"
      />
      <button
        onClick={handleCommentSubmit}
        className="self-start bg-secondary text-primary font-semibold px-6 py-2 rounded-full hover:bg-tertiary active:scale-95 transition"
      >
        Post Comment
      </button>
    </div>
  );
}
