// Only Newsletter and LinkedIn have confirmed audience numbers in the source
// material (New Prospect List.docx, Clay entry: "18K newsletter readers and
// 10K+ LinkedIn followers"; Perplexity entry: 65% US / 18% UK-international
// split). Instagram and X have no confirmed baseline yet — filling those in
// is exactly the "pull current IG/LI/X/newsletter stats as the baseline"
// task from the Week 2 playbook. Update the numbers below, then flip
// `confirmed` to true.

export interface PlatformStat {
  platform: "Instagram" | "LinkedIn" | "X" | "Newsletter";
  followers: number | null;
  confirmed: boolean;
  note: string;
}

export const platformStats: PlatformStat[] = [
  {
    platform: "Newsletter",
    followers: 18000,
    confirmed: true,
    note: "18K readers, referenced directly in the Clay prospect entry.",
  },
  {
    platform: "LinkedIn",
    followers: 10000,
    confirmed: true,
    note: "10K+ followers, referenced directly in the Clay prospect entry.",
  },
  {
    platform: "Instagram",
    followers: null,
    confirmed: false,
    note: "No confirmed count yet — pull this from the account before Week 3.",
  },
  {
    platform: "X",
    followers: null,
    confirmed: false,
    note: "No confirmed count yet — pull this from the account before Week 3.",
  },
];

export const audienceGeo = {
  us: 65,
  ukInternational: 18,
  other: 17,
  note: "US/UK split referenced in the Perplexity prospect entry — remainder is unconfirmed.",
};
