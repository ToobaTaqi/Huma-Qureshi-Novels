// /api/product/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  const query = `*[_type == "writer"]{
  _id, writername 
}
  `;
  const writer = await client.fetch(query);

  return NextResponse.json(writer);
}