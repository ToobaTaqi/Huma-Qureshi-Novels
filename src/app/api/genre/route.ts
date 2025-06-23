// /api/product/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  const query = `*[_type == "genre"]{
  _id, genrename 
}
  `;
  const genre = await client.fetch(query);
  return NextResponse.json(genre);
}