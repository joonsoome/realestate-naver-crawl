import { z } from "zod";

export const crawlRequestSchema = z.object({
  regionCode: z.string().trim().min(1, "regionCode is required"),
  complexNo: z.string().trim().min(1, "complexNo is required"),
  maxPages: z.number().int().min(1).max(10).default(1),
});

export type CrawlRequest = z.infer<typeof crawlRequestSchema>;
