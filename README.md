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
- `NAVER_COOKIE`

If `NAVER_COOKIE` is omitted, `/api/crawl` returns sample data so the UI and export flow can still be exercised.

## Scripts

- `pnpm dev` runs the local app
- `pnpm lint` runs ESLint
- `pnpm typecheck` runs TypeScript checking
- `pnpm playwright:install` installs the Chromium runtime once per machine

## API Entry Points

- `POST /api/crawl` validates the query and returns either sample data or a live-preview payload
- `POST /api/export` runs the same crawl path and returns `naver-listings.xlsx`

## Project Notes

- The current crawl implementation is a bootstrap path, not a finished scraper.
- Real selector mapping still needs to be completed against the target Naver listing pages.
- The kickoff plan is preserved in `plans/2026-03-09-kickoff-plan.md`.
