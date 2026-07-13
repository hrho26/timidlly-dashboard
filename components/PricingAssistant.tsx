"use client";

import { useState } from "react";
import {
  pricingTiers,
  reachFor,
  impliedCPM,
  suggestedPrice,
  LINKEDIN_IMPLIED_CPM,
} from "@/data/pricing";

export function PricingAssistant() {
  const [selected, setSelected] = useState(pricingTiers[0].name);
  const [cpm, setCpm] = useState(Math.round(LINKEDIN_IMPLIED_CPM * 100) / 100);
  const tier = pricingTiers.find((t) => t.name === selected)!;

  const reach = reachFor(tier);
  const confirmedCPM = impliedCPM(tier);
  const suggestion = !tier.confirmed && reach ? suggestedPrice(tier, cpm) : null;

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-sm font-semibold text-neutral-200">
        Pricing Assistant
      </h2>
      <p className="mt-1 text-[11px] text-neutral-500">
        CPM calculator built from real numbers only: reach comes from the
        platform baseline, and the CPM defaults to what the confirmed
        LinkedIn price implies (${LINKEDIN_IMPLIED_CPM.toFixed(2)} per 1,000
        followers) — adjust it below, this is a suggestion, not a decided
        rate.
      </p>

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

        <div className="mt-3 border-t border-neutral-800 pt-3 text-xs text-neutral-400">
          <div className="flex justify-between">
            <span>Reach ({tier.platform})</span>
            <span className={reach ? "text-neutral-200" : "text-amber-400"}>
              {reach ? reach.toLocaleString() : "not pulled yet"}
            </span>
          </div>

          {tier.confirmed && (
            <div className="mt-1 flex justify-between">
              <span>Implied CPM</span>
              <span className="text-neutral-200">
                {confirmedCPM
                  ? `$${confirmedCPM.toFixed(2)} / 1,000 reach`
                  : "not computable (reach unknown)"}
              </span>
            </div>
          )}

          {!tier.confirmed && reach && (
            <>
              <div className="mt-2 flex items-center justify-between gap-3">
                <label htmlFor="cpm-input">CPM to apply</label>
                <input
                  id="cpm-input"
                  type="number"
                  step="0.01"
                  min="0"
                  value={cpm}
                  onChange={(e) => setCpm(Math.max(0, Number(e.target.value) || 0))}
                  className="w-24 rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-right text-xs text-white outline-none focus:border-neutral-500"
                />
              </div>
              <div className="mt-2 flex justify-between border-t border-neutral-800 pt-2">
                <span className="text-neutral-300">Suggested price</span>
                <span className="text-base font-semibold text-white">
                  {suggestion !== null
                    ? `$${suggestion.toFixed(0)}`
                    : "—"}
                </span>
              </div>
            </>
          )}

          {!tier.confirmed && !reach && (
            <p className="mt-2 text-amber-400">
              Can&apos;t suggest a price — reach for {tier.platform} hasn&apos;t
              been pulled yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
