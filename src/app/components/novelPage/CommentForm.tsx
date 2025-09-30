"use client";
import React, { useState } from "react";
import Heading2 from "../Heading2";

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
    <div className="border border-tertiary px-6 py-3  flex flex-col gap-3 text-tertiary lg:w-[40vw]">
      <Heading2 heading2="Leave a comment" />
      <input
        type="text"
        placeholder="Name"
        value={commentName}
        onChange={commentNameHandle}
        className=" border text-tertiary rounded px-2 py-1"
      />
      <textarea
        placeholder="Comment"
        rows={3}
        value={commentText}
        onChange={commentTextHandle}
        className=" border rounded px-2 py-1"
      />
      <button
        onClick={handleCommentSubmit}
        className="self-start border border-primary hover:border-secondary hover:text-secondary hover:bg-tertiary px-4 py-2 bg-secondary rounded text-xs"
      >
        Comment
      </button>
    </div>
  );
}
