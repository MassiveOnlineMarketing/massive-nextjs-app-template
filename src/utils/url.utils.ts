/**
 * Extracts the hostname from a given URL string.
 *
 * @param url - The URL string from which to extract the hostname.
 * @returns The hostname if the URL includes "http", otherwise returns the original URL string.
 */
export const extractHostname = (url: string) => {
  if (url.includes("http")) return new URL(url).hostname;
  return url;
};

/**
 * Extracts the full path from a given URL, excluding the origin(domain).
 *
 * @param url - The full URL from which to extract the path.
 * @returns The path part of the URL, excluding the origin.
 */
export function extractFullPath(url: string) {
  const origin = new URL(url).origin;
  return url.replace(origin, "");
}
