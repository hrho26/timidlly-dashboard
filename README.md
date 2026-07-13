# Timidlly Media-Kit Dashboard

Media-kit dashboard for the team to track sponsorship readiness: platform
baseline stats, a lead pipeline scored by pitch fit, and a pricing
assistant. (No personal deliverable-tracking — this is a shared team tool,
not an individual task list.)

Repo: https://github.com/hrho26/timidlly-dashboard (public)

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind)
- Supabase (Postgres + email-link auth)
- Vercel (hosting)

## Local setup

```bash
npm install
cp .env.local.example .env.local   # then fill in real values, see below
npm run dev
```

Without real Supabase values, the app still runs — you'll land on `/login`
and see the form render, but sign-in won't work until Supabase is connected.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project.
2. Once created, go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Paste both into `.env.local`.
4. In **Authentication → Providers**, confirm "Email" is enabled and
   "Confirm email" uses a magic link (OTP), which is the default.
5. In **Authentication → Email Templates → Magic Link**, make sure the link
   uses `{{ .TokenHash }}` in the `token_hash` query param (Supabase's
   default template already does this) — that's what
   `app/auth/confirm/route.ts` expects.
6. Set `ALLOWED_EMAILS` in `.env.local` to a comma-separated list of every
   email that should be able to see the dashboard (you, coach, teammates).
   Leaving it empty allows anyone who signs in — don't ship that to
   production.

## 2. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import
   `hrho26/timidlly-dashboard` from GitHub.
2. In the import screen, add the same three environment variables from
   `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `ALLOWED_EMAILS`).
3. Deploy. Vercel gives you a URL like
   `timidlly-dashboard.vercel.app` — that's the live link to share.
4. Back in Supabase → **Authentication → URL Configuration**, add that
   Vercel URL to both "Site URL" and "Redirect URLs" (e.g.
   `https://timidlly-dashboard.vercel.app/auth/confirm`), or magic links
   won't redirect correctly in production.

## 3. Invite people

Anyone whose email is in `ALLOWED_EMAILS` can go to the Vercel URL, enter
their email, and click the magic link sent to their inbox — no separate
account creation needed.

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
  errors). Auth gate (`proxy.ts` → `lib/supabase/middleware.ts`) is wired up
  and redirects unauthenticated visitors to `/login`.
- **Blocked on external accounts, not code**: sign-in doesn't actually work
  yet because no real Supabase project has been created — `.env.local` still
  has placeholder values. Nobody but the repo owner can see the dashboard
  content until that's done (see "1. Create the Supabase project" above).
- **Not deployed**: no Vercel project exists yet, so there is no live URL to
  share. See "2. Deploy to Vercel" above.

## Playbook status (Weeks 2–8, Conversion/Dashboard track)

| Week | Task | Status |
|---|---|---|
| 2 | Dashboard spec + baseline stats | Done |
| 3 | Dashboard skeleton; connect first live data source | Skeleton done; live connection blocked on a real Supabase project |
| 4 | Dashboard metrics + pricing-assistant logic | Done — CPM calculator in `data/pricing.ts` |
| 5 | Ship live dashboard; generate first case study | Case-study template done; "ship live" blocked on Vercel deploy |
| 6 | Embed live proof into funnel; refine pricing | Out of this project's scope — the funnel belongs to a different track's codebase |
| 7 | QA + finalize pricing assistant + docs | Done — see QA notes below |
| 8 | Deliver + demo + final report | This README + the final report doc; live demo blocked on the same deploy dependency as Week 5 |

### QA notes (Week 7)

- `npm run build` and `npx eslint .` both pass clean.
- Manually tested: empty search state in the lead pipeline, tier filters,
  the pricing calculator's CPM input (including negative and zero — a
  negative-CPM bug that produced a malformed `$-100` display was found and
  fixed by clamping the input to `>= 0`), and the case-study form fields.
- Not tested: real Supabase sign-in (no project exists yet), real Vercel
  deploy (same reason), mobile viewport (not checked this pass).

## Known gaps

- Data is hardcoded in `.ts` files, not read from Supabase — the Week 3
  playbook task ("connect the first live data source") isn't done until at
  least one of these is wired to a live table or API. Needs a Supabase
  project (see above) before it can start.
- No automated IG/X follower pulls yet (would need a Meta developer app for
  Instagram Graph API and X API v2 access — both require account setup and
  approval time beyond what could be done without the owner's credentials).
- Nothing is actually deployed. Every "ship it live" task (Weeks 5, 6, 8)
  is code-complete but not reachable at a public URL until Vercel is
  connected.
