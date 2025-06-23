// src/app/api/product/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  const query = `*[_type == "novel"]{title,
  _id, body, genre->{genrename,_id}, latest ,popular, trending, writer->{writername,_id}, tags
}
  `;
  const noveldetails = await client.fetch(query);

  return NextResponse.json(noveldetails);
}