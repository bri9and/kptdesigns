"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type StartResponse = {
  id?: string;
  status?: string;
  error?: string;
};

export function AdminBuildForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          businessName: businessName.trim(),
          notes: notes.trim(),
        }),
      });
      const data = (await res.json()) as StartResponse;

      if (!res.ok || !data.id) {
        setError(data.error ?? `Pipeline failed (${res.status})`);
        setBusy(false);
        return;
      }

      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="admin-url">Customer URL</Label>
        <Input
          id="admin-url"
          type="url"
          placeholder="acmeplumbing.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={busy}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-business">Business name (optional)</Label>
        <Input
          id="admin-business"
          type="text"
          placeholder="Acme Plumbing"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          disabled={busy}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-notes">Notes for the pipeline (optional)</Label>
        <Textarea
          id="admin-notes"
          rows={4}
          placeholder="Anything we should know — service area, voice, photos to highlight…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={busy}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <Button type="submit" disabled={busy || !url.trim()} className="w-full">
        {busy ? "Starting pipeline…" : "Build a refreshed site"}
      </Button>

      <p className="text-xs text-stone-500">
        Pipeline takes ~5–10 minutes. The preview link opens automatically when
        ready.
      </p>
    </form>
  );
}
