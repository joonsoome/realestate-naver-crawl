import { NextResponse } from "next/server";

import { getCrawlMode } from "@/lib/naver/auth";
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

  const [listings, mode] = await Promise.all([
    crawlListings(parsed.data),
    getCrawlMode(),
  ]);

  return NextResponse.json({
    mode,
    count: listings.length,
    listings,
  });
}
