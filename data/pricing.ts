// Only two prices are explicitly stated in the source material
// (New Prospect List.docx, Autumn AI entry). Everything else is a real
// package type mentioned across prospects but without a confirmed price yet —
// listed as "Custom quote" rather than guessing a number.
//
// Week 4 playbook task: "start the pricing-assistant logic." The logic here
// is a CPM (cost per 1,000 reach) calculator built ONLY from real numbers:
// the two confirmed prices, and the real follower counts in
// platform-stats.ts. It does not invent a pricing policy — it computes what
// CPM the LinkedIn price implies, and lets that (or any other CPM the team
// chooses) be applied to reach for the unconfirmed packages. The output is
// a suggestion to sanity-check against, not a locked price.

import { platformBaselines, newsletterBaseline } from "./platform-stats";

export type PackagePlatform = "Instagram" | "LinkedIn" | "X" | "Newsletter" | "Instagram+X+LinkedIn";

export interface PricingTier {
  name: string;
  price: string;
  confirmed: boolean;
  description: string;
  platform: PackagePlatform;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Newsletter Ad",
    price: "$199",
    confirmed: true,
    description: "Single placement in the newsletter — lowest-cost entry package.",
    platform: "Newsletter",
  },
  {
    name: "LinkedIn Sponsored Post",
    price: "$500",
    confirmed: true,
    description: "One sponsored post to the LinkedIn audience (founders/operators/GTM).",
    platform: "LinkedIn",
  },
  {
    name: "Sponsored Reel",
    price: "Custom quote",
    confirmed: false,
    description: "Instagram Reel, typically a product demo or before/after.",
    platform: "Instagram",
  },
  {
    name: "Sponsored Tweet / Thread",
    price: "Custom quote",
    confirmed: false,
    description: "Single tweet or thread on X, often bundled with a Reel.",
    platform: "X",
  },
  {
    name: "Dual Impact",
    price: "Custom quote",
    confirmed: false,
    description: "The default recommended package across most CSV-sourced leads — combines two channels (exact bundle TBD per client).",
    platform: "Instagram+X+LinkedIn",
  },
];

function reachForPlatform(platform: PackagePlatform): number | null {
  if (platform === "Newsletter") return newsletterBaseline.subscribers;
  if (platform === "Instagram+X+LinkedIn") {
    return platformBaselines.reduce((sum, p) => sum + p.followers, 0);
  }
  const p = platformBaselines.find((b) => b.platform === platform);
  return p ? p.followers : null;
}

export function reachFor(tier: PricingTier): number | null {
  return reachForPlatform(tier.platform);
}

// CPM implied by a confirmed price, given real reach. Null if price isn't
// confirmed or reach for that platform isn't known yet (e.g. Newsletter).
export function impliedCPM(tier: PricingTier): number | null {
  if (!tier.confirmed) return null;
  const reach = reachForPlatform(tier.platform);
  if (!reach) return null;
  const price = Number(tier.price.replace(/[^0-9.]/g, ""));
  return price / (reach / 1000);
}

// Suggested price for an unconfirmed package: reach / 1000 * cpm.
// `cpm` is caller-supplied (e.g. from a UI input) — this function never
// picks a number on its own.
export function suggestedPrice(tier: PricingTier, cpm: number): number | null {
  const reach = reachForPlatform(tier.platform);
  if (!reach) return null;
  return (reach / 1000) * cpm;
}

// The one CPM we can actually derive from real data: LinkedIn Sponsored
// Post ($500 against 3,999 real followers). Used as the calculator's
// starting point — clearly editable, not a decided rate.
export const LINKEDIN_IMPLIED_CPM = (() => {
  const li = pricingTiers.find((t) => t.name === "LinkedIn Sponsored Post")!;
  return impliedCPM(li)!;
})();
