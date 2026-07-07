"use client";

import { useState } from "react";
import { pricingTiers } from "@/data/pricing";

export function PricingAssistant() {
  const [selected, setSelected] = useState(pricingTiers[0].name);
  const tier = pricingTiers.find((t) => t.name === selected)!;

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-sm font-semibold text-neutral-200">
        Pricing Assistant (v0 — Week 4 builds out the real logic)
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {pricingTiers.map((t) => (
          <button
            key={t.name}
            onClick={() => setSelected(t.name)}
            className={`rounded-md border px-3 py-1.5 text-xs ${
              selected === t.name
                ? "border-white bg-white text-neutral-900"
                : "border-neutral-700 bg-neutral-950 text-neutral-300 hover:text-white"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold text-white">{tier.price}</p>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] ${
              tier.confirmed
                ? "bg-emerald-950 text-emerald-300"
                : "bg-amber-950 text-amber-300"
            }`}
          >
            {tier.confirmed ? "Confirmed price" : "Needs pricing decision"}
          </span>
        </div>
        <p className="mt-2 text-xs text-neutral-400">{tier.description}</p>
      </div>
    </section>
  );
}
