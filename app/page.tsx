import { PlatformStats } from "@/components/PlatformStats";
import { LeadPipeline } from "@/components/LeadPipeline";
import { LeadScorer } from "@/components/LeadScorer";
import { PricingAssistant } from "@/components/PricingAssistant";
import { CaseStudyTemplate } from "@/components/CaseStudyTemplate";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-base font-semibold text-white">
            Timidlly Media-Kit Dashboard
          </h1>
          <p className="text-xs text-neutral-500">
            Conversion track — baseline stats, pricing, case studies, lead pipeline
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <PlatformStats />
        <PricingAssistant />
        <CaseStudyTemplate />
        <LeadScorer />
        <LeadPipeline />
      </main>
    </div>
  );
}
