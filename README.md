# Timidlly Media-Kit Dashboard

Conversion-track dashboard (Hyeonseok's Week 2–8 project): platform baseline
stats, a lead pipeline scored by pitch fit, a pricing assistant, and a
deliverable tracker against the cohort playbook.

Repo: https://github.com/hrho26/timidlly-dashboard (private)

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

- `data/prospects.ts` — the 20-prospect lead pipeline seeded from the sales
  team's CSV/DOCX handoff, scored 1–10 by audience overlap, contact
  quality, and urgency fit. Move this into a Supabase table once outreach
  starts, so status updates persist and don't require a redeploy.
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
  confirmed prices; everything else is marked "Custom quote" rather than a
  guessed number.

## Known gaps before this is a real Week 3+ deliverable

- Data is hardcoded in `.ts` files, not read from Supabase — fine for a
  skeleton, but the Week 3 task ("connect the first live data source")
  means wiring at least one of these to a live table or API.
- No automated IG/X follower pulls yet (would need each platform's API).
