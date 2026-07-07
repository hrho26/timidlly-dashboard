"use client";

import { useMemo, useState } from "react";
import { prospects, tierCounts, type Tier } from "@/data/prospects";

const tierColor: Record<Tier, string> = {
  A: "bg-emerald-950 text-emerald-300 border-emerald-800",
  B: "bg-blue-950 text-blue-300 border-blue-800",
  C: "bg-amber-950 text-amber-300 border-amber-800",
  D: "bg-neutral-800 text-neutral-400 border-neutral-700",
};

export function LeadPipeline() {
  const [tierFilter, setTierFilter] = useState<Tier | "ALL">("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return prospects
      .filter((p) => tierFilter === "ALL" || p.tier === tierFilter)
      .filter((p) =>
        `${p.company} ${p.contactName}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .sort((a, b) => b.score - a.score);
  }, [tierFilter, query]);

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-neutral-200">
          Lead Pipeline ({prospects.length} prospects)
        </h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company or contact..."
            className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
          />
          {(["ALL", "A", "B", "C", "D"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`rounded-md border px-2 py-1 text-xs ${
                tierFilter === t
                  ? "border-white bg-white text-neutral-900"
                  : "border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white"
              }`}
            >
              {t === "ALL" ? "All" : `Tier ${t} (${tierCounts[t]})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500">
              <th className="pb-2 pr-3 font-medium">Tier</th>
              <th className="pb-2 pr-3 font-medium">Company</th>
              <th className="pb-2 pr-3 font-medium">Contact</th>
              <th className="pb-2 pr-3 font-medium">Package</th>
              <th className="pb-2 pr-3 font-medium">Score</th>
              <th className="pb-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.company}
                className="border-b border-neutral-900 text-neutral-300"
              >
                <td className="py-2 pr-3">
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[10px] ${
                      tierColor[p.tier]
                    }`}
                  >
                    {p.tier}
                  </span>
                  {p.warm && (
                    <span className="ml-1 rounded border border-orange-800 bg-orange-950 px-1.5 py-0.5 text-[10px] text-orange-300">
                      warm
                    </span>
                  )}
                </td>
                <td className="py-2 pr-3 font-medium text-white">
                  {p.company}
                </td>
                <td className="py-2 pr-3">
                  {p.contactName}
                  <span className="block text-neutral-500">
                    {p.contactTitle}
                  </span>
                </td>
                <td className="py-2 pr-3">{p.recommendedPackage}</td>
                <td className="py-2 pr-3">{p.score}/10</td>
                <td className="py-2 max-w-xs text-neutral-500">{p.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-6 text-center text-xs text-neutral-500">
            No prospects match this filter.
          </p>
        )}
      </div>
    </section>
  );
}
