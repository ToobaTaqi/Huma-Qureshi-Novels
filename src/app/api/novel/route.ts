// src/app/api/product/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  const query = `*[_type == "novel"]{
  _id, body, genre->{genrename}, latest ,popular, trending, writer->{writername} 
}
  `;
  const categories = await client.fetch(query);

  return NextResponse.json(categories);
}