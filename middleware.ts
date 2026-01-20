import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. _next (static files)
     * 2. static files (images, fonts, etc)
     */
    '/((?!_next|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico|css|js|woff2?|ttf)).*)',
    /*
     * Always run for API routes
     */
    '/(api|trpc)(.*)',
  ],
}

