interface Deliverable {
  week: number;
  task: string;
  deliverable: string;
  status: "done" | "in-progress" | "todo";
}

const deliverables: Deliverable[] = [
  {
    week: 2,
    task: "Scope the media-kit dashboard + pricing assistant; pull current IG/LI/X/newsletter stats as the baseline.",
    deliverable: "Dashboard spec + baseline stats",
    status: "in-progress",
  },
  {
    week: 3,
    task: "Build the dashboard skeleton; connect the first live data source.",
    deliverable: "Dashboard skeleton pulling live stats",
    status: "in-progress",
  },
  {
    week: 4,
    task: "Build out dashboard metrics; start the pricing-assistant logic.",
    deliverable: "Dashboard v1 + pricing logic draft",
    status: "todo",
  },
  {
    week: 5,
    task: "Ship the live media-kit/dashboard; generate the first case study.",
    deliverable: "Live media kit + 1 case study",
    status: "todo",
  },
  {
    week: 6,
    task: "Embed live proof into the funnel; refine the pricing assistant.",
    deliverable: "Proof embedded + pricing v1",
    status: "todo",
  },
  {
    week: 7,
    task: "QA the dashboard; finalize the pricing assistant; write docs.",
    deliverable: "Release candidate + docs",
    status: "todo",
  },
  {
    week: 8,
    task: "Deliver the dashboard + pricing assistant + demo; report proof shipped.",
    deliverable: "Delivered tool + final report + demo",
    status: "todo",
  },
];

const statusStyle: Record<Deliverable["status"], string> = {
  done: "bg-emerald-950 text-emerald-300 border-emerald-800",
  "in-progress": "bg-amber-950 text-amber-300 border-amber-800",
  todo: "bg-neutral-800 text-neutral-400 border-neutral-700",
};

export function DeliverableTracker() {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="text-sm font-semibold text-neutral-200">
        Hyeonseok — Conversion Track (Weeks 2–8)
      </h2>
      <ol className="mt-4 space-y-3">
        {deliverables.map((d) => (
          <li
            key={d.week}
            className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-950 p-3"
          >
            <span className="mt-0.5 shrink-0 rounded-md border border-neutral-700 px-2 py-0.5 text-[10px] text-neutral-400">
              Wk {d.week}
            </span>
            <div className="flex-1">
              <p className="text-xs text-neutral-300">{d.task}</p>
              <p className="mt-1 text-[11px] font-medium text-white">
                {d.deliverable}
              </p>
            </div>
            <span
              className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] ${
                statusStyle[d.status]
              }`}
            >
              {d.status}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
