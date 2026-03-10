import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

import { chromium } from "playwright";

import { getDefaultStorageStatePath } from "../lib/naver/auth";

async function loadEnvFile(
  filePath: string,
  initialEnvKeys: Set<string>,
  overrideFromFile = false,
) {
  try {
    const source = await readFile(filePath, "utf8");

    for (const rawLine of source.split(/\r?\n/u)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");
      if (separatorIndex <= 0) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      let value = line.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!overrideFromFile && process.env[key] !== undefined) {
        continue;
      }

      if (overrideFromFile && initialEnvKeys.has(key)) {
        continue;
      }

      process.env[key] = value;
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";
    if (!message.includes("ENOENT")) {
      throw error;
    }
  }
}

async function loadLocalEnv() {
  const cwd = process.cwd();
  const initialEnvKeys = new Set(Object.keys(process.env));

  await loadEnvFile(path.join(cwd, ".env"), initialEnvKeys);
  await loadEnvFile(path.join(cwd, ".env.local"), initialEnvKeys, true);
}

function buildLoginUrl() {
  const realEstateBaseUrl =
    process.env.NAVER_REAL_ESTATE_BASE_URL ?? "https://new.land.naver.com";
  const loginUrl = new URL("https://nid.naver.com/nidlogin.login");
  loginUrl.searchParams.set("mode", "form");
  loginUrl.searchParams.set("url", realEstateBaseUrl);
  return loginUrl.toString();
}

async function main() {
  await loadLocalEnv();

  const storageStatePath = getDefaultStorageStatePath();
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const prompt = createInterface({ input, output });

  try {
    console.log(`Opening Naver login in Chromium: ${buildLoginUrl()}`);
    console.log("Complete the login flow in the browser window, then return here.");

    await page.goto(buildLoginUrl(), { waitUntil: "domcontentloaded" });

    await prompt.question(
      "Press Enter after login is complete and the authenticated page is visible.",
    );

    await mkdir(path.dirname(storageStatePath), { recursive: true });
    await context.storageState({ path: storageStatePath });

    console.log(`Saved storage state to ${storageStatePath}`);
  } finally {
    prompt.close();
    await context.close();
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error("Failed to capture Naver storage state.");
  console.error(error);
  process.exitCode = 1;
});
