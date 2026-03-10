import { constants } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";

const defaultStorageStateFile = "naver-storage-state.json";

export type NaverAuthConfig =
  | {
      source: "storage-state";
      storageStatePath: string;
    }
  | {
      source: "cookie";
      cookie: string;
    }
  | {
      source: "none";
    };

export function getDefaultStorageStatePath() {
  const configuredPath = process.env.NAVER_STORAGE_STATE_PATH?.trim();

  return path.resolve(process.cwd(), configuredPath || defaultStorageStateFile);
}

async function hasReadableFile(filePath: string) {
  try {
    await access(filePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

export async function resolveNaverAuthConfig(): Promise<NaverAuthConfig> {
  const storageStatePath = getDefaultStorageStatePath();
  if (await hasReadableFile(storageStatePath)) {
    return {
      source: "storage-state",
      storageStatePath,
    };
  }

  const cookie = process.env.NAVER_COOKIE?.trim();
  if (cookie) {
    return {
      source: "cookie",
      cookie,
    };
  }

  return { source: "none" };
}

export async function getCrawlMode() {
  const authConfig = await resolveNaverAuthConfig();

  return authConfig.source === "none" ? "sample-preview" : "live-preview";
}
