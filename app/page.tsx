import { createClient } from "@/lib/supabase/server";
import { PlatformStats } from "@/components/PlatformStats";
import { LeadPipeline } from "@/components/LeadPipeline";
import { PricingAssistant } from "@/components/PricingAssistant";
import { DeliverableTracker } from "@/components/DeliverableTracker";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-white">
              Timidlly Media-Kit Dashboard
            </h1>
            <p className="text-xs text-neutral-500">
              Conversion track — Week 2 baseline + lead pipeline
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500">{user?.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <PlatformStats />
        <div className="grid gap-6 lg:grid-cols-2">
          <PricingAssistant />
          <DeliverableTracker />
        </div>
        <LeadPipeline />
      </main>
    </div>
  );
}
