export default function Home() {
  const previewPayload = `{
  "regionCode": "1171010100",
  "complexNo": "1147",
  "maxPages": 1
}`;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10 md:px-10 lg:px-12">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-[0_24px_80px_rgba(61,42,24,0.10)] backdrop-blur md:p-10">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent-strong">
            MVP Bootstrap
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-none tracking-tight md:text-7xl">
            Naver listings in, clean Excel out.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            This repository is initialized for a single-runtime MVP: Next.js UI,
            Playwright crawl path, and `exceljs` export. It is ready for selector
            mapping and real data validation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            <span className="rounded-full bg-accent px-4 py-2 text-white">
              Next.js 16
            </span>
            <span className="rounded-full bg-accent-strong px-4 py-2 text-white">
              Playwright
            </span>
            <span className="rounded-full border border-border px-4 py-2">
              ExcelJS
            </span>
            <span className="rounded-full border border-border px-4 py-2">
              Zod validation
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-[#1d1d1b] p-8 text-[#f8f3eb] shadow-[0_24px_80px_rgba(24,19,12,0.20)]">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-[#f2b47f]">
            Immediate Next Steps
          </p>
          <ol className="mt-6 space-y-4 text-sm leading-7 text-[#ded5ca]">
            <li>1. Set `.env` values for the target region, complex, and Naver auth cookie.</li>
            <li>2. Run `pnpm playwright:install` once on the host.</li>
            <li>3. Validate selectors in `lib/naver/crawl.ts` against the real listing page.</li>
            <li>4. Lock the Excel column contract with stakeholders before expanding the schema.</li>
          </ol>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-border bg-surface p-8">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
            API Preview
          </p>
          <div className="mt-5 rounded-[1.5rem] bg-[#171717] p-5 text-sm text-[#f8f3eb]">
            <p className="text-[#f2b47f]">POST `/api/crawl`</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap leading-6 text-[#ded5ca]">
              {previewPayload}
            </pre>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted">
            Without `NAVER_COOKIE`, the crawl route returns a safe sample preview
            so the export flow can be exercised before live credentials are wired in.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["app/api/crawl", "Input validation plus crawl entrypoint."],
            ["app/api/export", "Workbook download response for the same query."],
            ["lib/naver", "Crawl schema and Playwright boot path."],
            ["lib/export", "Excel workbook builder with frozen header row."],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-[1.75rem] border border-border bg-surface p-6"
            >
              <p className="font-display text-lg">{title}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
