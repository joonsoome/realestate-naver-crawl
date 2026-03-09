import { NextResponse } from "next/server";

import { buildWorkbookBuffer } from "@/lib/export/listings-workbook";
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
  const workbook = await buildWorkbookBuffer(listings);

  return new Response(workbook, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="naver-listings.xlsx"',
    },
  });
}
