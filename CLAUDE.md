# KPT Designs

## Environment Variables

Required env vars in `.env.local` (never commit values):

| Variable | Purpose |
|----------|---------|
| `GOOGLE_API_KEY` | Google Gemini API (site generator + shared with kptagents) |
| `CLERK_SECRET_KEY` | Clerk auth (server-side) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk auth (client-side) |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe (client-side) |
| `GITHUB_TOKEN` | GitHub repo provisioning |
| `EWD_VERCEL_TOKEN` | Vercel project provisioning |
| `PORKBUN_API_KEY` | Domain registrar — search / register / DNS |
| `PORKBUN_SECRET_API_KEY` | Domain registrar — paired secret |
| `LINODE_STORAGE_ACCESS_KEY` | Linode Object Storage — shared bucket with kptagents |
| `LINODE_STORAGE_SECRET_KEY` | Paired secret for Linode Object Storage |
| `LINODE_STORAGE_ENDPOINT` | Linode S3 endpoint URL |
| `LINODE_STORAGE_REGION` | Linode S3 region (e.g. us-southeast-1) |
| `LINODE_STORAGE_BUCKET_NAME` | Shared bucket name; KPT Designs data lives under `kptdesigns/` prefix |

Notes:
- `ANTHROPIC_API_KEY` is **no longer used by the spike** (intake pipeline uses Gemini). Safe to remove from .env.local once nothing else depends on it.
- `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` / `SERVICE_ROLE_KEY` are still in .env.local but the intake pipeline now writes to Linode Object Storage. Other Clerk-Supabase wiring may still depend on them.
- `NAMESILO_API_KEY` is **dead** — registrar swapped to Porkbun. Safe to remove.
