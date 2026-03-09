import { NextResponse } from "next/server";

import { crawlListings } from "@/lib/naver/crawl";
import { crawlRequestSchema } from "@/lib/naver/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = crawlRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const listings = await crawlListings(parsed.data);

  return NextResponse.json({
    mode: process.env.NAVER_COOKIE ? "live-preview" : "sample-preview",
    count: listings.length,
    listings,
  });
}
