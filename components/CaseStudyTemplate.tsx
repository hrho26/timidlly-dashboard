"use client";

import { useState } from "react";
import { caseStudyFields } from "@/data/case-study";

export function CaseStudyTemplate() {
  const [values, setValues] = useState<Record<string, string>>({});

  function copyAsText() {
    const text = caseStudyFields
      .map((f) => `${f.label}: ${values[f.key] || "(not filled in)"}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  }

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-neutral-200">
            Case Study Template
          </h2>
          <p className="mt-1 text-[11px] text-neutral-500">
            No sponsored campaign has run yet, so this is the format to fill
            in after the first one does — not invented numbers. Nothing here
            is saved (no database yet); use “Copy as text” before navigating
            away.
          </p>
        </div>
        <button
          onClick={copyAsText}
          className="shrink-0 rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
        >
          Copy as text
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {caseStudyFields.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={`cs-${f.key}`}
              className="block text-[11px] text-neutral-500"
            >
              {f.label}
            </label>
            <input
              id={`cs-${f.key}`}
              value={values[f.key] || ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [f.key]: e.target.value }))
              }
              placeholder={f.placeholder}
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
