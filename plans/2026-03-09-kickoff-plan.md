# Kickoff Plan

Date: 2026-03-09
Project: 네이버 부동산 크롤링 웹앱
Source issue: JOO-7

## Recommendation

Build the MVP as a single TypeScript monolith using Next.js for the UI and server endpoints, Playwright for browser-driven crawling, and `exceljs` for `.xlsx` export.

This keeps the first release fast:

- one repository
- one deployment unit
- no separate API service
- enough browser automation to handle JavaScript-rendered listing pages

## Suggested Stack

- Frontend: Next.js App Router, React, TypeScript
- Styling: Tailwind CSS for fast MVP iteration
- Crawling: Playwright running on the server
- Excel export: `exceljs`
- Validation: `zod`
- Background processing: start synchronous for MVP, add a queue only if crawl time becomes a UX problem
- Deployment: self-hosted Node environment or containerized Linux host with Playwright browser dependencies installed

## MVP Scope

1. Input form for search/listing conditions
2. Crawl selected Naver Real Estate listing pages
3. Normalize key fields into a stable schema
4. Generate and download an Excel file
5. Basic status/error messaging in the UI

## Delivery Estimate

Rough estimate for MVP: 24 to 40 engineering hours, or 3 to 5 working days for one strong product engineer.

Suggested phase split:

- Project bootstrap and repo sync: 2 to 4 hours
- Crawl spike and selector validation: 6 to 10 hours
- UI and download flow: 6 to 8 hours
- Excel mapping/export: 3 to 5 hours
- Hardening, retry/error states, deployment docs: 7 to 13 hours

## Risks

- Naver markup or request patterns may change without notice
- Some pages may require browser automation rather than simple HTTP scraping
- Crawl speed may be limited by anti-bot defenses or rate limits
- Excel field mapping needs early agreement so export columns stay stable

## Execution Order

1. Confirm the exact fields required in the Excel export
2. Prove one end-to-end crawl path with Playwright
3. Build the download flow around the proven schema
4. Add retries, validation, and operator notes

## Leadership Call

Do not split frontend and backend into separate services for the MVP. The fastest path is one app, one runtime, one owner. Revisit separation only after the crawl/export flow is proven and demand is real.
