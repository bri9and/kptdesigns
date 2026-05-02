import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes that do NOT require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing(.*)",
  "/contact(.*)",
  "/about(.*)",
  "/sites/(.*)",
  "/domains",
  "/domains/success(.*)",
  "/api/domains",
  "/api/domains/session(.*)",
  "/api/domains/webhook(.*)",
  "/api/hosting/webhook(.*)",
  "/api/contact(.*)",
  "/start(.*)",
  "/preview/(.*)",
  "/api/start(.*)",
  "/api/diag/(.*)",
  "/api/asset/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/complete-profile(.*)",
  "/neo(.*)",
  "/landman(.*)",
  "/concepts(.*)",
  "/mockup(.*)",
  "/ideas(.*)",
  "/projects(.*)",
  "/proposal(.*)",
  "/pitch(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
