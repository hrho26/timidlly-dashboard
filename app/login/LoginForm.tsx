"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const notInvited = searchParams.get("error") === "not-invited";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm rounded-xl border border-neutral-800 bg-neutral-900 p-8">
        <h1 className="text-lg font-semibold text-white">
          Timidlly Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Sign in with your invited email to continue.
        </p>

        {notInvited && (
          <p className="mt-4 rounded-md bg-red-950 px-3 py-2 text-sm text-red-300">
            That email isn&apos;t on the invite list yet. Ask the coach to add
            it to ALLOWED_EMAILS.
          </p>
        )}

        {status === "sent" ? (
          <p className="mt-6 rounded-md bg-emerald-950 px-3 py-2 text-sm text-emerald-300">
            Check your inbox — a sign-in link was sent to {email}.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@timidlly.com"
              className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
            >
              Send sign-in link
            </button>
            {status === "error" && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
