# Timidlly Media-Kit Dashboard

Media-kit dashboard for the team to track sponsorship readiness: platform
baseline stats, a lead pipeline scored by pitch fit, a pricing assistant,
a lead scorer, and a case-study template. Open access — no login required,
anyone with the link can view it.

**Live: https://hrho26.github.io/timidlly-dashboard/**

Repo: https://github.com/hrho26/timidlly-dashboard (public)

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind), static export
- GitHub Pages (hosting, from the `gh-pages` branch)
- Supabase client helpers exist (`lib/supabase/`) but aren't wired to
  anything yet — kept for whenever a real data source replaces the
  hardcoded `data/*.ts` files. No auth, no login page.

## Local setup

```bash
npm install
npm run dev
```

No environment variables are required — the dashboard reads entirely from
the `data/*.ts` files.

## Deploying updates

The site is a static export (`output: "export"` in `next.config.ts`)
served two ways:

- **Vercel**: connect the repo at vercel.com/new and every push to `main`
  auto-deploys at the domain root. No env vars needed.
- **GitHub Pages**: served from the `gh-pages` branch under the
  `/timidlly-dashboard` basePath — that's why the build below sets
  `GITHUB_PAGES=true` (without it, assets resolve from the root and the
  Pages site would break; with it on Vercel, the root would 404).

To ship a new version to GitHub Pages:

```bash
GITHUB_PAGES=true npm run build   # writes the static site to out/ (basePath set)
touch out/.nojekyll      # keeps GitHub Pages from ignoring _next/
cd out && git init -b gh-pages && git add -A \
  && git commit -m "Deploy" \
  && git push -f https://github.com/hrho26/timidlly-dashboard.git gh-pages
cd .. && rm -rf out/.git
```


## Data

- `data/scoring.ts` + `components/LeadScorer.tsx` — this track's equivalent
  of Raghav's Pipeline-track lead-gen tool
  ([lead-gen-v2.onrender.com](https://lead-gen-v2.onrender.com)), which
  scans Product Hunt/YC, enriches via Apollo/Firecrawl, and has OpenAI
  compute a 1–10 fit score. This dashboard has no scraper or OpenAI key
  connected, so sourcing and the three sub-scores (audience overlap,
  contact quality, urgency) are entered by a person — the tool formalizes
  the same scoring rule already used by hand for all 69 existing
  prospects, and outputs a ready-to-paste `data/prospects.ts` entry.
- `data/prospects.ts` — 69-prospect lead pipeline: 20 from the sales team's
  CSV (uniform "dual_impact" package) plus 49 from the detailed prospect
  docx (Autumn AI through Decagon, each with a real Apollo-sourced contact
  and a tailored recommended package). Scored 1–10 by audience overlap,
  contact quality, and urgency fit. Move this into a Supabase table once
  outreach starts, so status updates persist and don't require a redeploy.
- `data/platform-stats.ts` — Week 2 baseline, pulled from
  `Hyeonseok-baseline-stats.xlsx` (the actual deliverable spreadsheet, not an
  estimate). Follower counts are real: Instagram 10,000, LinkedIn 3,999,
  X 473. Every interaction metric (likes, comments, engagement rate, etc.)
  was pulled from **one sample post per platform**, not averaged across post
  history — the UI labels these "(1 post)" and shows an amber caveat so this
  doesn't get mistaken for a trend. Newsletter subscriber count hasn't been
  pulled at all yet (still blank in the source sheet). Re-extract this file
  whenever the spreadsheet is updated with more sample posts or a real
  newsletter count.
- `data/pricing.ts` — only Newsletter ($199) and LinkedIn Post ($500) are
  confirmed prices. Everything else runs through a CPM (cost per 1,000
  reach) calculator: the confirmed LinkedIn price implies a $125.03 CPM
  against real LinkedIn followers, and that rate (editable in the UI) is
  applied to each package's real platform reach to produce a suggested
  price. It never invents a number — reach is always real, and the CPM is
  always either derived from a confirmed price or explicitly typed in by
  whoever's using the calculator.
- `data/case-study.ts` — the case-study template (Week 5 playbook task). No
  sponsored campaign has run yet, so this is the fillable format, not
  fabricated results. Rendered by `components/CaseStudyTemplate.tsx`, which
  has a "Copy as text" button since there's no database to save into yet.

## Current status

- **Code**: complete and building clean (`npm run build` passes, no type
  errors). Fully open — no login, no email allowlist, nothing gating access.
- **Live** on GitHub Pages at https://hrho26.github.io/timidlly-dashboard/;
  a Vercel deploy from the same repo also works (serves at the domain root).
- **Privacy note**: `data/prospects.ts` contains real names, emails, and
  LinkedIn URLs for 69 sponsorship contacts, and both the repo and the
  live dashboard are fully public with no access control. This was a
  deliberate choice, not an oversight.

## Playbook status (Weeks 2–8, Conversion/Dashboard track)

| Week | Task | Status |
|---|---|---|
| 2 | Dashboard spec + baseline stats | Done |
| 3 | Dashboard skeleton; connect first live data source | Skeleton done and live; no live *data source* connected yet (no Supabase project or social APIs wired up) |
| 4 | Dashboard metrics + pricing-assistant logic | Done — CPM calculator in `data/pricing.ts` |
| 5 | Ship live dashboard; generate first case study | Live at hrho26.github.io/timidlly-dashboard; case-study template done (no real campaign has run, so no filled-in case study yet) |
| 6 | Embed live proof into funnel; refine pricing | Out of this project's scope — the funnel belongs to a different track's codebase |
| 7 | QA + finalize pricing assistant + docs | Done — see QA notes below |
| 8 | Deliver + demo + final report | Done — live public link, this README, and the final report doc |

### QA notes (Week 7)

- `npm run build` and `npx eslint .` both pass clean.
- Manually tested: empty search state in the lead pipeline, tier filters,
  the pricing calculator's CPM input (including negative and zero — a
  negative-CPM bug that produced a malformed `$-100` display was found and
  fixed by clamping the input to `>= 0`), and the case-study form fields.
- The deployed GitHub Pages site was verified interactive (tier filter
  re-renders correctly on the live URL). Mobile viewport not checked.

## Known gaps

- Data is hardcoded in `.ts` files, not read from a database — the Week 3
  playbook task ("connect the first live data source") isn't done until at
  least one of these is wired to a live table or API. Note the static
  GitHub Pages hosting can't run server code, so a live data source would
  mean client-side fetches (e.g. Supabase from the browser) or moving to
  Vercel.
- No automated IG/X follower pulls yet (would need a Meta developer app for
  Instagram Graph API and X API v2 access — both require account setup and
  approval time beyond what could be done without the owner's credentials).
- Deploys are manual (see "Deploying updates") — no CI pipeline publishes
  `gh-pages` automatically on push to `main` yet.
