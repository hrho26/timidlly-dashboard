# Timidlly Media-Kit Dashboard

Media-kit dashboard for the team to track sponsorship readiness: platform
baseline stats, a lead pipeline scored by pitch fit, a pricing assistant,
and a case-study template. Open access — no login required, anyone with
the link can view it.

Repo: https://github.com/hrho26/timidlly-dashboard (public)

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind)
- Vercel (hosting, once deployed)
- Supabase client helpers exist (`lib/supabase/`) but aren't wired to
  anything yet — kept for whenever a real data source replaces the
  hardcoded `data/*.ts` files. No auth, no login page.

## Local setup

```bash
npm install
npm run dev
```

No environment variables are required to run this locally — the dashboard
reads entirely from the `data/*.ts` files.

## Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import
   `hrho26/timidlly-dashboard` from GitHub.
2. Deploy — no environment variables needed for the current feature set.
3. Vercel gives you a URL like `timidlly-dashboard.vercel.app`; that's the
   public link to share. Anyone who opens it sees the dashboard directly,
   no sign-in step.

## Data

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
- **Not deployed**: no Vercel project exists yet, so there is no live URL to
  share yet. See "Deploy to Vercel" above.
- **Privacy note**: `data/prospects.ts` contains real names, emails, and
  LinkedIn URLs for 69 sponsorship contacts, and both the repo and (once
  deployed) the dashboard itself are fully public with no access control.
  This was a deliberate choice, not an oversight.

## Playbook status (Weeks 2–8, Conversion/Dashboard track)

| Week | Task | Status |
|---|---|---|
| 2 | Dashboard spec + baseline stats | Done |
| 3 | Dashboard skeleton; connect first live data source | Skeleton done; no live data source connected yet (no Supabase project or social APIs wired up) |
| 4 | Dashboard metrics + pricing-assistant logic | Done — CPM calculator in `data/pricing.ts` |
| 5 | Ship live dashboard; generate first case study | Case-study template done; "ship live" blocked on Vercel deploy |
| 6 | Embed live proof into funnel; refine pricing | Out of this project's scope — the funnel belongs to a different track's codebase |
| 7 | QA + finalize pricing assistant + docs | Done — see QA notes below |
| 8 | Deliver + demo + final report | This README + the final report doc; live demo blocked on the Vercel deploy |

### QA notes (Week 7)

- `npm run build` and `npx eslint .` both pass clean.
- Manually tested: empty search state in the lead pipeline, tier filters,
  the pricing calculator's CPM input (including negative and zero — a
  negative-CPM bug that produced a malformed `$-100` display was found and
  fixed by clamping the input to `>= 0`), and the case-study form fields.
- Not tested: real Vercel deploy, mobile viewport (not checked this pass).

## Known gaps

- Data is hardcoded in `.ts` files, not read from a database — the Week 3
  playbook task ("connect the first live data source") isn't done until at
  least one of these is wired to a live table or API.
- No automated IG/X follower pulls yet (would need a Meta developer app for
  Instagram Graph API and X API v2 access — both require account setup and
  approval time beyond what could be done without the owner's credentials).
- Nothing is actually deployed. Every "ship it live" task (Weeks 5, 6, 8)
  is code-complete but not reachable at a public URL until Vercel is
  connected.
