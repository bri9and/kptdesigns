/**
 * Admin authorization helpers.
 *
 * Admin status is stored in Clerk's `publicMetadata.role`. To grant a user
 * admin access, set `{ "role": "admin" }` on their public metadata via the
 * Clerk dashboard (Users → user → Metadata → Public).
 *
 * Page-level usage:
 *   const user = await requireAdmin();   // redirects non-admins
 *   <p>Signed in as {user.emailAddresses[0]?.emailAddress}</p>
 *
 * Conditional usage:
 *   const user = await currentUser();
 *   if (!isAdmin(user)) return null;
 */
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { User } from "@clerk/nextjs/server";

export function isAdmin(user: User | null | undefined): boolean {
  if (!user) return false;
  const role = user.publicMetadata?.role;
  return role === "admin";
}

export async function requireAdmin(): Promise<User> {
  const user = await currentUser();
  if (!user) redirect("/sign-in?redirect_url=/admin");
  if (!isAdmin(user)) redirect("/");
  return user;
}
