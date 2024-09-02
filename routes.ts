/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification", "/404"];

/**
 * These are dynamic routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicDynamicRoutes = [
  "/api/webhooks/stripe",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/app/search";

/**
 * The default route for multi-step form
 * @type {string}
 */
export const DEFAULT_APP_SETTING_PAGE = "/app/settings/profile";

/**
 * The base URL of the website.
 */
export const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

