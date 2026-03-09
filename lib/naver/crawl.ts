import { chromium } from "playwright";

import type { ListingRecord } from "@/types/listing";

import type { CrawlRequest } from "./schema";

const baseUrl =
  process.env.NAVER_REAL_ESTATE_BASE_URL ?? "https://new.land.naver.com";

function buildPreviewListings(input: CrawlRequest): ListingRecord[] {
  return [
    {
      id: `${input.complexNo}-sample-1`,
      title: "미도아파트 84A",
      dealType: "매매",
      price: "12억 5,000",
      area: "84.97㎡",
      floor: "12/24",
      direction: "남동향",
      confirmedAt: new Date().toISOString().slice(0, 10),
      realtorName: "샘플공인중개사",
      url: `${baseUrl}/complexes/${input.complexNo}?tradeTypes=A1`,
    },
  ];
}

export async function crawlListings(input: CrawlRequest): Promise<ListingRecord[]> {
  const cookie = process.env.NAVER_COOKIE;
  if (!cookie) {
    return buildPreviewListings(input);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.context().addCookies([
      {
        name: "NAC",
        value: cookie,
        domain: ".naver.com",
        path: "/",
      },
    ]);

    const targetUrl = `${baseUrl}/complexes/${input.complexNo}?ms=${input.regionCode}&articleNo=&tradeType=A1&tag=::::::::`;
    await page.goto(targetUrl, { waitUntil: "networkidle" });

    const title = await page.locator("body").textContent();

    return [
      {
        id: `${input.complexNo}-live-preview`,
        title: title?.slice(0, 40).trim() || "Naver page loaded",
        dealType: "매매",
        price: "TBD",
        area: "TBD",
        floor: "TBD",
        direction: "TBD",
        confirmedAt: new Date().toISOString().slice(0, 10),
        realtorName: "Needs selector mapping",
        url: targetUrl,
      },
    ];
  } finally {
    await browser.close();
  }
}
