// app/actions/addComment.ts
"use server";

import { client } from "@/sanity/lib/client";
// import { createClient } from "next-sanity";

// const clientc = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: "2025-06-12",
//   token: process.env.SANITY_COMMENTS_TOKEN, // sirf server pe safe hai
//   useCdn: false,
// });

export async function addCommentAction(novelId: string, name: string, commentText: string) {
  const newComment = await client.create({
    _type: "comment",
    name,
    comment: commentText,
    _createdAt: new Date().toISOString(),
  });

  await client
    .patch(novelId)
    .setIfMissing({ comment: [] })
    .append("comment", [{ _type: "reference", _ref: newComment._id }])
    .commit();

  return newComment;
}
