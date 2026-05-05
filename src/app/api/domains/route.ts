import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/domains
 *
 * Body: { query: string }   — a domain or a base name (".com" appended if no TLD)
 *
 * Response on success:
 *   { result: { domain, available, price, premium } }
 *
 * Response on unavailable:
 *   { result: { domain, available: false } }
 *
 * Notes
 * -----
 * - Porkbun's only documented availability endpoint is
 *   `POST /domain/checkDomain/{domain}` (path-style domain, auth in body).
 *   `/domain/checkAvailability` returns 404 — that path was speculative
 *   in our previous code and never worked.
 * - Porkbun rate-limits availability checks to **1 per 10 seconds**
 *   per API key. We therefore check only the one domain the user asked
 *   about and surface that fact in the response so the caller can pace
 *   subsequent UI requests.
 * - The pricing endpoint is uncapped, so we still expose
 *   GET /api/domains/pricing → all TLD prices for client-side hints.
 */
const API_KEY = process.env.PORKBUN_API_KEY;
const SECRET_KEY = process.env.PORKBUN_SECRET_API_KEY;
const BASE_URL = "https://api.porkbun.com/api/json/v3";

type CheckDomainResponse = {
  status: "SUCCESS" | "ERROR";
  message?: string;
  response?: {
    avail: "yes" | "no";
    type?: string;
    price: string;
    firstYearPromo?: string;
    regularPrice?: string;
    premium?: "yes" | "no";
  };
  limits?: {
    TTL?: number;
    limit?: number;
    used?: number;
    naturalLanguage?: string;
  };
  ttlRemaining?: number;
};

function normalizeDomain(input: string): string | null {
  const cleaned = input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
  if (!cleaned) return null;
  // If the user typed a bare word, default to .com.
  const withTld = cleaned.includes(".") ? cleaned : `${cleaned}.com`;
  // Basic shape check: label.tld(.tld?)
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/.test(withTld)) return null;
  return withTld;
}

async function checkOne(
  domain: string,
): Promise<CheckDomainResponse | { status: "ERROR"; message: string }> {
  const res = await fetch(`${BASE_URL}/domain/checkDomain/${domain}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey: API_KEY, secretapikey: SECRET_KEY }),
  });
  if (!res.ok) {
    return { status: "ERROR", message: `Porkbun returned HTTP ${res.status}` };
  }
  return (await res.json()) as CheckDomainResponse;
}

export async function POST(req: NextRequest) {
  if (!API_KEY || !SECRET_KEY) {
    return NextResponse.json(
      { error: "Domain service not configured" },
      { status: 503 },
    );
  }

  let body: { query?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const domain = normalizeDomain(body.query ?? "");
  if (!domain) {
    return NextResponse.json(
      { error: "query must be a valid domain or base name" },
      { status: 400 },
    );
  }

  try {
    const data = await checkOne(domain);

    if (data.status === "SUCCESS" && data.response) {
      const r = data.response;
      const price = parseFloat(r.price ?? "0");
      const regularPrice = parseFloat(r.regularPrice ?? r.price ?? "0");
      return NextResponse.json({
        result: {
          domain,
          available: r.avail === "yes",
          price,
          regularPrice,
          premium: r.premium === "yes",
        },
        limits: data.limits,
        ttlRemaining: data.ttlRemaining,
      });
    }

    // status === "ERROR" — surface Porkbun's message verbatim
    return NextResponse.json(
      { error: data.message ?? "Porkbun returned an error" },
      { status: 502 },
    );
  } catch (err) {
    console.error("[domains] Porkbun call failed:", err);
    return NextResponse.json(
      { error: "Failed to check domain availability" },
      { status: 502 },
    );
  }
}
