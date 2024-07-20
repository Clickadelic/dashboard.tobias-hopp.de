/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification", "/about", "/api/links"];

/**
 * An array of routes that are used for authentication
 * These routes redirect logged in users to /DEFAULT_LOGIN_REDIRECT
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset", "/auth/new-password"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default login path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
