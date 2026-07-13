// Formalizes the scoring methodology already used by hand for all 69
// prospects in data/prospects.ts (see the file header there): three factors,
// 1-10 each, averaged and rounded. Same tier thresholds used throughout the
// dashboard (A >= 8, B 6-7, C 4-5, D <= 3).
//
// This is the Conversion-track equivalent of Raghav's Pipeline-track lead
// intelligence tool (lead-gen-v2.onrender.com): his scans Product Hunt/YC,
// enriches via Apollo/Firecrawl, and has OpenAI compute a 1-10 fit score.
// This dashboard has no scraper or OpenAI key connected, so sourcing and
// the three sub-scores are entered by a person doing the research — the
// tool's job is just to apply the scoring rule and tier consistently, and
// produce a ready-to-paste entry for data/prospects.ts.

import type { Tier } from "./prospects";

export interface ScoringFactors {
  audienceOverlap: number; // 1-10: how well their audience matches the dev/startup/founder audience
  contactQuality: number; // 1-10: named decision-maker vs generic inbox, seniority, reachability
  urgency: number; // 1-10: how likely they are to want visibility/sponsorship right now
}

export function clampFactor(n: number): number {
  if (Number.isNaN(n)) return 1;
  return Math.min(10, Math.max(1, Math.round(n)));
}

export function computeScore(factors: ScoringFactors): number {
  const avg =
    (clampFactor(factors.audienceOverlap) +
      clampFactor(factors.contactQuality) +
      clampFactor(factors.urgency)) /
    3;
  return Math.round(avg);
}

export function tierForScore(score: number): Tier {
  if (score >= 8) return "A";
  if (score >= 6) return "B";
  if (score >= 4) return "C";
  return "D";
}
