import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicDynamicRoutes,
  publicRoutes,
} from "./routes";


const { auth } = NextAuth(authConfig);

/**
 * Middleware function for handling authentication.
 *
 * @param req - The request object.
 * @returns The response object or null.
 */
export default auth(async (req) => {
  // console.log('middleware initiated')

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isPublicDynamicRoute = publicDynamicRoutes.some((prefix) =>
    nextUrl.pathname.startsWith(prefix),
  );
  // console.log('isPublicDynamicRoute', isPublicDynamicRoute)

  if (isApiAuthRoute) {
    return null;
  }

  // Redirect to default login redirect if logged in and auth route
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Redirect to login if not logged in and not public route and not public dynamic route
  if (!isLoggedIn && !isPublicRoute && !isPublicDynamicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
