import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NAMESILO_API_KEY;
const BASE_URL = "https://www.namesilo.com/api";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "Domain service not configured" }, { status: 503 });
  }

  const body = await req.json();
  const { query } = body;

  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  // Clean the input — strip whitespace, lowercase, remove protocol/www
  const clean = query
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");

  // If user typed a full domain (has a dot), check that specific domain
  // Otherwise, check popular TLDs
  const hasDot = clean.includes(".");
  const tlds = [".com", ".net", ".org", ".io", ".co", ".dev", ".us", ".biz", ".info", ".pro"];
  const domains = hasDot ? [clean] : tlds.map((tld) => clean + tld);

  try {
    const url = `${BASE_URL}/checkRegisterAvailability?version=1&type=json&key=${API_KEY}&domains=${domains.join(",")}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    const data = await res.json();
    const reply = data.reply;

    if (String(reply.code) !== "300") {
      return NextResponse.json(
        { error: reply.detail || "Domain check failed" },
        { status: 502 },
      );
    }

    // NameSilo response is inconsistent:
    //   - Single available: reply.available = { domain: "x.com", price: 9.99, ... }
    //   - Multiple available: reply.available = [ { domain: "x.net", ... }, ... ]
    //   - Single unavailable: reply.unavailable = { domain: "x.com" }  OR reply.unavailable = { domain: ["x.com"] }
    //   - Multiple unavailable: reply.unavailable = { domain: ["x.com", "x.net"] }  OR reply.unavailable = [ ... ]
    // Normalize everything into arrays.

    const normalizeAvailable = (raw: any): any[] => {
      if (!raw) return [];
      if (Array.isArray(raw)) return raw;
      if (raw.domain && typeof raw.domain === "string" && raw.price !== undefined) return [raw];
      if (raw.domain) {
        const d = raw.domain;
        return Array.isArray(d) ? d.map((x: any) => (typeof x === "string" ? { domain: x } : x)) : [typeof d === "string" ? { domain: d } : d];
      }
      return [];
    };

    const normalizeUnavailable = (raw: any): string[] => {
      if (!raw) return [];
      if (typeof raw === "string") return [raw];
      if (Array.isArray(raw)) return raw.map((x: any) => (typeof x === "string" ? x : x.domain));
      if (raw.domain) {
        const d = raw.domain;
        if (typeof d === "string") return [d];
        if (Array.isArray(d)) return d;
      }
      return [];
    };

    const available = normalizeAvailable(reply.available);
    const unavailable = normalizeUnavailable(reply.unavailable);

    const results = [
      ...available.map((d: any) => ({
        domain: d.domain,
        available: true,
        price: typeof d.price === "number" ? d.price : parseFloat(d.price),
        premium: d.premium === 1 || d.premium === "1",
      })),
      ...unavailable.map((d: string) => ({
        domain: d,
        available: false,
        price: null,
        premium: false,
      })),
    ];

    // Sort: available first, then by price
    results.sort((a, b) => {
      if (a.available && !b.available) return -1;
      if (!a.available && b.available) return 1;
      if (a.price && b.price) return a.price - b.price;
      return 0;
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("NameSilo API error:", err);
    return NextResponse.json({ error: "Failed to check domain availability" }, { status: 502 });
  }
}
