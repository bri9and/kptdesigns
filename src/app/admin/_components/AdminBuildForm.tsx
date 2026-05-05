"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type StartResponse = {
  id?: string;
  status: string;
  error?: string;
};

type UploadResponse = {
  jobId?: string;
  keys?: string[];
  error?: string;
};

type Mode = "url" | "scratch";

export function AdminBuildForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("url");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [url, setUrl] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [scratchNotes, setScratchNotes] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [yelp, setYelp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedKeys, setUploadedKeys] = useState<string[]>([]);
  const [scratchJobId, setScratchJobId] = useState<string | null>(null);

  async function onSubmitUrl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = (await res.json()) as StartResponse;
      if (!res.ok || !data.id) {
        setError(data.error ?? `Pipeline failed (${res.status})`);
        setBusy(false);
        return;
      }
      setBusy(false);
      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setBusy(false);
    }
  }

  function onFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    setFiles(incoming);
    setUploadedKeys([]);
  }

  async function uploadFiles(): Promise<{ jobId: string; keys: string[] } | null> {
    if (files.length === 0) return { jobId: scratchJobId ?? "", keys: [] };
    const form = new FormData();
    if (scratchJobId) form.set("jobId", scratchJobId);
    files.forEach((f) => form.append("files", f));

    const res = await fetch("/api/admin/uploads", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as UploadResponse;
    if (!res.ok || !data.jobId || !data.keys) {
      setError(data.error ?? `Upload failed (${res.status})`);
      return null;
    }
    setScratchJobId(data.jobId);
    setUploadedKeys(data.keys);
    return { jobId: data.jobId, keys: data.keys };
  }

  async function onSubmitScratch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    let uploadResult: { jobId: string; keys: string[] } | null =
      uploadedKeys.length > 0
        ? { jobId: scratchJobId ?? "", keys: uploadedKeys }
        : null;
    if (files.length > 0 && uploadedKeys.length === 0) {
      uploadResult = await uploadFiles();
      if (!uploadResult) {
        setBusy(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "scratch",
          jobId: uploadResult?.jobId || undefined,
          businessName: businessName.trim(),
          serviceArea: serviceArea.trim(),
          notes: scratchNotes.trim(),
          socials: {
            facebook: facebook.trim() || undefined,
            instagram: instagram.trim() || undefined,
            yelp: yelp.trim() || undefined,
            linkedin: linkedin.trim() || undefined,
          },
          uploadKeys: uploadResult?.keys ?? [],
        }),
      });
      const data = (await res.json()) as StartResponse;
      if (!res.ok || !data.id) {
        setError(data.error ?? `Pipeline failed (${res.status})`);
        setBusy(false);
        return;
      }
      setBusy(false);
      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setBusy(false);
    }
  }

  const errorBlock = error ? (
    <p
      role="alert"
      className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      {error}
    </p>
  ) : null;

  return (
    <div className="space-y-8">
      <div className="flex gap-2 border-b border-stone-200">
        <button
          type="button"
          onClick={() => {
            setMode("url");
            setError(null);
          }}
          disabled={busy}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "url"
              ? "border-b-2 border-stone-900 text-stone-900"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          I have a URL
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("scratch");
            setError(null);
          }}
          disabled={busy}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "scratch"
              ? "border-b-2 border-stone-900 text-stone-900"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          From scratch
        </button>
      </div>

      {mode === "url" && (
        <form onSubmit={onSubmitUrl} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="admin-url">Customer URL</Label>
            <Input
              id="admin-url"
              type="url"
              placeholder="https://acmeplumbing.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={busy}
              required
            />
          </div>

          {errorBlock}

          <Button
            type="submit"
            disabled={busy || !url.trim()}
            className="w-full"
          >
            {busy ? "Starting pipeline…" : "Build a refreshed site"}
          </Button>
        </form>
      )}

      {mode === "scratch" && (
        <form onSubmit={onSubmitScratch} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="scratch-business">Business name</Label>
            <Input
              id="scratch-business"
              type="text"
              placeholder="Acme Plumbing"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={busy}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scratch-area">Service area</Label>
            <Input
              id="scratch-area"
              type="text"
              placeholder="South Hills, Pittsburgh"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              disabled={busy}
            />
            <p className="text-xs text-stone-500">
              Helps Google Places find the right business.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scratch-notes">What does the business do?</Label>
            <Textarea
              id="scratch-notes"
              rows={4}
              placeholder="Family-owned plumbing, 24/7 emergency, trenchless sewer specialty…"
              value={scratchNotes}
              onChange={(e) => setScratchNotes(e.target.value)}
              disabled={busy}
            />
          </div>

          <fieldset className="space-y-3 rounded border border-stone-200 p-4">
            <legend className="px-1 text-xs uppercase tracking-widest text-stone-500">
              Social URLs (optional)
            </legend>
            <div className="space-y-2">
              <Label htmlFor="scratch-fb">Facebook</Label>
              <Input
                id="scratch-fb"
                type="url"
                placeholder="https://facebook.com/acmeplumbing"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                disabled={busy}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scratch-ig">Instagram</Label>
              <Input
                id="scratch-ig"
                type="url"
                placeholder="https://instagram.com/acmeplumbing"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                disabled={busy}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scratch-yelp">Yelp</Label>
              <Input
                id="scratch-yelp"
                type="url"
                value={yelp}
                onChange={(e) => setYelp(e.target.value)}
                disabled={busy}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scratch-li">LinkedIn</Label>
              <Input
                id="scratch-li"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                disabled={busy}
              />
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="scratch-files">Upload photos / logo</Label>
            <input
              id="scratch-files"
              type="file"
              accept="image/*"
              multiple
              onChange={onFilesChange}
              disabled={busy}
              className="block w-full text-sm text-stone-700 file:mr-4 file:rounded-md file:border-0 file:bg-stone-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-stone-800 hover:file:bg-stone-200 disabled:opacity-50"
            />
            {files.length > 0 && (
              <p className="text-xs text-stone-500">
                {files.length} file{files.length === 1 ? "" : "s"} selected
                {uploadedKeys.length > 0 && ` · ${uploadedKeys.length} uploaded`}
              </p>
            )}
          </div>

          {errorBlock}

          <Button
            type="submit"
            disabled={busy || !businessName.trim()}
            className="w-full"
          >
            {busy ? "Starting pipeline…" : "Build from scratch"}
          </Button>

          <p className="text-xs text-stone-500">
            Pipeline takes ~5–10 minutes. The preview link opens automatically
            when ready.
          </p>
        </form>
      )}
    </div>
  );
}
