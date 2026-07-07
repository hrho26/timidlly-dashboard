import {
  platformBaselines,
  newsletterBaseline,
  audienceAttributes,
  engagementRate,
  isStale,
  totalAddressableReach,
  blendedEngagementRate,
} from "@/data/platform-stats";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PlatformStats() {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-sm font-semibold text-neutral-200">
        Platform Baseline — Week 2
      </h2>
      <p className="mt-1 text-[11px] text-neutral-500">
        Source: Hyeonseok-baseline-stats.xlsx. Stale after {30} days without a
        re-pull.
      </p>
      <p className="mt-1 text-[11px] text-amber-400">
        Follower counts are real account totals. Every interaction metric
        below (likes, comments, engagement rate, etc.) is pulled from a
        single sample post, not averaged across post history yet — treat
        these as one data point, not a trend.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {platformBaselines.map((p) => {
          const rate = engagementRate(p);
          const stale = isStale(p.datePulled);
          return (
            <div
              key={p.platform}
              className="rounded-lg border border-neutral-800 bg-neutral-950 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-500">{p.platform}</p>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${
                    stale
                      ? "bg-red-950 text-red-300"
                      : "bg-emerald-950 text-emerald-300"
                  }`}
                >
                  {stale ? "Stale" : "Fresh"}
                </span>
              </div>
              <p className="mt-1 text-2xl font-semibold text-white">
                {p.followers.toLocaleString()}
              </p>
              <p className="text-[11px] text-neutral-500">
                followers · pulled {formatDate(p.datePulled)}
              </p>

              <ul className="mt-3 space-y-1 text-[11px] text-neutral-400">
                {p.metrics.map((m) => (
                  <li key={m.label} className="flex justify-between">
                    <span>{m.label}</span>
                    <span className={m.needsData ? "text-amber-400" : ""}>
                      {m.needsData ? "needs data" : m.value}
                    </span>
                  </li>
                ))}
                <li className="flex justify-between border-t border-neutral-800 pt-1 text-neutral-300">
                  <span>Engagements (1 post)</span>
                  <span>{p.engagementsPerPost}</span>
                </li>
                <li className="flex justify-between text-neutral-300">
                  <span>Engagement rate (1 post)</span>
                  <span className={rate === null ? "text-amber-400" : ""}>
                    {rate === null
                      ? "needs data"
                      : `${(rate * 100).toFixed(1)}%`}
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
        <p className="text-xs text-neutral-500">Newsletter</p>
        <p className="mt-1 text-sm text-amber-400">
          {newsletterBaseline.subscribers === null
            ? "No subscriber count pulled yet — this row is still empty in the baseline sheet."
            : newsletterBaseline.subscribers.toLocaleString()}
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
          <p className="text-xs text-neutral-500">Total addressable reach</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {totalAddressableReach.toLocaleString()}
          </p>
          <p className="text-[11px] text-neutral-500">
            Sum of followers across IG/LI/X + newsletter delivered reach
            (currently 0 — no subscriber data yet).
          </p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
          <p className="text-xs text-neutral-500">Blended engagement rate</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {(blendedEngagementRate * 100).toFixed(1)}%
          </p>
          <p className="text-[11px] text-neutral-500">
            Sum of sample-post engagements ÷ sum of followers, across all
            three social platforms — based on one post per platform, not a
            trailing average.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
        <p className="text-xs text-neutral-500">Audience</p>
        <ul className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-neutral-400 sm:grid-cols-3">
          {audienceAttributes.map((a) => (
            <li key={a.attribute} className="flex justify-between gap-2">
              <span>{a.attribute}</span>
              <span className="text-amber-400">{a.value ?? "data needed"}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
