import { platformStats, audienceGeo } from "@/data/platform-stats";

export function PlatformStats() {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-sm font-semibold text-neutral-200">
        Platform Baseline — Week 2
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {platformStats.map((s) => (
          <div
            key={s.platform}
            className="rounded-lg border border-neutral-800 bg-neutral-950 p-4"
          >
            <p className="text-xs text-neutral-500">{s.platform}</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {s.followers !== null ? s.followers.toLocaleString() : "—"}
            </p>
            <p
              className={`mt-1 text-[11px] ${
                s.confirmed ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {s.confirmed ? "Confirmed" : "Needs baseline"}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Audience split: {audienceGeo.us}% US, {audienceGeo.ukInternational}%
        UK/international, {audienceGeo.other}% other (unconfirmed).
      </p>
    </section>
  );
}
