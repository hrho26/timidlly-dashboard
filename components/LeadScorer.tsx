"use client";

import { useState } from "react";
import { computeScore, tierForScore, type ScoringFactors } from "@/data/scoring";
import type { Tier } from "@/data/prospects";

interface DraftProspect {
  company: string;
  contactName: string;
  contactTitle: string;
  email: string;
  linkedin: string;
  recommendedPackage: string;
  notes: string;
  factors: ScoringFactors;
  score: number;
  tier: Tier;
}

const emptyForm = {
  company: "",
  contactName: "",
  contactTitle: "",
  email: "",
  linkedin: "",
  recommendedPackage: "",
  notes: "",
  audienceOverlap: 5,
  contactQuality: 5,
  urgency: 5,
};

function tsEntry(d: DraftProspect): string {
  const esc = (s: string) => (s || "Not found").replace(/"/g, '\\"');
  return `  {
    company: "${esc(d.company)}",
    contactName: "${esc(d.contactName)}",
    contactTitle: "${esc(d.contactTitle)}",
    email: "${esc(d.email)}",
    linkedin: "${esc(d.linkedin) || "Not listed"}",
    recommendedPackage: "${esc(d.recommendedPackage) || "TBD"}",
    score: ${d.score},
    tier: "${d.tier}",
    source: "manual",
    warm: false,
    notes: "${esc(d.notes)}",
  },`;
}

export function LeadScorer() {
  const [form, setForm] = useState(emptyForm);
  const [drafts, setDrafts] = useState<DraftProspect[]>([]);
  const [copied, setCopied] = useState(false);

  const factors: ScoringFactors = {
    audienceOverlap: form.audienceOverlap,
    contactQuality: form.contactQuality,
    urgency: form.urgency,
  };
  const score = computeScore(factors);
  const tier = tierForScore(score);

  function addDraft() {
    if (!form.company.trim()) return;
    setDrafts((d) => [
      ...d,
      {
        company: form.company,
        contactName: form.contactName,
        contactTitle: form.contactTitle,
        email: form.email,
        linkedin: form.linkedin,
        recommendedPackage: form.recommendedPackage,
        notes: form.notes,
        factors,
        score,
        tier,
      },
    ]);
    setForm(emptyForm);
  }

  function copyAll() {
    const text = drafts.map(tsEntry).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-sm font-semibold text-neutral-200">
        Lead Scorer — Add a New Prospect
      </h2>
      <p className="mt-1 text-[11px] text-neutral-500">
        This dashboard&apos;s equivalent of Raghav&apos;s Pipeline-track lead-gen tool
        (source → score → package/price), without a scraper or OpenAI key
        connected. Sourcing and the three sub-scores are entered by a
        person; this tool just applies the same 1–10 scoring rule used for
        all 69 existing prospects and formats a ready-to-paste entry.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          placeholder="Company name"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
        />
        <input
          value={form.contactName}
          onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
          placeholder="Contact name"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
        />
        <input
          value={form.contactTitle}
          onChange={(e) => setForm((f) => ({ ...f, contactTitle: e.target.value }))}
          placeholder="Contact title"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
        />
        <input
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="Email"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
        />
        <input
          value={form.linkedin}
          onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
          placeholder="LinkedIn URL"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
        />
        <input
          value={form.recommendedPackage}
          onChange={(e) => setForm((f) => ({ ...f, recommendedPackage: e.target.value }))}
          placeholder="Recommended package (e.g. LinkedIn Sponsored Post)"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
        />
      </div>
      <input
        value={form.notes}
        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        placeholder="Notes — why this pitch fits right now"
        className="mt-3 w-full rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {(
          [
            ["audienceOverlap", "Audience overlap"],
            ["contactQuality", "Contact quality"],
            ["urgency", "Urgency fit"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className="flex justify-between text-[11px] text-neutral-500">
              <span>{label}</span>
              <span className="text-neutral-300">{form[key]}/10</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={form[key]}
              onChange={(e) =>
                setForm((f) => ({ ...f, [key]: Number(e.target.value) }))
              }
              className="mt-1 w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3">
        <div className="text-xs text-neutral-400">
          Score = average of the three factors above, rounded
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-white">{score}/10</span>
          <span className="rounded border border-neutral-700 px-1.5 py-0.5 text-[10px] text-neutral-300">
            Tier {tier}
          </span>
        </div>
      </div>

      <button
        onClick={addDraft}
        disabled={!form.company.trim()}
        className="mt-3 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-neutral-200 disabled:opacity-40"
      >
        Add to session list
      </button>

      {drafts.length > 0 && (
        <div className="mt-4 border-t border-neutral-800 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-400">
              {drafts.length} new prospect{drafts.length > 1 ? "s" : ""} this
              session (not saved — copy before navigating away)
            </p>
            <button
              onClick={copyAll}
              className="rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
            >
              {copied ? "Copied!" : "Copy as prospects.ts entries"}
            </button>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-neutral-400">
            {drafts.map((d, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-neutral-200">{d.company}</span>
                <span>
                  Tier {d.tier} · {d.score}/10
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
