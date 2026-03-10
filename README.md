## Naver Real Estate Crawl MVP

Bootstrap repository for the Naver real estate crawl MVP described in the kickoff plan. The app is set up as a single Next.js runtime with:

- UI shell in the App Router
- Playwright-based crawl entrypoint
- Excel export with `exceljs`
- Request validation with `zod`

## Getting Started

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and set:

- `NAVER_REAL_ESTATE_REGION_CODE`
- `NAVER_REAL_ESTATE_COMPLEX_NO`
- `NAVER_STORAGE_STATE_PATH` (optional, defaults to `./naver-storage-state.json`)
- `NAVER_COOKIE` (optional fallback)

If `NAVER_STORAGE_STATE_PATH` points to a readable file, the crawler uses that Playwright
storage state first. If no storage-state file is present but `NAVER_COOKIE` is set, the
existing cookie-based live preview still works. If neither auth path is available,
`/api/crawl` returns sample data so the UI and export flow can still be exercised.

## Scripts

- `pnpm dev` runs the local app
- `pnpm lint` runs ESLint
- `pnpm typecheck` runs TypeScript checking
- `pnpm playwright:install` installs the Chromium runtime once per machine
- `pnpm naver:login` opens a headful Naver login flow and writes local storage state

## API Entry Points

- `POST /api/crawl` validates the query and returns either sample data or a live-preview payload
- `POST /api/export` runs the same crawl path and returns `naver-listings.xlsx`

## Authenticated Banpo Flow

1. Install Chromium once:

```bash
pnpm playwright:install
```

2. Generate a local authenticated storage-state file:

```bash
pnpm naver:login
```

3. Set the first live target in `.env.local`:

```bash
NAVER_REAL_ESTATE_REGION_CODE=1165010700
NAVER_REAL_ESTATE_COMPLEX_NO=189717
NAVER_STORAGE_STATE_PATH=./naver-storage-state.json
```

4. Run the app and execute the authenticated crawl:

```bash
pnpm dev
curl -s http://localhost:3000/api/crawl \
  -H 'content-type: application/json' \
  -d '{"regionCode":"1165010700","complexNo":"189717","maxPages":1}'
```

The generated `naver-storage-state.json` and any `naver-cookie*.json` dumps are local-only
artifacts and are ignored by git. Keep `NAVER_COOKIE` only as a fallback if the storage-state
flow is unavailable.

## Project Notes

- The current crawl implementation is a bootstrap path, not a finished scraper.
- Real selector mapping still needs to be completed against the target Naver listing pages.
- The kickoff plan is preserved in `plans/2026-03-09-kickoff-plan.md`.
