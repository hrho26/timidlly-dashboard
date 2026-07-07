// Sourced directly from Downloads/Hyeonseok -baseline-stats.xlsx ("Baseline
// Stats" + "Summary" sheets) — this is the actual Week 2 deliverable file,
// not an estimate. Re-run the extraction below whenever that spreadsheet is
// updated, or move this into Supabase so it doesn't require a redeploy.
//
// IMPORTANT: only `followers` is a real account-level number. Every
// likes/comments/saves/etc. row was pulled from a single sample post, not
// averaged across the account's post history — the sheet's "Avg" labels are
// aspirational (that's what they'll become once more posts are logged), not
// actual averages yet. Labeled here as "(1 post)" so the dashboard
// doesn't overstate confidence. Same caveat applies to engagementsPerPost
// and engagementRate below, both derived from that single post.
//
// Formulas replicated exactly from the workbook:
//   engagementsPerPost = sum of the platform's sample-post interaction metrics
//   engagementRate = engagementsPerPost / reach-or-impressions of that post
//     (NOT per follower — that's what the sheet does, kept identical here)
//   Newsletter deliveredReachPerSend = subscribers * openRate

export type Metric = { label: string; value: number | null; needsData: boolean };

export interface PlatformBaseline {
  platform: "Instagram" | "LinkedIn" | "X";
  followers: number;
  datePulled: string; // ISO date
  reachOrImpressionsPerPost: number | null; // null = "data needed" in sheet
  metrics: Metric[]; // interaction counts from the single sample post
  engagementsPerPost: number; // sum of metrics above, from that same one post
}

export const platformBaselines: PlatformBaseline[] = [
  {
    platform: "Instagram",
    followers: 10000,
    datePulled: "2026-04-05",
    reachOrImpressionsPerPost: null,
    metrics: [
      { label: "Likes (1 post)", value: 78, needsData: false },
      { label: "Comments (1 post)", value: 15, needsData: false },
      { label: "Saves (1 post)", value: 6, needsData: false },
      { label: "Shares (1 post)", value: 146, needsData: false },
      { label: "Reel plays (1 post)", value: null, needsData: true },
      { label: "Story views (1 post)", value: null, needsData: true },
    ],
    engagementsPerPost: 245, // 78 + 15 + 6 + 146, from that one sample post
  },
  {
    platform: "LinkedIn",
    followers: 3999,
    datePulled: "2026-06-23",
    reachOrImpressionsPerPost: null,
    metrics: [
      { label: "Reactions (1 post)", value: 197, needsData: false },
      { label: "Comments (1 post)", value: 36, needsData: false },
      { label: "Reposts (1 post)", value: 14, needsData: false },
    ],
    engagementsPerPost: 247, // 197 + 36 + 14, from that one sample post
  },
  {
    platform: "X",
    followers: 473,
    datePulled: "2026-06-19",
    reachOrImpressionsPerPost: null,
    metrics: [
      { label: "Likes (1 post)", value: 83, needsData: false },
      { label: "Reposts (1 post)", value: 35, needsData: false },
      { label: "Replies (1 post)", value: 12, needsData: false },
      { label: "Bookmarks (1 post)", value: null, needsData: true },
    ],
    engagementsPerPost: 130, // 83 + 35 + 12, from that one sample post
  },
];

// null = sheet's IFERROR(...,"") — also still a single-post rate, not a
// true average engagement rate, even once reach/impressions is filled in.
export function engagementRate(p: PlatformBaseline): number | null {
  if (!p.reachOrImpressionsPerPost) return null;
  return p.engagementsPerPost / p.reachOrImpressionsPerPost;
}

export interface NewsletterBaseline {
  subscribers: number | null;
  avgOpenRate: number | null;
  avgClickRate: number | null;
  ninetyDaySubscriberGrowth: number | null;
  sponsorSlotsPerSend: number | null;
}

export const newsletterBaseline: NewsletterBaseline = {
  subscribers: null,
  avgOpenRate: null,
  avgClickRate: null,
  ninetyDaySubscriberGrowth: null,
  sponsorSlotsPerSend: null,
};

export const deliveredReachPerSend =
  newsletterBaseline.subscribers && newsletterBaseline.avgOpenRate
    ? newsletterBaseline.subscribers * newsletterBaseline.avgOpenRate
    : 0;

// Total addressable reach = sum of all platform followers + newsletter delivered reach
export const totalAddressableReach =
  platformBaselines.reduce((sum, p) => sum + p.followers, 0) +
  deliveredReachPerSend;

// Blended engagement rate = sum(engagements per post) / sum(followers)
// — replicated from Summary!B6, which (unlike the per-platform rate above)
// does divide by followers, not reach/impressions. Kept identical to source.
// Still built from each platform's single sample post, not a true average.
export const blendedEngagementRate =
  platformBaselines.reduce((sum, p) => sum + p.engagementsPerPost, 0) /
  platformBaselines.reduce((sum, p) => sum + p.followers, 0);

export interface AudienceAttribute {
  attribute: string;
  value: string | null;
}

// All five rows are literally "data needed" in the source sheet — none of
// this has been pulled yet. Don't invent numbers here; wire this to real
// analytics before Week 3 sign-off.
export const audienceAttributes: AudienceAttribute[] = [
  { attribute: "Top age range", value: null },
  { attribute: "Gender split", value: null },
  { attribute: "Top geographies", value: null },
  { attribute: "Top industries (LinkedIn)", value: null },
  { attribute: "Top interests", value: null },
];

export const STALE_AFTER_DAYS = 30;

export function isStale(datePulled: string): boolean {
  const days = (Date.now() - new Date(datePulled).getTime()) / 86_400_000;
  return days > STALE_AFTER_DAYS;
}
