// Only two prices are explicitly stated in the source material
// (New Prospect List.docx, Autumn AI entry). Everything else is a real
// package type mentioned across prospects but without a confirmed price yet —
// listed as "Custom quote" rather than guessing a number.

export interface PricingTier {
  name: string;
  price: string;
  confirmed: boolean;
  description: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Newsletter Ad",
    price: "$199",
    confirmed: true,
    description: "Single placement in the newsletter — lowest-cost entry package.",
  },
  {
    name: "LinkedIn Sponsored Post",
    price: "$500",
    confirmed: true,
    description: "One sponsored post to the LinkedIn audience (founders/operators/GTM).",
  },
  {
    name: "Sponsored Reel",
    price: "Custom quote",
    confirmed: false,
    description: "Instagram Reel, typically a product demo or before/after.",
  },
  {
    name: "Sponsored Tweet / Thread",
    price: "Custom quote",
    confirmed: false,
    description: "Single tweet or thread on X, often bundled with a Reel.",
  },
  {
    name: "Dual Impact",
    price: "Custom quote",
    confirmed: false,
    description: "The default recommended package across most CSV-sourced leads — combines two channels (exact bundle TBD per client).",
  },
];
